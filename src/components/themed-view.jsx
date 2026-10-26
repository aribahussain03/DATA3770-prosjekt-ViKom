import { View } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

/**
 * @param {import('react-native').ViewProps & { lightColor?: string, darkColor?: string, type?: keyof import('@/constants/theme').Colors.light }} props
 */
export function ThemedView({ style, lightColor, darkColor, type, ...otherProps }) {
  const theme = useTheme();

  return <View style={[{ backgroundColor: theme[type ?? 'background'] }, style]} {...otherProps} />;
}
