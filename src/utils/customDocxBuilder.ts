import {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
} from 'docx';
import { SCRIPTURE_TREASURY, LanguageMode } from '../data/spiritualData';
import { SCRIPTURE_MG_MAP } from '../data/malagasyData';
import { LIBRARY_TRANSCRIPTS } from '../data/libraryTranscripts';
import { loadTranscript } from './transcriptText';

export interface CustomDocxOptions {
  languageMode: LanguageMode; // 'both' | 'en' | 'fr' | 'mg'
  /** Transcript ids from the harvested library. */
  selectedVideoIds: string[];
  /**
   * Kept so existing callers keep compiling. The harvested corpus has no
   * hand-authored chapters or translations, so only real transcript text and the
   * scripture treasury are exported.
   */
  includeChapters?: boolean;
  includeVerbatim?: boolean;
  includeScriptureTreasury: boolean;
}

export async function generateCustomDocxBlob(
  options: CustomDocxOptions
): Promise<{ blob: Blob; filename: string }> {
  const { languageMode, selectedVideoIds, includeScriptureTreasury } = options;

  const includeEn = languageMode === 'both' || languageMode === 'en';
  const includeFr = languageMode === 'both' || languageMode === 'fr';
  const includeMg = languageMode === 'both' || languageMode === 'mg';

  const selected = selectedVideoIds
    .map(
      (id) =>
        LIBRARY_TRANSCRIPTS[id] ??
        Object.values(LIBRARY_TRANSCRIPTS).find((t) => t.id === id)
    )
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  const children: Paragraph[] = [];

  // Title header
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 140 },
      children: [
        new TextRun({
          text: '\u2726  SPIRITUAL INTELLIGENCE  \u2022  INTELLIGENCE SPIRITUELLE  \u2022  FAHARANITAN-TSAINA ARA-PANAHY  \u2726',
          bold: true,
          size: 20,
          color: 'B48327',
          font: 'Georgia',
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 120 },
      children: [
        new TextRun({
          text: `Harvested Transcripts  \u2022  Transcripts Collected: ${selected.length}`,
          italics: true,
          size: 22,
          color: '57534E',
          font: 'Georgia',
        }),
      ],
    })
  );

  for (const entry of selected) {
    const loaded = await loadTranscript(entry.collection, entry.id);

    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 360, after: 120 },
        children: [
          new TextRun({
            text: entry.title,
            bold: true,
            size: 28,
            color: '1E293B',
            font: 'Georgia',
          }),
        ],
      }),
      new Paragraph({
        spacing: { after: 180 },
        children: [
          new TextRun({
            text: `Channel: ${entry.channel}  \u2022  Transcript words: ${entry.wordCount.toLocaleString()}\nYouTube: https://www.youtube.com/watch?v=${entry.id}`,
            size: 19,
            color: '57534E',
            font: 'Georgia',
          }),
        ],
      })
    );

    if (!loaded) {
      children.push(
        new Paragraph({
          spacing: { after: 120 },
          children: [
            new TextRun({
              text: 'This transcript could not be loaded. It may not be published yet.',
              italics: true,
              size: 20,
              color: '9A3412',
              font: 'Georgia',
            }),
          ],
        })
      );
      continue;
    }

    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 240, after: 120 },
        children: [
          new TextRun({
            text: 'Full Transcript (English)',
            bold: true,
            size: 24,
            color: 'B48327',
            font: 'Georgia',
          }),
        ],
      })
    );

    for (const para of loaded.paragraphs) {
      children.push(
        new Paragraph({
          spacing: { after: 110 },
          children: [new TextRun({ text: para, size: 21, color: '1C1917', font: 'Georgia' })],
        })
      );
    }
  }

  if (includeScriptureTreasury) {
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 380, after: 140 },
        children: [
          new TextRun({
            text:
              languageMode === 'mg'
                ? 'TAHIRIN’NY SORATRA MASINA (BAIBOLY MALAGASY)'
                : languageMode === 'fr'
                ? 'TRÉSOR DES ÉCRITURES (CONCORDANCE BIBLIQUE)'
                : 'SCRIPTURE TREASURY & PRAYER CONCORDANCE',
            bold: true,
            size: 28,
            color: '1E293B',
            font: 'Georgia',
          }),
        ],
      })
    );

    for (const sc of SCRIPTURE_TREASURY) {
      const scMg = SCRIPTURE_MG_MAP[sc.id];
      const scRef =
        languageMode === 'mg'
          ? scMg?.reference_mg || sc.reference_en
          : languageMode === 'fr'
          ? sc.reference_fr
          : sc.reference_en;
      const scTheme =
        languageMode === 'mg'
          ? scMg?.theme_mg || sc.theme_en
          : languageMode === 'fr'
          ? sc.theme_fr
          : sc.theme_en;

      children.push(
        new Paragraph({
          spacing: { before: 160, after: 60 },
          children: [
            new TextRun({
              text: `${scRef} — ${scTheme}`,
              bold: true,
              size: 22,
              color: '7C2D12',
              font: 'Georgia',
            }),
          ],
        })
      );

      if (includeEn) {
        children.push(
          new Paragraph({
            spacing: { after: 60 },
            children: [
              new TextRun({ text: 'KJV (EN): ', bold: true, size: 20, color: 'B48327', font: 'Georgia' }),
              new TextRun({ text: `"${sc.kjv_en}"`, italics: true, size: 20, color: '1C1917', font: 'Georgia' }),
            ],
          })
        );
      }

      if (includeFr) {
        children.push(
          new Paragraph({
            spacing: { after: 60 },
            children: [
              new TextRun({ text: 'LSG (FR) : ', bold: true, size: 20, color: 'B48327', font: 'Georgia' }),
              new TextRun({ text: `« ${sc.lsg_fr} »`, italics: true, size: 20, color: '1C1917', font: 'Georgia' }),
            ],
          })
        );
      }

      if (includeMg && scMg) {
        children.push(
          new Paragraph({
            spacing: { after: 80 },
            children: [
              new TextRun({ text: 'Baiboly (MG) : ', bold: true, size: 20, color: 'B48327', font: 'Georgia' }),
              new TextRun({ text: `« ${scMg.mg_text} »`, italics: true, size: 20, color: '1C1917', font: 'Georgia' }),
            ],
          })
        );
      }
    }
  }

  const doc = new Document({
    sections: [
      {
        properties: {},
        children,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const langSuffix = languageMode === 'both' ? 'EN_FR_MG' : languageMode.toUpperCase();
  const filename = `Spiritual_Intelligence_Custom_Transcriptions_${langSuffix}.docx`;
  return { blob, filename };
}
