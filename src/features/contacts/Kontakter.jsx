import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Mock-data for kontakter
const INITIAL_CONTACTS = [
  { id: '1', name: 'Mamma', isFavorite: true, phone: '12345678' },
  { id: '2', name: 'Anne Sofie', isFavorite: false, phone: '87654321' },
  { id: '3', name: 'Pappa', isFavorite: true, phone: '11223344' },
  { id: '4', name: 'Elias', isFavorite: false, phone: '99887766' },
  { id: '5', name: 'Mohammed', isFavorite: true, phone: '55443322' },
];

export default function HovedskjermKontakter() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [contacts, setContacts] = useState(INITIAL_CONTACTS);

  // Funksjon for å endre favoritt-status når man trykker på stjernen
  const toggleFavorite = (id, event) => {
    if (event && event.stopPropagation) {
      event.stopPropagation(); // Hindrer at kortet åpnes når man trykker på stjernen
    }
    setContacts(prevContacts =>
      prevContacts.map(contact =>
        contact.id === id ? { ...contact, isFavorite: !contact.isFavorite } : contact
      )
    );
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Kontakter</Text>

      {/* Søkefelt og Favoritter-knapp (navigerer til Favoritter-siden) */}
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color="#333" style={styles.searchIcon} />
          <TextInput
            style={styles.input}
            placeholder="Søk kontakter"
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <TouchableOpacity 
          style={styles.favoritesButton}
          onPress={() => router.push('/contacts/Favoritter')}
        >
          <Text style={styles.favoritesButtonText}>Favoritter</Text>
          <Ionicons name="star" size={18} color="#FFD700" />
        </TouchableOpacity>
      </View>

      {/* Kontaktliste */}
      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.contactCard}
            onPress={() => router.push({ 
              pathname: '/contacts/samtale', 
              params: { name: item.name, phone: item.phone, isFavorite: item.isFavorite.toString() } 
            })}
          >
            <View style={styles.contactInfo}>
              <Ionicons name="person-circle" size={40} color="#000" style={styles.avatarIcon} />
              <Text style={styles.contactName}>{item.name}</Text>
            </View>

            {/* Klikkbar stjerne i listen */}
            <TouchableOpacity 
              onPress={(e) => toggleFavorite(item.id, e)}
              style={styles.starButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons 
                name={item.isFavorite ? "star" : "star-outline"} 
                size={26} 
                color={item.isFavorite ? "#FFD700" : "#888"} 
              />
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
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },
  searchRow: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 48,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  favoritesButton: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 12,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoritesButtonText: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 4,
    color: '#000',
  },
  contactCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarIcon: {
    marginRight: 15,
  },
  contactName: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000',
  },
  starButton: {
    padding: 4,
  },
});