import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const VIDEO_CONTACTS = [
  { id: '1', name: 'Mamma', status: 'Pålogget', online: true },
  { id: '2', name: 'Pappa', status: 'Ikke Pålogget', online: false },
  { id: '3', name: 'Elias', status: 'Ikke Pålogget', online: false },
  { id: '4', name: 'Anne Sofie', status: 'Pålogget', online: true },
  { id: '5', name: 'Mohammed', status: 'Ikke Pålogget', online: false },
  { id: '6', name: 'Nora', status: 'Pålogget', online: true },
];

export default function VideosamtaleListe() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredList = VIDEO_CONTACTS.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Topplinje med tilbakeknapp */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={26} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Videosamtale</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Søkefelt */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Søk kontakter"
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Liste med videokontakter */}
      <FlatList
        data={filteredList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.contactCard}>
            <View style={styles.contactInfo}>
              <Ionicons name="person-circle" size={45} color="#000" style={styles.avatarIcon} />
              <View>
                <Text style={styles.contactName}>{item.name}</Text>
                <View style={styles.statusRow}>
                  <Text style={styles.statusText}>{item.status}</Text>
                  <View style={[styles.statusDot, { backgroundColor: item.online ? '#4CAF50' : '#F44336' }]} />
                </View>
              </View>
            </View>

            {/* Videoknapp (blå hvis pålogget, grå hvis ikke) */}
            <TouchableOpacity 
              style={[styles.videoBtn, { backgroundColor: item.online ? '#0066CC' : '#CCCCCC' }]}
              onPress={() => {
                if(item.online) {
                  router.push({
        pathname: '/contacts/samtale',
        params: { name: item.name }
                });
              }
            }}
            >
              <Ionicons name="videocam" size={20} color="#FFF" />
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
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  backButton: {
    padding: 4,
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
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
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
    marginRight: 12,
  },
  contactName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statusText: {
    fontSize: 14,
    color: '#666',
    marginRight: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  videoBtn: {
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});