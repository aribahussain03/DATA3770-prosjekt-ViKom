import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const INITIAL_CONTACTS = [
  { id: '1', name: 'Mamma', isFavorite: true, phone: '12345678' },
  { id: '2', name: 'Anne Sofie', isFavorite: false, phone: '87654321' },
  { id: '3', name: 'Pappa', isFavorite: true, phone: '11223344' },
  { id: '4', name: 'Elias', isFavorite: false, phone: '99887766' },
  { id: '5', name: 'Mohammed', isFavorite: true, phone: '55443322' },
  { id: '6', name: 'Mariam', isFavorite: true, phone: '55566677' },
];

export default function HovedskjermKontakter() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [contacts, setContacts] = useState(INITIAL_CONTACTS);
  
  const [activeTab, setActiveTab] = useState('søk');
  const [isEditingFavorites, setIsEditingFavorites] = useState(false);
  
  // Holder styr på hvilken favoritt som er valgt for å bytte plass
  const [selectedForSwap, setSelectedForSwap] = useState(null);

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

  const handleRemoveFavorite = (id, event) => {
    if (event && event.stopPropagation) {
      event.stopPropagation();
    }
    setContacts(prevContacts =>
      prevContacts.map(contact =>
        contact.id === id ? { ...contact, isFavorite: false } : contact
      )
    );
  };

  // Lynrask omorganisering: Trykk på én favoritt, deretter en annen for å bytte plass instantly
  const handleCardPressInEditMode = (id) => {
    if (!selectedForSwap) {
      // Velg første kort du vil flytte
      setSelectedForSwap(id);
    } else {
      // Hvis du trykker på et annet kort, bytt plass på dem med en gang!
      setContacts(prevContacts => {
        let favorites = [...prevContacts.filter(c => c.isFavorite)];
        const otherContacts = prevContacts.filter(c => !c.isFavorite);

        const index1 = favorites.findIndex(c => c.id === selectedForSwap);
        const index2 = favorites.findIndex(c => c.id === id);

        if (index1 !== -1 && index2 !== -1) {
          const temp = favorites[index1];
          favorites[index1] = favorites[index2];
          favorites[index2] = temp;
        }

        return [...favorites, ...otherContacts];
      });
      // Nullstill valg
      setSelectedForSwap(null);
    }
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

      {/* Topp-linje med faner */}
      <View style={styles.topNavRow}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'søk' && styles.tabButtonActive]}
          onPress={() => {
            setActiveTab('søk');
            setIsEditingFavorites(false);
            setSelectedForSwap(null);
          }}
        >
          <Text style={[styles.tabButtonText, activeTab === 'søk' && styles.tabButtonTextActive]}>
            Alle kontakter
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'favoritter' && styles.tabButtonActive]}
          onPress={() => setActiveTab('favoritter')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'favoritter' && styles.tabButtonTextActive]}>
            Favoritter
          </Text>
          <Ionicons 
            name="star" 
            size={16} 
            color={activeTab === 'favoritter' ? "#FFD700" : "#888"} 
            style={{ marginLeft: 6 }} 
          />
        </TouchableOpacity>
      </View>

      {/* Søkefelt */}
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

      {/* Rediger-knapp */}
      {activeTab === 'favoritter' && !isEditingFavorites && (
        <TouchableOpacity 
          style={styles.editButton} 
          onPress={() => setIsEditingFavorites(true)}
        >
          <Feather name="edit-2" size={16} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={styles.editButtonText}>Rediger Favoritter</Text>
        </TouchableOpacity>
      )}

      {/* Hjelpetekst når man redigerer */}
      {activeTab === 'favoritter' && isEditingFavorites && (
        <Text style={styles.helperText}>
          {selectedForSwap ? "Trykk på en annen profil for å bytte plass" : "Trykk på en profil for å flytte den, eller X for å slette"}
        </Text>
      )}

      {/* Kontaktliste / Rutenett */}
      <FlatList
        key={activeTab === 'favoritter' ? 'grid' : 'list'}
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        numColumns={activeTab === 'favoritter' ? 3 : 1}
        contentContainerStyle={activeTab === 'favoritter' ? styles.gridContainer : styles.listContainer}
        renderItem={({ item }) => {
          if (activeTab === 'favoritter') {
            const isSelected = selectedForSwap === item.id;
            return (
              <TouchableOpacity 
                style={[styles.gridCard, isSelected && styles.gridCardSelected]}
                onPress={() => {
                  if (isEditingFavorites) {
                    handleCardPressInEditMode(item.id);
                  } else {
                    router.push({ 
                      pathname: '/contacts/samtale', 
                      params: { name: item.name, phone: item.phone, isFavorite: 'true' } 
                    });
                  }
                }}
              >
                {isEditingFavorites && (
                  <View style={styles.cardHeaderTop}>
                    <TouchableOpacity onPress={(e) => handleRemoveFavorite(item.id, e)}>
                      <Ionicons name="close-circle" size={22} color="#FF3B30" />
                    </TouchableOpacity>
                  </View>
                )}

                <View style={styles.gridCardContent}>
                  <Ionicons name="person-circle" size={55} color={isSelected ? "#0066CC" : "#000000"} style={styles.gridAvatar} />
                  <Text style={[styles.gridCardName, isSelected && { color: '#0066CC', fontWeight: 'bold' }]}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            );
          } else {
            return (
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
            );
          }
        }}
      />

      {/* Lagre endringer-knapp */}
      {activeTab === 'favoritter' && isEditingFavorites && (
        <TouchableOpacity 
          style={styles.saveButton} 
          onPress={() => {
            setIsEditingFavorites(false);
            setSelectedForSwap(null);
          }}
        >
          <Text style={styles.saveButtonText}>Lagre endringer</Text>
        </TouchableOpacity>
      )}
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
    flexDirection: 'row',
    justifyContent: 'center',
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
  helperText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
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
  editButton: {
    flexDirection: 'row',
    backgroundColor: '#0066CC',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 25,
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginBottom: 15,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '500',
  },
  gridContainer: {
    paddingBottom: 20,
  },
  gridCard: {
    backgroundColor: '#FFFFFF',
    width: '31%',
    aspectRatio: 1,
    borderRadius: 16,
    padding: 6,
    margin: '1%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  gridCardSelected: {
    borderColor: '#0066CC',
    borderWidth: 2,
    backgroundColor: '#F0F8FF',
  },
  cardHeaderTop: {
    width: '100%',
    alignItems: 'flex-end',
    position: 'absolute',
    top: 4,
    right: 4,
    zIndex: 2,
  },
  gridCardContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  gridAvatar: {
    marginBottom: 2,
  },
  gridCardName: {
    fontSize: 13,
    fontWeight: '500',
    color: '#000',
  },
  saveButton: {
    backgroundColor: '#0066CC',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
});