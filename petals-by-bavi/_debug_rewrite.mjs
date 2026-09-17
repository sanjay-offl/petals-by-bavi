// Instrument by monkey-patching String.prototype.replace and String.prototype.split
import { readFileSync } from 'node:fs'

const orig = readFileSync('digibouquet.vercel.app/bouquet-186748b7cfda68.html', 'utf8')

// Find the exact location in the original string
const TARGET = '"property":"og:description","content":"Build'
console.log('TARGET found at:', orig.indexOf(TARGET))

// Patch String.prototype to detect when this area changes
const origReplace = String.prototype.replace
const origSplit = String.prototype.split

let callDepth = 0

String.prototype.replace = function(pattern, replacement) {
  const result = origReplace.call(this, pattern, replacement)
  if (this.includes(TARGET) && !result.includes(TARGET)) {
    console.log('REPLACE changed TARGET!')
    console.log('  Pattern:', pattern instanceof RegExp ? pattern.toString().slice(0,100) : JSON.stringify(String(pattern)).slice(0,100))
    console.log('  Stack:', new Error().stack.split('\n').slice(1, 5).join('\n'))
  }
  return result
}

String.prototype.split = function(separator) {
  if (typeof separator === 'string' && this.includes(TARGET)) {
    // Check if this split would split within the TARGET area
    const parts = origSplit.call(this, separator)
    // Try calling join to see if the result would change TARGET
  }
  return origSplit.apply(this, arguments)
}

// Now import and run rewrite
const { rewritePetals } = await import('./rewrite.mjs?' + Date.now())
const out = rewritePetals(orig, {})

// Restore
String.prototype.replace = origReplace
String.prototype.split = origSplit

const origIdx = orig.indexOf(TARGET)
const outIdx = out.indexOf(TARGET)
console.log('TARGET in orig at:', origIdx)
console.log('TARGET in out at:', outIdx, '(should be same or -1 if replaced)')

// Check what the output has at that location
if (outIdx === -1) {
  // Find what's there now
  const marker = '"og:description"'
  const outMarkerIdx = out.indexOf(marker)
  if (outMarkerIdx !== -1) {
    console.log('og:description in out:', JSON.stringify(out.slice(outMarkerIdx - 20, outMarkerIdx + 80)))
  }
}
