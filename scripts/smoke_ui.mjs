// Smoke-test the built bundle: mount the real app in jsdom and exercise the
// new shell (sidebar, settings sheet, theme + language + reset persistence).
// Run with: npm run smoke:ui
import { JSDOM, VirtualConsole } from 'jsdom';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const jsFile = readdirSync(path.join(dist, 'assets')).find(
  (f) => f.startsWith('index-') && f.endsWith('.js')
);
if (!jsFile) throw new Error('no bundle found in dist/assets');

const errors = [];
const virtualConsole = new VirtualConsole();
virtualConsole.on('jsdomError', (e) => errors.push(`jsdomError: ${e.message}`));
virtualConsole.on('error', (...a) => errors.push(`console.error: ${a.join(' ')}`));

const dom = new JSDOM(readFileSync(path.join(dist, 'index.html'), 'utf8'), {
  runScripts: 'outside-only',
  pretendToBeVisual: true,
  url: 'http://localhost/',
  virtualConsole,
});

// Minimal matchMedia — jsdom has none, and useDarkMode/theme follow needs it.
dom.window.matchMedia = (query) => ({
  matches: /dark/.test(query) ? false : false,
  media: query,
  onchange: null,
  addEventListener: () => {},
  removeEventListener: () => {},
  addListener: () => {},
  removeListener: () => {},
  dispatchEvent: () => false,
});

// React 19 relies on these being present.
dom.window.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 0);
dom.window.cancelAnimationFrame = (id) => clearTimeout(id);
dom.window.scrollTo = () => {};

// jsdom ships no fetch, so serve transcript payloads from dist/ exactly as the
// deployed site would. Without this the reader's load path is never exercised.
dom.window.fetch = async (url) => {
  const rel = String(url).replace(/^[./]+/, '');
  try {
    const body = readFileSync(path.join(dist, rel), 'utf8');
    return { ok: true, status: 200, json: async () => JSON.parse(body) };
  } catch {
    return { ok: false, status: 404, json: async () => ({}) };
  }
};
globalThis.fetch = dom.window.fetch;
dom.window.URL.createObjectURL = () => 'blob:mock';
dom.window.URL.revokeObjectURL = () => {};

try {
  dom.window.eval(readFileSync(path.join(dist, 'assets', jsFile), 'utf8'));
} catch (e) {
  console.log(`FAIL  bundle threw on load: ${e.message}`);
  process.exit(1);
}

const doc = dom.window.document;

// Wait for React to mount rather than assuming a fixed delay.
for (let i = 0; i < 40; i++) {
  if (doc.querySelector('#root')?.children.length) break;
  await new Promise((r) => setTimeout(r, 50));
}
const text = doc.body.textContent || '';
let failures = 0;
const check = (label, ok, extra = '') => {
  console.log(`${ok ? 'PASS ' : 'FAIL '} ${label}${extra ? ` — ${extra}` : ''}`);
  if (!ok) {
    failures++;
    // Dump context so a CI log is enough to diagnose the failure.
    const body = (doc.body.textContent || '').replace(/\s+/g, ' ').slice(0, 400);
    console.log(`      root children: ${doc.querySelector('#root')?.children.length ?? 'none'}`);
    console.log(`      body sample : ${body || '(empty)'}`);
    if (errors.length) console.log(`      errors      : ${errors.slice(0, 5).join(' | ')}`);
  }
};

check('app mounted', doc.querySelector('#root')?.children.length > 0);
check('brand rendered', text.includes('Spiritual Intelligence'));

// Sidebar groups — read the headings directly (textContent concatenates them).
const groupHeadings = [...doc.querySelectorAll('nav h3')].map((h) => h.textContent.trim());
for (const label of ['Read', 'Study', 'Outputs']) {
  check(`sidebar group: ${label}`, groupHeadings.includes(label), groupHeadings.join(','));
}

// Sections present as nav buttons
for (const label of ['Prayer Altar', 'Devotionals', 'Full Library', 'All Titles']) {
  check(`nav item: ${label}`, text.includes(label));
}

// Settings button exists in the top bar
const settingsBtns = [...doc.querySelectorAll('button')].filter(
  (b) => b.getAttribute('aria-label') === 'Settings'
);
check('top-bar settings button', settingsBtns.length > 0);

// Open settings
settingsBtns[0]?.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true }));
await new Promise((r) => setTimeout(r, 350));
const dialog = doc.querySelector('[role="dialog"][aria-label="Settings"]');
check('settings dialog opens', !!dialog);

const stext = dialog?.textContent || '';
for (const heading of ['Appearance', 'Language', 'Reading', 'Library', 'Your data']) {
  check(`settings section: ${heading}`, stext.includes(heading));
}

// Theme switch writes through to localStorage
const midnight = [...(dialog?.querySelectorAll('button') || [])].find(
  (b) => b.getAttribute('title') === 'Midnight Watch'
);
midnight?.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true }));
await new Promise((r) => setTimeout(r, 250));
const stored = JSON.parse(dom.window.localStorage.getItem('si_settings_v2') || '{}');
check('theme persisted to storage', stored.theme === 'midnight', `theme=${stored.theme}`);
check('document gets .dark class', doc.documentElement.classList.contains('dark'));

// Text scale persists
const xl = [...(dialog?.querySelectorAll('button') || [])].find((b) => b.textContent === 'A++');
xl?.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true }));
await new Promise((r) => setTimeout(r, 250));
const stored2 = JSON.parse(dom.window.localStorage.getItem('si_settings_v2') || '{}');
check('text scale persisted', stored2.textScale === 'xl', `textScale=${stored2.textScale}`);

// Close on Escape
doc.dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
await new Promise((r) => setTimeout(r, 250));

// Navigating to the library swaps the main content.
const libBtn = [...doc.querySelectorAll('nav button')].find((b) =>
  b.textContent.includes('Full Library')
);
libBtn?.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true }));
await new Promise((r) => setTimeout(r, 400));
const mainText = doc.querySelector('main')?.textContent || '';
check('navigates to Full Library', /377/.test(mainText), mainText.slice(0, 60));
check('munroe tab present in library', /Myles Munroe/.test(mainText));

// The reader must no longer carry its own duplicated A-/A/A+/A++ control.
const backBtn = [...doc.querySelectorAll('nav button')].find((b) =>
  b.textContent.includes('Read Prayers')
);
backBtn?.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true }));
await new Promise((r) => setTimeout(r, 400));
const readerText = doc.querySelector('main')?.textContent || '';
const dupFont = [...doc.querySelectorAll('main button')].filter((b) =>
  ['A-', 'A', 'A+', 'A++'].includes(b.textContent.trim())
);
check('duplicate font control removed from reader', dupFont.length === 0, `${dupFont.length} found`);
const dupLang = [...doc.querySelectorAll('main button')].filter((b) =>
  /🇬🇧 EN|🇫🇷 FR|🇲🇬 MG/.test(b.textContent)
);
check('duplicate language pills removed from reader', dupLang.length === 0, `${dupLang.length} found`);

// Regression guards for the stale "9 videos / 40 chapters" copy.
const readerAfter = doc.querySelector('main')?.textContent || '';
check('no "40 Chapters" claim', !/40 Chapters|40 Chapitres|Toko 40/.test(readerAfter));
check('no "All 9 Videos" claim', !/All 9 Videos|Les 9 Vidéos/.test(readerAfter));
check('no "/9" naked badge', !/Video \d+\/9\b/.test(readerAfter));
// Derive the expected size from the generated index so the guard cannot go
// stale when a harvest lands more transcripts.
const tsSrc = readFileSync(new URL('../src/data/libraryTranscripts.ts', import.meta.url), 'utf8');
const expectedCount = (tsSrc.match(/^ {2}"[^"]+": \{/gm) || []).length;
check(
  'scope note shows the real library size',
  expectedCount > 0 && readerAfter.includes(String(expectedCount)),
  `expected ${expectedCount} in UI; got: ${readerAfter.slice(0, 80)}`
);

// The nine hand-authored sessions were removed outright, not relabelled.
for (const dead of ['../src/data/rawTranscripts.ts', '../src/data/libraryScope.ts']) {
  let exists = true;
  try {
    statSync(new URL(dead, import.meta.url));
  } catch {
    exists = false;
  }
  check(`removed: ${dead.split('/').pop()}`, !exists);
}

const spiritualSrc = readFileSync(new URL('../src/data/spiritualData.ts', import.meta.url), 'utf8');
check('no VIDEOS_DATA structure', !/export const VIDEOS_DATA/.test(spiritualSrc));
check('no VideoResource type', !/export interface VideoResource/.test(spiritualSrc));

const compendiumSrc = readFileSync(new URL('../src/data/compendiumData.ts', import.meta.url), 'utf8');
check('no COMPANION_VIDEOS_DATA structure', !/export const COMPANION_VIDEOS_DATA/.test(compendiumSrc));
check('no ALL_VIDEOS_DATA aggregate', !/export const ALL_VIDEOS_DATA/.test(compendiumSrc));

// Collections is reachable and every badge equals that group's harvested count.
const collectionsBtn = [...doc.querySelectorAll('nav button')].find((b) =>
  b.textContent.includes('Collections')
);
collectionsBtn?.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true }));
await new Promise((r) => setTimeout(r, 400));
const collectionsText = doc.querySelector('main')?.textContent || '';
check('navigates to Collections', /Collections/.test(collectionsText), collectionsText.slice(0, 60));

const tsIndex = readFileSync(new URL('../src/data/libraryTranscripts.ts', import.meta.url), 'utf8');
const playlistIds = [
  'PLaptSPguGlRafSbwyTRdhKBc9axh9znP7',
  'PLK2jIf_WJT5V87ZUiLy8Q0GKet4T-AzRz',
  'PLFyTbdmIZAj4c9I6CJNvV2XHon1SUypTh',
];
const expectedBadges = [
  ...playlistIds.map(
    (id) => (tsIndex.match(new RegExp(`playlistId: "${id}"`, 'g')) || []).length
  ),
  (tsIndex.match(/collection: "teachings"/g) || []).length,
];
const missingBadges = expectedBadges.filter(
  (n) => !collectionsText.includes(`${n} teaching`)
);
check(
  'collection badges match harvested counts',
  missingBadges.length === 0,
  `missing ${missingBadges.join(', ')} of ${expectedBadges.join('/')}`
);
check('collection cards render cover art', doc.querySelectorAll('main img').length > 0);

// The reader must render real transcript text, paragraph by paragraph.
const backToReader = [...doc.querySelectorAll('nav button')].find(
  (b) => b.textContent.trim() === 'Read Prayers'
);
backToReader?.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true }));
await new Promise((r) => setTimeout(r, 600));
const readerParas = [...doc.querySelectorAll('main article p')].map((p) => p.textContent.trim());
check('reader renders transcript paragraphs', readerParas.length > 5, `${readerParas.length} paragraphs`);
check(
  'reader shows real transcript prose',
  readerParas.some((p) => p.split(/\s+/).length > 40),
  readerParas[0]?.slice(0, 80)
);

check('no runtime errors', errors.length === 0, errors.slice(0, 3).join(' | '));

console.log(`\n${failures === 0 ? 'ALL CHECKS PASSED' : `${failures} CHECK(S) FAILED`}`);
process.exit(failures === 0 ? 0 : 1);
