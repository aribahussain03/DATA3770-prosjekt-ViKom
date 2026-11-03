import { useState } from 'react';
import { FlatList, StyleSheet, Switch, Text, View } from 'react-native';
import { AppColors } from '../../theme/colors';
import { Typography } from '../../theme/typography';

const initialContacts = [
  { id: '1', name: 'Hjemmetjenesten - Dagvakt', role: 'Sykepleier', isFavorite: true },
  { id: '2', name: 'Kari Nordmann', role: 'Pårørende (Datter)', isFavorite: true },
  { id: '3', name: 'Ola Nordmann', role: 'Pårørende (Sønn)', isFavorite: false },
  { id: '4', name: 'Fastlegekontoret', role: 'Lege', isFavorite: false },
];

export default function FavoritesScreen() {
  const [contacts, setContacts] = useState(initialContacts);

  const toggleFavorite = (id) => {
    setContacts(prev =>
      prev.map(c => (c.id === id ? { ...c, isFavorite: !c.isFavorite } : c))
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Rediger favoritter</Text>
      <Text style={styles.subHeader}>Velg hvem som skal vises under dine favoritter</Text>

      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.contactRow}>
            <View>
              <Text style={styles.contactName}>{item.name}</Text>
              <Text style={styles.contactRole}>{item.role}</Text>
            </View>
            <Switch
              value={item.isFavorite}
              onValueChange={() => toggleFavorite(item.id)}
              trackColor={{ false: '#767577', true: AppColors.primary || '#007AFF' }}
            />
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
});