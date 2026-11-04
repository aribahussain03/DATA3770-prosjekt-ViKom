import { MaterialIcons } from '@expo/vector-icons';
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

const permissionOptions = [
  {
    key: 'appointments',
    label: 'Avtaler',
    icon: 'event',
  },
  {
    key: 'medications',
    label: 'Medisiner',
    icon: 'local-pharmacy',
  },
  {
    key: 'homeCare',
    label: 'Kontakt hjemmetjenesten',
    icon: 'chat',
  },
];

const statusLabels = {
  none: 'Ingen tilgang',
  pending: 'Venter på godkjenning',
  granted: 'Tilgang godkjent',
};

function Icon({ name, size = 24, color = AppColors.text }) {
  return (
    <MaterialIcons
      name={name}
      size={size}
      color={color}
      accessible={false}
    />
  );
}

function ProfileButton({
  label,
  icon,
  onPress,
  disabled = false,
  secondary = false,
  danger = false,
  centered = false,
}) {
  const color = danger
    ? '#B42318'
    : secondary
      ? AppColors.primary
      : '#FFFFFF';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        secondary && styles.secondaryButton,
        danger && styles.removeButton,
        centered && styles.centeredButton,
        disabled && styles.disabled,
        pressed && styles.pressed,
      ]}
    >
      <Icon name={icon} color={color} size={22} />

      <Text style={[styles.buttonText, { color }]}>
        {label}
      </Text>
    </Pressable>
  );
}

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

  const pendingSections = permissionOptions
    .filter(({ key }) => permissionStatuses[key] === 'pending')
    .map(({ key }) => key);

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
        <View
          accessible
          accessibilityLabel={
            profileImage ? 'Valgt eksempelbilde' : 'Profilbilde'
          }
          style={styles.avatarPlaceholder}
        >
          {profileImage ? (
            <Text style={styles.avatarImage}>
              {profileImage}
            </Text>
          ) : (
            <Icon
              name="account-circle"
              size={84}
              color={AppColors.primary}
            />
          )}
        </View>

        <ProfileButton
          label="Endre bilde"
          icon="photo-camera"
          onPress={onChangeImage}
          disabled={!onChangeImage}
          centered
        />
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
              <ProfileButton
                label="Lagre"
                icon="check"
                onPress={saveUsername}
                disabled={!usernameDraft.trim()}
              />

              <ProfileButton
                label="Avbryt"
                icon="close"
                onPress={() => setEditingUsername(false)}
                secondary
              />
            </View>
          </View>
        ) : (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Rediger brukernavn${
              username ? `: ${username}` : ''
            }`}
            onPress={() => {
              setUsernameDraft(username);
              setEditingUsername(true);
            }}
            style={({ pressed }) => [
              styles.usernameField,
              pressed && styles.pressed,
            ]}
          >
            <Icon
              name="person-outline"
              color={AppColors.primary}
            />

            <Text style={styles.body}>
              {username || 'Legg til brukernavn'}
            </Text>

            <Icon name="edit" color={AppColors.primary} />
          </Pressable>
        )}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeading}>
          <Icon name="people-outline" color={AppColors.primary} />

          <Text
            accessibilityRole="header"
            style={styles.sectionTitle}
          >
            Administrerte tilganger
          </Text>
        </View>

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
                  <Icon
                    name="person"
                    size={32}
                    color={
                      isSelected
                        ? '#FFFFFF'
                        : AppColors.text
                    }
                  />
                </View>

                <Text style={styles.personName}>
                  {person.name}
                </Text>

                {isSelected && (
                  <View style={styles.selectedLabel}>
                    <Icon
                      name="check-circle"
                      size={16}
                      color={AppColors.primary}
                    />
                    <Text style={styles.selectedText}>
                      Valgt
                    </Text>
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>

        <View style={styles.buttonRow}>
          <ProfileButton
            label={showAddPerson ? 'Avbryt' : 'Legg til person'}
            icon={showAddPerson ? 'close' : 'person-add'}
            onPress={() =>
              setShowAddPerson((current) => !current)
            }
            secondary
          />

          {people.length > 1 && (
            <ProfileButton
              label={`Fjern ${selectedPerson.name}`}
              icon="delete-outline"
              onPress={confirmRemovePerson}
              secondary
              danger
            />
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

            <ProfileButton
              label="Legg til"
              icon="add"
              onPress={savePerson}
              disabled={!personName.trim()}
            />

            <Text style={styles.description}>
              Personen legges til som eksempel i prototypen.
              Tilgang til opplysninger må forespørres separat.
            </Text>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeading}>
          <Icon
            name="verified-user"
            color={AppColors.primary}
          />

          <Text
            accessibilityRole="header"
            style={styles.sectionTitle}
          >
            Tillatelser for {selectedPerson.name}
          </Text>
        </View>

        {permissionOptions.map(({ key, label, icon }) => {
          const status = permissionStatuses[key];

          const statusColor =
            status === 'granted'
              ? '#176B39'
              : status === 'pending'
                ? '#855800'
                : AppColors.textSecondary;

          const statusIcon =
            status === 'granted'
              ? 'lock-open'
              : status === 'pending'
                ? 'schedule'
                : 'lock-outline';

          return (
            <View key={key} style={styles.permissionRow}>
              <Icon
                name={icon}
                size={28}
                color={AppColors.primary}
              />

              <View style={styles.permissionContent}>
                <Text style={styles.permissionLabel}>
                  {label}
                </Text>

                <View style={styles.statusRow}>
                  <Icon
                    name={statusIcon}
                    size={18}
                    color={statusColor}
                  />

                  <Text
                    style={[
                      styles.status,
                      { color: statusColor },
                    ]}
                  >
                    {statusLabels[status]}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}

        <ProfileButton
          label="Be om tillatelser"
          icon="vpn-key"
          onPress={onRequestPermissions}
          disabled={!onRequestPermissions}
        />

        {pendingSections.length > 0 && (
          <View style={styles.testPanel}>
            <Text style={styles.description}>
              Prototype: Simuler at personen har godkjent
              forespørselen.
            </Text>

            <ProfileButton
              label="Simuler godkjenning"
              icon="check-circle-outline"
              onPress={() =>
                simulateApproval(
                  selectedPerson.id,
                  pendingSections
                )
              }
              secondary
            />
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
  avatarImage: {
    fontSize: 48,
    color: AppColors.text,
  },
  section: {
    gap: 12,
  },
  sectionHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  sectionTitle: {
    ...Typography.subheading,
    color: AppColors.text,
    flex: 1,
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
    maxWidth: '100%',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
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
    flexShrink: 1,
  },
  secondaryButton: {
    backgroundColor: AppColors.background,
    borderWidth: 1,
    borderColor: AppColors.primary,
  },
  removeButton: {
    borderColor: '#B42318',
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
  personName: {
    ...Typography.body,
    color: AppColors.text,
    textAlign: 'center',
  },
  selectedLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  selectedText: {
    ...Typography.caption,
    color: AppColors.text,
  },
  permissionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.border,
  },
  permissionContent: {
    flex: 1,
    gap: 6,
  },
  permissionLabel: {
    ...Typography.body,
    color: AppColors.text,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  status: {
    ...Typography.caption,
    flex: 1,
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