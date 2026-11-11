import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import PhotoFlow from '@/features/photos/PhotoFlow';
import { AppColors } from '@/theme/colors';

// «Send bilde» på hjemsiden. Hele bildeflyten ligger i PhotoFlow.
export default function SendImageRoute() {
  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={{ flex: 1, backgroundColor: AppColors.background }}
    >
      <PhotoFlow
        onBack={() => router.replace('/home')}
        onGoHome={() => router.replace('/home')}
      />
    </SafeAreaView>
  );
}
