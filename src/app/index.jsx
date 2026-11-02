import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppointmentsScreen from '@/features/health/AppointmentsScreen';
import ContactHomeCareScreen from '@/features/health/ContactHomeCareScreen';
import HealthOverviewScreen from '@/features/health/HealthOverviewScreen';
import MedicationsScreen from '@/features/health/MedicationsScreen';

export default function HealthTestScreen() {
  const [screen, setScreen] = useState('overview');

  function goBack() {
    setScreen('overview');
  }

  let content;

  if (screen === 'appointments') {
    content = (
      <AppointmentsScreen
        personName="Mamma"
        onBack={goBack}
      />
    );
  } else if (screen === 'medications') {
    content = (
      <MedicationsScreen
        personName="Mamma"
        onBack={goBack}
      />
    );
  } else if (screen === 'contact') {
    content = (
      <ContactHomeCareScreen
        personName="Mamma"
        onBack={goBack}
      />
    );
  } else {
    content = (
      <HealthOverviewScreen
        personName="Mamma"
        onOpenAppointments={() => setScreen('appointments')}
        onOpenMedications={() => setScreen('medications')}
        onOpenHomeCare={() => setScreen('contact')}
      />
    );
  }

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={{ flex: 1, backgroundColor: '#FFFFFF' }}
    >
      {content}
    </SafeAreaView>
  );
}