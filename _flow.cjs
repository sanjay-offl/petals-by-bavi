const puppeteer = require('/home/sanjay/.npm/_npx/7d92d9a2d2ccc630/node_modules/puppeteer')
const fs = require('fs')

async function runFlow(browser, base, label) {
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 900 })
  const errs = []
  page.on('pageerror', e => errs.push('PAGEERR: ' + String(e).slice(0, 400)))
  page.on('console', m => { if (m.type() === 'error') errs.push('CONSOLE: ' + m.text().slice(0, 300)) })
  page.on('requestfailed', r => { const f = r.failure() || {}; if (!/google|analytics|pagead|googletag|posthog/.test(r.url())) errs.push('REQFAIL: ' + r.url().slice(0,120) + ' ' + f.errorText) })

  await page.goto(base + '/bouquet?mode=color', { waitUntil: 'networkidle0', timeout: 60000 })
  await page.waitForSelector('button.flex.relative.flex-col.items-center', { timeout: 15000 })
  const flowers = await page.$$('button.flex.relative.flex-col.items-center')
  for (let i = 0; i < 6; i++) { await flowers[i].click(); await new Promise(r => setTimeout(r, 350)) }
  await page.evaluate(() => { const b = Array.from(document.querySelectorAll('button')).find(x => /NEXT/i.test(x.textContent)); b && b.click() })
  await new Promise(r => setTimeout(r, 2000))
  const onNext = await page.evaluate(() => document.body.innerText.slice(0, 400))
  fs.writeFileSync('/tmp/opencode/' + label + '-errors.log', errs.join('\n'))
  console.log('[' + label + '] errors=' + errs.length)
  errs.slice(0, 5).forEach(e => console.log('   ', e.slice(0, 180)))
  console.log('[' + label + '] afterNext text:', JSON.stringify(onNext.slice(0, 160)))
  const nextBtn = await page.evaluate(() => { const b = Array.from(document.querySelectorAll('button')).find(x => /NEXT/i.test(x.textContent)); return b ? b.className.slice(0, 60) : null })
  console.log('[' + label + '] nextBtn cls after: ', nextBtn)
  // continue one more NEXT if present
  if (nextBtn && nextBtn.includes('#000000')) {
    await page.evaluate(() => { Array.from(document.querySelectorAll('button')).find(x => /NEXT/i.test(x.textContent)).click() })
    await new Promise(r => setTimeout(r, 2200))
    fs.writeFileSync('/tmp/opencode/' + label + '-step2.log', await page.evaluate(() => document.body.innerText.slice(0, 600)))
    console.log('[' + label + '] step2:', JSON.stringify((await page.evaluate(() => document.body.innerText.slice(0, 200)))))
  }
  errs.slice(0, 5).forEach(e => console.log('   err>', e.slice(0, 200)))
  await page.close()
}

;(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
  })
  await runFlow(browser, 'http://localhost:3000', 'proxy')
  await runFlow(browser, 'https://digibouquet.vercel.app', 'live')
  await browser.close()
})().catch(e => { console.error('FATAL', e); process.exit(2) })