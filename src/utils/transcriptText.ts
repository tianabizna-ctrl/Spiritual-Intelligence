/**
 * Lazily loads the full paragraph text of a harvested transcript.
 *
 * The 844 transcripts total ~29MB, so they are not bundled: each one lives at
 * public/transcripts/<collection>__<id>.json and is fetched once, then cached.
 *
 * Pull-request previews are published as subdirectories of the main site and
 * deliberately omit those payloads, so a miss falls back to the site root.
 */

export interface LoadedTranscript {
  paragraphs: string[];
  text: string;
  wordCount: number;
}

const cache = new Map<string, LoadedTranscript>();

/** Paragraph width for transcripts that ship as one flat string. */
const PARA_CHARS = 420;

/**
 * The Drive-harvested records carry only a single `text` blob with no paragraph
 * breaks, so split on sentence ends at a comfortable reading width.
 */
function splitParagraphs(text: string): string[] {
  const flat = text.replace(/\s+/g, ' ').trim();
  if (!flat) return [];

  const out: string[] = [];
  let buf = '';
  for (const sentence of flat.split(/(?<=[.!?])\s+/)) {
    if (buf && buf.length + sentence.length > PARA_CHARS) {
      out.push(buf.trim());
      buf = '';
    }
    buf += (buf ? ' ' : '') + sentence;
  }
  if (buf.trim()) out.push(buf.trim());
  return out;
}

function basePrefix(): string | null {
  const segments = new URL(document.baseURI).pathname.split('/').filter(Boolean);
  const prIndex = segments.findIndex((s) => /^pr-\d+$/.test(s));
  if (prIndex < 0) return null;
  return `/${segments.slice(0, prIndex).join('/')}/`.replace(/\/+/g, '/');
}

export async function loadTranscript(
  collection: string,
  id: string
): Promise<LoadedTranscript | null> {
  const key = `${collection}__${id}`;
  const hit = cache.get(key);
  if (hit) return hit;

  const name = `transcripts/${key}.json`;
  try {
    let res = await fetch(name);
    if (!res.ok) {
      const prefix = basePrefix();
      if (prefix) res = await fetch(prefix + name);
    }
    if (!res.ok) return null;

    const data = await res.json();
    const raw: string[] = Array.isArray(data.paragraphs) ? data.paragraphs : [];
    const text: string = typeof data.text === 'string' ? data.text : raw.join('\n\n');
    const paragraphs = raw.length > 0 ? raw : splitParagraphs(text);

    const loaded: LoadedTranscript = {
      paragraphs,
      text: text || paragraphs.join('\n\n'),
      wordCount: typeof data.wordCount === 'number' ? data.wordCount : 0,
    };
    cache.set(key, loaded);
    return loaded;
  } catch {
    return null;
  }
}
