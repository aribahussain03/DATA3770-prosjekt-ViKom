import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppColors } from '../../theme/colors';
import MessagesHeader from './MessagesHeader';

// Valgskjermen «Meldinger». Hvor knappene leder, bestemmes av navigasjonen via props.
export default function MessagesHomeScreen({
  onBack,
  onNewMessage,
  onPreviousConversations,
}) {
  return (
    <View style={styles.container}>
      <MessagesHeader title="Meldinger" onBack={onBack} />

      <View style={styles.choices}>
        <ChoiceCard
          label="Send ny melding"
          icon={{ ios: 'ellipsis.message', android: 'sms', web: 'sms' }}
          onPress={onNewMessage}
        />
        <ChoiceCard
          label="Tidligere samtaler"
          icon={{
            ios: 'bubble.left.and.bubble.right.fill',
            android: 'forum',
            web: 'forum',
          }}
          onPress={onPreviousConversations}
        />
      </View>
    </View>
  );
}

// `icon` har ett navn per plattform: SF Symbols på iOS, Material Symbols ellers.
function ChoiceCard({ label, icon, onPress }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <SymbolView name={icon} size={72} tintColor={AppColors.text} />
      <Text style={styles.cardText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  choices: {
    flex: 1,
    justifyContent: 'center',
    gap: 24,
    padding: 20,
  },
  card: {
    alignItems: 'center',
    gap: 8,
    backgroundColor: AppColors.primaryLight,
    borderRadius: 8,
    paddingVertical: 24,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardPressed: {
    opacity: 0.8,
  },
  cardText: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '400',
    color: AppColors.text,
    textAlign: 'center',
  },
});
