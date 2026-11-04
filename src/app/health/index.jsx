import { router } from 'expo-router';

import HealthOverviewScreen from '@/features/health/HealthOverviewScreen';

export default function HealthOverviewRoute() {
  return (
    <HealthOverviewScreen
      personName="Mamma"
      onBack={() => router.replace('/')}
      onOpenAppointments={() => router.push('/health/appointments')}
      onOpenMedications={() => router.push('/health/medications')}
      onOpenHomeCare={() => router.push('/health/contact')}
    />
  );
}