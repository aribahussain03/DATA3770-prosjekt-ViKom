import { StyleSheet, Text, View } from 'react-native';

import { AppColors } from '../theme/colors';
import { Typography } from '../theme/typography';

export default function ChatBubble({ text, fromMe }) {
  return (
    <View
      accessibilityLabel={`${fromMe ? 'Du' : 'Mottatt'}: ${text}`}
      style={[styles.bubble, fromMe ? styles.mine : styles.theirs]}
    >
      <Text style={[styles.text, fromMe && styles.mineText]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    maxWidth: '85%',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  theirs: {
    alignSelf: 'flex-start',
    backgroundColor: AppColors.primaryLight,
  },
  mine: {
    alignSelf: 'flex-end',
    backgroundColor: '#42A1F7',
  },
  text: {
    ...Typography.body,
    color: AppColors.text,
  },
  mineText: {
    color: AppColors.background,
  },
});
