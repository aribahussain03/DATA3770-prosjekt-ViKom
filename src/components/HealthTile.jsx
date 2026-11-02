import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text } from 'react-native';

import { AppColors } from '../theme/colors';
import { Typography } from '../theme/typography';

function getIconName(title) {
  const normalizedTitle = title.toLowerCase();

  if (normalizedTitle.includes('avtaler')) {
    return 'event';
  }

  if (normalizedTitle.includes('medisiner')) {
    return 'local-pharmacy';
  }

  if (normalizedTitle.includes('hjemmetjeneste')) {
    return 'chat';
  }

  return 'info-outline';
}

export default function HealthTile({
  title,
  onPress,
  iconName,
}) {
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
      <MaterialIcons
        name={iconName ?? getIconName(title)}
        size={36}
        color={AppColors.text}
        accessible={false}
        style={styles.icon}
      />

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
    minHeight: 140,
    paddingHorizontal: 8,
    paddingVertical: 20,
    borderRadius: 12,
    backgroundColor: AppColors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginBottom: 10,
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