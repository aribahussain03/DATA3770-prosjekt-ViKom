import { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ProfileFlow from '@/features/profile/ProfileFlow';
import { AppColors } from '@/theme/colors';
import BottomNavigation from '../../components/BottomNavigation';

export default function ProfileRoute() {
  const [currentScreen, setCurrentScreen] = useState('profile');

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={{
        flex: 1,
        backgroundColor: AppColors.background,
      }}
    >
      <View style={{ flex: 1 }}>
        <ProfileFlow onScreenChange={setCurrentScreen} />
      </View>

      {currentScreen === 'profile' && (
        <BottomNavigation activeTab='profile' />
      )}
    </SafeAreaView>
  );
}