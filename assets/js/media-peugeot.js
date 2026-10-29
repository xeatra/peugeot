/* =====================================================================
   MEDIA — Peugeot importer images, hot-linked from the peugeot.ro media
   library (AEM DAM, collected October 2026). Demo only: in production the
   URLs come from the importer DAM via Sales Partner
   (Integration point: GET /api/catalog/{model}/media).
   If an image fails to load, core.js swaps in the neutral silhouette
   from media.js (SP.FB map), so the page never shows a broken image.
   ?imwidth= is the peugeot.ro resizing parameter.
   ===================================================================== */
window.SP = window.SP || {};
(function () {
  const H = 'https://www.peugeot.ro/content/dam/peugeot/';
  const R = H + 'master/b2c/our-range/showroom/';
  const NAV = H + 'master/b2c/our-range/model-thumbnails/white-label-new-nav/';
  const HP = H + 'romania/home-page/', MOD = H + 'romania/models/';
  const ZW = '​'; /* some peugeot.ro file names end with a zero-width space */
  const d208 = R + '208/2024-06-new-208-white-label/new-e-208-white-label/', d208b = R + '208/2024-09-october-window-evolution-208-wl/new-e-208---electric-page---wl/';
  const d2008 = R + '2008/2024-06-new-2008-white-label/new-e-2008-white-label/', d2008b = R + '2008/2024_09-october-window-evolution-2008-wl/new-e-2008---electric-page---wl/';
  const d308 = R + '308/2025-08-new-308/e-308/', d308sw = R + '308-sw/2025-08-new-308-sw/308-sw-hybrid-plug-in-hybrid/';
  const d408 = R + 'new-408/2024-09-new-e-408-white-label/new-e-408-electric-white-label/';
  const d3008 = R + '3008/2023-new-e-3008-/3008-white-label/e-3008-white-label-/';
  const d5008 = R + '5008/new-canvas-update/', d5008b = R + '5008/2024-04-white-label/5008-electric/', d5008c = d5008b + 'e5008-december-window/';
  const dRif = R + 'rifter/new-e-rifter---2023-11/desktop/', dRif2 = R + 'rifter/2025-02-rifter-update-visuals/desktop/', dRif3 = R + 'rifter/2024-12-rifter-december-window/desktop/';
  const dTra = R + 'e-traveller/2023-10--new-e-traveller/desktop/', dTra2 = R + 'e-traveller/2024-10-october-window/desktop/';
  const dPar = R + 'e-partner/new-canvas-update/', dPar2 = R + 'e-partner/2024-06-new-partner-white-label/new-e-partner-wl/';
  const dExp = R + 'e-expert/update-canvas/', dExp2 = R + 'e-expert/2024-11-white-label/e-expert---wl/';
  const dBox = R + 'e-boxer/2023-10---new-e-boxer/desktop/', dBox2 = R + 'e-boxer/2025-02---white-label---boxer/e-boxer---electric/desktop/';

  /* per model: cut = side/3-4 cut-out per variant (ICE / electric), hero, gallery, colour photos (colour id → image) */
  SP.PMEDIA = {
    '208': { cut: NAV + '2023/208_ICE_NEWNAV_FLYOUT.png', cutE: NAV + '2023/E_208_NEWNAV_FLYOUT.png', hero: H + 'master/b2c/category/urban/2023-update/desktop/MASTHEAD_DESKTOP_PEUGEOT_E_208_2307STYP_042.jpg',
      gallery: [d208b + 'PEUGEOT_E208_STYLE_2410STYP_003_FR_632x632.jpg', d208 + 'PEUGEOT_E208_Atouts1_632x632.jpg', d208b + 'PEUGEOT_E208_2410STYP_402_FR_632x632.jpg', d208 + 'PEUGEOT_E208_Atouts3_632x632.jpg', d208b + 'PEUGEOT_E208_2410GJ_453_FR_632x632.jpg'],
      colors: { nera: d208 + '208_noir.jpg', agueda: d208 + '208_jaune.jpg', artense: d208 + '208_grisartense.jpg', selenium: d208 + '208_gris.jpg', vertigo: d208 + '208_Bleu.jpg', okenite: d208 + '208_Blanc.jpg', elixir: d208 + '208_rouge.jpg' } },
    '2008': { cut: NAV + '2024/2008/2008_NEWNAV_FLYOUT.png', cutE: NAV + '2024/2008/E_2008_NEWNAV_FLYOUT.png', hero: MOD + 'banner-showroom-e-2008-desktop.jpg',
      gallery: [d2008b + 'PEUGEOT_E2008_STYLE_2410GG_516_FR_632x632.jpg', d2008 + 'PEUGEOT_E2008_Atouts1_632x632.jpg', d2008 + 'PEUGEOT_E2008_Atouts2_632x632.jpg', d2008 + 'PEUGEOT_E2008_Atouts3_632x632.jpg'],
      colors: { nera: d2008 + 'E_2008_Noir.jpg', artense: d2008 + 'E_2008_GrisArtense.jpg', selenium: d2008 + 'E_2008_Gris.jpg', vertigo: d2008 + 'E_2008_Bleu.jpg', okenite: d2008 + 'E_2008_BlancOkenite.jpg', elixir: d2008 + 'E_2008_Rouge.jpg' } },
    '308': { cut: NAV + '2025/308_2025_NEWNAV_FLYOUT.png', cutE: NAV + '2025/E_308_2025_NEWNAV_FLYOUT.png', hero: d308 + 'E308_MAIN_PAGE_EXTERIOR_D_1920x1080.jpg',
      gallery: [d308 + 'E308_MAIN_PAGE_DETAIL_1_D_1500x2000' + ZW + '.jpg', d308 + 'E308_MAIN_PAGE_DETAIL_2_D_1500x2000.jpg', d308 + 'E308_MAIN_PAGE_DETAIL_3_D_1500x2000.jpg', d308 + 'E308_MAIN_PAGE_INTERIOR_D_1920x1080.jpg'] },
    '308-sw': { cut: NAV + '2025/E_308_SW_2025_NEWNAV_FLYOUT.png', cutE: NAV + '2025/E_308_SW_2025_NEWNAV_FLYOUT.png', hero: d308sw + '308SW_PHEV_MAIN_PAGE_MASTHEAD_D_1920x1080' + ZW + '.jpg',
      gallery: [d308sw + '308SW_PHEV_MAIN_PAGE_EXTERIOR_D_1920x1080.jpg', d308sw + '308SW_PHEV_MAIN_PAGE_DETAIL_1_D_1500x2000' + ZW + '.jpg', d308sw + '308SW_PHEV_MAIN_PAGE_DETAIL_2_D_1500x2000' + ZW + '.jpg', d308sw + '308SW_PHEV_MAIN_PAGE_INTERIOR_D_1920x1080' + ZW + '.jpg'] },
    '408': { cut: NAV + '2026/408_2026__FLYOUT.png', cutE: NAV + '2026/E_408_2026__FLYOUT.png', hero: MOD + 'PEUGEOT_E408_Masthead_D_1920x1080.jpg',
      gallery: [d408 + 'PEUGEOT_E408__Atouts1_632x632.jpg', d408 + 'PEUGEOT_E408__Atouts2_632x632.jpg', d408 + 'PEUGEOT_E408_Atouts3_632x632.jpg', d408 + 'PEUGEOT_E408_Atouts4_632x632.jpg', d408 + 'PEUGEOT_E408_Atouts5_632x632.jpg'],
      colors: { nera: d408 + 'E_408_Noir_Perla_Nera_1920x1080.jpg', selenium: d408 + 'E_408-Gris_Selenium_1920x1080.jpg', obsession: d408 + 'E_408_Bleu_Obsession_1920x1080.jpg', okenite: d408 + 'E_408_Blanc_Okenite_1920x1080.jpg', elixir: d408 + 'E_408_Rouge_Elixir_1920x1080.jpg' } },
    '3008': { cut: NAV + '2024/3008/3008_PHEV_MHEV_NEWNAV_FLYOUT.png', cutE: NAV + '2024/3008/E_3008_NEWNAV_FLYOUT.png', hero: HP + 'e-3008.jpg',
      gallery: [HP + 'banner-hp-3008.jpg', d3008 + 'KEY_BENEFITS_1.jpg', d3008 + 'KEY_BENEFITS_2.jpg', d3008 + 'KEY_BENEFITS_3.jpg', d3008 + 'KEY_BENEFITS_4.jpg'],
      colors: { nera: d3008 + '3008_NOIR_PERLA_NERA.jpg', artense: d3008 + '3008_GRIS_ARTENSE.jpg', obsession: d3008 + '3008_BLEU_OBSESSION.jpg', titane: d3008 + '3008_GRIS_TITANE.jpg', ingaro: d3008 + '3008_BLEU_INGARO.jpg', okenite: d3008 + '3008_BLANC_OKENITE.jpg' } },
    '5008': { cut: NAV + '2024/5008/5008_PHEV_MHEV_NEWNAV_FLYOUT.png', cutE: NAV + '2024/5008/E_5008_NEWNAV_FLYOUT.png', hero: d5008 + 'PEUGEOT_E5008_Masthead_D_1920x1080.jpg',
      gallery: [d5008b + 'E_5008_SMALL.jpg', d5008c + 'PEUGEOT_E5008_LONG_RANGE_2412CV_616_FR.jpg', d5008b + 'PEUGEOT_E5008_LONG_RANGE_2403CV_165_FR_Advantages3_632x632.jpg', d5008c + 'PEUGEOT_E5008_LONG_RANGE_2412CV_AVANTAGE4.jpg'],
      colors: { nera: d5008c + 'E_5008_GT_NOIRPERLA.jpg', artense: d5008c + 'E_5008_GT_GRISARTENSE.jpg', obsession: d5008c + 'E_5008_GT_BLEU_OBSESSION.jpg', titane: d5008c + 'E_5008_GT_GRISTITANE.jpg', okenite: d5008c + 'E_5008_GT_BLANCOKENITE.jpg' } },
    'rifter': { cut: NAV + '2023/RIFTER_NEWNAV_FLYOUT.png', cutE: NAV + '2023/RIFTER_NEWNAV_FLYOUT.png', hero: dRif2 + 'PEUGEOT_E-RIFTER_2412STYP_006_FR_D_Masthed_1920x1080.jpg',
      gallery: [dRif3 + 'PEUGEOT_E-RIFTER_MOTORISATION_D_2030x1146.jpg', dRif + 'PEUGEOT_RIFTER_ICE_2311DV_107_D_2030x1146.jpg', dRif + 'PEUGEOT_RIFTER_2311DV_504_D_2030x1146.jpg', dRif + 'E-Rifter_Allure_Trim.jpg'],
      colors: { nera: dRif + 'ERifter_Noir.jpg', artense: dRif + 'ERifter_Gris.jpg', vertigo: dRif + 'ERifter_Bleu.jpg', okenite: dRif + 'ERifter_Blanc.jpg' } },
    'traveller': { cut: NAV + '2023/TRAVELLER_NEWNAV_FLYOUT.png', cutE: NAV + '2023/TRAVELLER_NEWNAV_FLYOUT.png', hero: dTra + 'NEW_E_TRAVELLER_MASTHEAD_DESKTOP_2880x1620.jpg',
      gallery: [dTra2 + 'PEUGEOT_E-TRAVELLER_MOTORISATION_D_2030x1146.jpg', dTra + 'NEW_E_TRAVELLER_INVITATION_VOYAGE_PLUSIEURS_DESKTOP_2030x1146.jpg', dTra2 + 'E-Traveller_Trim_D.jpg', dTra + 'TEXT_4_COLUMNS_E-TRAVELLER_DESKTOP_2880x1206.jpg'] },
    'partner': { cut: NAV + '2023/PARTNER_ICE_NEWNAV_FLYOUT.png', cutE: NAV + '2023/PARTNER_NEWNAV_FLYOUT.png', hero: dPar + 'PEUGEOT_EPARTNER_Masthead_D_1920x1080.jpg',
      gallery: [dPar2 + 'PEUGEOT_EPARTNER_Trouvez_utilitaire1_626x294.jpg', dPar2 + 'PEUGEOT_EPARTNER_Trouvez_utilitaire2_626x294.jpg', dPar2 + 'PEUGEOT_EPARTNER_Trouvez_utilitaire3_626x294.jpg', dPar2 + 'PEUGEOT_EPARTNER_Atouts1_616x350.jpg', dPar2 + 'PEUGEOT_EPARTNER_Atouts2_616x350.jpg'],
      colors: { nera: dPar2 + 'k9-elec-noir.jpg', impulse: dPar2 + 'k9-elec-bleu.jpg', artense: dPar2 + 'k9-elec-gris-artense.jpg', banquise: dPar2 + 'k9-elec-blanc.jpg' } },
    'expert': { cut: NAV + '2023/EXPERT_NEWNAV_FLYOUT.png', cutE: NAV + '2023/EXPERT_NEWNAV_FLYOUT.png', hero: dExp + 'PEUGEOT_EEXPERT_Masthead_D_1920x1080.jpg',
      gallery: [dExp2 + 'PEUGEOT_EXP_2310DV_507_D_Step1_626x294.jpg', dExp2 + 'PEUGEOT_E-EXPERT_2410GJ_503_FR_D_Step2_626x294.jpg', dExp2 + 'PEUGEOT_E-EXPERT_2410GJ_502_FR_D_Step3_626x294.jpg', dExp2 + 'PEUGEOT_EXP_2310KL_605_D_Atout1_626x394.jpg'],
      colors: { nera: dExp2 + 'E-Expert_Noir_Perla.jpg', titane: dExp2 + 'E-Expert_Gris_titane.jpg', artense: dExp2 + 'E-Expert_gris_artense.jpg', banquise: dExp2 + 'E-Expert_blanc.jpg' } },
    'boxer': { cut: NAV + '2023/BOXER_NEWNAV_FLYOUT.png', cutE: NAV + '2023/BOXER_NEWNAV_FLYOUT.png', hero: dBox + 'PEUGEOT_BOXER_R_2023_BEV_DIGITAL_MASTHEAD_DESKTOP_2880x1620.jpg',
      gallery: [dBox2 + 'PEUGEOT_BOX_2310GJ_403_D_Main1_626x294.jpg', dBox2 + 'PEUGEOT_BOX_2310KL_606_D_Main2_626x294.jpg', dBox2 + 'PEUGEOT_BOX_2310DV_103_D_Main3_626x294.jpg', dBox2 + 'PEUGEOT_BOX_2310GJ_302_D_Main4_626x294.jpg'],
      colors: { banquise: dBox2 + 'E-Boxer_Blanc.jpg', thunder: dBox2 + 'E-Boxer_Thunder_grey.jpg', iron: dBox2 + 'E-Boxer_Iron_grey.jpg', artense: dBox2 + 'E-Boxer_Gris_artene.jpg', expedition: dBox2 + 'E-Boxer_Expedition_grey.jpg' } }
  };
  /* brand / group banners */
  SP.PBANNERS = {
    s3008: HP + 'banner-hp-3008.jpg', s208: HP + 'Banner_Desktop_208.jpg', vans: HP + 'Desktop_Gama.jpg', boxer: HP + 'Desktop_Boxer.jpg',
    group: HP + 'banner-hp-modele-din-stoc-1.jpg', range: HP + 'HP_Banner_Desktop_2030x1620.jpg'
  };
  SP.pimg = (url, w) => url ? url + (url.includes('?') ? '&' : '?') + 'imwidth=' + (w || 1200) : url;
})();
