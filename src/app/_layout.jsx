import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
import { PermissionsProvider } from '@/context/PermissionsContext';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const components = {
    ThemeProvider,
    PermissionsProvider,
    AnimatedSplashOverlay,
    AppTabs,
  };

  const missingComponents = Object.entries(components)
    .filter(([, component]) => component == null)
    .map(([name]) => name);

  if (missingComponents.length > 0) {
    throw new Error(
      `Disse komponentene mangler eksport eller har feil import: ${
        missingComponents.join(', ')
      }`
    );
  }

  return (
    <ThemeProvider
      value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <PermissionsProvider>
        <AnimatedSplashOverlay />
        <AppTabs />
      </PermissionsProvider>
    </ThemeProvider>
  );
}