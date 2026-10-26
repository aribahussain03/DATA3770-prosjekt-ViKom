import { Pressable, StyleSheet, Text } from 'react-native';

import { AppColors } from '../theme/colors';
import { Typography } from '../theme/typography';

type HealthTileProps = {
  title: string;
  description: string;
  onPress: () => void;
};

export default function HealthTile({
  title,
  description,
  onPress,
}: HealthTileProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.tile,
        pressed && styles.pressed,
      ]}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    backgroundColor: AppColors.primaryLight,
    borderColor: AppColors.primary,
    borderWidth: 1,
    borderRadius: 16,
    padding: 24,
    minHeight: 120,
    justifyContent: 'center',
    gap: 8,
  },
  pressed: {
    opacity: 0.75,
  },
  title: {
    ...Typography.subheading,
    color: AppColors.text,
  },
  description: {
    ...Typography.body,
    color: AppColors.textSecondary,
  },
});