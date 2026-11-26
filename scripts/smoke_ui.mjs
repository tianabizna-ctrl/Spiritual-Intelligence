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
check('scope note shows the real library size', /841/.test(readerAfter), readerAfter.slice(0, 80));

check('no runtime errors', errors.length === 0, errors.slice(0, 3).join(' | '));

console.log(`\n${failures === 0 ? 'ALL CHECKS PASSED' : `${failures} CHECK(S) FAILED`}`);
process.exit(failures === 0 ? 0 : 1);
