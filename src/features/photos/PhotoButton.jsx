import { Pressable, StyleSheet, Text } from 'react-native';

import { AppColors } from '../../theme/colors';
import { Typography } from '../../theme/typography';

// Den store blå knappen som bildeskjermene deler.
export default function PhotoButton({ label, onPress, disabled = false }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        disabled && styles.disabled,
        pressed && styles.pressed,
      ]}
    >
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 72,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.primaryLight,
    borderRadius: 8,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.8,
  },
  text: {
    ...Typography.subheading,
    fontWeight: '400',
    color: AppColors.text,
    textAlign: 'center',
  },
});
