import { useRef, useState } from 'react';
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import HealthScreenLayout from '../../components/HealthScreenLayout';
import { AppColors } from '../../theme/colors';
import { Typography } from '../../theme/typography';

export default function ContactHomeCareScreen({
  personName = 'Mamma',
  onBack,
  keyboardVerticalOffset = 0,
}) {
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState([]);
  const nextId = useRef(1);
  const listRef = useRef(null);

  const canSend = draft.trim().length > 0;

  function sendMessage() {
    const text = draft.trim();

    if (!text) {
      return;
    }

    const message = {
      id: String(nextId.current++),
      text,
    };

    setMessages((current) => [...current, message]);
    setDraft('');
  }

  return (
    <HealthScreenLayout
      title="Kontakt hjemmetjeneste"
      personName={personName}
      onBack={onBack}
    >
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
          ListHeaderComponent={
            <View style={styles.notice}>
              <Text style={styles.noticeText}>
                Ikke del sensitive person- eller helseopplysninger
                i meldinger. Ring hjemmetjenesten dersom du trenger
                å diskutere slike opplysninger. Ved akutt fare for
                liv og helse, ring 113.
              </Text>

              <Text style={styles.prototypeText}>
                Prototype: Meldinger sendes ikke til hjemmetjenesten.
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.bubble}>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
        />

        <View style={styles.composer}>
          <TextInput
            accessibilityLabel="Skriv en melding"
            placeholder="Skriv en melding..."
            placeholderTextColor={AppColors.textSecondary}
            value={draft}
            onChangeText={setDraft}
            multiline
            maxLength={2000}
            style={styles.input}
          />

          <Pressable
            accessibilityRole="button"
            accessibilityState={{ disabled: !canSend }}
            disabled={!canSend}
            onPress={sendMessage}
            style={({ pressed }) => [
              styles.sendButton,
              !canSend && styles.disabled,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.sendText}>Send</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </HealthScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messages: {
    padding: 20,
    gap: 12,
  },
  notice: {
    backgroundColor: AppColors.surface,
    borderRadius: 8,
    padding: 16,
    gap: 12,
    marginBottom: 12,
  },
  noticeText: {
    ...Typography.caption,
    color: AppColors.text,
    textAlign: 'center',
  },
  prototypeText: {
    ...Typography.caption,
    color: AppColors.textSecondary,
    textAlign: 'center',
  },
  bubble: {
    alignSelf: 'flex-end',
    maxWidth: '85%',
    backgroundColor: AppColors.primaryLight,
    borderRadius: 12,
    padding: 12,
  },
  messageText: {
    ...Typography.body,
    color: AppColors.text,
  },
  composer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: AppColors.border,
    backgroundColor: AppColors.background,
  },
  input: {
    ...Typography.body,
    flex: 1,
    minHeight: 48,
    maxHeight: 120,
    borderWidth: 1,
    borderColor: AppColors.primary,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: AppColors.text,
  },
  sendButton: {
    minHeight: 48,
    justifyContent: 'center',
    backgroundColor: AppColors.primary,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  sendText: {
    ...Typography.button,
    color: AppColors.background,
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.75,
  },
});