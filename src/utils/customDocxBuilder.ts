import {
  AlignmentType,
  BorderStyle,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
} from 'docx';
import { SCRIPTURE_TREASURY, LanguageMode } from '../data/spiritualData';
import { ALL_VIDEOS_DATA } from '../data/compendiumData';
import { RAW_TRANSCRIPTS } from '../data/rawTranscripts';
import { VIDEO_MG_MAP, CHAPTER_MG_MAP, SCRIPTURE_MG_MAP } from '../data/malagasyData';

export interface CustomDocxOptions {
  languageMode: LanguageMode; // 'both' | 'en' | 'fr' | 'mg'
  selectedVideoIds: string[];
  includeChapters: boolean;
  includeVerbatim: boolean;
  includeScriptureTreasury: boolean;
}

export async function generateCustomDocxBlob(
  options: CustomDocxOptions
): Promise<{ blob: Blob; filename: string }> {
  const {
    languageMode,
    selectedVideoIds,
    includeChapters,
    includeVerbatim,
    includeScriptureTreasury,
  } = options;

  const includeEn = languageMode === 'both' || languageMode === 'en';
  const includeFr = languageMode === 'both' || languageMode === 'fr';
  const includeMg = languageMode === 'both' || languageMode === 'mg';

  const selectedVideos = ALL_VIDEOS_DATA.filter((v) => selectedVideoIds.includes(v.id));
  const children: Paragraph[] = [];

  // Title Header
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 140 },
      children: [
        new TextRun({
          text: '✦  SPIRITUAL INTELLIGENCE  •  INTELLIGENCE SPIRITUELLE  •  FAHARANITAN-TSAINA ARA-PANAHY  ✦',
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
          text:
            languageMode === 'mg'
              ? 'Tahirin-kevitra Masina momba ireo Vavaka Ara-paminaniana sy Transcriptions Video (Malagasy)'
              : languageMode === 'fr'
              ? 'Recueil Sacré des Transcriptions Vidéo, Prières Prophétiques & Méditations (Français)'
              : languageMode === 'en'
              ? 'Sacred Compendium of Video Transcriptions, Prophetic Prayers & Devotionals (English)'
              : 'Trilingual Compendium of Video Transcriptions, Prayers & Devotionals (EN / FR / MG)',
          bold: true,
          size: 34,
          color: '1C1917',
          font: 'Georgia',
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 320 },
      border: {
        bottom: {
          color: 'B48327',
          space: 8,
          style: BorderStyle.SINGLE,
          size: 6,
        },
      },
      children: [
        new TextRun({
          text: `Edition: ${
            languageMode === 'both'
              ? 'English, Français & Malagasy (EN / FR / MG)'
              : languageMode === 'mg'
              ? 'Malagasy (MG)'
              : languageMode === 'fr'
              ? 'Français (FR)'
              : 'English (EN)'
          }  •  Videos Included: ${selectedVideos.length}`,
          italics: true,
          size: 22,
          color: '57534E',
          font: 'Georgia',
        }),
      ],
    })
  );

  for (const video of selectedVideos) {
    const rawData = RAW_TRANSCRIPTS[video.id];
    const vMg = VIDEO_MG_MAP[video.id];
    const primaryHeadingTitle =
      languageMode === 'mg'
        ? vMg?.title_mg || video.title_en
        : languageMode === 'fr'
        ? video.title_fr
        : video.title_en;

    // Video Heading
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 360, after: 120 },
        children: [
          new TextRun({
            text: `VIDEO ${video.videoNumber}: ${primaryHeadingTitle}`,
            bold: true,
            size: 28,
            color: '1E293B',
            font: 'Georgia',
          }),
        ],
      })
    );

    if (languageMode === 'both') {
      children.push(
        new Paragraph({
          spacing: { after: 80 },
          children: [
            new TextRun({
              text: `Titre Français : ${video.title_fr}`,
              bold: true,
              italics: true,
              size: 21,
              color: '7C2D12',
              font: 'Georgia',
            }),
          ],
        }),
        new Paragraph({
          spacing: { after: 120 },
          children: [
            new TextRun({
              text: `Lohateny Malagasy : ${vMg?.title_mg || video.title_en}`,
              bold: true,
              italics: true,
              size: 21,
              color: '7C2D12',
              font: 'Georgia',
            }),
          ],
        })
      );
    }

    // Metadata
    children.push(
      new Paragraph({
        spacing: { after: 180 },
        children: [
          new TextRun({
            text: `YouTube URL: ${video.url}\nChannel: ${video.channel} (${video.speaker})  •  Duration: ${video.duration}  •  Uploaded: ${video.uploadedAt}\nKey Scriptures: ${video.keyScriptures.join(' • ')}`,
            size: 19,
            color: '57534E',
            font: 'Georgia',
          }),
        ],
      })
    );

    // Structured Chapters & Prophetic Declarations
    if (includeChapters) {
      children.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 240, after: 120 },
          children: [
            new TextRun({
              text:
                languageMode === 'mg'
                  ? 'Toko Voarafitra sy Fanambarana Ara-paminaniana'
                  : languageMode === 'fr'
                  ? 'Chapitres Structurés & Déclarations Prophétiques'
                  : 'Structured Chapters & Prophetic Declarations',
              bold: true,
              size: 24,
              color: 'B48327',
              font: 'Georgia',
            }),
          ],
        })
      );

      for (const ch of video.chapters) {
        const chMg = CHAPTER_MG_MAP[ch.id];
        const chMainTitle =
          languageMode === 'mg'
            ? chMg?.title_mg || ch.title_en
            : languageMode === 'fr'
            ? ch.title_fr
            : ch.title_en;

        children.push(
          new Paragraph({
            spacing: { before: 180, after: 80 },
            children: [
              new TextRun({
                text: `${ch.number}. [${ch.timestamp}] ${chMainTitle}`,
                bold: true,
                size: 22,
                color: '1C1917',
                font: 'Georgia',
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 80 },
            children: [
              new TextRun({
                text: `Scriptures: ${ch.scriptures.join(' • ')}`,
                bold: true,
                size: 19,
                color: '7C2D12',
                font: 'Georgia',
              }),
            ],
          })
        );

        if (includeEn) {
          children.push(
            new Paragraph({
              spacing: { after: 80 },
              children: [
                new TextRun({ text: '[EN] ', bold: true, size: 20, color: '1E293B', font: 'Georgia' }),
                new TextRun({ text: ch.en_text, size: 21, color: '1C1917', font: 'Georgia' }),
              ],
            }),
            new Paragraph({
              spacing: { after: 100 },
              children: [
                new TextRun({ text: 'Prophetic Decree (EN): ', bold: true, size: 20, color: 'B48327', font: 'Georgia' }),
                new TextRun({ text: ch.declaration_en, italics: true, size: 21, color: '1C1917', font: 'Georgia' }),
              ],
            })
          );
        }

        if (includeFr) {
          children.push(
            new Paragraph({
              spacing: { after: 80 },
              children: [
                new TextRun({ text: '[FR] ', bold: true, size: 20, color: '1E293B', font: 'Georgia' }),
                new TextRun({ text: ch.fr_text, size: 21, color: '1C1917', font: 'Georgia' }),
              ],
            }),
            new Paragraph({
              spacing: { after: 100 },
              children: [
                new TextRun({ text: 'Décret Prophétique (FR) : ', bold: true, size: 20, color: 'B48327', font: 'Georgia' }),
                new TextRun({ text: ch.declaration_fr, italics: true, size: 21, color: '1C1917', font: 'Georgia' }),
              ],
            })
          );
        }

        if (includeMg && chMg) {
          children.push(
            new Paragraph({
              spacing: { after: 80 },
              children: [
                new TextRun({ text: '[MG] ', bold: true, size: 20, color: '1E293B', font: 'Georgia' }),
                new TextRun({ text: chMg.mg_text, size: 21, color: '1C1917', font: 'Georgia' }),
              ],
            }),
            new Paragraph({
              spacing: { after: 120 },
              children: [
                new TextRun({ text: 'Fanambarana Ara-paminaniana (MG) : ', bold: true, size: 20, color: 'B48327', font: 'Georgia' }),
                new TextRun({ text: chMg.declaration_mg, italics: true, size: 21, color: '1C1917', font: 'Georgia' }),
              ],
            })
          );
        }
      }
    }

    // Full Verbatim Transcriptions
    if (includeVerbatim && rawData) {
      if (includeEn) {
        children.push(
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 280, after: 120 },
            children: [
              new TextRun({
                text: `COMPLETE VERBATIM ENGLISH TRANSCRIPTION — VIDEO ${video.videoNumber}`,
                bold: true,
                size: 24,
                color: '7C2D12',
                font: 'Georgia',
              }),
            ],
          })
        );

        for (const para of rawData.en_paragraphs) {
          children.push(
            new Paragraph({
              spacing: { after: 110 },
              children: [
                new TextRun({
                  text: para,
                  size: 21,
                  color: '1C1917',
                  font: 'Georgia',
                }),
              ],
            })
          );
        }
      }

      if (includeFr) {
        children.push(
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 280, after: 120 },
            children: [
              new TextRun({
                text: `TRANSCRIPTION INTÉGRALE EN FRANÇAIS — VIDÉO ${video.videoNumber}`,
                bold: true,
                size: 24,
                color: '7C2D12',
                font: 'Georgia',
              }),
            ],
          })
        );

        for (const para of rawData.fr_paragraphs) {
          children.push(
            new Paragraph({
              spacing: { after: 110 },
              children: [
                new TextRun({
                  text: para,
                  size: 21,
                  color: '1C1917',
                  font: 'Georgia',
                }),
              ],
            })
          );
        }
      }

      if (includeMg && rawData.mg_paragraphs) {
        children.push(
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 280, after: 120 },
            children: [
              new TextRun({
                text: `TRANSCRIPTION FENO AMIN'NY TENY MALAGASY — VIDEO ${video.videoNumber}`,
                bold: true,
                size: 24,
                color: '7C2D12',
                font: 'Georgia',
              }),
            ],
          })
        );

        for (const para of rawData.mg_paragraphs) {
          children.push(
            new Paragraph({
              spacing: { after: 110 },
              children: [
                new TextRun({
                  text: para,
                  size: 21,
                  color: '1C1917',
                  font: 'Georgia',
                }),
              ],
            })
          );
        }
      }
    }
  }

  // Scripture Treasury
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
