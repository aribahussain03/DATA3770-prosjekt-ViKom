import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import MessagesHomeScreen from '@/features/messages/MessagesHomeScreen';
import { AppColors } from '@/theme/colors';

// Første skjerm når man trykker «Send melding» på hjemsiden.
export default function MessagesRoute() {
  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={{ flex: 1, backgroundColor: AppColors.background }}
    >
      <MessagesHomeScreen
        onBack={() => router.replace('/home')}
        // Ny melding starter i kontaktlisten.
        onNewMessage={() => router.push('/contacts')}
        onPreviousConversations={() => router.push('/messages/list')}
      />
    </SafeAreaView>
  );
}
