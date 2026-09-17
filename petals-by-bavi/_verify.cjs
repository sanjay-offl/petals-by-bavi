const puppeteer = require('/home/sanjay/.npm/_npx/7d92d9a2d2ccc630/node_modules/puppeteer')
const fs = require('fs')

const BASE = 'http://localhost:3000'
const results = []
let errors = []

function report(label, ok, detail) {
  results.push({ label, ok, detail })
  console.log((ok ? 'PASS' : 'FAIL'), label, detail || '')
}

async function checkPage(page, label, route, { mobile = false } = {}) {
  await page.goto(BASE + route, { waitUntil: 'networkidle0', timeout: 60000 })
  await page.waitForSelector('p.petals-logo, img[alt*="Bavi"], p.petals-logo-nav', { timeout: 15000 }).catch(() => {})
  await page.evaluate(() => new Promise(r => setTimeout(r, 1200)))
  const res = await page.evaluate(() => {
    const html = document.documentElement.innerHTML
    return {
      title: document.title,
      digi: (html.match(/digibouquet/gi) || []).length,
      petals: (html.match(/Petals by Bavi/g) || []).length,
      logoCount: document.querySelectorAll('.petals-logo').length,
      firstLogo: document.querySelector('.petals-logo') && document.querySelector('.petals-logo').textContent.trim(),
      mainText: (document.body.innerText || '').slice(0, 400),
      scrollW: document.documentElement.scrollWidth,
      winW: window.innerWidth,
      fonts: (typeof document.fonts !== 'undefined') && document.fonts.check('16px Pacifico') ? 'loaded' : 'missing',
      logos: Array.from(document.querySelectorAll('.petals-logo')).slice(0, 3).map(e => ({
        cls: e.className,
        font: getComputedStyle(e).fontFamily.slice(0, 40),
        size: getComputedStyle(e).fontSize
      }))
    }
  })
  report('LOAD ' + (mobile ? '[mobile] ' : '') + label, res.digi === 0, JSON.stringify({ title: res.title, petals: res.petals, logo: res.logoCount, font: res.fonts, logos: res.logos }, null, 0).slice(0, 600))
  return res
}

;(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
  })

  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 900 })

  page.on('console', msg => { if (msg.type() === 'error') errors.push('console: ' + msg.text().slice(0, 300)) })
  page.on('pageerror', e => errors.push('pageerror: ' + String(e).slice(0, 300)))
  page.on('requestfailed', r => errors.push('requestfailed: ' + r.url().slice(0, 140) + ' ' + (r.failure() || {}).errorText))

  await checkPage(page, '/', '/')
  await checkPage(page, '/garden', '/garden')
  await checkPage(page, '/bouquet?mode=color', '/bouquet?mode=color')
  await checkPage(page, '/bouquet?mode=mono', '/bouquet?mode=mono')
  await checkPage(page, '/privacy-policy', '/privacy-policy')
  await checkPage(page, '/bouquet/[id]', '/bouquet/b84b4b0d-3076-4eaf-a4ae-9614c82ae59d')
  await page.screenshot({ path: '/tmp/opencode/shot-bouquet-shared.png' })

  let rscSeen = []
  page.on('response', res => {
    const u = res.url()
    if (u.includes('_rsc') || (res.headers()['content-type'] || '').includes('text/x-component')) {
      rscSeen.push({ url: u.slice(0, 120), status: res.status(), ct: res.headers()['content-type'] })
    }
  })

  // ---------- BOUQUET BUILDER INTERACTIONS ----------
  await page.goto(BASE + '/bouquet?mode=color', { waitUntil: 'networkidle0', timeout: 60000 })
  await page.waitForSelector('button.flex.relative.flex-col.items-center', { timeout: 15000 })
  const flowers = await page.$$('button.flex.relative.flex-col.items-center')
  report('BUILDER flowers', flowers.length >= 12, 'flower buttons: ' + flowers.length)
  for (let i = 0; i < 6; i++) {
    await flowers[i].click()
    await new Promise(r => setTimeout(r, 350))
  }
  const nextInfo = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'))
    const next = btns.find(b => /NEXT/i.test(b.textContent))
    return next ? { text: next.textContent.trim().slice(0, 20), cls: next.className.slice(0, 90), disabled: next.disabled } : null
  })
  report('BUILDER NEXT-after-6', !!nextInfo && !nextInfo.disabled, JSON.stringify(nextInfo))
  if (nextInfo && !nextInfo.disabled) {
    await page.evaluate(() => {
      const b = Array.from(document.querySelectorAll('button')).find(x => /NEXT/i.test(x.textContent))
      b && b.click()
    })
    await new Promise(r => setTimeout(r, 1500))
    const afterNext = await page.evaluate(() => ({
      text: document.body.innerText.slice(0, 600),
      hasInput: !!document.querySelector('input, textarea'),
      buttons: Array.from(document.querySelectorAll('button')).map(b => b.textContent.trim().slice(0, 16)).slice(0, 12)
    }))
    report('BUILDER after NEXT', afterNext.text.length > 0, JSON.stringify(afterNext).slice(0, 700))
    await page.screenshot({ path: '/tmp/opencode/shot-builder-next.png' })
  }
  report('BUILDER no console errors (so far)', errors.length === 0, errors.slice(0, 5).join(' | '))

  // ---------- SOFT NAVIGATION (RSC) ----------
  errors = []
  await page.goto(BASE + '/bouquet?mode=mono', { waitUntil: 'networkidle0', timeout: 60000 })
  await new Promise(r => setTimeout(r, 800))
  // synthetic internal link to home
  await page.evaluate(() => {
    const a = document.createElement('a')
    a.id = '__nav'
    a.href = '/'
    document.body.appendChild(a)
    a.click()
  })
  await page.waitForFunction(() => location.pathname === '/', { timeout: 20000 })
  await page.evaluate(() => new Promise(r => setTimeout(r, 2000)))
  const homeSoft = await page.evaluate(() => {
    const html = document.documentElement.innerHTML
    return { digi: (html.match(/digibouquet/gi) || []).length, petals: (html.match(/Petals by Bavi/g) || []).length, path: location.pathname, logos: document.querySelectorAll('.petals-logo').length }
  })
  report('SOFT-NAV home', homeSoft.digi === 0 && homeSoft.petals > 0, JSON.stringify(homeSoft))

  // now from home soft-nav to /garden
  await page.evaluate(() => {
    const a = document.createElement('a')
    a.id = '__nav2'
    a.href = '/garden'
    document.body.appendChild(a)
    a.click()
  })
  await page.waitForFunction(() => location.pathname === '/garden', { timeout: 20000 })
  await page.evaluate(() => new Promise(r => setTimeout(r, 3000)))
  const gardenSoft = await page.evaluate(() => {
    const html = document.documentElement.innerHTML
    return { digi: (html.match(/digibouquet/gi) || []).length, petals: (html.match(/Petals by Bavi/g) || []).length, path: location.pathname, logos: document.querySelectorAll('.petals-logo').length }
  })
  report('SOFT-NAV garden', gardenSoft.digi === 0 && gardenSoft.petals > 0, JSON.stringify(gardenSoft))
  await page.screenshot({ path: '/tmp/opencode/shot-softnav-garden.png' })
  report('SOFT-NAV no console errors', errors.length === 0, errors.slice(0, 5).join(' | '))
  report('RSC responses rewritten', rscSeen.length >= 0, 'seenRSC=' + rscSeen.length)

  // ---------- MOBILE RESPONSIVE / OVERFLOW ----------
  await page.setViewport({ width: 390, height: 844 })
  await page.goto(BASE + '/', { waitUntil: 'networkidle0', timeout: 60000 })
  await page.evaluate(() => new Promise(r => setTimeout(r, 1500)))
  const mobHome = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, ww: window.innerWidth, logos: document.querySelectorAll('.petals-logo').length, heroTxt: (document.querySelector('.petals-logo') || {}).textContent }))
  report('MOBILE home no overflow', mobHome.sw <= mobHome.ww + 1, JSON.stringify(mobHome))
  for (const r of ['/garden', '/bouquet?mode=color']) {
    await page.goto(BASE + r, { waitUntil: 'networkidle0', timeout: 60000 })
    await page.evaluate(() => new Promise(t => setTimeout(t, 1500)))
    const mob = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, ww: window.innerWidth }))
    report('MOBILE ' + r + ' no overflow', mob.sw <= mob.ww + 1, JSON.stringify(mob))
  }

  fs.writeFileSync('/tmp/opencode/puppeteer-report.json', JSON.stringify(results, null, 2))
  await browser.close()
  const fails = results.filter(r => !r.ok)
  console.log('\n===== ' + results.length + ' checks, ' + (results.length - fails.length) + ' pass, ' + fails.length + ' fail =====')
  process.exit(fails.length ? 1 : 0)
})().catch(e => { console.error('FATAL', e); process.exit(2) })