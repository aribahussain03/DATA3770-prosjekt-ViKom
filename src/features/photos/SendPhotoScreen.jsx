import { Image } from 'expo-image';
import { SymbolView } from 'expo-symbols';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { mockPhotoRecipients } from '../../data/photosMockData';
import { AppColors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import MessagesHeader from '../messages/MessagesHeader';
import PhotoButton from './PhotoButton';

// Farger fra Figma som ikke finnes i AppColors ennå.
const FIELD_GREY = '#D9D9D9';
const ICON_GREY = '#ABABAB';

// Skjermen «Send bilde», der man også velger mottakere. Valgene ligger i PhotoFlow.
export default function SendPhotoScreen({
  photo,
  note,
  recipients = mockPhotoRecipients,
  selectedRecipientIds,
  onBack,
  onChoosePhoto,
  onChangeNote,
  onToggleRecipient,
  onSend,
  keyboardVerticalOffset = 0,
}) {
  // Både et bilde og minst én mottaker må være valgt.
  const canSend = photo != null && selectedRecipientIds.length > 0;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <MessagesHeader title="Send bilde" onBack={onBack} />

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={photo ? 'Bytt bilde' : 'Last opp bildet her'}
          onPress={onChoosePhoto}
          style={({ pressed }) => [styles.upload, pressed && styles.pressed]}
        >
          {photo ? (
            <Image source={photo} contentFit="cover" style={styles.preview} />
          ) : (
            <>
              <SymbolView
                name={{ ios: 'photo', android: 'image', web: 'image' }}
                size={120}
                tintColor={ICON_GREY}
                style={styles.uploadIcon}
              />
              <Text style={styles.uploadText}>Last opp bildet her</Text>
            </>
          )}
        </Pressable>

        <TextInput
          accessibilityLabel="Skriv en liten melding"
          placeholder="Skriv en liten melding..."
          placeholderTextColor={AppColors.textSecondary}
          value={note}
          onChangeText={onChangeNote}
          maxLength={500}
          style={styles.note}
        />

        <Text style={styles.label}>Hvem vil du sende bildet til:</Text>

        <View>
          {recipients.map((recipient) => {
            const checked = selectedRecipientIds.includes(recipient.id);

            return (
              <Pressable
                key={recipient.id}
                accessibilityRole="checkbox"
                accessibilityLabel={recipient.name}
                accessibilityState={{ checked }}
                onPress={() => onToggleRecipient(recipient.id)}
                style={styles.recipient}
              >
                <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
                  {checked ? (
                    <SymbolView
                      name={{ ios: 'checkmark', android: 'check', web: 'check' }}
                      size={24}
                      tintColor={AppColors.background}
                    />
                  ) : null}
                </View>
                <Text style={styles.recipientName}>{recipient.name}</Text>
              </Pressable>
            );
          })}
        </View>

        <PhotoButton label="Send bilde" disabled={!canSend} onPress={onSend} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  content: {
    gap: 16,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  upload: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: FIELD_GREY,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: AppColors.text,
  },
  pressed: {
    opacity: 0.8,
  },
  preview: {
    width: '100%',
    height: '100%',
  },
  uploadIcon: {
    position: 'absolute',
  },
  uploadText: {
    ...Typography.subheading,
    fontWeight: '400',
    color: AppColors.text,
    textAlign: 'center',
  },
  note: {
    ...Typography.body,
    minHeight: 56,
    color: AppColors.text,
    backgroundColor: FIELD_GREY,
    borderWidth: 1,
    borderColor: AppColors.text,
    paddingHorizontal: 12,
  },
  label: {
    ...Typography.body,
    color: AppColors.text,
  },
  recipient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    minHeight: 56,
  },
  checkbox: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: FIELD_GREY,
  },
  checkboxChecked: {
    backgroundColor: AppColors.primary,
  },
  recipientName: {
    ...Typography.subheading,
    fontWeight: '400',
    color: AppColors.text,
    flexShrink: 1,
  },
});
