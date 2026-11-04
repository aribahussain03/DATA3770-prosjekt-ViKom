import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { AppColors } from '../theme/colors';
import { Typography } from '../theme/typography';

const SEND_BLUE = '#1E8BF0';

export default function MessageInput({ onSend }) {
  const [draft, setDraft] = useState('');

  const canSend = draft.trim().length > 0;

  function send() {
    const text = draft.trim();

    if (!text) {
      return;
    }

    onSend?.(text);
    setDraft('');
  }

  return (
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
        accessibilityLabel="Send"
        accessibilityState={{ disabled: !canSend }}
        disabled={!canSend}
        onPress={send}
        style={({ pressed }) => [
          styles.sendButton,
          !canSend && styles.disabled,
          pressed && styles.pressed,
        ]}
      >
        <Text style={styles.sendText}>Send</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  composer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 16,
    padding: 16,
    backgroundColor: AppColors.background,
  },
  input: {
    ...Typography.body,
    flex: 1,
    minHeight: 56,
    maxHeight: 120,
    borderWidth: 1,
    borderColor: SEND_BLUE,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: AppColors.text,
    backgroundColor: AppColors.background,
  },
  sendButton: {
    minHeight: 56,
    justifyContent: 'center',
    backgroundColor: SEND_BLUE,
    borderRadius: 8,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  sendText: {
    ...Typography.subheading,
    fontWeight: '400',
    color: AppColors.background,
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.75,
  },
});
