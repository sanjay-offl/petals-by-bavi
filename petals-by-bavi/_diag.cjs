const puppeteer = require('/home/sanjay/.npm/_npx/7d92d9a2d2ccc630/node_modules/puppeteer')
const fs = require('fs')

;(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
  })
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 900 })
  const rscBodies = []
  page.on('response', async res => {
    const ct = (res.headers()['content-type'] || '').toLowerCase()
    if (ct.includes('text/x-component')) {
      const body = await res.text().catch(() => '')
      rscBodies.push({ url: res.url().slice(0, 160), status: res.status(), len: body.length, body })
    }
  })
  page.on('pageerror', e => fs.appendFileSync('/tmp/opencode/diag-errors.log', 'PAGEERROR: ' + String(e).slice(0, 1000) + '\n\n'))
  page.on('console', m => { if (m.type() === 'error') fs.appendFileSync('/tmp/opencode/diag-errors.log', 'CONSOLE ' + m.text().slice(0, 500) + '\n\n') })

  await page.goto('http://localhost:3000/bouquet?mode=color', { waitUntil: 'networkidle0', timeout: 60000 })
  await page.waitForSelector('button.flex.relative.flex-col.items-center', { timeout: 15000 })
  const flowers = await page.$$('button.flex.relative.flex-col.items-center')
  for (let i = 0; i < 6; i++) { await flowers[i].click(); await new Promise(r => setTimeout(r, 350)) }
  await page.evaluate(() => {
    const b = Array.from(document.querySelectorAll('button')).find(x => /NEXT/i.test(x.textContent))
    b && b.click()
  })
  await new Promise(r => setTimeout(r, 2500))
  console.log('RSC bodies captured: ' + rscBodies.length)
  fs.writeFileSync('/tmp/opencode/diag-rsc.json', JSON.stringify(rscBodies, (k, v) => typeof v === 'string' && v.length > 400 ? v.slice(0, 200) + '...[truncated]' : v, 2))
  // find INSTAGRAM in any body
  for (const b of rscBodies) {
    const i = b.body.indexOf('INSTAGRAM')
    if (i >= 0) {
      console.log('FOUND INSTAGRAM in ' + b.url)
      fs.writeFileSync('/tmp/opencode/diag-rsc-fragment.txt', b.body.slice(Math.max(0, i - 500), i + 500))
    }
  }
  await browser.close()
})().catch(e => { console.error('FATAL', e); process.exit(2) })