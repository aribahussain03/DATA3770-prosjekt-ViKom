import { FlatList, StyleSheet, Text, View } from 'react-native';

import HealthScreenLayout from '../../components/HealthScreenLayout';
import { mockMedications } from '../../data/healthMockData';
import { AppColors } from '../../theme/colors';
import { Typography } from '../../theme/typography';

export default function MedicationsScreen({
  personName = 'Mamma',
  onBack,
  medications = mockMedications,
}) {
  return (
    <HealthScreenLayout
      title="Medisiner"
      personName={personName}
      onBack={onBack}
    >
      <FlatList
        data={medications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <Text style={styles.note}>Eksempeldata til prototypen</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.time}</Text>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>{item.details}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.text}>Ingen medisiner å vise.</Text>
        }
      />
    </HealthScreenLayout>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 20,
    gap: 12,
  },
  card: {
    backgroundColor: AppColors.primaryLight,
    borderRadius: 8,
    padding: 16,
    gap: 6,
  },
  title: {
    ...Typography.subheading,
    color: AppColors.text,
  },
  text: {
    ...Typography.body,
    color: AppColors.text,
  },
  note: {
    ...Typography.caption,
    color: AppColors.textSecondary,
  },
});