import { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppColors } from '../../theme/colors';
import { Typography } from '../../theme/typography';

// Eksempeldata (kan også hentes fra en felles data-fil)
const initialContacts = [
  { id: '1', name: 'Hjemmetjenesten - Dagvakt', role: 'Sykepleier', isFavorite: true },
  { id: '2', name: 'Kari Nordmann', role: 'Pårørende (Datter)', isFavorite: true },
  { id: '3', name: 'Ola Nordmann', role: 'Pårørende (Sønn)', isFavorite: false },
  { id: '4', name: 'Fastlegekontoret', role: 'Lege', isFavorite: false },
];

export default function ContactsScreen({ navigation }) {
  const [contacts] = useState(initialContacts);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Kontakter</Text>
      <Text style={styles.subHeader}>Oversikt over tilgjengelige personer og tjenester</Text>

      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.contactRow}>
            <View>
              <Text style={styles.contactName}>{item.name}</Text>
              <Text style={styles.contactRole}>{item.role}</Text>
            </View>
            <TouchableOpacity style={styles.callButton}>
              <Text style={styles.callButtonText}>Ring 📹</Text>
            </TouchableOpacity>
          </TouchableOpacity>
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
  header: {
    ...Typography.header,
    fontSize: 22,
    marginBottom: 4,
  },
  subHeader: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  contactRow: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    elevation: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactRole: {
    fontSize: 14,
    color: '#666',
  },
  callButton: {
    backgroundColor: AppColors.primary || '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  callButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});