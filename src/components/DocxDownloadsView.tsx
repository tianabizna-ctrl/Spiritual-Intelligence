import React, { useMemo, useState } from 'react';
import {
  Download,
  FileText,
  Search,
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
import { LIBRARY_TRANSCRIPTS, type LibraryTranscript } from '../data/libraryTranscripts';
import { generateCustomDocxBlob } from '../utils/customDocxBuilder';

interface DocxDownloadsViewProps {
  uiLang: UILang;
  darkMode: boolean;
}

export const DocxDownloadsView: React.FC<DocxDownloadsViewProps> = ({
  uiLang,
  darkMode,
}) => {
  const [customLang, setCustomLang] = useState<LanguageMode>(uiLang);
  const allTranscripts = useMemo<LibraryTranscript[]>(
    () => Object.values(LIBRARY_TRANSCRIPTS).sort((a, b) => a.title.localeCompare(b.title)),
    []
  );
  // Default to a small, fast bundle rather than all 844 transcripts.
  const [selectedVideos, setSelectedVideos] = useState<string[]>(
    allTranscripts.slice(0, 3).map((t) => t.key)
  );
  const [videoQuery, setVideoQuery] = useState('');
  const filteredTranscripts = useMemo(() => {
    const q = videoQuery.trim().toLowerCase();
    if (!q) return allTranscripts.slice(0, 300);
    return allTranscripts
      .filter((t) => t.title.toLowerCase().includes(q) || t.channel.toLowerCase().includes(q))
      .slice(0, 300);
  }, [allTranscripts, videoQuery]);
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
        uiLang === 'mg'
          ? `Rakitra ${filename} voaforona sy voasintona soa aman-tsara!`
          : uiLang === 'fr'
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
    <div className="space-y-8">
      {/* Header Banner */}
      <div className={`rounded-3xl border p-5 sm:p-8 ${cardSurface} shadow-sm space-y-4`}>
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#B48327]">
          <FolderArchive className="w-4 h-4" />
          {uiLang === 'mg'
            ? 'Rakitra Microsoft Word (.DOCX) Azo Sintomina (EN • FR • MG)'
            : uiLang === 'fr'
            ? 'Pack Téléchargeable Microsoft Word (.DOCX) des Transcriptions (EN • FR • MG)'
            : 'Downloadable Microsoft Word (.DOCX) Transcription Package (EN • FR • MG)'}
        </span>
        <h2 className="font-display text-2xl sm:text-3xl font-bold">
          {uiLang === 'mg'
            ? 'Sintomy ny Vavaka sy Transcriptions Rehetra amin’ny Endrika .DOCX (Anglisy, Frantsay & Malagasy)'
            : uiLang === 'fr'
            ? 'Téléchargez Toutes les Transcriptions en Format .DOCX (Anglais, Français & Malgache)'
            : 'Download All Video Transcriptions in .DOCX Format (English, French & Malagasy)'}
        </h2>
        <p className={`text-sm ${subText} max-w-3xl leading-relaxed`}>
          {uiLang === 'mg'
            ? 'Safidio ny Boky Feno (.docx), ny fonosana .zip feno, ny boky amin’ny teny Malagasy irery (MG), Anglisy irery (EN), na Frantsay irery (FR), na manamboara rakitra Word (.docx) manokana eto ambany.'
            : uiLang === 'fr'
            ? 'Choisissez le Pack Maître (.docx), l’archive complète (.zip), une édition par langue (Anglais, Français ou Malgache), un manuel par vidéo, ou composez votre propre document Word sur mesure.'
            : 'Download the Complete Master Volume (.docx), the All-in-One Archive Bundle (.zip), single-language editions (English, French, or Malagasy), individual video manuals, or build a custom .docx below.'}
        </p>

        {/* Primary Featured Downloads */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
          {primaryPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-2xl border-2 border-[#B48327] p-5 ${mainSurface} shadow-md flex flex-col justify-between space-y-4`}
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#B48327] text-white">
                    {uiLang === 'fr' ? pkg.badge_fr : pkg.badge_en}
                  </span>
                  <span className="font-mono-code text-xs font-semibold text-[#7C2D12] dark:text-[#D4AF37]">
                    {pkg.sizeLabel} • {pkg.languages}
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold leading-snug">
                  {uiLang === 'fr' ? pkg.title_fr : pkg.title_en}
                </h3>
                <p className={`text-xs ${subText} leading-relaxed`}>
                  {uiLang === 'fr' ? pkg.description_fr : pkg.description_en}
                </p>
                <p className="font-mono-code text-[11px] text-[#B48327] truncate">
                  {pkg.filename}
                </p>
              </div>

              <div className="pt-1">
                <a
                  href={pkg.href}
                  download={pkg.filename}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-[#B48327] text-white hover:bg-[#9A6E1E] transition shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  {uiLang === 'mg'
                    ? `Sintomy ${pkg.filename.endsWith('.zip') ? 'ny Fonosana .ZIP' : 'ny .DOCX Feno'}`
                    : uiLang === 'fr'
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
        <h3 className="font-display text-xl sm:text-2xl font-bold flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#B48327]" />
          {uiLang === 'mg'
            ? 'Boky isaky ny Fiteny (EN / FR / MG) & isaky ny Video (.DOCX)'
            : uiLang === 'fr'
            ? 'Éditions par Langue (EN / FR / MG) & par Vidéo Individuelle (.DOCX)'
            : 'Language-Specific (EN / FR / MG) & Individual Video Editions (.DOCX)'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {secondaryPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-2xl border p-4 sm:p-5 ${cardSurface} flex flex-col justify-between space-y-4 shadow-sm hover:border-[#B48327]/50 transition`}
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
                <h4 className="font-display text-lg sm:text-xl font-bold leading-snug">
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
                  {uiLang === 'mg'
                    ? 'Sintomy .DOCX'
                    : uiLang === 'fr'
                    ? 'Télécharger .DOCX'
                    : 'Download .DOCX'}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Custom DOCX Package Builder */}
      <div className={`rounded-3xl border p-5 sm:p-8 ${mainSurface} shadow-sm space-y-6`}>
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#B48327]">
            <Settings2 className="w-3.5 h-3.5" />
            {uiLang === 'mg'
              ? 'Fanamboarana Rakitra .DOCX Manokana (EN / FR / MG)'
              : uiLang === 'fr'
              ? 'Générateur Interactif de Document .DOCX sur Mesure'
              : 'Interactive Custom .DOCX Package Builder'}
          </span>
          <h3 className="font-display text-xl sm:text-3xl font-bold">
            {uiLang === 'mg'
              ? 'Manamboara sy Sintomy Rakitra Word (.DOCX) araka ny Safidinao'
              : uiLang === 'fr'
              ? 'Composez Votre Propre Manuel Word (.DOCX)'
              : 'Build & Download a Customized .DOCX Transcription Manual'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Step 1: Choose Language */}
          <div className={`p-4 rounded-2xl border ${cardSurface} space-y-3`}>
            <h4 className="font-display font-bold text-base sm:text-lg text-[#B48327]">
              1.{' '}
              {uiLang === 'mg'
                ? 'Fiteny ao anatin’ny .DOCX'
                : uiLang === 'fr'
                ? 'Langue des Transcriptions'
                : 'Transcription Language'}
            </h4>
            <div className="space-y-2">
              {(
                [
                  {
                    id: 'en',
                    label_en: '🇬🇧 English Only (EN)',
                    label_fr: '🇬🇧 Anglais Uniquement (EN)',
                    label_mg: '🇬🇧 Anglisy Irery (EN)',
                  },
                  {
                    id: 'fr',
                    label_en: '🇫🇷 Français Only (FR)',
                    label_fr: '🇫🇷 Français Uniquement (FR)',
                    label_mg: '🇫🇷 Frantsay Irery (FR)',
                  },
                  {
                    id: 'mg',
                    label_en: '🇲🇬 Malagasy Only (MG)',
                    label_fr: '🇲🇬 Malgache Uniquement (MG)',
                    label_mg: '🇲🇬 Malagasy Irery (MG)',
                  },
                  {
                    id: 'both',
                    label_en: '🌍 All 3 Languages (EN + FR + MG)',
                    label_fr: '🌍 Les 3 Langues (EN + FR + MG)',
                    label_mg: '🌍 Fiteny 3 miaraka (EN + FR + MG)',
                  },
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
                  <span>
                    {uiLang === 'mg'
                      ? opt.label_mg
                      : uiLang === 'fr'
                      ? opt.label_fr
                      : opt.label_en}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Step 2: Choose Videos */}
          <div className={`p-4 rounded-2xl border ${cardSurface} space-y-3`}>
            <h4 className="font-display font-bold text-base sm:text-lg text-[#B48327]">
              2.{' '}
              {uiLang === 'mg'
                ? `Transcription Hampidirina (${allTranscripts.length.toLocaleString()})`
                : uiLang === 'fr'
                ? `Transcriptions à Inclure (${allTranscripts.length.toLocaleString()})`
                : `Transcripts to Include (${allTranscripts.length.toLocaleString()})`}
            </h4>
            <div className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border ${cardSurface}`}>
              <Search className="w-3.5 h-3.5 text-[#B48327] shrink-0" />
              <input
                value={videoQuery}
                onChange={(e) => setVideoQuery(e.target.value)}
                placeholder={
                  uiLang === 'mg'
                    ? 'Karohy lohateny…'
                    : uiLang === 'fr'
                    ? 'Rechercher un titre…'
                    : 'Search titles…'
                }
                className="flex-1 bg-transparent text-xs outline-none placeholder:opacity-60"
              />
            </div>
            <p className="text-[11px] font-semibold text-[#B48327]">
              {selectedVideos.length.toLocaleString()} selected
            </p>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {filteredTranscripts.map((tr) => (
                <label key={tr.key} className="flex items-start gap-2.5 text-xs font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedVideos.includes(tr.key)}
                    onChange={() => toggleVideoSelection(tr.key)}
                    className="mt-0.5 accent-[#B48327]"
                  />
                  <span className="line-clamp-2">
                    {tr.title}{' '}
                    <span className="opacity-60">({tr.wordCount.toLocaleString()}w)</span>
                  </span>
                </label>
              ))}
              {filteredTranscripts.length === 0 && (
                <p className="text-xs opacity-60">No transcript matches that search.</p>
              )}
            </div>
          </div>

          {/* Step 3: Sections to Include */}
          <div className={`p-4 rounded-2xl border ${cardSurface} space-y-3`}>
            <h4 className="font-display font-bold text-base sm:text-lg text-[#B48327]">
              3.{' '}
              {uiLang === 'mg'
                ? 'Fizarana ao anatin’ny Boky'
                : uiLang === 'fr'
                ? 'Sections du Document'
                : 'Document Sections'}
            </h4>
            <div className="space-y-2">
              <label className="flex items-center gap-2.5 text-xs font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeScriptureTreasury}
                  onChange={(e) => setIncludeScriptureTreasury(e.target.checked)}
                  className="accent-[#B48327]"
                />
                <span>
                  {uiLang === 'mg'
                    ? 'Tahirin’ny Soratra Masina (KJV, LSG & Baiboly MG)'
                    : uiLang === 'fr'
                    ? 'Concordance Biblique (KJV, LSG & MG)'
                    : 'Scripture Concordance (KJV, LSG & MG)'}
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
                {uiLang === 'mg'
                  ? 'Eo am-panamboarana ny .DOCX...'
                  : uiLang === 'fr'
                  ? 'Génération du .DOCX...'
                  : 'Generating Custom .DOCX...'}
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                {uiLang === 'mg'
                  ? 'Amboary sy Sintomy ny .DOCX'
                  : uiLang === 'fr'
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
