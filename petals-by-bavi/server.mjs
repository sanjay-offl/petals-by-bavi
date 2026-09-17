import http from 'node:http'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { rewritePetals, shouldRewrite } from './rewrite.mjs'

const BASE_DIR = new URL('.', import.meta.url).pathname
const HOST = '127.0.0.1'
const PORT = 3000
const ROOT = path.join(BASE_DIR, 'digibouquet.vercel.app')
const UPSTREAM = 'https://digibouquet.vercel.app'

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.txt': 'text/plain; charset=utf-8',
  '.p': 'font/woff2'
}

const HOP_BY_HOP = new Set([
  'connection', 'keep-alive', 'proxy-authenticate', 'proxy-authorization',
  'te', 'trailers', 'transfer-encoding', 'upgrade',
  'content-length', 'content-encoding'
])

function isRscRequest(reqUrl, headers) {
  if (reqUrl.searchParams.has('_rsc')) return true
  const accept = headers['accept'] || ''
  return accept.includes('text/x-component')
}

async function serveLocal(res, filePath) {
  let data
  try {
    data = await fs.readFile(filePath)
  } catch {
    return false
  }
  const ext = path.extname(filePath).toLowerCase()
  res.writeHead(200, {
    'Content-Type': MIME[ext] || 'application/octet-stream',
    'Content-Length': data.length
  })
  res.end(data)
  return true
}

function copyHeaders(upstreamRes, res) {
  const headers = {}
  for (const [k, v] of upstreamRes.headers) {
    if (!HOP_BY_HOP.has(k.toLowerCase())) headers[k] = v
  }
  if (!res.headersSent) res.writeHead(upstreamRes.status, headers)
  return headers
}

async function readRequestBody(req) {
  const chunks = []
  for await (const c of req) chunks.push(c)
  return Buffer.concat(chunks)
}

async function proxy(req, res) {
  const url = new URL(req.url, UPSTREAM)
  const body = req.method !== 'GET' && req.method !== 'HEAD'
    ? await readRequestBody(req)
    : undefined
  let upstreamRes
  try {
    upstreamRes = await fetch(url, {
      method: req.method,
      headers: req.headers,
      redirect: 'manual',
      cache: 'no-store',
      body
    })
  } catch (err) {
    res.writeHead(502, { 'Content-Type': 'text/plain' })
    res.end('Proxy error: ' + err.message)
    return
  }
  copyHeaders(upstreamRes, res)

  if (req.method === 'HEAD' || !upstreamRes.body) {
    res.end()
    return
  }

  const ct = upstreamRes.headers.get('content-type') || ''
  const rewrite = shouldRewrite(ct) && upstreamRes.status !== 204
  if (!rewrite) {
    try {
      for await (const chunk of upstreamRes.body) res.write(chunk)
    } catch { /* client disconnected */ }
    res.end()
    return
  }

  let buf = ''
  const parts = []
  for await (const chunk of upstreamRes.body) parts.push(chunk)
  buf = Buffer.concat(parts).toString('utf8')
  const reqUrl = new URL(req.url, `http://${HOST}:${PORT}`)
  const out = rewritePetals(buf, {
    hero: reqUrl.pathname === '/',
    html: ct.includes('text/html'),
    rsc: ct.includes('text/x-component')
  })
  res.end(out)
}

async function servePetalsImage(req, res, pathname) {
  const imgPath = pathname.replace(/^\/__petals\/img\/?/, '')
  if (!imgPath || /[?#]/.test(imgPath)) {
    res.writeHead(400, { 'Content-Type': 'text/plain' })
    res.end('bad request')
    return
  }
  const upstream = 'https://assets.pauwee.com/' + imgPath
  try {
    const r = await fetch(upstream, { headers: { accept: req.headers['accept'] || '*/*' }, cache: 'no-store' })
    if (!r.ok) {
      res.writeHead(r.status, { 'Content-Type': 'text/plain' })
      res.end('upstream error')
      return
    }
    const ct = r.headers.get('content-type') || 'application/octet-stream'
    res.writeHead(200, {
      'Content-Type': ct,
      'Cache-Control': 'public, max-age=86400',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD',
      'Access-Control-Allow-Headers': '*'
    })
    for await (const chunk of r.body) res.write(chunk)
    res.end()
  } catch (err) {
    res.writeHead(502, { 'Content-Type': 'text/plain' })
    res.end('image proxy error: ' + err.message)
  }
}

const handler = async (req, res) => {
  try {
    const reqUrl = new URL(req.url, `http://${HOST}:${PORT}`)
    const isRsc = isRscRequest(reqUrl, req.headers)
    const pathname = decodeURIComponent(reqUrl.pathname)

    let localPath = null
    if (!isRsc) {
      if (pathname === '/' || pathname === '') {
        localPath = path.join(ROOT, 'index.html')
      } else if (pathname.startsWith('/_next/')) {
        localPath = path.join(ROOT, pathname)
      } else if (pathname.startsWith('/favicon')) {
        localPath = path.join(ROOT, pathname.slice(1))
      } else if (pathname.startsWith('/__petals/')) {
        if (pathname.startsWith('/__petals/img/')) {
          await servePetalsImage(req, res, pathname)
          return
        }
        const filename = pathname.slice('/__petals/'.length)
        localPath = path.join(BASE_DIR, 'digibouquet.vercel.app', '__petals', filename)
      } else if (pathname === '/og-petals.png') {
        localPath = path.join(ROOT, 'og-petals.png')
      } else if (pathname === '/fav-icon.png') {
        localPath = path.join(ROOT, 'fav-icon.png')
      } else if (pathname === '/meta-tag.jpeg') {
        localPath = path.join(ROOT, 'meta-tag.jpeg')
      }
    }

    if (localPath) {
      if (path.extname(localPath) === '.html') {
        const data = await fs.readFile(localPath).catch(() => null)
        if (data) {
          const out = rewritePetals(String(data), { hero: pathname === '/', html: true })
          res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8',
            'Content-Length': Buffer.byteLength(out)
          })
          res.end(out)
          return
        }
      } else if (pathname.startsWith('/__petals/')) {
        const ext = path.extname(localPath).toLowerCase()
        const PETALS_CT = { '.css': 'text/css', '.js': 'application/javascript' }
        const petalsData = await fs.readFile(localPath).catch(() => null)
        if (petalsData) {
          res.writeHead(200, {
            'Content-Type': PETALS_CT[ext] || MIME[ext] || 'application/octet-stream',
            'Content-Length': petalsData.length
          })
          res.end(petalsData)
          return
        }
      } else if (await serveLocal(res, localPath)) {
        return
      }
    }
    await proxy(req, res)
  } catch (err) {
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'text/plain' })
      res.end('Server error: ' + err.message)
    } else {
      res.end()
    }
  }
}

const server = http.createServer(handler)

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  server.listen(PORT, HOST, () => {
    console.log(`Petals by Bavi serving at http://localhost:${PORT}`)
    console.log(`root: ${ROOT}`)
    console.log(`upstream (rebranded): ${UPSTREAM}`)
  })
}

export default handler