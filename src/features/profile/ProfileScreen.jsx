import { useState } from 'react';
import {
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import { usePermissions } from '../../context/PermissionsContext';
import { AppColors } from '../../theme/colors';
import { Typography } from '../../theme/typography';

const permissionLabels = {
  appointments: 'Avtaler',
  medications: 'Medisiner',
  homeCare: 'Kontakt hjemmetjenesten',
};

const statusLabels = {
  none: 'Ingen tilgang',
  pending: 'Venter på godkjenning',
  granted: 'Tilgang godkjent',
};

export default function ProfileScreen({
  onRequestPermissions,
  onChangeImage,
}) {
  const {
    username,
    setUsername,
    profileImage,
    people,
    selectedPerson,
    selectPerson,
    addPerson,
    removePerson,
    permissionStatuses,
    simulateApproval,
  } = usePermissions();

  const [editingUsername, setEditingUsername] = useState(false);
  const [usernameDraft, setUsernameDraft] = useState(username);
  const [showAddPerson, setShowAddPerson] = useState(false);
  const [personName, setPersonName] = useState('');

  const pendingSections = Object.keys(permissionLabels).filter(
    (section) => permissionStatuses[section] === 'pending'
  );

  function saveUsername() {
    const trimmedUsername = usernameDraft.trim();

    if (!trimmedUsername) {
      return;
    }

    setUsername(trimmedUsername);
    setEditingUsername(false);
  }

  function savePerson() {
    const personId = addPerson(personName);

    if (personId) {
      setPersonName('');
      setShowAddPerson(false);
    }
  }

  function confirmRemovePerson() {
    const personToRemove = selectedPerson;

    Alert.alert(
      `Fjerne ${personToRemove.name}?`,
      'Personen og tilhørende tillatelser fjernes fra profilen.',
      [
        {
          text: 'Avbryt',
          style: 'cancel',
        },
        {
          text: 'Fjern',
          style: 'destructive',
          onPress: () => removePerson(personToRemove.id),
        },
      ]
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text accessibilityRole="header" style={styles.heading}>
        Min profil
      </Text>

      <View style={styles.profileSection}>
        <View style={styles.avatarPlaceholder}>
          <Text
            accessibilityLabel={
              profileImage ? 'Valgt eksempelbilde' : 'Profilinitial'
            }
            style={styles.avatarInitial}
          >
            {profileImage ||
              username.trim().charAt(0).toUpperCase() ||
              '?'}
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Bytt eksempelbilde"
          accessibilityState={{ disabled: !onChangeImage }}
          onPress={onChangeImage}
          disabled={!onChangeImage}
          style={({ pressed }) => [
            styles.button,
            styles.centeredButton,
            !onChangeImage && styles.disabled,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.buttonText}>Endre bilde</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Brukernavn</Text>

        {editingUsername ? (
          <View style={styles.editGroup}>
            <TextInput
              accessibilityLabel="Brukernavn"
              value={usernameDraft}
              onChangeText={setUsernameDraft}
              placeholder="Skriv brukernavn"
              placeholderTextColor={AppColors.textSecondary}
              maxLength={40}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
              onSubmitEditing={saveUsername}
              style={styles.input}
            />

            <View style={styles.buttonRow}>
              <Pressable
                accessibilityRole="button"
                accessibilityState={{
                  disabled: !usernameDraft.trim(),
                }}
                onPress={saveUsername}
                disabled={!usernameDraft.trim()}
                style={({ pressed }) => [
                  styles.button,
                  !usernameDraft.trim() && styles.disabled,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.buttonText}>Lagre</Text>
              </Pressable>

              <Pressable
                accessibilityRole="button"
                onPress={() => setEditingUsername(false)}
                style={styles.secondaryButton}
              >
                <Text style={styles.secondaryButtonText}>
                  Avbryt
                </Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Rediger brukernavn"
            onPress={() => {
              setUsernameDraft(username);
              setEditingUsername(true);
            }}
            style={({ pressed }) => [
              styles.usernameField,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.body}>
              {username || 'Legg til brukernavn'}
            </Text>

            <Text style={styles.editText}>Endre</Text>
          </Pressable>
        )}
      </View>

      <View style={styles.section}>
        <Text
          accessibilityRole="header"
          style={styles.sectionTitle}
        >
          Administrerte tilganger
        </Text>

        <Text style={styles.description}>
          Velg hvem du ønsker å se helseoversikten til.
        </Text>

        <View style={styles.people}>
          {people.map((person) => {
            const isSelected = person.id === selectedPerson.id;

            return (
              <Pressable
                key={person.id}
                accessibilityRole="button"
                accessibilityLabel={`Velg ${person.name}`}
                accessibilityState={{ selected: isSelected }}
                onPress={() => selectPerson(person.id)}
                style={({ pressed }) => [
                  styles.person,
                  isSelected && styles.selectedPerson,
                  pressed && styles.pressed,
                ]}
              >
                <View
                  style={[
                    styles.personAvatar,
                    isSelected && styles.selectedPersonAvatar,
                  ]}
                >
                  <Text
                    style={[
                      styles.personInitial,
                      isSelected && styles.selectedPersonInitial,
                    ]}
                  >
                    {person.name.charAt(0).toUpperCase()}
                  </Text>
                </View>

                <Text style={styles.personName}>
                  {person.name}
                </Text>

                {isSelected && (
                  <Text style={styles.selectedText}>Valgt</Text>
                )}
              </Pressable>
            );
          })}
        </View>

        <View style={styles.buttonRow}>
          <Pressable
            accessibilityRole="button"
            onPress={() =>
              setShowAddPerson((current) => !current)
            }
            style={styles.secondaryButton}
          >
            <Text style={styles.secondaryButtonText}>
              {showAddPerson ? 'Avbryt' : '+ Legg til person'}
            </Text>
          </Pressable>

          {people.length > 1 && (
            <Pressable
              accessibilityRole="button"
              onPress={confirmRemovePerson}
              style={[
                styles.secondaryButton,
                styles.removeButton,
              ]}
            >
              <Text
                style={[
                  styles.secondaryButtonText,
                  styles.removeText,
                ]}
              >
                Fjern {selectedPerson.name}
              </Text>
            </Pressable>
          )}
        </View>

        {showAddPerson && (
          <View style={styles.editGroup}>
            <TextInput
              accessibilityLabel="Navn på personen"
              value={personName}
              onChangeText={setPersonName}
              placeholder="Navn på personen"
              placeholderTextColor={AppColors.textSecondary}
              maxLength={60}
              returnKeyType="done"
              onSubmitEditing={savePerson}
              style={styles.input}
            />

            <Pressable
              accessibilityRole="button"
              accessibilityState={{
                disabled: !personName.trim(),
              }}
              onPress={savePerson}
              disabled={!personName.trim()}
              style={({ pressed }) => [
                styles.button,
                !personName.trim() && styles.disabled,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.buttonText}>Legg til</Text>
            </Pressable>

            <Text style={styles.description}>
              Personen legges til som eksempel i prototypen.
              Tilgang til opplysninger må forespørres separat.
            </Text>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text
          accessibilityRole="header"
          style={styles.sectionTitle}
        >
          Tillatelser for {selectedPerson.name}
        </Text>

        {Object.entries(permissionLabels).map(
          ([section, label]) => {
            const status = permissionStatuses[section];

            return (
              <View key={section} style={styles.permissionRow}>
                <Text style={styles.permissionLabel}>
                  {label}
                </Text>

                <Text
                  style={[
                    styles.status,
                    status === 'granted' && styles.granted,
                    status === 'pending' && styles.pending,
                  ]}
                >
                  {statusLabels[status]}
                </Text>
              </View>
            );
          }
        )}

        <Pressable
          accessibilityRole="button"
          accessibilityState={{
            disabled: !onRequestPermissions,
          }}
          onPress={onRequestPermissions}
          disabled={!onRequestPermissions}
          style={({ pressed }) => [
            styles.button,
            !onRequestPermissions && styles.disabled,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.buttonText}>
            Be om tillatelser
          </Text>
        </Pressable>

        {pendingSections.length > 0 && (
          <View style={styles.testPanel}>
            <Text style={styles.description}>
              Prototype: Simuler at personen har godkjent
              forespørselen.
            </Text>

            <Pressable
              accessibilityRole="button"
              onPress={() =>
                simulateApproval(
                  selectedPerson.id,
                  pendingSections
                )
              }
              style={styles.secondaryButton}
            >
              <Text style={styles.secondaryButtonText}>
                Simuler godkjenning
              </Text>
            </Pressable>
          </View>
        )}
      </View>
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
  heading: {
    ...Typography.heading,
    color: AppColors.text,
    textAlign: 'center',
  },
  profileSection: {
    alignItems: 'center',
    gap: 16,
  },
  avatarPlaceholder: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: AppColors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    fontSize: 40,
    fontWeight: '600',
    color: AppColors.text,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    ...Typography.subheading,
    color: AppColors.text,
  },
  label: {
    ...Typography.body,
    color: AppColors.text,
  },
  body: {
    ...Typography.body,
    color: AppColors.text,
    flex: 1,
  },
  description: {
    ...Typography.caption,
    color: AppColors.textSecondary,
  },
  usernameField: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.surface,
    borderRadius: 8,
    padding: 12,
    gap: 12,
  },
  editText: {
    ...Typography.body,
    color: AppColors.primary,
  },
  editGroup: {
    gap: 12,
  },
  input: {
    ...Typography.body,
    minHeight: 48,
    borderWidth: 1,
    borderColor: AppColors.border,
    borderRadius: 8,
    padding: 12,
    color: AppColors.text,
    backgroundColor: AppColors.background,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  button: {
    minHeight: 48,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: AppColors.primary,
  },
  centeredButton: {
    alignSelf: 'center',
  },
  buttonText: {
    ...Typography.button,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  secondaryButton: {
    minHeight: 48,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: AppColors.primary,
    borderRadius: 8,
  },
  secondaryButtonText: {
    ...Typography.button,
    color: AppColors.primary,
    textAlign: 'center',
  },
  removeButton: {
    borderColor: '#B42318',
  },
  removeText: {
    color: '#B42318',
  },
  people: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  person: {
    width: 100,
    minHeight: 116,
    alignItems: 'center',
    padding: 8,
    gap: 6,
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 12,
  },
  selectedPerson: {
    borderColor: AppColors.primary,
    backgroundColor: AppColors.primaryLight,
  },
  personAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.surface,
  },
  selectedPersonAvatar: {
    backgroundColor: AppColors.primary,
  },
  personInitial: {
    fontSize: 24,
    fontWeight: '600',
    color: AppColors.text,
  },
  selectedPersonInitial: {
    color: '#FFFFFF',
  },
  personName: {
    ...Typography.body,
    color: AppColors.text,
    textAlign: 'center',
  },
  selectedText: {
    ...Typography.caption,
    color: AppColors.text,
  },
  permissionRow: {
    paddingVertical: 12,
    gap: 4,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.border,
  },
  permissionLabel: {
    ...Typography.body,
    color: AppColors.text,
  },
  status: {
    ...Typography.caption,
    color: AppColors.textSecondary,
  },
  granted: {
    color: '#176B39',
  },
  pending: {
    color: '#855800',
  },
  testPanel: {
    padding: 12,
    gap: 12,
    borderRadius: 8,
    backgroundColor: AppColors.surface,
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.75,
  },
});