import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppColors } from '../theme/colors';
import { Typography } from '../theme/typography';

export default function HealthScreenLayout({
  title,
  personName = 'Mamma',
  onBack,
  children,
}) {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          {onBack ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Tilbake"
              onPress={onBack}
              style={styles.backButton}
            >
              <Text style={styles.backText}>←</Text>
            </Pressable>
          ) : null}

          <Text accessibilityRole="header" style={styles.title}>
            {title}
          </Text>
        </View>

        <Text style={styles.label}>Du ser oversikten til</Text>

        <View style={styles.badge}>
          <Text style={styles.name}>{personName}</Text>
        </View>
      </View>

      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  header: {
    padding: 20,
    gap: 6,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backButton: {
    minWidth: 48,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    fontSize: 28,
    color: AppColors.text,
  },
  title: {
    ...Typography.heading,
    color: AppColors.text,
    flex: 1,
  },
  label: {
    ...Typography.caption,
    color: AppColors.textSecondary,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: AppColors.primaryLight,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  name: {
    ...Typography.body,
    color: AppColors.text,
  },
  content: {
    flex: 1,
  },
});