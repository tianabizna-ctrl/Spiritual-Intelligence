import {
  AlignmentType,
  BorderStyle,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
} from 'docx';
import { VIDEOS_DATA, SCRIPTURE_TREASURY, LanguageMode } from '../data/spiritualData';
import { RAW_TRANSCRIPTS } from '../data/rawTranscripts';

export interface CustomDocxOptions {
  languageMode: LanguageMode; // 'both' | 'en' | 'fr'
  selectedVideoIds: string[];
  includeChapters: boolean;
  includeVerbatim: boolean;
  includeScriptureTreasury: boolean;
}

export async function generateCustomDocxBlob(options: CustomDocxOptions): Promise<{ blob: Blob; filename: string }> {
  const {
    languageMode,
    selectedVideoIds,
    includeChapters,
    includeVerbatim,
    includeScriptureTreasury,
  } = options;

  const includeEn = languageMode === 'both' || languageMode === 'en';
  const includeFr = languageMode === 'both' || languageMode === 'fr';

  const selectedVideos = VIDEOS_DATA.filter((v) => selectedVideoIds.includes(v.id));
  const children: Paragraph[] = [];

  // Title Header
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 140 },
      children: [
        new TextRun({
          text: '✦  SPIRITUAL INTELLIGENCE  •  INTELLIGENCE SPIRITUELLE  ✦',
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
            languageMode === 'fr'
              ? 'Recueil Sacré des Transcriptions Vidéo, Prières Prophétiques & Méditations'
              : languageMode === 'en'
              ? 'Sacred Compendium of Video Transcriptions, Prophetic Prayers & Devotionals'
              : 'Bilingual Compendium of Video Transcriptions, Prayers & Devotionals (EN / FR)',
          bold: true,
          size: 36,
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
            languageMode === 'both' ? 'English & Français (Bilingual)' : languageMode === 'en' ? 'English Only' : 'Français Seulement'
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

    // Video Heading
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 360, after: 120 },
        children: [
          new TextRun({
            text: `VIDEO ${video.videoNumber}: ${includeEn ? video.title_en : video.title_fr}`,
            bold: true,
            size: 28,
            color: '1E293B',
            font: 'Georgia',
          }),
        ],
      })
    );

    if (includeEn && includeFr) {
      children.push(
        new Paragraph({
          spacing: { after: 120 },
          children: [
            new TextRun({
              text: `Titre Français : ${video.title_fr}`,
              bold: true,
              italics: true,
              size: 22,
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
                languageMode === 'fr'
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
        children.push(
          new Paragraph({
            spacing: { before: 180, after: 80 },
            children: [
              new TextRun({
                text: `${ch.number}. [${ch.timestamp}] ${includeEn ? ch.title_en : ch.title_fr}`,
                bold: true,
                size: 22,
                color: '1C1917',
                font: 'Georgia',
              }),
              ...(includeEn && includeFr
                ? [
                    new TextRun({
                      text: `  /  ${ch.title_fr}`,
                      italics: true,
                      size: 21,
                      color: '57534E',
                      font: 'Georgia',
                    }),
                  ]
                : []),
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
              spacing: { after: 120 },
              children: [
                new TextRun({ text: 'Décret Prophétique (FR) : ', bold: true, size: 20, color: 'B48327', font: 'Georgia' }),
                new TextRun({ text: ch.declaration_fr, italics: true, size: 21, color: '1C1917', font: 'Georgia' }),
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
              languageMode === 'fr'
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
      children.push(
        new Paragraph({
          spacing: { before: 160, after: 60 },
          children: [
            new TextRun({
              text: `${includeEn ? sc.reference_en : sc.reference_fr} — ${includeEn ? sc.theme_en : sc.theme_fr}`,
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
            spacing: { after: 80 },
            children: [
              new TextRun({ text: 'LSG (FR) : ', bold: true, size: 20, color: 'B48327', font: 'Georgia' }),
              new TextRun({ text: `« ${sc.lsg_fr} »`, italics: true, size: 20, color: '1C1917', font: 'Georgia' }),
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
  const langSuffix = languageMode === 'both' ? 'EN_FR' : languageMode.toUpperCase();
  const filename = `Spiritual_Intelligence_Custom_Transcriptions_${langSuffix}.docx`;
  return { blob, filename };
}
