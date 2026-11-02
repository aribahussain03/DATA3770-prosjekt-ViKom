import AppointmentsScreen from '@/features/health/AppointmentsScreen';
import { router } from 'expo-router';

export default function AppointmentsRoute() {
  return (
    <AppointmentsScreen
      personName="Mamma"
      onBack={() => router.back()}
    />
  );
}