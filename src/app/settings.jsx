import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import SettingsScreen from '@/features/settings/SettingsScreen';
import { AppColors } from '@/theme/colors';

export default function SettingsRoute() {
  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={{ flex: 1, backgroundColor: AppColors.background }}
    >
      <SettingsScreen
        onBack={() =>
          router.canGoBack() ? router.back() : router.replace('/home')
        }
        onLogOut={() => router.replace('/login')}
      />
    </SafeAreaView>
  );
}
