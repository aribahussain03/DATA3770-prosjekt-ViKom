import { FlatList, StyleSheet, Text, View } from 'react-native';

import HealthScreenLayout from '../../components/HealthScreenLayout';
import { mockAppointments } from '../../data/healthMockData';
import { AppColors } from '../../theme/colors';
import { Typography } from '../../theme/typography';

export default function AppointmentsScreen({
  personName = 'Mamma',
  onBack,
  appointments = mockAppointments,
}) {
  return (
    <HealthScreenLayout
      title="Avtaler"
      personName={personName}
      onBack={onBack}
    >
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.text}>Ingen avtaler å vise.</Text>
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
  },
  text: {
    ...Typography.body,
    color: AppColors.text,
  },
});