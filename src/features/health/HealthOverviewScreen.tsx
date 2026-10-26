import { ScrollView, StyleSheet, Text, View } from 'react-native';

import HealthTile from '../../components/HealthTile';
import { AppColors } from '../../theme/colors';
import { Typography } from '../../theme/typography';

type HealthOverviewScreenProps = {
  personName: string;
  onOpenAppointments: () => void;
  onOpenMedications: () => void;
  onOpenHomeCare: () => void;
};

export default function HealthOverviewScreen({
  personName,
  onOpenAppointments,
  onOpenMedications,
  onOpenHomeCare,
}: HealthOverviewScreenProps) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text accessibilityRole="header" style={styles.heading}>
        Helseoversikt
      </Text>

      <View style={styles.person}>
        <Text style={styles.label}>Du ser oversikten til</Text>

        <View style={styles.nameBadge}>
          <Text style={styles.name}>{personName}</Text>
        </View>
      </View>

      <View style={styles.tiles}>
        <HealthTile
          title="Avtaler"
          description="Se kommende avtaler"
          onPress={onOpenAppointments}
        />

        <HealthTile
          title="Medisiner"
          description="Se medisiner og tidspunkt"
          onPress={onOpenMedications}
        />

        <HealthTile
          title="Kontakt hjemmetjeneste"
          description="Skriv en melding"
          onPress={onOpenHomeCare}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: AppColors.background,
    padding: 20,
    gap: 24,
  },
  heading: {
    ...Typography.heading,
    color: AppColors.text,
  },
  person: {
    alignItems: 'flex-start',
    gap: 8,
  },
  label: {
    ...Typography.caption,
    color: AppColors.textSecondary,
  },
  nameBadge: {
    backgroundColor: AppColors.primaryLight,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  name: {
    ...Typography.body,
    color: AppColors.text,
  },
  tiles: {
    gap: 16,
  },
});