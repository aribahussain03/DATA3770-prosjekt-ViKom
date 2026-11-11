import { Image } from 'expo-image';
import { SymbolView } from 'expo-symbols';
import { useRef } from 'react';
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
import { AppColors } from '../../theme/colors';
import MessagesHeader from './MessagesHeader';
import { sendMessage, useMessagesStore } from './messagesStore';

// Viser én samtale. `conversation` trenger bare id og name, så en ny kontakt gir en tom chat.
export default function ChatScreen({
  conversation,
  onBack,
  onVideoCall,
  onCall,
  keyboardVerticalOffset = 0,
}) {
  // Meldingene ligger i det felles lageret, så de vises også i samtalelisten.
  const { messages: allMessages } = useMessagesStore();
  const messages = allMessages.filter(
    (message) => message.conversationId === conversation.id
  );
  const listRef = useRef(null);

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

        <MessageInput onSend={(text) => sendMessage(conversation, text)} />
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
