import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppColors } from '../../theme/colors';
import { Typography } from '../../theme/typography';

export default function MessagesHeader({ title, titleIcon, onBack, children }) {
  return (
    <View style={styles.header}>
      {onBack ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Tilbake"
          onPress={onBack}
          hitSlop={8}
          style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
        >
          <Text style={styles.backText}>← Tilbake</Text>
        </Pressable>
      ) : null}

      <View style={styles.titleRow}>
        <View style={styles.titleGroup}>
          <Text accessibilityRole="header" style={styles.title}>
            {title}
          </Text>

          {titleIcon}
        </View>

        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  backButton: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 56,
    paddingHorizontal: 20,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: AppColors.text,
    backgroundColor: AppColors.background,
  },
  pressed: {
    backgroundColor: AppColors.surface,
  },
  backText: {
    ...Typography.button,
    fontSize: 22,
    color: AppColors.text,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  titleGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    ...Typography.heading,
    color: AppColors.text,
    flexShrink: 1,
  },
});
