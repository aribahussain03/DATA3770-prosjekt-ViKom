import { Fonts } from '../constants/theme';

export const Typography = {
  heading: {
    fontFamily: Fonts.sans,
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '700',
  },
  subheading: {
    fontFamily: Fonts.sans,
    fontSize: 22,
    lineHeight: 30,
    fontWeight: '600',
  },
  body: {
    fontFamily: Fonts.sans,
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '400',
  },
  button: {
    fontFamily: Fonts.sans,
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
  },
  caption: {
    fontFamily: Fonts.sans,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },
} as const;