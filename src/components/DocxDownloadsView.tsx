import React, { useState } from 'react';
import {
  Download,
  FileText,
  FolderArchive,
  CheckCircle2,
  Sparkles,
  Settings2,
  Loader2,
} from 'lucide-react';
import {
  DOCX_PACKAGES_LIST,
  LanguageMode,
  UILang,
} from '../data/spiritualData';
import { ALL_VIDEOS_DATA } from '../data/compendiumData';
import { generateCustomDocxBlob } from '../utils/customDocxBuilder';

interface DocxDownloadsViewProps {
  uiLang: UILang;
  darkMode: boolean;
}

export const DocxDownloadsView: React.FC<DocxDownloadsViewProps> = ({
  uiLang,
  darkMode,
}) => {
  const [customLang, setCustomLang] = useState<LanguageMode>('both');
  const [selectedVideos, setSelectedVideos] = useState<string[]>(
    ALL_VIDEOS_DATA.map((v) => v.id)
  );
  const [includeChapters, setIncludeChapters] = useState<boolean>(true);
  const [includeVerbatim, setIncludeVerbatim] = useState<boolean>(true);
  const [includeScriptureTreasury, setIncludeScriptureTreasury] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedStatus, setGeneratedStatus] = useState<string | null>(null);

  const toggleVideoSelection = (id: string) => {
    setSelectedVideos((prev) =>
      prev.includes(id)
        ? prev.length > 1
          ? prev.filter((v) => v !== id)
          : prev
        : [...prev, id]
    );
  };

  const handleGenerateCustomDocx = async () => {
    setIsGenerating(true);
    setGeneratedStatus(null);
    try {
      const { blob, filename } = await generateCustomDocxBlob({
        languageMode: customLang,
        selectedVideoIds: selectedVideos,
        includeChapters,
        includeVerbatim,
        includeScriptureTreasury,
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setGeneratedStatus(
        uiLang === 'fr'
          ? `Fichier ${filename} généré et téléchargé avec succès !`
          : `Successfully generated and downloaded ${filename}!`
      );
    } catch (err) {
      console.error('Error generating custom DOCX:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const primaryPackages = DOCX_PACKAGES_LIST.filter((p) => p.isPrimary);
  const secondaryPackages = DOCX_PACKAGES_LIST.filter((p) => !p.isPrimary);

  const cardSurface = darkMode
    ? 'bg-[#171F2C] border-[#263246] text-[#F5F2EB]'
    : 'bg-[#F3EDE2]/95 border-[#B48327]/25 text-[#1C1917]';

  const mainSurface = darkMode
    ? 'bg-[#121822] border-[#263246] text-[#F5F2EB]'
    : 'bg-[#FBF8F3] border-[#B48327]/25 text-[#1C1917]';

  const subText = darkMode ? 'text-[#A8A29E]' : 'text-[#57534E]';

  return (
    <div className="space-y-10">
      {/* Header Banner */}
      <div className={`rounded-3xl border p-6 sm:p-10 ${cardSurface} shadow-sm space-y-4`}>
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#B48327]">
          <FolderArchive className="w-4 h-4" />
          {uiLang === 'fr'
            ? 'Pack Téléchargeable Microsoft Word (.DOCX) des Transcriptions (EN & FR)'
            : 'Downloadable Microsoft Word (.DOCX) Transcription Package (EN & FR)'}
        </span>
        <h2 className="font-display text-2xl sm:text-4xl font-bold">
          {uiLang === 'fr'
            ? 'Téléchargez Toutes les Transcriptions en Format .DOCX (Anglais & Français)'
            : 'Download All Video Transcriptions in .DOCX Format (English & French)'}
        </h2>
        <p className={`text-sm ${subText} max-w-3xl leading-relaxed`}>
          {uiLang === 'fr'
            ? 'Choisissez le Pack Maître Bilingue (.docx), l’archive complète (.zip contenant les 6 fichiers .docx), une édition par langue (Anglais seul ou Français seul), un manuel par vidéo, ou composez votre propre document Word sur mesure.'
            : 'Download the Complete Bilingual Master Volume (.docx), the All-in-One Archive Bundle (.zip containing all 6 .docx files), single-language editions (English only or French only), individual video manuals, or build a custom .docx below.'}
        </p>

        {/* Primary Featured Downloads */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-3">
          {primaryPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-2xl border-2 border-[#B48327] p-6 ${mainSurface} shadow-md flex flex-col justify-between space-y-4`}
            >
              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#B48327] text-white">
                    {uiLang === 'fr' ? pkg.badge_fr : pkg.badge_en}
                  </span>
                  <span className="font-mono-code text-xs font-semibold text-[#7C2D12] dark:text-[#D4AF37]">
                    {pkg.sizeLabel} • {pkg.languages}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold leading-snug">
                  {uiLang === 'fr' ? pkg.title_fr : pkg.title_en}
                </h3>
                <p className={`text-xs ${subText} leading-relaxed`}>
                  {uiLang === 'fr' ? pkg.description_fr : pkg.description_en}
                </p>
                <p className="font-mono-code text-[11px] text-[#B48327] truncate">
                  {pkg.filename}
                </p>
              </div>

              <div className="pt-2">
                <a
                  href={pkg.href}
                  download={pkg.filename}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-[#B48327] text-white hover:bg-[#9A6E1E] transition shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  {uiLang === 'fr'
                    ? `Télécharger ${pkg.filename.endsWith('.zip') ? 'le Pack .ZIP' : 'le .DOCX Maître'}`
                    : `Download ${pkg.filename.endsWith('.zip') ? 'Full .ZIP Package' : 'Master .DOCX'}`}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Individual Language & Video DOCX Files */}
      <div className="space-y-4">
        <h3 className="font-display text-2xl font-bold flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#B48327]" />
          {uiLang === 'fr'
            ? 'Éditions par Langue (EN / FR) & par Vidéo Individuelle (.DOCX)'
            : 'Language-Specific (EN / FR) & Individual Video Editions (.DOCX)'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {secondaryPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-2xl border p-5 ${cardSurface} flex flex-col justify-between space-y-4 shadow-sm hover:border-[#B48327]/50 transition`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#7C2D12] text-amber-100">
                    {uiLang === 'fr' ? pkg.badge_fr : pkg.badge_en}
                  </span>
                  <span className="font-mono-code text-[11px] font-semibold text-[#B48327]">
                    {pkg.sizeLabel}
                  </span>
                </div>
                <h4 className="font-display text-xl font-bold leading-snug">
                  {uiLang === 'fr' ? pkg.title_fr : pkg.title_en}
                </h4>
                <p className={`text-xs ${subText} leading-relaxed`}>
                  {uiLang === 'fr' ? pkg.description_fr : pkg.description_en}
                </p>
              </div>

              <div className="pt-3 border-t border-[#B48327]/15 flex items-center justify-between gap-2">
                <span className="font-mono-code text-[11px] text-[#7C2D12] dark:text-[#D4AF37] font-semibold">
                  {pkg.languages}
                </span>
                <a
                  href={pkg.href}
                  download={pkg.filename}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#B48327] text-white hover:bg-[#9A6E1E] transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  {uiLang === 'fr' ? 'Télécharger .DOCX' : 'Download .DOCX'}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Custom DOCX Package Builder */}
      <div className={`rounded-3xl border p-6 sm:p-8 ${mainSurface} shadow-sm space-y-6`}>
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#B48327]">
            <Settings2 className="w-3.5 h-3.5" />
            {uiLang === 'fr'
              ? 'Générateur Interactif de Document .DOCX sur Mesure'
              : 'Interactive Custom .DOCX Package Builder'}
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold">
            {uiLang === 'fr'
              ? 'Composez Votre Propre Manuel Word (.DOCX)'
              : 'Build & Download a Customized .DOCX Transcription Manual'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1: Choose Language */}
          <div className={`p-4 rounded-2xl border ${cardSurface} space-y-3`}>
            <h4 className="font-display font-bold text-lg text-[#B48327]">
              1. {uiLang === 'fr' ? 'Langue des Transcriptions' : 'Transcription Language'}
            </h4>
            <div className="space-y-2">
              {(
                [
                  { id: 'both', label_en: 'English + Français (Bilingual)', label_fr: 'Anglais + Français (Bilingue)' },
                  { id: 'en', label_en: 'English Only (EN)', label_fr: 'Anglais Uniquement (EN)' },
                  { id: 'fr', label_en: 'Français Only (FR)', label_fr: 'Français Uniquement (FR)' },
                ] as const
              ).map((opt) => (
                <label
                  key={opt.id}
                  className="flex items-center gap-2.5 text-xs font-semibold cursor-pointer"
                >
                  <input
                    type="radio"
                    name="customLang"
                    checked={customLang === opt.id}
                    onChange={() => setCustomLang(opt.id)}
                    className="accent-[#B48327]"
                  />
                  <span>{uiLang === 'fr' ? opt.label_fr : opt.label_en}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Step 2: Choose Videos */}
          <div className={`p-4 rounded-2xl border ${cardSurface} space-y-3`}>
            <h4 className="font-display font-bold text-lg text-[#B48327]">
              2. {uiLang === 'fr' ? 'Vidéos à Inclure (9 Sessions)' : 'Videos to Include (9 Sessions)'}
            </h4>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {ALL_VIDEOS_DATA.map((v) => (
                <label
                  key={v.id}
                  className="flex items-start gap-2.5 text-xs font-medium cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedVideos.includes(v.id)}
                    onChange={() => toggleVideoSelection(v.id)}
                    className="mt-0.5 accent-[#B48327]"
                  />
                  <span className="line-clamp-2">
                    <strong>Video {v.videoNumber}:</strong>{' '}
                    {uiLang === 'fr' ? v.title_fr : v.title_en} ({v.duration})
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Step 3: Sections to Include */}
          <div className={`p-4 rounded-2xl border ${cardSurface} space-y-3`}>
            <h4 className="font-display font-bold text-lg text-[#B48327]">
              3. {uiLang === 'fr' ? 'Sections du Document' : 'Document Sections'}
            </h4>
            <div className="space-y-2">
              <label className="flex items-center gap-2.5 text-xs font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeChapters}
                  onChange={(e) => setIncludeChapters(e.target.checked)}
                  className="accent-[#B48327]"
                />
                <span>
                  {uiLang === 'fr'
                    ? 'Chapitres Structurés & Décrets Prophétiques'
                    : 'Structured Chapters & Prophetic Decrees'}
                </span>
              </label>
              <label className="flex items-center gap-2.5 text-xs font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeVerbatim}
                  onChange={(e) => setIncludeVerbatim(e.target.checked)}
                  className="accent-[#B48327]"
                />
                <span>
                  {uiLang === 'fr'
                    ? 'Transcriptions Verbatim Intégrales (Mot-à-Mot)'
                    : 'Complete Unabridged Verbatim Transcripts'}
                </span>
              </label>
              <label className="flex items-center gap-2.5 text-xs font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeScriptureTreasury}
                  onChange={(e) => setIncludeScriptureTreasury(e.target.checked)}
                  className="accent-[#B48327]"
                />
                <span>
                  {uiLang === 'fr'
                    ? 'Concordance Biblique (KJV & Louis Segond)'
                    : 'Bilingual Scripture Concordance (KJV & LSG)'}
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <button
            type="button"
            disabled={isGenerating}
            onClick={handleGenerateCustomDocx}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-[#7C2D12] text-amber-100 hover:bg-[#63220D] transition shadow-md disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {uiLang === 'fr' ? 'Génération du .DOCX...' : 'Generating Custom .DOCX...'}
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                {uiLang === 'fr'
                  ? 'Générer & Télécharger mon .DOCX Personnalisé'
                  : 'Generate & Download Custom .DOCX'}
              </>
            )}
          </button>

          {generatedStatus && (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              {generatedStatus}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
