const fromFile = `[\\"$\\",\\"$L14\\",null,{\\"src\\":\\"https://assets.pauwee.com/other/digibouquet.png\\",\\"alt\\":\\"digibouquet\\",\\"width\\":200,\\"height\\":80,\\"className\\":\\"object-cover mx-auto my-10\\",\\"priority\\":true}]`

const K = /\[(\\?)"f\$(\\?)",(\\?)"\$L\d+(\\?)",null,\{(\\?)"src/
const R1 = /\[(\\?)"\$(\\?)"/
const R2 = /,(\\?)"\$L\d+(\\?)",null,\{/
const R3 = /\{(\\?)"src(\\?)":(\\?)"(?:https:(\\?)\/(\\?)\/assets\.pauwee\.com(\\?)\/(\\?)\/other(\\?)\/(\\?)?|\/)?digibouquet\.png(\\?)"/
const R4 = /[^{}]*?\}\]/
const FULL = new RegExp(String.raw`\[(\\?)"\$(\\?)",(\\?)"\$L\d+(\\?)",null,\{(\\?)"src(\\?)":(\\?)"(?:https:(\\?)\/(\\?)\/assets\.pauwee\.com(\\?)\/(\\?)\/other(\\?)\/(\\?)?|\/)?digibouquet\.png(\\?)"[^{}]*?\}\]`, 'g')

console.log('R1', R1.test(fromFile))
console.log('R2-in-rest', R2.test(fromFile.replace(/^(\[\\?"\$\\?)"/,'X').replace(/","/,(M,I,S)=> S.slice(0,I+1))))
console.log('R3', R3.test(fromFile))
console.log('R4', R4.test(fromFile.slice(fromFile.indexOf('digibouquet'))))

// whole rest after key part
const rest = fromFile.slice(fromFile.indexOf('$L14')) // starts $L14",null,{...
FULL.lastIndex = 0
console.log('FULL fromFile', FULL.test(fromFile))

// what about trailing char?
const upToPng = fromFile.slice(0, fromFile.indexOf('digibouquet') + 'digibouquet.png'.length)
console.log('upToPng ok', R3.test(upToPng))

// manually step through element
let pos = 0
const steps = [
  [/\[\\"/, 'open ['], [/"\$\\"/, 'first key'], [/,/,','], [/,*null,/, 'null'], [/\{/, '{'], [/"\\\"src/.source ? /\\"src\\"/,'src'], [/\\"src\\":\\"/,'colon'], [/https:\/\/assets\.pauwee\.com\/other\//,'url base'],
]
console.log('charged char0..2 = ', JSON.stringify(fromFile.slice(0,6)))