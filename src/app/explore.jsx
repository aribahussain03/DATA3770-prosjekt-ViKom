import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppointmentsScreen from '@/features/health/AppointmentsScreen';
import ContactHomeCareScreen from '@/features/health/ContactHomeCareScreen';
import HealthOverviewScreen from '@/features/health/HealthOverviewScreen';
import MedicationsScreen from '@/features/health/MedicationsScreen';
import ProfileFlow from '@/features/profile/ProfileFlow';

import { usePermissions } from '@/context/PermissionsContext';
import { healthDataByPerson } from '@/data/healthMockData';
import { AppColors } from '@/theme/colors';
import { Typography } from '@/theme/typography';

const emptyHealthData = {
  appointments: [],
  medications: [],
};

export default function ExploreScreen() {
  const [screen, setScreen] = useState('overview');
  const { selectedPerson } = usePermissions();

  const healthData =
    healthDataByPerson[selectedPerson.id] ?? emptyHealthData;

  function showOverview() {
    setScreen('overview');
  }

  let content;

  if (screen === 'profile') {
    content = <ProfileFlow />;
  } else if (screen === 'appointments') {
    content = (
      <AppointmentsScreen
        personName={selectedPerson.name}
        appointments={healthData.appointments}
        onBack={showOverview}
      />
    );
  } else if (screen === 'medications') {
    content = (
      <MedicationsScreen
        personName={selectedPerson.name}
        medications={healthData.medications}
        onBack={showOverview}
      />
    );
  } else if (screen === 'contact') {
    content = (
      <ContactHomeCareScreen
        key={selectedPerson.id}
        personName={selectedPerson.name}
        onBack={showOverview}
      />
    );
  } else {
    content = (
      <HealthOverviewScreen
        key={selectedPerson.id}
        personName={selectedPerson.name}
        onOpenAppointments={() => setScreen('appointments')}
        onOpenMedications={() => setScreen('medications')}
        onOpenHomeCare={() => setScreen('contact')}
      />
    );
  }

  const healthSelected = screen !== 'profile';

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={styles.container}
    >
      <View style={styles.testNavigation}>
        <Text style={styles.testLabel}>Testvisning</Text>

        <View style={styles.buttons}>
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: healthSelected }}
            onPress={showOverview}
            style={({ pressed }) => [
              styles.button,
              healthSelected && styles.selectedButton,
              pressed && styles.pressed,
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                healthSelected && styles.selectedButtonText,
              ]}
            >
              Helseoversikt
            </Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityState={{
              selected: screen === 'profile',
            }}
            onPress={() => setScreen('profile')}
            style={({ pressed }) => [
              styles.button,
              screen === 'profile' && styles.selectedButton,
              pressed && styles.pressed,
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                screen === 'profile' && styles.selectedButtonText,
              ]}
            >
              Profil
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.content}>{content}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  testNavigation: {
    padding: 12,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.border,
  },
  testLabel: {
    ...Typography.caption,
    color: AppColors.textSecondary,
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    minHeight: 48,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: AppColors.primary,
  },
  selectedButton: {
    backgroundColor: AppColors.primary,
  },
  buttonText: {
    ...Typography.button,
    color: AppColors.primary,
    textAlign: 'center',
  },
  selectedButtonText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  pressed: {
    opacity: 0.75,
  },
});