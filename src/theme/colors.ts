/**
 * Central color palette for Cozy Cities: Bubble Corners.
 * Derived from the app's teal gradient identity (#15636D -> #6ACBC4).
 */
export const colors = {
  // Brand gradient
  gradientTop: '#15636D',
  gradientBottom: '#6ACBC4',

  // Core teals
  primaryDark: '#15636D',
  primary: '#2A9D93',
  teal: '#2FB3A8',
  secondary: '#6ACBC4',
  aqua: '#9FDCD6',
  aquaSoft: '#BFE7E2',
  aquaLight: '#D9F1EE',
  // Shared background for screens and the bottom navigation bar.
  screenBg: '#96E2E7',

  // Accents
  orange: '#F0A94C',
  pink: '#EC4E86',
  pinkSoft: '#F3B9C6',
  purple: '#C9A6E0',
  purpleSoft: '#D9C2EC',
  lime: '#B7E85C',

  // Feedback
  success: '#3FBF6B',
  error: '#D6455F',
  correct: '#B7E85C',
  wrong: '#F3B0BC',

  // Neutrals
  white: '#FFFFFF',
  ink: '#123',
  textDark: '#0E4952',
  textBody: '#3A6A6E',
  textMuted: '#6E9296',
  cardOnAqua: 'rgba(255,255,255,0.55)',
  cardWhite: '#FFFFFF',
  chipBg: 'rgba(255,255,255,0.65)',
  chipActive: '#2FB3A8',
  overlay: 'rgba(0,0,0,0.35)',
  shadow: '#0E4952',
} as const;

export type AppColors = typeof colors;
