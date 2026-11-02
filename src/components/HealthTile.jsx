import { Pressable, StyleSheet, Text } from 'react-native';

import { AppColors } from '../theme/colors';
import { Typography } from '../theme/typography';

export default function HealthTile({ title, onPress }) {
  const lines = title.split('\n');

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title.replace(/\n/g, ' ')}
      onPress={onPress}
      style={({ pressed }) => [
        styles.tile,
        pressed && styles.pressed,
      ]}
    >
      {lines.map((line, index) => (
        <Text
          key={`${index}-${line}`}
          style={styles.title}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.65}
        >
          {line}
        </Text>
      ))}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    minHeight: 120,
    paddingHorizontal: 8,
    paddingVertical: 20,
    borderRadius: 12,
    backgroundColor: AppColors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...Typography.body,
    width: '100%',
    fontSize: 20,
    fontWeight: '600',
    color: AppColors.text,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
});