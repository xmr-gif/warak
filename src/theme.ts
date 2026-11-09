/**
 * Warak — design system (thème sombre, maquettes 390 × 844).
 *
 * Source unique des valeurs visuelles : couleurs, dégradés, typographie,
 * espacements, rayons et ombres. Les noms reprennent ceux de la planche
 * « Design system » du PDF. Les composants importent ces tokens ; les écrans
 * importent les composants. Aucune couleur ni taille en dur ailleurs.
 */
import type { TextStyle } from 'react-native';

/* ------------------------------------------------------------------ */
/* Couleurs                                                            */
/* ------------------------------------------------------------------ */

export const colors = {
  // Fonds et surfaces
  bg: '#08070D',
  surface: 'rgba(255,255,255,0.04)', // « surface · blanc 4 % » : cartes, champs
  surfaceRaised: 'rgba(255,255,255,0.07)', // boutons secondaires, bulles, chips inactifs
  line: 'rgba(255,255,255,0.09)', // « line · blanc 9 % » : contours, séparateurs
  lineStrong: 'rgba(255,255,255,0.14)', // contour des boutons secondaires
  bar: 'rgba(12,10,21,0.96)', // barre d'onglets, barre de saisie
  scrim: 'rgba(8,7,13,0.45)', // boutons posés sur une bannière

  // Texte
  ink: '#F4F2FB',
  ink2: '#B9B5CE',
  ink3: '#8F8BA8',

  // Accent
  lavender: '#C9B8FF',
  violet: '#7C5CFF', // halos
  onAccent: '#1A1033', // texte et icônes sur lavande
  onGradient: '#160E2B', // texte sur dégradé de catégorie (contraste > 5:1)

  // Sémantique
  like: '#F472B6',
  note: '#FBBF24',
  online: '#5EEAD4',

  // Teintes dérivées de l'accent et de la sémantique
  unread: '#15131E', // ligne de notification non lue (bg + lavande 7 %, opaque pour détourer les pastilles)
  pinned: 'rgba(124,92,255,0.18)', // bandeau « Lecture du mois » de la discussion
  pinnedLine: 'rgba(201,184,255,0.2)',
  sparkle: 'rgba(201,184,255,0.14)', // pastille des recommandations
  likeTint: 'rgba(244,114,182,0.16)',
  likeTintLine: 'rgba(244,114,182,0.35)',
  track: 'rgba(255,255,255,0.1)', // fond des barres de progression
  star: '#FFFFFF',
} as const;

/* ------------------------------------------------------------------ */
/* Dégradés (135° par défaut, comme sur la planche)                    */
/* ------------------------------------------------------------------ */

export type GradientSpec = {
  colors: readonly [string, string, ...string[]];
  locations?: readonly [number, number, ...number[]];
  /** Angle CSS en degrés : 90 = vers la droite, 180 = vers le bas. */
  angle?: number;
};

/** Dégradés des catégories d'intérêt. Texte posé dessus : `colors.onGradient`. */
export const categoryGradients = {
  perso: { colors: ['#FBA8CF', '#F16C9D'] },
  psycho: { colors: ['#7DEFDC', '#30BFA8'] },
  sf: { colors: ['#9EB8FD', '#7982F5'] },
  classiques: { colors: ['#B5EFA8', '#6CC26A'] },
  philo: { colors: ['#FBD678', '#EFA93E'] },
  // Absent de la planche mais utilisé dans les écrans (« Plumes du Maghreb »,
  // tag « Littérature maghrébine ») : lavande vers violet.
  maghreb: { colors: ['#D7CAFE', '#A98BFE'] },
} satisfies Record<string, GradientSpec>;

export type Category = keyof typeof categoryGradients;

export const gradients = {
  /** Anneau des avatars (Profil, Accueil). */
  avatarRing: { colors: ['#5EEAD4', '#F472B6', '#B883FA'], locations: [0, 0.58, 1] },
  /** Cartes mises en avant : « Lecture du mois », « Objectif de lecture ». */
  feature: { colors: ['#251C4A', '#111922'], angle: 110 },
  /** Bannière d'un club de science-fiction. */
  bannerSf: { colors: ['#2D3BA8', '#675BE3', '#1A1450'], locations: [0, 0.52, 1] },
  /** Planète de la bannière. */
  planet: { colors: ['#FFE2F1', '#F9B2D6', '#F284C0', '#D85AA2'], locations: [0, 0.2, 0.45, 1] },
  /** Barre « Objectif de lecture ». */
  goal: { colors: ['#5EEAD4', '#C9B8FF'], angle: 90 },
  /** Fondu au-dessus d'un bouton fixé en bas d'écran. */
  fadeToBg: { colors: ['rgba(8,7,13,0)', '#08070D'], angle: 180 },
} satisfies Record<string, GradientSpec>;

/* ------------------------------------------------------------------ */
/* Typographie                                                         */
/* ------------------------------------------------------------------ */

/** Noms des fichiers chargés dans App.tsx (@expo-google-fonts). */
export const fonts = {
  serif: 'Fraunces_500Medium',
  serifSemiBold: 'Fraunces_600SemiBold',
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semiBold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
} as const;

/**
 * Styles de texte. Les six premiers Inter et les trois Fraunces de la planche
 * sont repris tels quels ; les autres sont relevés sur les écrans.
 * Avec des polices statiques, la graisse passe par `fontFamily`, jamais par `fontWeight`.
 */
export const type = {
  display: { fontFamily: fonts.serif, fontSize: 42, lineHeight: 44 }, // Display
  title: { fontFamily: fonts.serif, fontSize: 32, lineHeight: 35 }, // Titre écran
  headline: { fontFamily: fonts.serif, fontSize: 26, lineHeight: 30 }, // Titre compact : fiche club, Notifications
  headlineSm: { fontFamily: fonts.serif, fontSize: 24, lineHeight: 28 }, // Nom sur le profil
  section: { fontFamily: fonts.serif, fontSize: 20, lineHeight: 24 }, // Titre de section
  cardTitle: { fontFamily: fonts.serif, fontSize: 18, lineHeight: 22 }, // Titre dans une carte

  button: { fontFamily: fonts.semiBold, fontSize: 16, lineHeight: 20 }, // Bouton, nom de club
  bodyStrong: { fontFamily: fonts.semiBold, fontSize: 15, lineHeight: 20 }, // Titre de fil, onglets
  body: { fontFamily: fonts.regular, fontSize: 15, lineHeight: 23 }, // Texte courant
  bodySm: { fontFamily: fonts.regular, fontSize: 14, lineHeight: 20 }, // Bulles, notifications, bio
  label: { fontFamily: fonts.medium, fontSize: 13, lineHeight: 18 }, // Label, méta
  caption: { fontFamily: fonts.regular, fontSize: 12, lineHeight: 16 }, // Légende, horodatage
  overline: {
    fontFamily: fonts.semiBold,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 1.54, // +14 %
    textTransform: 'uppercase',
  }, // Surtitre
  tab: { fontFamily: fonts.medium, fontSize: 11, lineHeight: 14 }, // Libellés de la barre d'onglets
  stat: { fontFamily: fonts.bold, fontSize: 22, lineHeight: 26 }, // Chiffres du profil
} as const satisfies Record<string, TextStyle>;

export type TextVariant = keyof typeof type;

/** Changer la graisse d'un style sans changer sa taille. */
export const weights = {
  regular: { sans: fonts.regular, serif: fonts.serif },
  medium: { sans: fonts.medium, serif: fonts.serif },
  semibold: { sans: fonts.semiBold, serif: fonts.serifSemiBold },
  bold: { sans: fonts.bold, serif: fonts.serifSemiBold },
} as const;

export type Weight = keyof typeof weights;

/* ------------------------------------------------------------------ */
/* Mise en page                                                        */
/* ------------------------------------------------------------------ */

/** Espacement · base 4. */
export const space = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
} as const;

/** Mesures relevées sur les maquettes, partagées par plusieurs écrans. */
export const layout = {
  screenMargin: 20, // marge d'écran
  headerTop: 9, // sous la zone sûre, jusqu'à la rangée d'en-tête
  headerHeight: 44,
  cardPadding: 14,
  listGap: 10, // entre deux cartes d'une liste
  touch: 44, // cible tactile minimale
  tabBarHeight: 58, // + zone sûre du bas = 92 sur iPhone
  fieldHeight: 54, // champs : 54 à 56
  buttonHeight: 56, // bouton primaire
  buttonHeightSm: 44,
} as const;

/** Rayons. */
export const radius = {
  thumb: 6, // vignette de couverture
  cover: 10, // couverture
  tile: 16, // icône de club
  buttonSm: 14, // bouton S, segment actif
  button: 18, // bouton, champ, bulle
  card: 20, // carte
  pill: 999,
} as const;

/** Ombres (chaînes boxShadow). */
export const shadows = {
  accentGlow: '0px 8px 24px rgba(124,92,255,0.45)', // bouton « + » de la barre d'onglets
  focusRing: '0px 0px 0px 4px rgba(124,92,255,0.18)', // champ en focus
} as const;
