import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AppColors } from '../../theme/colors';
import { Typography } from '../../theme/typography';

// Eksempeldata som matcher statusene fra Figma-designet
const initialVideoContacts = [
  { id: '1', name: 'Mamma', isOnline: true, role: 'Pårørende' },
  { id: '2', name: 'Pappa', isOnline: false, role: 'Pårørende' },
  { id: '3', name: 'Elias', isOnline: false, role: 'Pårørende' },
  { id: '4', name: 'Anne Sofie', isOnline: true, role: 'Sykepleier' },
  { id: '5', name: 'Mohammed', isOnline: false, role: 'Hjemmetjenesten' },
  { id: '6', name: 'Andreas', isOnline: false, role: 'Fastlege' },
  { id: '7', name: 'Nora', isOnline: true, role: 'Pårørende' },
];

export default function VideoCallListScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrer kontakter basert på søkefeltet
  const filteredContacts = initialVideoContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Topplinje med tilbakeknapp og tittel */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation?.goBack?.()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Videosamtale</Text>
      </View>

      {/* Søkefelt */}
      <TextInput
        style={styles.searchInput}
        placeholder="Søk kontakter"
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Liste over kontakter */}
      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.contactCard}>
            {/* Venstre side: Ikon og navn/status */}
            <View style={styles.contactLeft}>
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarIcon}>👤</Text>
              </View>
              <View>
                <Text style={styles.contactName}>{item.name}</Text>
                <View style={styles.statusRow}>
                  <View 
                    style={[
                      styles.statusDot, 
                      { backgroundColor: item.isOnline ? '#4CD964' : '#FF3B30' }
                    ]} 
                  />
                  <Text style={styles.statusText}>
                    {item.isOnline ? 'Pålogget' : 'Ikke Pålogget'}
                  </Text>
                </View>
              </View>
            </View>

            {/* Høyre side: Videoknapp (blå hvis pålogget, grå hvis ikke) */}
            <TouchableOpacity 
              style={[
                styles.videoButton, 
                { backgroundColor: item.isOnline ? (AppColors.primary || '#007AFF') : '#CCCCCC' }
              ]}
              onPress={() => {
                if (item.isOnline) {
                  console.log(`Starter videosamtale med ${item.name}`);
                  // Legg til navigasjon til aktiv samtale her ved behov
                } else {
                  alert(`${item.name} er ikke pålogget for øyeblikket.`);
                }
              }}
            >
              <Text style={styles.videoIcon}>📹</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background || '#f5f5f5',
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    fontSize: 28,
    marginRight: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  headerTitle: {
    ...Typography.header,
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchInput: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    marginBottom: 16,
    fontSize: 16,
  },
  contactCard: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    elevation: 1,
  },
  contactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarIcon: {
    fontSize: 24,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 2,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    color: '#666',
  },
  videoButton: {
    width: 50,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoIcon: {
    fontSize: 20,
  },
});