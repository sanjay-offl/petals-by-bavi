import { rewritePetals } from './rewrite.mjs'
import { readFileSync } from 'node:fs'

const files = [
  ['/tmp/opencode/live_garden.html', {}],
  ['/tmp/opencode/live_privacy-policy.html', {}],
  ['/tmp/opencode/live_bouquet_mode_color.html', {}],
  ['/tmp/opencode/live_bouquet_mode_mono.html', {}],
  ['/tmp/opencode/live_bouquet_b84b4b0d-3076-4eaf-a4ae-9614c82ae59d.html', {}],
  ['/tmp/opencode/fresh-live-home.html', { hero: true }]
]
const cnt = (s, re) => (s.match(re) || []).length
for (const [f, o] of files) {
  const orig = readFileSync(f, 'utf8')
  const out = rewritePetals(orig, o)
  console.log(
    f.split('/').pop().padEnd(48),
    'digi', cnt(orig, /digibouquet/gi), '->', cnt(out, /digibouquet/gi),
    '| ssrP', cnt(out, /<p class="petals-logo/g),
    '| flightP', cnt(out, /\\?"\$\\?",\\?"p\\?",null,\{\\?"className\\?":\\?"petals-logo/g),
    '| imgLogo', cnt(out, /<img[^>]*digibouquet/g)
  )
}

const simAbsEsc = String.raw`[\"$\",\"$L14\",null,{\"src\":\"https://assets.pauwee.com/other/digibouquet.png\",\"alt\":\"digibouquet\",\"width\":200,\"height\":80,\"className\":\"object-cover mx-auto my-10\",\"priority\":true}]`
const simRelEsc = String.raw`[\"$\",\"$L7\",null,{\"src\":\"/digibouquet.png\",\"alt\":\"digibouquet\",\"width\":600,\"height\":400,\"className\":\"object-cover mx-auto mb-6\",\"priority\":true}]`
const simUnesc = `["$","$L2",null,{"src":"/digibouquet.png","alt":"digibouquet","width":600,"height":400,"className":"object-cover mx-auto","priority":true}]`
console.log('\n--- sims ---')
console.log('esc abs :', rewritePetals(simAbsEsc, {}))
console.log('esc rel :', rewritePetals(simRelEsc, { hero: true }))
console.log('unesc   :', rewritePetals(simUnesc, { hero: true }))