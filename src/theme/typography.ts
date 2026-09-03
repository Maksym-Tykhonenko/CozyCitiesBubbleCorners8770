import { Platform } from 'react-native';

/**
 * The app uses an elegant serif for headings (as in the designs) and the
 * platform sans-serif for body text. RN ships Georgia on iOS and a generic
 * "serif" family on Android, so headings look consistent without bundling fonts.
 */
export const fonts = {
  heading: Platform.select({ ios: 'Georgia', android: 'serif', default: 'serif' }),
  headingBold: Platform.select({ ios: 'Georgia-Bold', android: 'serif', default: 'serif' }),
  body: Platform.select({ ios: 'System', android: 'sans-serif', default: 'System' }),
} as const;

export const type = {
  display: {
    fontFamily: fonts.headingBold,
    fontWeight: '700' as const,
    fontSize: 30,
    lineHeight: 36,
  },
  h1: {
    fontFamily: fonts.headingBold,
    fontWeight: '700' as const,
    fontSize: 24,
    lineHeight: 30,
  },
  h2: {
    fontFamily: fonts.headingBold,
    fontWeight: '700' as const,
    fontSize: 20,
    lineHeight: 26,
  },
  h3: {
    fontFamily: fonts.heading,
    fontWeight: '600' as const,
    fontSize: 17,
    lineHeight: 23,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 22,
  },
  small: {
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 18,
  },
  tiny: {
    fontFamily: fonts.body,
    fontSize: 11,
    lineHeight: 15,
  },
} as const;

export const radius = {
  sm: 10,
  md: 16,
  lg: 22,
  xl: 28,
  pill: 999,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;
