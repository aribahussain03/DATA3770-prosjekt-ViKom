import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const FAVORITES_DATA = [
  { id: '1', name: 'Mamma' },
  { id: '2', name: 'Pappa' },
  { id: '3', name: 'Mariam' },
  { id: '4', name: 'Mohammed' },
];

export default function Favoritter() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Kontakter</Text>

      <View style={styles.topBar}>
        <View style={styles.titleRow}>
          <Text style={styles.subHeader}>Favoritter</Text>
          <Ionicons name="star" size={24} color="#FFD700" style={{ marginLeft: 6 }} />
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="pencil" size={16} color="#FFF" style={{ marginRight: 6 }} />
          <Text style={styles.editButtonText}>Rediger Favoritter</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={FAVORITES_DATA}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.gridContainer}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.gridCard}
            onPress={() => router.push({ pathname: '/contacts/samtale', params: { name: item.name } })}
          >
            <Ionicons name="person-circle" size={50} color="#000" />
            <Text style={styles.gridName}>{item.name}</Text>
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
  topBar: {
    marginBottom: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  subHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  editButton: {
    flexDirection: 'row',
    backgroundColor: '#0066CC',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 25,
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
  },
  gridContainer: {
    justifyContent: 'space-between',
  },
  gridCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 15,
    alignItems: 'center',
    margin: 6,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    maxWidth: '31%',
  },
  gridName: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    color: '#000',
  },
});