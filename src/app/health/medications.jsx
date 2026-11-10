import MedicationsScreen from '@/features/health/MedicationsScreen';
import { router } from 'expo-router';

export default function MedicationsRoute() {
  return (
    <MedicationsScreen
      personName="Mamma"
      onBack={() => router.back()}
    />
  );
}