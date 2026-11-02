import { router } from 'expo-router';

import ContactHomeCareScreen from '@/features/health/ContactHomeCareScreen';

export default function ContactHomeCareRoute() {
  return (
    <ContactHomeCareScreen
      personName="Mamma"
      onBack={() => router.back()}
    />
  );
}