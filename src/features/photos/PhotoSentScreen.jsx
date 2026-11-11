import { StyleSheet, Text, View } from 'react-native';

import { AppColors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import PhotoButton from './PhotoButton';

// Bekreftelsen som vises etter at man har trykket «Send bilde».
export default function PhotoSentScreen({ onSendNew, onGoHome }) {
  return (
    <View style={styles.container}>
      <Text accessibilityRole="header" style={styles.title}>
        Bildet er sendt.
      </Text>

      <PhotoButton label="Send nytt bilde" onPress={onSendNew} />
      <PhotoButton label="Tilbake til hjem" onPress={onGoHome} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 24,
    padding: 20,
    paddingBottom: 160,
    backgroundColor: AppColors.background,
  },
  title: {
    ...Typography.heading,
    fontWeight: '400',
    color: AppColors.text,
    textAlign: 'center',
  },
});
