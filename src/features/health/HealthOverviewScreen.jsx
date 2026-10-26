import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import AppDialog from '../../components/AppDialog';
import HealthScreenLayout from '../../components/HealthScreenLayout';
import HealthTile from '../../components/HealthTile';

export default function HealthOverviewScreen({
  personName = 'Mamma',
  permissions = {
    appointments: true,
    medications: true,
    homeCare: true,
  },
  onBack,
  onOpenAppointments,
  onOpenMedications,
  onOpenHomeCare,
}) {
  const [dialog, setDialog] = useState(null);

  function openSection(section, action) {
    if (permissions[section]) {
      action?.();
      return;
    }

    setDialog(section === 'homeCare' ? 'homeCare' : 'request');
  }

  function closeDialog() {
    setDialog(null);
  }

  return (
    <HealthScreenLayout
      title="Helseoversikt"
      personName={personName}
      onBack={onBack}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.grid}>
          <View style={styles.tile}>
            <HealthTile
              title="Avtaler"
              onPress={() =>
                openSection('appointments', onOpenAppointments)
              }
            />
          </View>

          <View style={styles.tile}>
            <HealthTile
              title="Medisiner"
              onPress={() =>
                openSection('medications', onOpenMedications)
              }
            />
          </View>

          <View style={styles.tile}>
            <HealthTile
              title="Kontakt hjemmetjeneste"
              onPress={() =>
                openSection('homeCare', onOpenHomeCare)
              }
            />
          </View>
        </View>
      </ScrollView>

      <AppDialog
        visible={dialog === 'request'}
        title="Tilgang"
        message="Du har ikke tilgang til denne informasjonen. Vil du spørre om tilgang?"
        confirmLabel="Send forespørsel"
        cancelLabel="Avbryt"
        onConfirm={() => setDialog('sent')}
        onClose={closeDialog}
      />

      <AppDialog
        visible={dialog === 'sent'}
        title="Sendt"
        message="Forespørsel er sendt."
        onConfirm={closeDialog}
        onClose={closeDialog}
      />

      <AppDialog
        visible={dialog === 'homeCare'}
        title="Tilgang"
        message="Du har ikke tilgang til hjemmetjeneste. Personen må gi tilgang gjennom ViKom."
        onConfirm={closeDialog}
        onClose={closeDialog}
      />
    </HealthScreenLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    paddingTop: 32,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
  tile: {
    width: '48%',
  },
});