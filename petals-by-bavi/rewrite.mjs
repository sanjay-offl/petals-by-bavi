export const SITE_NAME = 'Petals by Bavi'
export const TAGLINE = 'Soft stems & fuzzy blooms'
export const DESCRIPTION = 'Real floral bouquets & handmade pipe cleaner crafts and anti-tarnish jewellery.'
export const ORDER_LINE = 'Instagram @petals_by_bavi · WhatsApp 8883537574 · DM to order'
export const INSTAGRAM_URL = 'https://www.instagram.com/petals_by_bavi/'
export const WHATSAPP_URL = 'https://wa.me/918883537574'

export const HOME_LOGO_CLASS = 'petals-logo text-4xl md:text-6xl lg:text-7xl my-6 mx-auto leading-none'
export const NAV_LOGO_CLASS = 'petals-logo petals-logo-nav text-center'

const META_IMAGE = '/meta-tag.jpeg'
const OG_IMAGE_OLD = 'https://assets.pauwee.com/other/metapreview.png'

// ---- head metadata (favicon + social meta) ----
const ICON_RE = /<link\b[^>]*\brel="(?:icon|shortcut icon)"[^>]*>/gi
const ICON_NEW = '<link rel="icon" href="/fav-icon.png"/>'

const TITLE_OLD = '<title>Petals by Bavi — send a digital flower bouquet</title>'
const TITLE_NEW = '<title>Petals by Bavi | Soft stems &amp; fuzzy blooms</title>'

const DESC_RE = /<meta name="description" content="Build a beautiful digital flower bouquet and send it to someone you love\. Choose from roses, peonies, sunflowers, and more[^"]*"\/>/g
const DESC_NEW = '<meta name="description" content="Real floral bouquets, handmade pipe cleaner crafts, and anti-tarnish jewellery by Petals by Bavi."/>'

const OG_TITLE_OLD = '<meta property="og:title" content="Petals by Bavi — send a digital flower bouquet"/>'
const OG_TITLE_NEW = '<meta property="og:title" content="Petals by Bavi | Soft stems &amp; fuzzy blooms"/>'

const OG_DESC_RE = /<meta property="og:description" content="Build a beautiful digital flower bouquet and send it to someone you love\. Choose from roses, peonies, sunflowers, and more[^"]*"\/>/g
const OG_DESC_NEW = '<meta property="og:description" content="Create and share beautiful digital bouquets with Petals by Bavi."/>'

const OG_IMAGE_ALT = '<meta property="og:image:alt" content="Petals by Bavi — Soft stems &amp; fuzzy blooms"/>'

const TW_TITLE_OLD = '<meta name="twitter:title" content="Petals by Bavi — send a digital flower bouquet"/>'
const TW_TITLE_NEW = '<meta name="twitter:title" content="Petals by Bavi | Soft stems &amp; fuzzy blooms"/>'

const TW_DESC_RE = /<meta name="twitter:description" content="Build a beautiful digital flower bouquet and send it to someone you love\. Choose from roses, peonies, sunflowers, and more[^"]*"\/>/g
const TW_DESC_NEW = '<meta name="twitter:description" content="Create and share beautiful digital bouquets with Petals by Bavi."/>'

const SHARE_LINK_TAG = '<link rel="stylesheet" href="/__petals/petals-share.css"/>'
const SHARE_SCRIPT_TAG = '<script src="/__petals/petals-share.js" defer></script>'

const PRELOAD_IMG_RE = /<link\b(?=[^>]*\brel="preload")[^>]*digibouquet\.png[^>]*>/gi
const SSR_LOGO_RE = /(?:<a\b([^>]*)>\s*)?(<img\b[^>]*digibouquet\.png[^>]*>)\s*(?:<\/a>)?/gi

const FLIGHT_NEEDLES = [
  { esc: true, pre: 'null,{\\"src\\":\\"https://assets.pauwee.com/other/digibouquet.png' },
  { esc: true, pre: 'null,{\\"src\\":\\"/digibouquet.png' },
  { esc: false, pre: 'null,{"src":"https://assets.pauwee.com/other/digibouquet.png' },
  { esc: false, pre: 'null,{"src":"/digibouquet.png' }
]

// ---- brand variants (full tokens only — never bare "digi" which would corrupt "digital") ----
const BRAND_VARIANTS = [
  ['DigiBouquet', SITE_NAME],
  ['digiBouquet', SITE_NAME],
  ['DIGIBOUQUET', SITE_NAME],
  ['Digi bouquet', SITE_NAME],
  ['Digi Bouquet', SITE_NAME],
  ['DIGI BOUQUET', SITE_NAME],
  ['Digibouquet', SITE_NAME],
  ['digibouquet', SITE_NAME]
]

// ---- hero (homepage) content rewrite ----
// Escaped flight form and unescaped (raw RSC) form needles.

const HOME_TAGLINE_OLD_ESC = '[\\"$\\",\\"p\\",null,{\\"className\\":\\"my-6 text-sm md:mb-6 md:-mt-6\\",\\"children\\":[\\"beautiful flowers \\",[\\"$\\",\\"br\\",null,{}],\\" delivered digitally\\"]}]'
const HOME_TAGLINE_OLD = '["$","p",null,{"className":"my-6 text-sm md:mb-6 md:-mt-6","children":["beautiful flowers ",["$","br",null,{}]," delivered digitally"]}]'
// tagline + description, inserted in place of the tagline (both flight variants use plain "&")
const HOME_TAGLINE_NEW_ESC =
  '[\\"$\\",\\"p\\",null,{\\"className\\":\\"mt-3 md:mt-4 text-sm\\",\\"children\\":\\"Soft stems & fuzzy blooms\\"}],' +
  '[\\"$\\",\\"p\\",null,{\\"className\\":\\"mt-2 mb-2 text-xs opacity-75\\",\\"children\\":\\"Real floral bouquets & handmade pipe cleaner crafts and anti-tarnish jewellery.\\"}]'
const HOME_TAGLINE_NEW =
  '["$","p",null,{"className":"mt-3 md:mt-4 text-sm","children":"Soft stems & fuzzy blooms"}],' +
  '["$","p",null,{"className":"mt-2 mb-2 text-xs opacity-75","children":"Real floral bouquets & handmade pipe cleaner crafts and anti-tarnish jewellery."}]'

const HOME_FOOTER_RE_ESC = /\[\\"\$\\",\\"p\\",null,\{\\"className\\":\\"mt-10 text-sm text-gray-500\\",\\"children\\":\[\\"made by\\",\\" \\",\[\\"\\$\\",\\"\\$L\d+\\",null,\{\\"href\\":\\"https:\/\/x\.com\/pauline_makes\\"[^}]*\}\}\]\]\}\]/g
const HOME_FOOTER_RE = /\["\$","p",null,\{"className":"mt-10 text-sm text-gray-500","children":\["made by"," ",\["\$","\$L\d+",null,\{"href":"https:\/\/x\.com\/pauline_makes"[^}]*\}\}\]\]\}\]/g
const HOME_FOOTER_NEW_ESC = '[\\"$\\",\\"div\\",null,{\\"className\\":\\"mt-8 flex flex-col items-center gap-3 text-xs text-gray-500\\",\\"children\\":[[\\"$\\",\\"p\\",null,{\\"children\\":\\"DM to order\\"}],[\\"$\\",\\"div\\",null,{\\"className\\":\\"flex flex-wrap justify-center gap-2\\",\\"children\\":[[\\"$\\",\\"a\\",null,{\\"href\\":\\"' + INSTAGRAM_URL + '\\",\\"target\\":\\"_blank\\",\\"rel\\":\\"noopener noreferrer\\",\\"className\\":\\"border border-black bg-black px-4 py-2 text-xs text-white transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2\\",\\"children\\":\\"FOLLOW US ON INSTAGRAM\\"}],[\\"$\\",\\"a\\",null,{\\"href\\":\\"' + WHATSAPP_URL + '\\",\\"target\\":\\"_blank\\",\\"rel\\":\\"noopener noreferrer\\",\\"className\\":\\"border border-black px-4 py-2 text-xs text-black transition-colors hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2\\",\\"children\\":\\"ORDER ON WHATSAPP\\"}]]}]]}]'
const HOME_FOOTER_NEW = '["$","div",null,{"className":"mt-8 flex flex-col items-center gap-3 text-xs text-gray-500","children":[["$","p",null,{"children":"DM to order"}],["$","div",null,{"className":"flex flex-wrap justify-center gap-2","children":[["$","a",null,{"href":"' + INSTAGRAM_URL + '","target":"_blank","rel":"noopener noreferrer","className":"border border-black bg-black px-4 py-2 text-xs text-white transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2","children":"FOLLOW US ON INSTAGRAM"}],["$","a",null,{"href":"' + WHATSAPP_URL + '","target":"_blank","rel":"noopener noreferrer","className":"border border-black px-4 py-2 text-xs text-black transition-colors hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2","children":"ORDER ON WHATSAPP"}]]}]]}]'

// SSR form of the hero tagline + footer (used if the home page is ever proxied).
const HOME_TAGLINE_SSR_OLD = '<p class="my-6 text-sm md:mb-6 md:-mt-6">beautiful flowers <br/> delivered digitally</p>'
const HOME_TAGLINE_SSR_NEW =
  '<p class="mt-3 md:mt-4 text-sm">Soft stems &amp; fuzzy blooms</p>' +
  '<p class="mt-2 mb-2 text-xs opacity-75">Real floral bouquets &amp; handmade pipe cleaner crafts and anti-tarnish jewellery.</p>'
const HOME_FOOTER_SSR_OLD = '<p class="mt-10 text-sm text-gray-500">made by<!-- --> <a class="mt-2 text-sm text-gray-500 underline" href="https://x.com/pauline_makes">@pauline_makes</a></p>'
const HOME_FOOTER_SSR_NEW =
  '<div class="mt-8 flex flex-col items-center gap-3 text-xs text-gray-500">' +
  '<p>DM to order</p>' +
  '<div class="flex flex-wrap justify-center gap-2">' +
  '<a class="border border-black bg-black px-4 py-2 text-xs text-white transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2" href="' + INSTAGRAM_URL + '" target="_blank" rel="noopener noreferrer">FOLLOW US ON INSTAGRAM</a>' +
  '<a class="border border-black px-4 py-2 text-xs text-black transition-colors hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2" href="' + WHATSAPP_URL + '" target="_blank" rel="noopener noreferrer">ORDER ON WHATSAPP</a>' +
  '</div></div>'
const HOME_FOOTER_SSR_CURRENT =
  '<p class="mt-8 text-xs text-gray-500">Instagram @petals_by_bavi · WhatsApp 8883537574 · DM to order</p>'
const HOME_FOOTER_CURRENT_ESC = '[\\"$\\",\\"p\\",null,{\\"className\\":\\"mt-8 text-xs text-gray-500\\",\\"children\\":\\"Instagram @petals_by_bavi · WhatsApp 8883537574 · DM to order\\"}]'
const HOME_FOOTER_CURRENT = '["$","p",null,{"className":"mt-8 text-xs text-gray-500","children":"Instagram @petals_by_bavi · WhatsApp 8883537574 · DM to order"}]'

// ---- shared-bouquet footer: remove "a tool by @pauline_makes" ----
const [ID_FOOTER_SSR_OLD] = ['<p class="text-sm text-black">made with Petals by Bavi, a tool by']
const ID_FOOTER_SSR_RE = /<p class="text-sm text-black">made with Petals by Bavi, a tool by[\s\S]*?<\/p>/i
const ID_FOOTER_SSR_NEW = '<p class="text-sm text-black">made with Petals by Bavi</p>'

// ---- privacy policy rewrite ----
const PRIVACY_TRIGGER = 'Last updated: August 25, 2025'

const PRIVACY_SSR_PATTERNS = [
  // plain-text paragraphs (same text in flight, so one needle works for both)
  ['Last updated: August 25, 2025', 'Last updated: September 17, 2026'],
  [
    'Petals by Bavi is a free website for creating and sharing digital flower bouquets. This Privacy Policy explains what information we collect, how we use it, and your choices.',
    'Petals by Bavi is a digital platform for creating and sharing digital flower bouquets. This Privacy Policy explains what information may be collected when you use the website, how that information is used, and your available choices.'
  ],
  [
    'We do not sell, rent, or trade your personal information to third parties for marketing or other commercial purposes.',
    'We do not sell, rent, or trade your personal information to third parties.'
  ],
  [
    'Petals by Bavi does not require an account. When you use the site, the following information may be collected or stored:',
    'Petals by Bavi does not require users to create an account to create or share digital bouquets. Depending on how you use the website, the following information may be collected or stored:'
  ],
  [
    '<strong>Bouquet content.</strong> When you create and share a bouquet, we store the bouquet design (flowers, card message, and related settings) so it can be accessed via its link. We do not require your name, email address, or other contact information to use the site.',
    '<strong>Bouquet content.</strong> When you create and share a bouquet, the bouquet design, selected flowers, card message, and related settings may be stored so that the bouquet can be accessed through its sharing link. Avoid including personal or sensitive information in publicly shared bouquets.'
  ],
  [
    '<strong>Usage analytics.</strong> We use Google Analytics to collect information about how the site is used, such as pages visited and general traffic patterns. Google may collect information such as your IP address, browser type, and device type in accordance with its privacy policies.',
    '<strong>Usage information.</strong> If analytics tools are enabled, they may collect general information about website usage, such as pages visited, browser type, device type, and general traffic patterns.'
  ],
  [
    'This site uses cookies and similar technologies. Analytics and advertising partners may set cookies in your browser. You can manage or delete cookies through your browser settings.',
    'You can manage or delete cookies through your browser settings. If you disable cookies, some features may not work as expected.'
  ],
  [
    'We use third-party services to operate Petals by Bavi, including hosting, database storage (Supabase), Google Analytics, and Google AdSense. These providers process data on our behalf. Each provider has its own privacy policy that governs how it handles data.',
    'The website may use third-party services for hosting, database storage, analytics, or other necessary functionality. These services may process information according to their own privacy policies.'
  ],
  [
    'Bouquets you create and share are accessible to anyone with the link. Some bouquets may also appear in our public garden. Please do not include personal or sensitive information in bouquet content that you do not wish to be publicly visible.',
    'Bouquets shared through public links may be accessible to anyone who has the link. Some bouquets may also appear in the public garden, depending on the website\'s functionality. Please avoid including personal or sensitive information in bouquet content that you do not want to share publicly.'
  ],
  [
    'Petals by Bavi is not directed at children under 13, and we do not knowingly collect personal information from children.',
    'The website is not intentionally directed at children under 13, and we do not knowingly collect personal information from children.'
  ],
  [
    'We may update this policy from time to time. Changes will be reflected by updating the date at the top of this page.',
    'This Privacy Policy may be updated from time to time. Any changes will be reflected by updating the date shown at the top of this page.'
  ]
]

// The <strong>-prefixed patterns above only match the SSR HTML (the same
// paragraphs render in flight payloads as React elements, without the tag), so
// the flight copies would keep the old text and hydration would fail with
// React error #418. These plain-text pairs hit the text in BOTH the SSR HTML
// and the flight payloads (labels are consumed from SSR first, so they only
// rewrite the flight side).
const PRIVACY_FLIGHT_PATTERNS = [
  ['Usage analytics.', 'Usage information.'],
  [
    ' We use Google Analytics to collect information about how the site is used, such as pages visited and general traffic patterns. Google may collect information such as your IP address, browser type, and device type in accordance with its privacy policies.',
    ' If analytics tools are enabled, they may collect general information about website usage, such as pages visited, browser type, device type, and general traffic patterns.'
  ],
  [
    ' When you create and share a bouquet, we store the bouquet design (flowers, card message, and related settings) so it can be accessed via its link. We do not require your name, email address, or other contact information to use the site.',
    ' When you create and share a bouquet, the bouquet design, selected flowers, card message, and related settings may be stored so that the bouquet can be accessed through its sharing link. Avoid including personal or sensitive information in publicly shared bouquets.'
  ]
]

// li3 "Advertising" — appears differently in SSR (with <a>) and in flight as the "9:" resolution.
const PRIVACY_LI_SSR_RE = /<li><strong>Advertising\.<\/strong>[\s\S]*?<\/li>/i
const PRIVACY_LI_SSR_NEW =
  '<li><strong>Cookies.</strong> The website may use cookies or similar technologies for functionality, analytics, or other enabled third-party services. You can manage or delete cookies through your browser settings.</li>'

const PRIVACY_LI_FLIGHT_OLD_ESC =
  '9:[\\"$\\",\\"li\\",null,{\\"children\\":[[\\"$\\",\\"strong\\",null,{\\"children\\":\\"Advertising.\\"}],\\" We use Google AdSense to display advertisements. Google and its partners may use cookies and similar technologies to serve ads based on your visits to this site and other websites. For more information, see\\",\\" \\",[\\"$\\",\\"a\\",null,{\\"href\\":\\"https://policies.google.com/technologies/partner-sites\\",\\"className\\":\\"underline\\",\\"target\\":\\"_blank\\",\\"rel\\":\\"noopener noreferrer\\",\\"children\\":\\"Google\'s partner sites policy\\"}],\\".\\"]}]'
const PRIVACY_LI_FLIGHT_OLD =
  '9:["$","li",null,{"children":[["$","strong",null,{"children":"Advertising."}]," We use Google AdSense to display advertisements. Google and its partners may use cookies and similar technologies to serve ads based on your visits to this site and other websites. For more information, see"," ",["$","a",null,{"href":"https://policies.google.com/technologies/partner-sites","className":"underline","target":"_blank","rel":"noopener noreferrer","children":"Google\'s partner sites policy"}],"."]}'
const PRIVACY_LI_FLIGHT_NEW_ESC =
  '9:[\\"$\\",\\"li\\",null,{\\"children\\":[[\\"$\\",\\"strong\\",null,{\\"children\\":\\"Cookies.\\"}],\\" The website may use cookies or similar technologies for functionality, analytics, or other enabled third-party services. You can manage or delete cookies through your browser settings.\\"]}]'
const PRIVACY_LI_FLIGHT_NEW =
  '9:["$","li",null,{"children":[["$","strong",null,{"children":"Cookies."}]," The website may use cookies or similar technologies for functionality, analytics, or other enabled third-party services. You can manage or delete cookies through your browser settings."]}'

// Contact section — remove pauline + pauwee links; replace with static text in both forms.
const PRIVACY_CONTACT_SSR_RE = /<p>If you have questions about this policy, you can contact us via[\s\S]*?<\/p>/i
const PRIVACY_CONTACT_SSR_NEW =
  '<p>If you have questions about this policy, contact Petals by Bavi via <a class="underline" href="' + INSTAGRAM_URL + '" target="_blank" rel="noopener noreferrer">@petals_by_bavi</a>.</p>'

const PRIVACY_CONTACT_FLIGHT_OLD_ESC =
  '[\\"$\\",\\"p\\",null,{\\"children\\":[\\"If you have questions about this policy, you can contact us via\\",\\" \\",[\\"$\\",\\"a\\",null,{\\"href\\":\\"https://x.com/pauline_makes\\",\\"className\\":\\"underline\\",\\"target\\":\\"_blank\\",\\"rel\\":\\"noopener noreferrer\\",\\"children\\":\\"@pauline_makes\\"}],\\" \\",\\"or at\\",\\" \\",[\\"$\\",\\"a\\",null,{\\"href\\":\\"https://pauwee.com\\",\\"className\\":\\"underline\\",\\"target\\":\\"_blank\\",\\"rel\\":\\"noopener noreferrer\\",\\"children\\":\\"pauwee.com\\"}],\\".\\"]}'
const PRIVACY_CONTACT_FLIGHT_OLD =
  '["$","p",null,{"children":["If you have questions about this policy, you can contact us via"," ",["$","a",null,{"href":"https://x.com/pauline_makes","className":"underline","target":"_blank","rel":"noopener noreferrer","children":"@pauline_makes"}]," ","or at"," ",["$","a",null,{"href":"https://pauwee.com","className":"underline","target":"_blank","rel":"noopener noreferrer","children":"pauwee.com"}],"."}'
const PRIVACY_CONTACT_FLIGHT_OLD_H2_ESC =
  '[\\"$\\",\\"h2\\",null,{\\"className\\":\\"mb-2 font-bold uppercase\\",\\"children\\":\\"Contact\\"}],'
const PRIVACY_CONTACT_FLIGHT_CURRENT_ESC =
  '[\\"$\\",\\"p\\",null,{\\"children\\":[\\"If you have questions about this policy, you can contact us via\\",\\" \\",[\\"$\\",\\"a\\",null,{\\"href\\":\\"' + INSTAGRAM_URL + '\\",\\"className\\":\\"underline\\",\\"target\\":\\"_blank\\",\\"rel\\":\\"noopener noreferrer\\",\\"children\\":\\"@petals_by_bavi\\"}],\\" \\",\\"or at\\",\\" \\",[\\"$\\",\\"a\\",null,{\\"href\\":\\"' + INSTAGRAM_URL + '\\",\\"className\\":\\"underline\\",\\"target\\":\\"_blank\\",\\"rel\\":\\"noopener noreferrer\\",\\"children\\":\\"pauwee.com\\"}],\\".\\"]}]'
const PRIVACY_CONTACT_FLIGHT_CURRENT =
  '["$","p",null,{"children":["If you have questions about this policy, you can contact us via"," ",["$","a",null,{"href":"' + INSTAGRAM_URL + '","className":"underline","target":"_blank","rel":"noopener noreferrer","children":"@petals_by_bavi"}]," ","or at"," ",["$","a",null,{"href":"' + INSTAGRAM_URL + '","className":"underline","target":"_blank","rel":"noopener noreferrer","children":"pauwee.com"}],"."]}]'
const PRIVACY_CONTACT_FLIGHT_NEW =
  '["$","p",null,{"children":["If you have questions about this policy, contact Petals by Bavi via ",["$","a",null,{"href":"' + INSTAGRAM_URL + '","className":"underline","target":"_blank","rel":"noopener noreferrer","children":"@petals_by_bavi"}],"."]}]'
const PRIVACY_CONTACT_FLIGHT_NEW_ESC = PRIVACY_CONTACT_FLIGHT_NEW.replace(/"/g, '\\"')

// privacy page title (in <head> of SSR and the flight metadata) stays "privacy policy — Petals by Bavi".

function marginTokensFromImgTag(imgTag) {
  const m = /\bclass="([^"]*)"/i.exec(imgTag)
  if (!m) return ''
  const tokens = (m[1].match(/(^|\s)(mt|mb|my|mx)-[^\s]+/g) || []).map(t => t.trim())
  return tokens.join(' ')
}

function escapeForRSC(html, escapeLevel) {
  if (escapeLevel === 0) return html
  if (escapeLevel === 1) return html.replace(/"/g, '\\"')
  if (escapeLevel === 2) return html.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
  return html
}

function newElement(logoClass, escaped) {
  const raw = '["$","p",null,{"className":"' + logoClass + '","children":"' + SITE_NAME + '"}]'
  return escapeForRSC(raw, escaped ? 1 : 0)
}

function spliceFlightLogos(s, logoClass) {
  let out = s
  for (const { esc, pre } of FLIGHT_NEEDLES) {
    const keyStart = esc ? '[\\"$\\"' : '["$"'
    while (true) {
      const i = out.indexOf(pre)
      if (i === -1) break
      const start = out.lastIndexOf(keyStart, i)
      if (start === -1) break
      const pngEnd = out.indexOf('digibouquet.png', i)
      const end = out.indexOf('}]', pngEnd + 'digibouquet.png'.length)
      if (end === -1) break
      const repl = newElement(logoClass, esc)
      out = out.slice(0, start) + repl + out.slice(end + 2)
    }
  }
  return out
}

// Escaping levels seen in RSC payloads: raw (0), HTML-embedded (1), double (2).
function escVariant(raw, level) {
  let out = raw
  for (let i = 0; i < level; i++) out = out.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
  return out
}

// Replace an RSC element node that renders a footer phrase. Tolerates the varying
// client-component ref id ($Lx) and the payload's escaping level. All arguments are
// the plain, unescaped strings (rawNew may itself be raw or escaped).
function replaceFooterNode(s, className, phrase, rawNew) {
  let out = s
  for (let level = 0; level <= 2; level++) {
    const prefix = escVariant('"className":"' + className + '","children":["' + phrase, level)
    const handle = escVariant('"children":"@pauline_makes"', level)
    const nodeHead = escVariant('["$","p",null,', level)
    const repl = escVariant(rawNew, level)
    let search = 0
    while (true) {
      const idx = out.indexOf(prefix, search)
      if (idx === -1) break
      const fullNode = out.slice(Math.max(0, idx - nodeHead.length), idx) === nodeHead
      const start = fullNode ? idx - nodeHead.length : idx - 1
      const hIdx = out.indexOf(handle, idx)
      if (hIdx === -1) { search = idx + prefix.length; continue }
      const end = hIdx + handle.length + (fullNode ? 5 : 4)
      out = out.slice(0, start) + repl + out.slice(end)
      search = start + repl.length
    }
  }
  return out
}

function spliceHomeHero(s) {
  let out = s
  // tagline (escaped + unescaped flight form)
  while (true) {
    const i = out.indexOf(HOME_TAGLINE_OLD_ESC)
    if (i === -1) break
    out = out.slice(0, i) + HOME_TAGLINE_NEW_ESC + out.slice(i + HOME_TAGLINE_OLD_ESC.length)
  }
  while (true) {
    const i = out.indexOf(HOME_TAGLINE_OLD)
    if (i === -1) break
    out = out.slice(0, i) + HOME_TAGLINE_NEW + out.slice(i + HOME_TAGLINE_OLD.length)
  }
  // tagline (SSR form)
  out = out.split(HOME_TAGLINE_SSR_OLD).join(HOME_TAGLINE_SSR_NEW)
  // footer (flight). Ref id ($Lx) and escaping vary, so use the anchor scanner.
  out = replaceFooterNode(out, 'mt-10 text-sm text-gray-500', 'made by', HOME_FOOTER_NEW)
  // footer (SSR form)
  out = out.split(HOME_FOOTER_SSR_OLD).join(HOME_FOOTER_SSR_NEW)
  out = out.split(HOME_FOOTER_SSR_CURRENT).join(HOME_FOOTER_SSR_NEW)
  out = out.split(HOME_FOOTER_CURRENT_ESC).join(HOME_FOOTER_NEW_ESC)
  out = out.split(HOME_FOOTER_CURRENT).join(HOME_FOOTER_NEW)
  // safety: any leftover bare "@pauline_makes" visible text or x.com links on the home page
  out = out.split('>@pauline_makes<').join('>@petals_by_bavi<')
  out = out.split('x.com/pauline_makes').join(INSTAGRAM_URL)
  return out
}

function removeOwnerMarkup(s) {
  let out = s
  // shared-bouquet footer (SSR form)
  out = out.replace(ID_FOOTER_SSR_RE, ID_FOOTER_SSR_NEW)
  // shared-bouquet footer (flight). Ref id ($Lx) and escaping vary, so use the anchor scanner.
  out = replaceFooterNode(out, 'text-sm text-black', 'made with Petals by Bavi, a tool by', '{"className":"text-sm text-black","children":"made with Petals by Bavi"}')
  // any remaining visible owner references anywhere (links + handle text)
  out = out.split('href="https://x.com/pauline_makes"').join('href="' + INSTAGRAM_URL + '"')
  out = out.split('\\"href\\":\\"https://x.com/pauline_makes').join('\\"href\\":\\"' + INSTAGRAM_URL)
  out = out.split('href="x.com/pauline_makes"').join('href="' + INSTAGRAM_URL + '"')
  out = out.split('>@pauline_makes<').join('>@petals_by_bavi<')
  out = out.split('@pauline_makes').join('@petals_by_bavi')
  // pauwee.com visible link targets (keep assets.pauwee.com CDN untouched)
  out = out.split('href="https://pauwee.com"').join('href="' + INSTAGRAM_URL + '"')
  out = out.split('\\"href\\":\\"https://pauwee.com').join('\\"href\\":\\"' + INSTAGRAM_URL)
  out = out.split('>pauwee.com<').join('>Instagram<')
  return out
}

function rewritePrivacy(s) {
  let out = s
  if (!out.includes(PRIVACY_TRIGGER) && !out.includes('Sale of data')) return out
  for (const [from, to] of PRIVACY_SSR_PATTERNS) {
    if (out.includes(from)) out = out.split(from).join(to)
  }
  for (const [from, to] of PRIVACY_FLIGHT_PATTERNS) {
    if (out.includes(from)) out = out.split(from).join(to)
  }
  // Advertising li (SSR)
  out = out.replace(PRIVACY_LI_SSR_RE, PRIVACY_LI_SSR_NEW)
  // Advertising li (flight, escaped + unescaped)
  for (const [oldP, newP] of [
    [PRIVACY_LI_FLIGHT_OLD_ESC, PRIVACY_LI_FLIGHT_NEW_ESC],
    [PRIVACY_LI_FLIGHT_OLD, PRIVACY_LI_FLIGHT_NEW]
  ]) {
    if (out.includes(oldP)) out = out.split(oldP).join(newP)
  }
  // Contact section (SSR + flight)
  out = out.replace(PRIVACY_CONTACT_SSR_RE, PRIVACY_CONTACT_SSR_NEW)
  if (out.includes(PRIVACY_CONTACT_FLIGHT_OLD_ESC)) {
    out = out.split(PRIVACY_CONTACT_FLIGHT_OLD_ESC).join(PRIVACY_CONTACT_FLIGHT_NEW_ESC)
  }
  if (out.includes(PRIVACY_CONTACT_FLIGHT_OLD)) {
    out = out.split(PRIVACY_CONTACT_FLIGHT_OLD).join(PRIVACY_CONTACT_FLIGHT_NEW)
  }
  if (out.includes(PRIVACY_CONTACT_FLIGHT_CURRENT_ESC)) {
    out = out.split(PRIVACY_CONTACT_FLIGHT_CURRENT_ESC).join(PRIVACY_CONTACT_FLIGHT_NEW_ESC)
  }
  if (out.includes(PRIVACY_CONTACT_FLIGHT_CURRENT)) {
    out = out.split(PRIVACY_CONTACT_FLIGHT_CURRENT).join(PRIVACY_CONTACT_FLIGHT_NEW)
  }
  return out
}

// Escaped JSON (level-1) variants of the head metadata, as embedded in self.__next_f.push flight
// payloads. The app re-derives the document <head> from these on hydration.
const F = {
  ICON: escVariant('"rel":"icon","href":"/favicon.ico"', 1),
  FAVICON: escVariant('"rel":"icon","href":"/fav-icon.png"', 1),
  OG_IMAGE: escVariant('"property":"og:image","content":"/og-petals.png"', 1),
  META_IMAGE: escVariant('"property":"og:image","content":"/meta-tag.jpeg"', 1),
  TITLE: escVariant('"children":"Petals by Bavi — send a digital flower bouquet"', 1),
  TITLE_NEW: escVariant('"children":"Petals by Bavi | Soft stems & fuzzy blooms"', 1),
  DESC_PREFIX: escVariant('"name":"description","content":"Build a beautiful digital flower bouquet and send it to someone you love.', 1),
  DESC_NEW: escVariant('"name":"description","content":"Real floral bouquets, handmade pipe cleaner crafts, and anti-tarnish jewellery by Petals by Bavi."', 1),
  OG_TITLE: escVariant('"property":"og:title","content":"Petals by Bavi — send a digital flower bouquet"', 1),
  OG_TITLE_NEW: escVariant('"property":"og:title","content":"Petals by Bavi | Soft stems & fuzzy blooms"', 1),
  OG_DESC_PREFIX: escVariant('"property":"og:description","content":"Build a beautiful digital flower bouquet and send it to someone you love.', 1),
  OG_DESC_NEW: escVariant('"property":"og:description","content":"Create and share beautiful digital bouquets with Petals by Bavi."', 1),
  TW_TITLE: escVariant('"name":"twitter:title","content":"Petals by Bavi — send a digital flower bouquet"', 1),
  TW_TITLE_NEW: escVariant('"name":"twitter:title","content":"Petals by Bavi | Soft stems & fuzzy blooms"', 1),
  TW_DESC_PREFIX: escVariant('"name":"twitter:description","content":"Build a beautiful digital flower bouquet and send it to someone you love.', 1),
  TW_DESC_NEW: escVariant('"name":"twitter:description","content":"Create and share beautiful digital bouquets with Petals by Bavi."', 1)
}

// content runs to the closing escaped quote; match plain text (no backslashes/quotes in it)
const F_CONTENT_MID = String.raw`[^\"\\"]*\"`

function flightDescRe(escPrefix) {
  return new RegExp(escPrefix + F_CONTENT_MID, 'g')
}

function rewriteHeadMeta(s) {
  let out = s
  // favicon: replace any legacy icon/shortcut-icon declarations with the Petals favicon
  out = out.replace(ICON_RE, ICON_NEW)
  // flight (escaped JSON metadata) variants for icon + og:image — apply to every page so the
  // client-side head re-render (which reads these) stays in sync with the server HTML.
  out = out.split(F.ICON).join(F.FAVICON)
  out = out.split(F.OG_IMAGE).join(F.META_IMAGE)
  // social preview image: prefer the official meta-tag.jpeg (covers legacy metapreview.png and /og-petals.png)
  out = out.split('content="/og-petals.png"').join('content="' + META_IMAGE + '"')
  out = out.split(OG_IMAGE_OLD).join(META_IMAGE)
  if (!out.includes('og:image:alt')) {
    out = out.split('<meta property="og:image" content="' + META_IMAGE + '"/>')
      .join('<meta property="og:image" content="' + META_IMAGE + '"/>\n' + OG_IMAGE_ALT)
  }
  // bouquet links keep their contextual "someone made you a bouquet" preview text
  if (out.includes('<title>someone made you a bouquet')) return out
  // SSR forms
  out = out.split(TITLE_OLD).join(TITLE_NEW)
  out = out.replace(DESC_RE, DESC_NEW)
  out = out.split(OG_TITLE_OLD).join(OG_TITLE_NEW)
  out = out.replace(OG_DESC_RE, OG_DESC_NEW)
  out = out.split(TW_TITLE_OLD).join(TW_TITLE_NEW)
  out = out.replace(TW_DESC_RE, TW_DESC_NEW)
  // flight (escaped JSON) title/description/og/twitter — keep the hydrated DOM head in sync
  out = out.split(F.TITLE).join(F.TITLE_NEW)
  out = out.replace(flightDescRe(F.DESC_PREFIX), F.DESC_NEW)
  out = out.split(F.OG_TITLE).join(F.OG_TITLE_NEW)
  out = out.replace(flightDescRe(F.OG_DESC_PREFIX), F.OG_DESC_NEW)
  out = out.split(F.TW_TITLE).join(F.TW_TITLE_NEW)
  out = out.replace(flightDescRe(F.TW_DESC_PREFIX), F.TW_DESC_NEW)
  return out
}

function injectShare(s, html) {
  if (!html) return s
  if (s.indexOf('/__petals/petals-share.js') !== -1) return s
  const tags = SHARE_LINK_TAG + SHARE_SCRIPT_TAG
  if (/<\/body>/i.test(s)) return s.replace(/<\/body>/i, tags + '</body>')
  if (/<\/html>/i.test(s)) return s.replace(/<\/html>/i, tags + '</html>')
  return s + tags
}

export function rewritePetals(body, opts = {}) {
  const hero = !!opts.hero
  const logoClass = hero ? HOME_LOGO_CLASS : opts.logoClass || NAV_LOGO_CLASS
  let s = String(body)
  s = s.replace(PRELOAD_IMG_RE, '')
  s = s.replace(SSR_LOGO_RE, (whole, anchorAttrs, imgTag) => {
    let inner
    if (hero) {
      inner = '<p class="' + HOME_LOGO_CLASS + '">' + SITE_NAME + '</p>'
    } else {
      const margin = marginTokensFromImgTag(imgTag || '') || 'my-4'
      inner = '<p class="' + logoClass + ' ' + margin + '">' + SITE_NAME + '</p>'
    }
    return anchorAttrs != null ? '<a' + anchorAttrs + '>' + inner + '</a>' : inner
  })
  s = spliceFlightLogos(s, hero ? HOME_LOGO_CLASS : logoClass)
  // brand variants must be replaced before owner-markup removal (it inserts the new name)
  for (const [from, to] of BRAND_VARIANTS) {
    if (s.includes(from)) s = s.split(from).join(to)
  }
  if (hero) s = spliceHomeHero(s)
  s = removeOwnerMarkup(s)
  s = rewritePrivacy(s)
  s = s.split('https://x.com/pauline_makes').join(INSTAGRAM_URL)
  s = s.split('https://pauwee.com').join(INSTAGRAM_URL)
  s = s.split('>pauwee.com<').join('>@petals_by_bavi<')
  s = s.split('children":"pauwee.com"').join('children":"@petals_by_bavi"')
  s = s.split('children":"pauwee.com\\"').join('children":"@petals_by_bavi\\"')
  s = s.split('@pauline_makes').join('@petals_by_bavi')
  s = rewriteHeadMeta(s)
  s = injectShare(s, !!opts.html)
  if (opts.rsc) {
    const badLines = (str) => {
      const bad = new Set()
      const lines = str.split('\n')
      for (let i = 0; i < lines.length; i++) {
        const colonIdx = lines[i].indexOf(':')
        if (colonIdx > 0 && /^\d+$/.test(lines[i].slice(0, colonIdx))) {
          try {
            JSON.parse(lines[i].slice(colonIdx + 1))
          } catch (e) {
            bad.add(i)
          }
        }
      }
      return bad
    }
    // RSC lines that didn't parse as JSON before the rewrite (module references
    // like "I[...]" and "$S..." shorthands are valid RSC, not JSON) are never
    // touched by our transforms, so only fall back when a rewrite made a
    // previously-valid line unparseable.
    const beforeBad = badLines(String(body))
    const afterBad = badLines(s)
    for (const i of afterBad) {
      if (!beforeBad.has(i)) {
        console.error('[rewrite] Flight payload corrupted, serving original (line ' + i + '):', s.split('\n')[i].slice(0, 160))
        return body
      }
    }
  }
  return s
}

export function shouldRewrite(contentType) {
  if (!contentType) return false
  const ct = contentType.toLowerCase()
  return ct.includes('text/html') || ct.includes('text/x-component')
}