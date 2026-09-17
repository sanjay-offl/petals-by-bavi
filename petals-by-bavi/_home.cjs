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
  const logs = []
  page.on('pageerror', e => logs.push('PAGEERR: ' + String(e).slice(0, 600)))
  page.on('console', m => { if (['error', 'warning'].includes(m.type())) logs.push('CONSOLE[' + m.type() + ']: ' + m.text().slice(0, 400)) })
  page.on('requestfailed', r => logs.push('REQFAIL: ' + r.url().slice(0, 140)))

  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0', timeout: 60000 })
  await page.evaluate(() => new Promise(r => setTimeout(r, 2500)))
  const st = await page.evaluate(() => {
    const q = sel => document.querySelectorAll(sel)
    return {
      title: document.title,
      logos: q('.petals-logo').length,
      heroTexts: Array.from(q('h1,h2,main p')).map(e => e.textContent.trim().slice(0, 60)).filter(Boolean).slice(0, 20),
      bodyStart: document.body.innerHTML.slice(0, 900),
      nextF: (document.getElementById('__next') ? true : false)
    }
  })
  console.log(JSON.stringify(st, null, 2))
  fs.writeFileSync('/tmp/opencode/diag-home-errors.log', logs.join('\n'))
  console.log('LOGS:\n' + logs.join('\n'))
  fs.writeFileSync('/tmp/opencode/diag-home-dom.html', await page.content())
  await browser.close()
})().catch(e => { console.error('FATAL', e); process.exit(2) })