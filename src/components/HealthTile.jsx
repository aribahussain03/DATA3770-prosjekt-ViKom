import { Pressable, StyleSheet, Text } from 'react-native';

import { AppColors } from '../theme/colors';
import { Typography } from '../theme/typography';

export default function HealthTile({
  title,
  description,
  icon,
  onPress,
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.tile,
        pressed && styles.pressed,
      ]}
    >
      {icon}

      <Text style={styles.title}>{title}</Text>

      {description ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    backgroundColor: AppColors.primaryLight,
    borderRadius: 12,
    padding: 20,
    minHeight: 120,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  pressed: {
    opacity: 0.75,
  },
  title: {
    ...Typography.button,
    color: AppColors.text,
    textAlign: 'center',
  },
  description: {
    ...Typography.caption,
    color: AppColors.text,
    textAlign: 'center',
  },
});