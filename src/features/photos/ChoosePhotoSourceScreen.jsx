import { SymbolView } from 'expo-symbols';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppColors } from '../../theme/colors';
import MessagesHeader from '../messages/MessagesHeader';

// Skjermen «Velg kilde»: bildet kan komme fra kameraet eller galleriet.
export default function ChoosePhotoSourceScreen({
  onBack,
  onOpenCamera,
  onOpenGallery,
}) {
  return (
    <View style={styles.container}>
      <MessagesHeader onBack={onBack} />

      <View style={styles.content}>
        <Text accessibilityRole="header" style={styles.title}>
          Velg bildet fra
        </Text>

        <View style={styles.sources}>
          <SourceCard
            label="Kamera"
            icon={{ ios: 'camera.fill', android: 'photo_camera', web: 'photo_camera' }}
            onPress={onOpenCamera}
          />
          <SourceCard
            label="Galleri"
            icon={{ ios: 'photo', android: 'image', web: 'image' }}
            onPress={onOpenGallery}
          />
        </View>
      </View>
    </View>
  );
}

function SourceCard({ label, icon, onPress }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [styles.source, pressed && styles.pressed]}
    >
      <View style={styles.card}>
        <SymbolView name={icon} size={88} tintColor={AppColors.text} />
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: 24,
    padding: 20,
    paddingBottom: 120,
  },
  title: {
    fontSize: 36,
    lineHeight: 44,
    fontWeight: '400',
    color: AppColors.text,
    textAlign: 'center',
  },
  sources: {
    flexDirection: 'row',
    gap: 16,
  },
  source: {
    flex: 1,
    gap: 16,
  },
  pressed: {
    opacity: 0.8,
  },
  card: {
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.primaryLight,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  label: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '400',
    color: AppColors.text,
    textAlign: 'center',
  },
});
