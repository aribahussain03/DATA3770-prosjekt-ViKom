import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import MessageListScreen from '@/features/messages/MessageListScreen';
import { AppColors } from '@/theme/colors';

export default function MessageListRoute() {
  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={{ flex: 1, backgroundColor: AppColors.background }}
    >
      <MessageListScreen
        onBack={() => router.back()}
        onOpenConversation={(conversation) =>
          router.push({
            pathname: '/messages/chat',
            params: { name: conversation.name },
          })
        }
      />
    </SafeAreaView>
  );
}
