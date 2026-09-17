import { rewritePetals } from './rewrite.mjs'
import { readFileSync } from 'node:fs'

function extractFlights(html) {
  // each self.__next_f.push([1, "<...>"]) - the arg is a quoted JS string
  const re = /self\.__next_f\.push\(\[1,\s*"((?:\\.|[^"\\])*)"/g
  const out = []
  let m
  while ((m = re.exec(html))) out.push(m[1])
  return out
}

function parseFlight(str) {
  // unescape the JS string literal into actual chars
  let s = ''
  for (let i = 0; i < str.length; i++) {
    const ch = str[i]
    if (ch === '\\') {
      const n = str[i + 1]
      if (n === undefined) return { ok: false, err: 'trailing backslash' }
      if (n === 'n') s += '\n'
      else if (n === 't') s += '\t'
      else if (n === 'r') s += '\r'
      else s += n
      i++
    } else {
      s += ch
    }
  }
  try {
    JSON.parse(s)
    return { ok: true }
  } catch (e) {
    return { ok: false, err: String(e), chunk: s }
  }
}

const files = [
  ['/tmp/opencode/live_garden.html', {}],
  ['/tmp/opencode/live_privacy-policy.html', {}],
  ['/tmp/opencode/live_bouquet_mode_color.html', {}],
  ['/tmp/opencode/live_bouquet_mode_mono.html', {}],
  ['/tmp/opencode/live_bouquet_b84b4b0d-3076-4eaf-a4ae-9614c82ae59d.html', {}],
  ['/tmp/opencode/fresh-live-home.html', { hero: true }]
]

for (const [f, o] of files) {
  const orig = readFileSync(f, 'utf8')
  const out = rewritePetals(orig, o)
  const ofl = extractFlights(orig)
  const rfl = extractFlights(out)
  let badOrig = 0, badNew = 0, diff = 0
  const origBad = [], newBad = []
  for (const s of ofl) if (!parseFlight(s).ok) { badOrig++; origBad.push(parseFlight(s)) }
  for (const s of rfl) if (!parseFlight(s).ok) { badNew++; newBad.push(parseFlight(s)) }
  console.log((f.split('/').pop()).padEnd(46),
    'flights orig=' + ofl.length, 'rewritten=' + rfl.length,
    '| badOrig=' + badOrig, 'badNew=' + badNew)
}

// now raw RSC style (unescaped) - verify nothing corrupts a raw flight stream
const rawFlight = readFileSync('/home/sanjay/digibouquet.vercel.app/digibouquet.vercel.app/index-75b5dc4b349f48.html', 'utf8')
const rawRt = rewritePetals(rawFlight, { hero: true })
console.log('home raw RSC ok:', rawFlight.length, '->', rawRt.length)