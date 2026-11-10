import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

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
  // Vi holder styr på aktiv visning: 'søk' eller 'favoritter'
  const [activeTab, setActiveTab] = useState('søk');

  const toggleFavorite = (id, event) => {
    if (event && event.stopPropagation) {
      event.stopPropagation();
    }
    setContacts(prevContacts =>
      prevContacts.map(contact =>
        contact.id === id ? { ...contact, isFavorite: !contact.isFavorite } : contact
      )
    );
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === 'favoritter') {
      return matchesSearch && contact.isFavorite;
    }
    return matchesSearch;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Kontakter</Text>

      {/* Topp-linje med de to navigasjonsknappene / fanene */}
      <View style={styles.topNavRow}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'søk' && styles.tabButtonActive]}
          onPress={() => setActiveTab('søk')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'søk' && styles.tabButtonTextActive]}>
            Søk kontakter
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'favoritter' && styles.tabButtonActive]}
          onPress={() => setActiveTab('favoritter')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'favoritter' && styles.tabButtonTextActive]}>
            Favoritter
          </Text>
        </TouchableOpacity>
      </View>

      {/* Søkefeltet vises kun når man er på "Søk kontakter"-visningen */}
      {activeTab === 'søk' && (
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
      )}

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
  topNavRow: {
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'space-between',
  },
  tabButton: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  tabButtonActive: {
    backgroundColor: '#0066CC',
  },
  tabButtonText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
  },
  tabButtonTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 48,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
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