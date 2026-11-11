import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import ChatScreen from '@/features/messages/ChatScreen';
import { useMessagesStore } from '@/features/messages/messagesStore';
import { AppColors } from '@/theme/colors';

// Åpnes med navnet på kontakten, for eksempel /messages/chat?name=Mamma.
// Finnes det ingen tidligere samtale, starter chatten tom.
export default function ChatRoute() {
  const { name = 'Mamma' } = useLocalSearchParams();
  const { conversations } = useMessagesStore();

  const conversation = conversations.find(
    (item) => item.name === name
  ) ?? { id: `new-${name}`, name };

  return (
    <SafeAreaView
      edges={['top', 'left', 'right', 'bottom']}
      style={{ flex: 1, backgroundColor: AppColors.background }}
    >
      <ChatScreen
        // key gjør at chatten lastes på nytt når man bytter person.
        key={conversation.id}
        conversation={conversation}
        onBack={() =>
          router.canGoBack() ? router.back() : router.replace('/messages')
        }
        onVideoCall={() => router.push('/video-call')}
      />
    </SafeAreaView>
  );
}
