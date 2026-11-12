import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import AppDialog from '../../components/AppDialog';
import HealthScreenLayout from '../../components/HealthScreenLayout';
import HealthTile from '../../components/HealthTile';
import { usePermissions } from '../../context/PermissionsContext';

export default function HealthOverviewScreen({
  onBack,
  onOpenAppointments,
  onOpenMedications,
  onOpenHomeCare,
}) {
  const {
    selectedPerson,
    permissions,
    permissionStatuses,
    requestPermission,
  } = usePermissions();

  const [dialog, setDialog] = useState(null);
  const [requestedSection, setRequestedSection] = useState(null);

  function openSection(section, action) {
    // Godkjent tilgang fra profilen åpner siden direkte.
    if (permissions[section]) {
      action?.();
      return;
    }

    // En eksisterende forespørsel skal ikke sendes på nytt.
    if (permissionStatuses[section] === 'pending') {
      setDialog('pending');
      return;
    }

    setRequestedSection(section);
    setDialog('request');
  }

  function sendRequest() {
    if (!requestedSection) {
      return;
    }

    // Beholder simulert godkjenning fra helseoversikten.
    requestPermission(requestedSection);
    setDialog('sent');
  }

  function closeDialog() {
    setDialog(null);
    setRequestedSection(null);
  }

  return (
    <HealthScreenLayout
      title="Helse og avtaler"
      personName={selectedPerson.name}
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
              title={'Kontakt\nhjemmetjenesten'}
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
        message={`Du har ikke tilgang til disse opplysningene om ${selectedPerson.name}. Vil du spørre om tilgang?`}
        confirmLabel="Send forespørsel"
        cancelLabel="Avbryt"
        onConfirm={sendRequest}
        onClose={closeDialog}
      />

      <AppDialog
        visible={dialog === 'sent'}
        title="Sendt"
        message="Forespørsel om tilgang er sendt."
        confirmLabel="OK"
        onConfirm={closeDialog}
        onClose={closeDialog}
      />

      <AppDialog
        visible={dialog === 'pending'}
        title="Venter på godkjenning"
        message={`Du har allerede sendt en forespørsel om tilgang til disse opplysningene om ${selectedPerson.name}. Du kan følge statusen i profilen.`}
        confirmLabel="OK"
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