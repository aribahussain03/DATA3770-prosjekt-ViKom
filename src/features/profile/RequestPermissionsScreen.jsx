import { useState } from 'react';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { usePermissions } from '../../context/PermissionsContext';
import { AppColors } from '../../theme/colors';
import { Typography } from '../../theme/typography';

const permissionOptions = [
  { key: 'appointments', label: 'Avtaler' },
  { key: 'medications', label: 'Medisiner' },
  { key: 'homeCare', label: 'Kontakt hjemmetjenesten' },
];

export default function RequestPermissionsScreen({ onBack }) {
  const {
    people,
    selectedPerson,
    permissionsByPerson,
    requestPermissions,
  } = usePermissions();

  const [personId, setPersonId] = useState(selectedPerson.id);
  const [selectedSections, setSelectedSections] = useState([]);
  const [sentRequest, setSentRequest] = useState(null);

  const person = people.find((item) => item.id === personId);
  const statuses = permissionsByPerson[personId] ?? {};

  const availableSelection = selectedSections.filter(
    (section) => statuses[section] === 'none'
  );

  function choosePerson(id) {
    setPersonId(id);
    setSelectedSections([]);
  }

  function toggleSection(section) {
    setSelectedSections((current) =>
      current.includes(section)
        ? current.filter((item) => item !== section)
        : [...current, section]
    );
  }

  function sendRequest() {
    if (!person || availableSelection.length === 0) {
      return;
    }

    requestPermissions(personId, availableSelection);

    setSentRequest({
      personName: person.name,
    });
  }

  if (sentRequest) {
    return (
      <View style={styles.screen}>
        <View style={styles.confirmation}>
          <Text style={styles.checkmark}>✓</Text>

          <Text
            accessibilityRole="header"
            style={styles.confirmationTitle}
          >
            Forespørsel er sendt!
          </Text>

          <Text style={styles.confirmationText}>
            Du har bedt om tilgang til opplysninger om{' '}
            {sentRequest.personName}. Du kan følge statusen i profilen.
          </Text>

          <Pressable
            accessibilityRole="button"
            onPress={onBack}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.buttonText}>Tilbake til profil</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Tilbake til profil"
        onPress={onBack}
        style={styles.backButton}
      >
        <Text style={styles.backText}>← Tilbake</Text>
      </Pressable>

      <Text accessibilityRole="header" style={styles.heading}>
        Be om tillatelser
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Velg person</Text>

        <View style={styles.people}>
          {people.map((item) => {
            const isSelected = item.id === personId;

            return (
              <Pressable
                key={item.id}
                accessibilityRole="radio"
                accessibilityState={{ checked: isSelected }}
                onPress={() => choosePerson(item.id)}
                style={({ pressed }) => [
                  styles.personButton,
                  isSelected && styles.selectedPerson,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.personText}>
                  {isSelected ? '● ' : '○ '}
                  {item.name}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Velg tillatelser for {person?.name}
        </Text>

        {permissionOptions.map(({ key, label }) => {
          const status = statuses[key];
          const disabled = status !== 'none';
          const checked =
            selectedSections.includes(key) || status === 'granted';

          return (
            <Pressable
              key={key}
              accessibilityRole="checkbox"
              accessibilityLabel={label}
              accessibilityState={{ checked, disabled }}
              disabled={disabled}
              onPress={() => toggleSection(key)}
              style={({ pressed }) => [
                styles.option,
                pressed && styles.pressed,
              ]}
            >
              <View
                style={[
                  styles.checkbox,
                  checked && styles.checked,
                ]}
              >
                {checked && <Text style={styles.tick}>✓</Text>}
              </View>

              <View style={styles.optionText}>
                <Text style={styles.label}>{label}</Text>

                {status === 'granted' && (
                  <Text style={styles.description}>
                    Du har allerede tilgang.
                  </Text>
                )}

                {status === 'pending' && (
                  <Text style={styles.description}>
                    Venter på godkjenning.
                  </Text>
                )}
              </View>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.description}>
        Forespørselen gjelder personen du har valgt her. Den endrer
        ikke hvem som er valgt i helseoversikten.
      </Text>

      <Pressable
        accessibilityRole="button"
        accessibilityState={{
          disabled: availableSelection.length === 0,
        }}
        disabled={availableSelection.length === 0}
        onPress={sendRequest}
        style={({ pressed }) => [
          styles.button,
          availableSelection.length === 0 && styles.disabled,
          pressed && styles.pressed,
        ]}
      >
        <Text style={styles.buttonText}>Send forespørsel</Text>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        onPress={onBack}
        style={styles.cancelButton}
      >
        <Text style={styles.cancelText}>Avbryt</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
    gap: 28,
  },
  backButton: {
    minHeight: 48,
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },
  backText: {
    ...Typography.body,
    color: AppColors.primary,
  },
  heading: {
    ...Typography.heading,
    color: AppColors.text,
    textAlign: 'center',
  },
  section: {
    gap: 16,
  },
  sectionTitle: {
    ...Typography.subheading,
    color: AppColors.text,
  },
  people: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  personButton: {
    minHeight: 48,
    justifyContent: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: AppColors.border,
    borderRadius: 8,
  },
  selectedPerson: {
    backgroundColor: AppColors.primaryLight,
    borderColor: AppColors.primary,
  },
  personText: {
    ...Typography.body,
    color: AppColors.text,
  },
  option: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderWidth: 2,
    borderColor: AppColors.primary,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: AppColors.primary,
  },
  tick: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  optionText: {
    flex: 1,
    gap: 4,
  },
  label: {
    ...Typography.body,
    color: AppColors.text,
  },
  description: {
    ...Typography.caption,
    color: AppColors.textSecondary,
  },
  button: {
    minHeight: 48,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: AppColors.primary,
  },
  buttonText: {
    ...Typography.button,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  cancelButton: {
    minHeight: 48,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  cancelText: {
    ...Typography.button,
    color: AppColors.primary,
  },
  confirmation: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 24,
  },
  checkmark: {
    fontSize: 72,
    color: '#176B39',
  },
  confirmationTitle: {
    ...Typography.subheading,
    color: AppColors.text,
    textAlign: 'center',
  },
  confirmationText: {
    ...Typography.body,
    color: AppColors.text,
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.75,
  },
});