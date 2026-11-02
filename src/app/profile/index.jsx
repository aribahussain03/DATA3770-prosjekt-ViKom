import { SafeAreaView } from 'react-native-safe-area-context';

import ProfileFlow from '@/features/profile/ProfileFlow';
import { AppColors } from '@/theme/colors';

export default function ProfileRoute() {
  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={{
        flex: 1,
        backgroundColor: AppColors.background,
      }}
    >
      <ProfileFlow />
    </SafeAreaView>
  );
}