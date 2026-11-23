import { DarkTheme, DefaultTheme, type Theme } from 'expo-router/react-navigation';
import { Platform } from 'react-native';

export const COLORS = {
  // Fonds et surfaces
  bg: '#08070D',
  surface: 'rgba(255, 255, 255, 0.04)',
  surfaceLight: 'rgba(255, 255, 255, 0.07)',
  surfaceActive: 'rgba(255, 255, 255, 0.12)',
  line: 'rgba(255, 255, 255, 0.09)',
  lineStrong: 'rgba(255, 255, 255, 0.18)',

  // Texte
  ink: '#F4F2FB',
  ink2: '#B9B5CE',
  ink3: '#8F8BA8',

  // Accent
  lavender: '#C9B8FF',
  violet: '#7C5CFF',
  onAccent: '#1A1033',

  // Catégories · dégradés 135°
  perso: ['#F472B6', '#E879F9'] as const,
  psycho: ['#38BDF8', '#2DD4BF'] as const,
  sf: ['#818CF8', '#C084FC'] as const,
  classiques: ['#34D399', '#10B981'] as const,
  philo: ['#FBBF24', '#F97316'] as const,
  gradientText: '#160E2B',

  // Sémantique
  like: '#F472B6',
  note: '#FBBF24',
  online: '#5EEAD4',
};

export const RADIUS = {
  couv: 10,
  btnS: 14,
  btn: 18,
  card: 20,
  pill: 9999,
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  screen: 20,
  lg: 24,
  xl: 32,
};

export const FONTS = {
  serif: Platform.select({
    ios: 'Georgia',
    android: 'serif',
    default: 'serif',
  }),
  sans: Platform.select({
    ios: 'System',
    android: 'sans-serif',
    default: 'sans-serif',
  }),
};

export const TYPOGRAPHY = {
  display: {
    fontFamily: FONTS.serif,
    fontSize: 42,
    lineHeight: 44,
    fontWeight: '500' as const,
    color: COLORS.ink,
  },
  screenTitle: {
    fontFamily: FONTS.serif,
    fontSize: 32,
    lineHeight: 35,
    fontWeight: '500' as const,
    color: COLORS.ink,
  },
  sectionTitle: {
    fontFamily: FONTS.serif,
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '500' as const,
    color: COLORS.ink,
  },
  button: {
    fontFamily: FONTS.sans,
    fontSize: 16,
    fontWeight: '600' as const,
    color: COLORS.ink,
  },
  body: {
    fontFamily: FONTS.sans,
    fontSize: 15,
    lineHeight: 23,
    fontWeight: '400' as const,
    color: COLORS.ink2,
  },
  label: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: '500' as const,
    color: COLORS.ink2,
  },
  caption: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: '400' as const,
    color: COLORS.ink3,
  },
  surtitre: {
    fontFamily: FONTS.sans,
    fontSize: 11,
    fontWeight: '600' as const,
    letterSpacing: 1.5,
    color: COLORS.ink3,
  },
};

export const THEME = {
  light: {
    background: '#FFFFFF',
    foreground: '#1A1033',
    card: '#F4F2FB',
    cardForeground: '#1A1033',
    popover: '#FFFFFF',
    popoverForeground: '#1A1033',
    primary: COLORS.lavender,
    primaryForeground: COLORS.onAccent,
    secondary: '#EBE8F5',
    secondaryForeground: '#1A1033',
    muted: '#EBE8F5',
    mutedForeground: COLORS.ink3,
    accent: COLORS.violet,
    accentForeground: '#FFFFFF',
    destructive: COLORS.like,
    border: 'rgba(0,0,0,0.08)',
    input: 'rgba(0,0,0,0.08)',
    ring: COLORS.lavender,
    radius: '18px',
  },
  dark: {
    background: COLORS.bg,
    foreground: COLORS.ink,
    card: COLORS.surface,
    cardForeground: COLORS.ink,
    popover: COLORS.bg,
    popoverForeground: COLORS.ink,
    primary: COLORS.lavender,
    primaryForeground: COLORS.onAccent,
    secondary: COLORS.surface,
    secondaryForeground: COLORS.ink,
    muted: COLORS.surfaceLight,
    mutedForeground: COLORS.ink2,
    accent: COLORS.violet,
    accentForeground: COLORS.ink,
    destructive: COLORS.like,
    border: COLORS.line,
    input: COLORS.line,
    ring: COLORS.lavender,
    radius: '18px',
  },
};

export const NAV_THEME: Record<'light' | 'dark', Theme> = {
  light: {
    ...DefaultTheme,
    colors: {
      background: THEME.light.background,
      border: THEME.light.border,
      card: THEME.light.card,
      notification: THEME.light.destructive,
      primary: THEME.light.primary,
      text: THEME.light.foreground,
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      background: THEME.dark.background,
      border: THEME.dark.border,
      card: THEME.dark.card,
      notification: THEME.dark.destructive,
      primary: THEME.dark.primary,
      text: THEME.dark.foreground,
    },
  },
};
