#!/usr/bin/env python3
"""
Generates the downloadable Microsoft Word (.docx) transcription packages
for the Spiritual Intelligence web application (English & French).
"""
import os
import shutil
import zipfile
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH


ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW_DIR = os.path.join(ROOT_DIR, "data", "raw_transcripts")
PUBLIC_DOWNLOADS = os.path.join(ROOT_DIR, "public", "downloads")
REPO_DOWNLOADS = os.path.join(ROOT_DIR, "downloads")


def read_raw(filename: str) -> str:
    path = os.path.join(RAW_DIR, filename)
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    # Extract body after the --- marker if present
    for marker in ["--- RAW TRANSCRIPT ---", "--- TRANSCRIPTION COMPLÈTE EN FRANÇAIS ---"]:
        if marker in content:
            content = content.split(marker, 1)[1].strip()
    return content


VIDEOS_META = [
    {
        "num": 1,
        "id": "4YElIs15_Ak",
        "url": "https://www.youtube.com/watch?v=4YElIs15_Ak&list=PLaptSPguGlRafSbwyTRdhKBc9axh9znP7",
        "playlist": "PLaptSPguGlRafSbwyTRdhKBc9axh9znP7",
        "title_en": "[POWERFUL 🔥] COMMAND YOUR DAY IN TOTAL VICTORY BY DECLARING THESE POWERFUL PRAYER | JOSHUA SELMAN",
        "title_fr": "[PUISSANT 🔥] COMMANDEZ VOTRE JOURNÉE DANS UNE VICTOIRE TOTALE EN DÉCLARANT CES PUISSANTES PRIÈRES | JOSHUA SELMAN",
        "channel": "Prayer By Grace (@PrayerByGrace) • Apostle Joshua Selman",
        "duration": "1:24:44",
        "uploaded": "2026-11-14",
        "summary_en": (
            "An intensive two-part prophetic prayer and spiritual warfare session. Part I focuses on "
            "commanding the morning before dawn (Job 38:12-13, Psalm 5:3), breaking generational yokes "
            "(Isaiah 10:27), consuming evil altars by fire, blotting out ancestral covenants (Colossians 2:14-15), "
            "exposing household wickedness (Micah 7:6), canceling evil dreams, possessing possessions "
            "(Obadiah 1:17), restoring glory (Isaiah 60:1), family salvation, marital restoration, financial "
            "breakthrough, divine healing, angelic deployment, restoring wasted years (Joel 2:25), and sealing the "
            "day with a wall of fire (Zechariah 2:5). Part II is a Midnight 'Back to Sender' and Total Recovery "
            "watch rooted in Esther 7:10, Psalm 7:15-16, Isaiah 54:17, and Psalm 124:7."
        ),
        "summary_fr": (
            "Une session intense de prière prophétique et de combat spirituel en deux parties. La Partie I "
            "porte sur l'autorité pour commander au matin dès l'aube (Job 38:12-13, Psaume 5:4), la destruction "
            "des jougs par l'onction (Ésaïe 10:27), l'embrasement des autels maléfiques, l'effacement des "
            "alliances ancestrales (Colossiens 2:14-15), la victoire sur les oppressions nocturnes, la prise de "
            "possession (Abdias 1:17), la restauration de la gloire (Ésaïe 60:1), le salut de la famille, la "
            "percée conjugale et financière, la guérison divine, le ministère des anges et la restauration des "
            "années dévorées (Joël 2:25). La Partie II est une veille de minuit « Retour à l'envoyeur » et de "
            "récupération totale fondée sur Esther 7:10, Psaume 7:16-17, Ésaïe 54:17 et Psaume 124:7."
        ),
        "scriptures": (
            "Job 38:12-13 • Psalm 5:3 • Psalm 121 • Exodus 14:24 • Isaiah 10:27 • Isaiah 49:24-26 • "
            "Colossians 2:14-15 • Galatians 3:13 • Micah 7:6-8 • Psalm 68:1-2 • Psalm 91:5-8 • Obadiah 1:15-17 • "
            "Matthew 16:19 • Isaiah 60:1-3 • Lamentations 3:22-23 • Genesis 2:18 • Exodus 23:25-26 • Haggai 1:6 • "
            "Malachi 3:11 • Psalm 24:7 • Deuteronomy 28:7,12 • Jeremiah 30:17 • Isaiah 40:31 • Psalm 34:7 • "
            "2 Kings 19:35 • Psalm 35:5-8 • Exodus 15:3 • Numbers 23:23 • Joel 2:25 • Psalm 90:14 • Zechariah 2:5 • "
            "Revelation 12:11 • Isaiah 54:15-17 • Luke 10:19 • Psalm 46:5 • Psalm 30:5 • Esther 7:10 • "
            "Psalm 7:15-16 • Psalm 124:7 • Proverbs 26:27 • Psalm 9:16 • Matthew 12:29 • Galatians 6:17 • "
            "2 Thessalonians 1:6 • Psalm 113:9 • Deuteronomy 8:18 • Deuteronomy 2:3 • Revelation 3:7 • "
            "Isaiah 53:5 • 2 Kings 6:17 • Daniel 6:24 • 1 Kings 18:46 • Isaiah 43:18-19 • Isaiah 59:19 • "
            "Psalm 18:37-40 • Psalm 57:6"
        ),
        "en_file": "video1_4YElIs15_Ak_en_raw.txt",
        "fr_file": "video1_4YElIs15_Ak_fr_raw.txt",
        "docx_filename": "Video_1_Command_Your_Day_Joshua_Selman_EN_FR.docx",
    },
    {
        "num": 2,
        "id": "XWBUBtEv70A",
        "url": "https://www.youtube.com/watch?v=XWBUBtEv70A&list=PLK2jIf_WJT5V87ZUiLy8Q0GKet4T-AzRz&index=2",
        "playlist": "PLK2jIf_WJT5V87ZUiLy8Q0GKet4T-AzRz",
        "title_en": "Call on the Name of Jesus and Watch God Work Today | Morning Prayer",
        "title_fr": "Invoquez le Nom de Jésus et Regardez Dieu Agir Aujourd'hui | Prière du Matin",
        "channel": "Grace Enclave (@graceenclave)",
        "duration": "09:02",
        "uploaded": "2025-08-09",
        "summary_en": (
            "A contemplative, Scripture-anchored morning devotional prayer of gratitude for the gift of life and "
            "unseen night protection, wise stewardship of daily hours, heartfelt confession and cleansing, "
            "total surrender of plans (Proverbs 3:5-6), petition for spiritual wisdom and a sound mind "
            "(2 Timothy 1:7), compassionate intercession for family, friends, the sick, the grieving, and the "
            "poor, heavenly citizenship perspective (Philippians 3:20), Christlike humility, and abiding in the "
            "True Vine (John 15:5)."
        ),
        "summary_fr": (
            "Une prière matinale contemplative et enracinée dans les Écritures : gratitude pour le souffle de "
            "vie et la protection nocturne, intendance sage des heures du jour, confession sincère et "
            "purification du cœur, abandon total des projets entre les mains de Dieu (Proverbes 3:5-6), demande "
            "de sagesse spirituelle et de paix intérieure (2 Timothée 1:7), intercession compatissante pour les "
            "proches, les malades, les affligés et les démunis, perspective céleste (Philippiens 3:20), humilité "
            "et communion intime avec le Cep véritable (Jean 15:5)."
        ),
        "scriptures": (
            "Matthew 5:45 • Lamentations 3:22-23 • Psalm 121:3-4 • Psalm 90:12 • Psalm 139:23-24 • "
            "1 John 1:9 • Proverbs 3:5-6 • 2 Corinthians 5:7 • 2 Timothy 1:7 • Philippians 3:20 • "
            "Philippians 2:3 • Colossians 4:6 • John 15:5 • Psalm 5:3"
        ),
        "en_file": "video2_XWBUBtEv70A_en_raw.txt",
        "fr_file": "video2_XWBUBtEv70A_fr_raw.txt",
        "docx_filename": "Video_2_Call_On_The_Name_Of_Jesus_Morning_Prayer_EN_FR.docx",
    },
    {
        "num": 3,
        "id": "45wUm7wffBQ",
        "url": "https://www.youtube.com/watch?v=45wUm7wffBQ&list=PL-7eNLWzLZIDACNgNtZWapz_j-TBF4bqs",
        "playlist": "PL-7eNLWzLZIDACNgNtZWapz_j-TBF4bqs",
        "title_en": "6:45 AM #prayer 10 POWERFUL MORNING DECLARATIONS WITH APOSTLE JOSHUA SELMAN",
        "title_fr": "6h45 #prière 10 PUISSANTES DÉCLARATIONS MATINALES AVEC L'APÔTRE JOSHUA SELMAN",
        "channel": "OVERCOMING DAILY (@therealovercomingdaily) • Apostle Joshua Selman",
        "duration": "29:12",
        "uploaded": "2023-09-11",
        "summary_en": (
            "Ten apostolic morning declarations and scriptural expositions led by Apostle Joshua Selman: "
            "(1) Supernatural Lifting & Glory (Psalm 3:1-3); (2) Breaking the Iron Gates of Visibility & Influence "
            "(Acts 12:4-10); (3) Deliverance from Delay & Impartation of Elijah's Supernatural Speed (1 Kings 18:46); "
            "(4) Breaking the Rod of the Wicked over the Righteous (Psalm 125:3); (5) Covenant Immunity with the "
            "Stones of the Field against Enchantment (Job 5:19-23); (6) Peace Always and By All Means "
            "(2 Thessalonians 3:16); (7) Ministry of Destiny Helpers & Strangers Feeding Your Flocks like "
            "Mephibosheth (Isaiah 61:1-5, 2 Samuel 9); (8) Priestly Intercession for the Nation with Spiritual "
            "Intelligence (Psalm 122:6, Esther 4:13-16); (9) Prophetic Decrees of Open Doors, Breaking Negative "
            "Family Patterns, Jabez Expansion & Supernatural Favor (1 Chronicles 4:9-10); and (10) Rekindling "
            "Spiritual Hunger, Guarding Unspeakable Joy Against Offense, Business Wonders & the Transferable "
            "Mantle of Honor (Isaiah 12:3, Psalm 1:3, Numbers 27:18-20)."
        ),
        "summary_fr": (
            "Dix déclarations matinales apostoliques et expositions bibliques conduites par l'Apôtre Joshua Selman : "
            "(1) Élévation surnaturelle et gloire (Psaume 3:1-4) ; (2) Brisement des portes de fer de la visibilité "
            "et de l'influence (Actes 12:4-10) ; (3) Délivrance du retard et vitesse surnaturelle d'Élie "
            "(1 Rois 18:46) ; (4) Brisement du sceptre de la méchanceté (Psaume 125:3) ; (5) Immunité d'alliance "
            "avec les pierres des champs contre tout enchantement (Job 5:19-23) ; (6) La paix en tout temps et de "
            "toute manière (2 Thessaloniciens 3:16) ; (7) Ministère des aides de destinée et des étrangers qui "
            "paissent vos troupeaux comme pour Mephiboscheth (Ésaïe 61:1-5, 2 Samuel 9) ; (8) Intercession "
            "sacerdotale pour la nation avec intelligence spirituelle (Psaume 122:6, Esther 4:13-16) ; (9) Décrets "
            "prophétiques de portes ouvertes, rupture des cycles familiaux négatifs, élargissement de Jaebets et "
            "faveur surnaturelle (1 Chroniques 4:9-10) ; et (10) Réveil de la faim spirituelle, sauvegarde de la "
            "joie ineffable contre l'offense, prodiges dans les affaires et transfert du manteau d'honneur "
            "(Ésaïe 12:3, Psaume 1:3, Nombres 27:18-20)."
        ),
        "scriptures": (
            "Psalm 3:1-3 • Acts 12:4-10 • Isaiah 45:2 • Matthew 25:1-5 • 1 Kings 18:46 • Psalm 125:3 • "
            "Job 5:19-23 • 2 Thessalonians 3:16 • Isaiah 61:1-5 • 2 Samuel 9:1-11 • Psalm 122:6 • "
            "Esther 4:13-16 • Romans 4:17 • 1 Chronicles 4:9-10 • Zechariah 12:10 • Isaiah 12:3 • "
            "1 Peter 1:8 • Psalm 1:3 • Numbers 27:18-20"
        ),
        "en_file": "video3_45wUm7wffBQ_en_raw.txt",
        "fr_file": "video3_45wUm7wffBQ_fr_raw.txt",
        "docx_filename": "Video_3_10_Powerful_Morning_Declarations_Joshua_Selman_EN_FR.docx",
    },
    {
        "num": 4,
        "id": "HQzfk0DMgCo",
        "url": "https://www.youtube.com/watch?v=HQzfk0DMgCo&list=PLaptSPguGlRafSbwyTRdhKBc9axh9znP7&index=2",
        "playlist": "PLaptSPguGlRafSbwyTRdhKBc9axh9znP7",
        "title_en": "SPEAK FIRE INTO THE NEW MONTH BEFORE THE ENEMY DOES | APOSTLE JOSHUA SELMAN",
        "title_fr": "PROCLAMEZ LE FEU DANS LE NOUVEAU MOIS AVANT QUE L'ENNEMI NE LE FASSE | APÔTRE JOSHUA SELMAN",
        "channel": "Prayer By Grace (@PrayerByGrace) • Apostle Joshua Selman",
        "duration": "41:17",
        "uploaded": "2026-10-29",
        "summary_en": "Speaking first in the courts of heaven over the new month (Job 22:28), breaking yokes (Isaiah 10:27), overthrowing ancestral altars (Judges 6:25), possessing stolen glory (Obadiah 1:17), covering household and marriage (Joshua 24:15), unlocking financial gates (Psalm 24:7), claiming healing (Isaiah 53:5), and prophesying over all four weeks of the month.",
        "summary_fr": "Parler le premier dans les parvis célestes sur le nouveau mois (Job 22:28), briser les jougs (Ésaïe 10:27), renverser les autels familiaux (Juges 6:25), reprendre ses possessions (Abdias 1:17), couvrir sa maison (Josué 24:15), ouvrir les portes financières (Psaume 24:7), saisir la guérison (Ésaïe 53:5) et prophétiser sur les quatre semaines du mois.",
        "scriptures": "Job 22:28 • Proverbs 18:21 • Isaiah 10:27 • Judges 6:25 • Obadiah 1:17 • Joshua 24:15 • Psalm 24:7 • Malachi 3:10-11 • Isaiah 53:5 • Joel 2:25 • Psalm 65:11",
        "en_file": "video4_HQzfk0DMgCo_en_raw.txt",
        "fr_file": "video4_HQzfk0DMgCo_fr_raw.txt",
        "docx_filename": None,
    },
    {
        "num": 5,
        "id": "ZSKymClHnzE",
        "url": "https://www.youtube.com/watch?v=ZSKymClHnzE&list=PLaptSPguGlRafSbwyTRdhKBc9axh9znP7&index=3",
        "playlist": "PLaptSPguGlRafSbwyTRdhKBc9axh9znP7",
        "title_en": "JEHOVAH SHAMMAH, THE GOD WHO IS THERE, GO AHEAD OF ME INTO EVERY ROOM I ENTER TODAY! | JOSHUA SELMAN",
        "title_fr": "JÉHOVAH SHAMMAH, LE DIEU QUI EST LÀ, PRÉCÈDE-MOI DANS CHAQUE PIÈCE OÙ J'ENTRE AUJOURD'HUI ! | JOSHUA SELMAN",
        "channel": "Prayer By Grace (@PrayerByGrace) • Apostle Joshua Selman",
        "duration": "39:52",
        "uploaded": "2026-10-05",
        "summary_en": "Covenant teaching and prayer on Ezekiel 48:35 (Jehovah Shammah — The Lord is There), Deuteronomy 31:8, and Exodus 33:14, sending God's presence ahead into every room of destiny, family, marriage, finance, health, and transition.",
        "summary_fr": "Enseignement et prière d'alliance sur Ézéchiel 48:35 (Jéhovah Shammah — L'Éternel est ici), Deutéronome 31:8 et Exode 33:14, envoyant la présence de Dieu précéder le croyant dans chaque pièce aujourd'hui.",
        "scriptures": "Ezekiel 48:35 • Deuteronomy 31:8 • Psalm 139:7-10 • Exodus 33:14 • Exodus 15:26 • Numbers 23:23 • 2 Kings 6:17 • Psalm 121:8 • Matthew 28:20 • Numbers 6:24-26",
        "en_file": "video5_ZSKymClHnzE_en_raw.txt",
        "fr_file": "video5_ZSKymClHnzE_fr_raw.txt",
        "docx_filename": None,
    },
    {
        "num": 6,
        "id": "CK9rP2ZBGKg",
        "url": "https://www.youtube.com/watch?v=CK9rP2ZBGKg&list=PLK2jIf_WJT5V87ZUiLy8Q0GKet4T-AzRz&index=1",
        "playlist": "PLK2jIf_WJT5V87ZUiLy8Q0GKet4T-AzRz",
        "title_en": "Seek God with All Your Heart and Witness His Miracles in Your Life | Morning Prayer",
        "title_fr": "Cherchez Dieu de Tout Votre Cœur et Voyez Ses Miracles dans Votre Vie | Prière du Matin",
        "channel": "Grace Enclave (@graceenclave)",
        "duration": "13:18",
        "uploaded": "2025-08-10",
        "summary_en": "Morning devotional prayer anchored in Jeremiah 29:13 on seeking God with an undivided heart, tearing down idols of comfort and control, and abiding in the fullness of joy.",
        "summary_fr": "Prière dévotionnelle matinale ancrée dans Jérémie 29:13 sur la recherche de Dieu d'un cœur sans partage et la plénitude de joie dans Sa présence.",
        "scriptures": "Jeremiah 29:13 • Matthew 5:6 • Mark 12:30 • Genesis 32:26 • James 4:8 • Psalm 139:23-24 • Psalm 16:11",
        "en_file": "video6_CK9rP2ZBGKg_en_raw.txt",
        "fr_file": "video6_CK9rP2ZBGKg_fr_raw.txt",
        "docx_filename": None,
    },
    {
        "num": 7,
        "id": "zPOULLgPjYc",
        "url": "https://www.youtube.com/watch?v=zPOULLgPjYc&list=PLK2jIf_WJT5V87ZUiLy8Q0GKet4T-AzRz&index=3",
        "playlist": "PLK2jIf_WJT5V87ZUiLy8Q0GKet4T-AzRz",
        "title_en": "Powerful 13-Minute Morning Prayer with God to Start Your Day Right | Morning Prayer",
        "title_fr": "Puissante Prière Matinale de 13 Minutes avec Dieu pour Bien Commencer la Journée | Prière du Matin",
        "channel": "Grace Enclave (@graceenclave)",
        "duration": "13:25",
        "uploaded": "2025-08-08",
        "summary_en": "Morning consecration prayer for the mind of Christ, a clean heart, surrendered plans, family protection, healing by Jehovah Rapha, and the full Armor of God (Ephesians 6:10-18).",
        "summary_fr": "Prière de consécration matinale pour la pensée de Christ, un cœur pur, la remise de l'emploi du temps à Dieu, la guérison par Jéhovah Rapha et l'armure complète de Dieu (Éphésiens 6:10-18).",
        "scriptures": "Lamentations 3:22-23 • Isaiah 45:2 • 1 Corinthians 2:16 • Psalm 51:10 • Philippians 4:7 • Colossians 3:23 • Ephesians 6:10-18",
        "en_file": "video7_zPOULLgPjYc_en_raw.txt",
        "fr_file": "video7_zPOULLgPjYc_fr_raw.txt",
        "docx_filename": None,
    },
    {
        "num": 8,
        "id": "Zvk_jzAsoi8",
        "url": "https://www.youtube.com/watch?v=Zvk_jzAsoi8&list=PLK2jIf_WJT5V87ZUiLy8Q0GKet4T-AzRz&index=4",
        "playlist": "PLK2jIf_WJT5V87ZUiLy8Q0GKet4T-AzRz",
        "title_en": "Psalm 121: Morning Prayer For Protection and Safety | Blessed Morning Prayer",
        "title_fr": "Psaume 121 : Prière Matinale pour la Protection et la Sécurité | Prière Bénie du Matin",
        "channel": "Grace Enclave (@graceenclave)",
        "duration": "07:21",
        "uploaded": "2025-08-05",
        "summary_en": "Verse-by-verse contemplative prayer through Psalm 121:1-8 resting under the Keeper of Israel who neither slumbers nor sleeps.",
        "summary_fr": "Prière contemplative verset par verset à travers le Psaume 121:1-8 sous la garde de Celui qui ne sommeille ni ne dort.",
        "scriptures": "Psalm 121:1-8",
        "en_file": "video8_Zvk_jzAsoi8_en_raw.txt",
        "fr_file": "video8_Zvk_jzAsoi8_fr_raw.txt",
        "docx_filename": None,
    },
    {
        "num": 9,
        "id": "BwWxo1T564Q",
        "url": "https://www.youtube.com/watch?v=BwWxo1T564Q",
        "playlist": "PL-7eNLWzLZIDACNgNtZWapz_j-TBF4bqs",
        "title_en": "POWERFUL 6:30 AM SUNDAY MORNING DECLARATIONS #prayer WITH APOSTLE JOSHUA SELMAN",
        "title_fr": "PUISSANTES DÉCLARATIONS DU DIMANCHE MATIN À 6H30 #prière AVEC L'APÔTRE JOSHUA SELMAN",
        "channel": "OVERCOMING DAILY (@therealovercomingdaily) • Apostle Joshua Selman",
        "duration": "23:21",
        "uploaded": "2023-09-10",
        "summary_en": "Ten Sunday morning apostolic declarations conferring plenty (Deuteronomy 30:9), freedom from sickness (Deuteronomy 7:15), watered-garden guidance (Isaiah 58:11), a token for good (Psalm 86:17), quality men (Isaiah 43:4), the Aaronic blessing (Numbers 6:24-26), and the threefold impartation of Favor, Signs & Wonders, and Honor.",
        "summary_fr": "Dix déclarations apostoliques du dimanche matin conférant l'abondance (Deutéronome 30:9), l'exemption de maladie (Deutéronome 7:15), la direction infaillible (Ésaïe 58:11), un signe de bonté (Psaume 86:17), le don d'hommes de qualité (Ésaïe 43:4), la bénédiction sacerdotale (Nombres 6:24-26) et la triple impartation de Faveur, Signes et Honneur.",
        "scriptures": "Deuteronomy 30:9 • Deuteronomy 7:15 • Isaiah 54:17 • Isaiah 58:11 • Psalm 86:17 • Isaiah 43:4 • Numbers 6:24-26 • Psalm 66:12 • Numbers 27:20",
        "en_file": "video9_BwWxo1T564Q_en_raw.txt",
        "fr_file": "video9_BwWxo1T564Q_fr_raw.txt",
        "docx_filename": None,
    },
]


def configure_styles(doc: Document):
    # Configure Normal style
    style = doc.styles["Normal"]
    font = style.font
    font.name = "Georgia"
    font.size = Pt(11)
    font.color.rgb = RGBColor(0x1C, 0x19, 0x17)

    # Set page margins
    for section in doc.sections:
        section.top_margin = Inches(0.9)
        section.bottom_margin = Inches(0.9)
        section.left_margin = Inches(0.95)
        section.right_margin = Inches(0.95)


def add_cover_header(doc: Document, title_text: str, subtitle_text: str, edition_label: str):
    p_badge = doc.add_paragraph()
    p_badge.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_badge = p_badge.add_run(f"✦  SPIRITUAL INTELLIGENCE  •  {edition_label.upper()}  ✦")
    r_badge.bold = True
    r_badge.font.size = Pt(10)
    r_badge.font.color.rgb = RGBColor(0xB4, 0x83, 0x27)

    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_title = p_title.add_run(title_text)
    r_title.bold = True
    r_title.font.size = Pt(22)
    r_title.font.color.rgb = RGBColor(0x1C, 0x19, 0x17)

    p_sub = doc.add_paragraph()
    p_sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_sub = p_sub.add_run(subtitle_text)
    r_sub.italic = True
    r_sub.font.size = Pt(12)
    r_sub.font.color.rgb = RGBColor(0x57, 0x53, 0x4E)

    p_rule = doc.add_paragraph()
    p_rule.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_rule = p_rule.add_run("────────────────────────────────────────────────────────")
    r_rule.font.color.rgb = RGBColor(0xB4, 0x83, 0x27)


def add_video_section(doc: Document, video: dict, include_en: bool = True, include_fr: bool = True):
    # Video Header
    h1 = doc.add_heading(level=1)
    r_h1 = h1.add_run(f"VIDEO {video['num']}: {video['title_en'] if include_en else video['title_fr']}")
    r_h1.font.color.rgb = RGBColor(0x1E, 0x29, 0x3B)
    r_h1.font.size = Pt(16)

    if include_en and include_fr:
        p_fr_title = doc.add_paragraph()
        r_fr_t = p_fr_title.add_run(f"Titre Français : {video['title_fr']}")
        r_fr_t.italic = True
        r_fr_t.bold = True
        r_fr_t.font.color.rgb = RGBColor(0x7C, 0x2D, 0x12)

    # Metadata block
    p_meta = doc.add_paragraph()
    meta_lines = [
        f"• YouTube URL: {video['url']}",
        f"• Video ID: {video['id']}  |  Playlist ID: {video['playlist']}",
        f"• Channel / Ministry: {video['channel']}",
        f"• Duration: {video['duration']}  |  Uploaded: {video['uploaded']}",
        f"• Key Scriptures: {video['scriptures']}",
    ]
    for idx, line in enumerate(meta_lines):
        run = p_meta.add_run(line + ("\n" if idx < len(meta_lines) - 1 else ""))
        run.font.size = Pt(9.5)
        run.font.color.rgb = RGBColor(0x57, 0x53, 0x4E)

    if include_en:
        h_sum_en = doc.add_heading(level=2)
        r_se = h_sum_en.add_run("Devotional Overview (English)")
        r_se.font.color.rgb = RGBColor(0xB4, 0x83, 0x27)
        p_se = doc.add_paragraph(video["summary_en"])
        p_se.paragraph_format.space_after = Pt(8)

    if include_fr:
        h_sum_fr = doc.add_heading(level=2)
        r_sf = h_sum_fr.add_run("Aperçu Dévotionnel (Français)")
        r_sf.font.color.rgb = RGBColor(0xB4, 0x83, 0x27)
        p_sf = doc.add_paragraph(video["summary_fr"])
        p_sf.paragraph_format.space_after = Pt(8)

    # Full English Transcription
    if include_en:
        h_en = doc.add_heading(level=2)
        r_en = h_en.add_run(f"COMPLETE ENGLISH TRANSCRIPTION — VIDEO {video['num']} ({video['duration']})")
        r_en.font.color.rgb = RGBColor(0x7C, 0x2D, 0x12)

        en_text = read_raw(video["en_file"])
        # Split into readable paragraphs (~6-8 lines per paragraph if single-newline wrapped, or by double newline)
        blocks = [b.strip() for b in en_text.split("\n\n") if b.strip()]
        for block in blocks:
            lines = [ln.strip() for ln in block.split("\n") if ln.strip()]
            # Group every ~8 lines into a well-spaced paragraph so long raw chunks read cleanly
            chunk_size = 8
            for i in range(0, len(lines), chunk_size):
                para_text = " ".join(lines[i : i + chunk_size])
                p = doc.add_paragraph()
                p.paragraph_format.space_after = Pt(6)
                p.paragraph_format.line_spacing = 1.25
                r = p.add_run(para_text)
                r.font.size = Pt(10.5)

    # Full French Transcription
    if include_fr:
        h_fr = doc.add_heading(level=2)
        r_fr = h_fr.add_run(f"TRANSCRIPTION INTÉGRALE EN FRANÇAIS — VIDÉO {video['num']} ({video['duration']})")
        r_fr.font.color.rgb = RGBColor(0x7C, 0x2D, 0x12)

        fr_text = read_raw(video["fr_file"])
        paragraphs = [p.strip() for p in fr_text.split("\n\n") if p.strip()]
        for para_text in paragraphs:
            p = doc.add_paragraph()
            p.paragraph_format.space_after = Pt(6)
            p.paragraph_format.line_spacing = 1.25
            r = p.add_run(para_text.replace("\n", " "))
            r.font.size = Pt(10.5)


def build_all_packages():
    os.makedirs(PUBLIC_DOWNLOADS, exist_ok=True)
    os.makedirs(REPO_DOWNLOADS, exist_ok=True)
    generated_files = []

    # 1. Master Bilingual Edition (EN + FR, All 3 Videos)
    doc_master = Document()
    configure_styles(doc_master)
    add_cover_header(
        doc_master,
        "SPIRITUAL INTELLIGENCE",
        "Complete Bilingual Video Transcriptions, Prophetic Prayers & Devotional Manual (English & Français)",
        "Bilingual Master Edition (EN / FR)",
    )
    p_intro = doc_master.add_paragraph(
        "This volume contains the complete, unabridged English (EN) and French (FR) transcriptions, "
        "devotional syntheses, and Scripture concordances for the three foundational prayer and "
        "devotional sessions of the Spiritual Intelligence Sanctuary:\n"
        "1. [POWERFUL 🔥] Command Your Day in Total Victory by Declaring These Powerful Prayers | Apostle Joshua Selman (1:24:44)\n"
        "2. Call on the Name of Jesus and Watch God Work Today | Morning Prayer — Grace Enclave (09:02)\n"
        "3. 6:45 AM #prayer: 10 Powerful Morning Declarations with Apostle Joshua Selman — Overcoming Daily (29:12)"
    )
    p_intro.paragraph_format.space_after = Pt(14)

    for idx, v in enumerate(VIDEOS_META):
        if idx > 0:
            doc_master.add_page_break()
        add_video_section(doc_master, v, include_en=True, include_fr=True)

    master_name = "Spiritual_Intelligence_Complete_Transcriptions_EN_FR.docx"
    master_path = os.path.join(PUBLIC_DOWNLOADS, master_name)
    doc_master.save(master_path)
    generated_files.append(master_path)

    # 2. English Complete Edition (EN Only, All 3 Videos)
    doc_en = Document()
    configure_styles(doc_en)
    add_cover_header(
        doc_en,
        "SPIRITUAL INTELLIGENCE — ENGLISH EDITION",
        "Complete English Transcriptions, Prophetic Declarations & Devotional Manual",
        "English Complete Edition (EN)",
    )
    for idx, v in enumerate(VIDEOS_META):
        if idx > 0:
            doc_en.add_page_break()
        add_video_section(doc_en, v, include_en=True, include_fr=False)

    en_name = "Spiritual_Intelligence_Transcriptions_EN.docx"
    en_path = os.path.join(PUBLIC_DOWNLOADS, en_name)
    doc_en.save(en_path)
    generated_files.append(en_path)

    # 3. French Complete Edition (FR Only, All 3 Videos)
    doc_fr = Document()
    configure_styles(doc_fr)
    add_cover_header(
        doc_fr,
        "INTELLIGENCE SPIRITUELLE — ÉDITION FRANÇAISE",
        "Transcriptions Intégrales en Français, Déclarations Prophétiques & Manuel de Prière",
        "Édition Complète Française (FR)",
    )
    for idx, v in enumerate(VIDEOS_META):
        if idx > 0:
            doc_fr.add_page_break()
        add_video_section(doc_fr, v, include_en=False, include_fr=True)

    fr_name = "Spiritual_Intelligence_Transcriptions_FR.docx"
    fr_path = os.path.join(PUBLIC_DOWNLOADS, fr_name)
    doc_fr.save(fr_path)
    generated_files.append(fr_path)

    # 4. Individual Bilingual DOCX for each of the 3 primary videos
    for v in VIDEOS_META:
        if not v.get("docx_filename"):
            continue
        doc_v = Document()
        configure_styles(doc_v)
        add_cover_header(
            doc_v,
            v["title_en"],
            f"{v['title_fr']}  •  {v['channel']} ({v['duration']})",
            f"Video {v['num']} Bilingual Transcription (EN / FR)",
        )
        add_video_section(doc_v, v, include_en=True, include_fr=True)
        v_path = os.path.join(PUBLIC_DOWNLOADS, v["docx_filename"])
        doc_v.save(v_path)
        generated_files.append(v_path)

    # 5. Bundle all 6 .docx files into a master ZIP package
    zip_name = "Spiritual_Intelligence_DOCX_Transcriptions_Package.zip"
    zip_path = os.path.join(PUBLIC_DOWNLOADS, zip_name)
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zf:
        for docx_file in generated_files:
            zf.write(docx_file, arcname=os.path.basename(docx_file))
    generated_files.append(zip_path)

    # Copy all generated files to top-level /downloads directory as well
    for fpath in generated_files:
        shutil.copy2(fpath, os.path.join(REPO_DOWNLOADS, os.path.basename(fpath)))

    print("Generated DOCX & ZIP packages:")
    for fpath in generated_files:
        size_kb = os.path.getsize(fpath) / 1024.0
        print(f"  - {os.path.basename(fpath)} ({size_kb:.1f} KB)")


if __name__ == "__main__":
    build_all_packages()
