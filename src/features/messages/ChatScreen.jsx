import { Image } from 'expo-image';
import { SymbolView } from 'expo-symbols';
import { useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import ChatBubble from '../../components/ChatBubble';
import MessageInput from '../../components/MessageInput';
import { mockMessages } from '../../data/messagesMockData';
import { AppColors } from '../../theme/colors';
import MessagesHeader from './MessagesHeader';

// Klokkeslett på norsk form, for eksempel 14.30.
function currentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${hours}.${minutes}`;
}

// Viser én samtale. `conversation` trenger bare id og name, så en ny kontakt gir en tom chat.
export default function ChatScreen({
  conversation,
  initialMessages,
  onBack,
  onVideoCall,
  onCall,
  keyboardVerticalOffset = 0,
}) {
  const [messages, setMessages] = useState(
    () =>
      initialMessages ??
      mockMessages.filter((message) => message.conversationId === conversation.id)
  );
  const nextId = useRef(1);
  const listRef = useRef(null);

  // Nye meldinger lagres bare på denne skjermen, og er borte når den lukkes.
  function sendMessage(text) {
    const message = {
      // «new-» hindrer at id-en kolliderer med testdataene.
      id: `new-${nextId.current++}`,
      conversationId: conversation.id,
      sender: 'me',
      text,
      time: currentTime(),
    };

    setMessages((current) => [...current, message]);
  }

  return (
    <View style={styles.container}>
      <MessagesHeader title={conversation.name} onBack={onBack}>
        <HeaderAction
          label={`Videosamtale med ${conversation.name}`}
          icon={{ ios: 'video', android: 'videocam', web: 'videocam' }}
          onPress={onVideoCall}
        />
        <HeaderAction
          label={`Ring ${conversation.name}`}
          icon={{ ios: 'phone', android: 'call', web: 'call' }}
          onPress={onCall}
        />
      </MessagesHeader>

      <View style={styles.avatarRow}>
        {/* Kontakter uten bilde får forbokstaven i en sirkel. */}
        {conversation.picture ? (
          <Image source={conversation.picture} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarFallback]}>
            <Text style={styles.avatarInitial}>{conversation.name.charAt(0)}</Text>
          </View>
        )}
      </View>

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messages}
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={() =>
            listRef.current?.scrollToEnd({ animated: true })
          }
          renderItem={({ item }) => (
            <ChatBubble text={item.text} fromMe={item.sender === 'me'} />
          )}
        />

        <MessageInput onSend={sendMessage} />
      </KeyboardAvoidingView>
    </View>
  );
}

function HeaderAction({ label, icon, onPress }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [styles.action, pressed && styles.pressed]}
    >
      <SymbolView name={icon} size={30} tintColor={AppColors.text} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  action: {
    minWidth: 48,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.6,
  },
  avatarRow: {
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  avatarFallback: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.primaryLight,
  },
  avatarInitial: {
    fontSize: 28,
    color: AppColors.text,
  },
  messages: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    padding: 16,
    gap: 16,
  },
});
