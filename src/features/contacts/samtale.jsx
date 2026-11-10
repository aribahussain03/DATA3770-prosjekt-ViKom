import { Feather, Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SamtaleScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const contactName = params.name || 'Mamma';

  return (
    <View style={styles.container}>
      {/* Tilbakeknapp */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Feather name="arrow-left" size={28} color="black" />
      </TouchableOpacity>

      {/* Profilbilde og Navn */}
      <View style={styles.profileSection}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop' }} 
          style={styles.avatar} 
        />
        <Text style={styles.name}>{contactName}</Text>
      </View>

      {/* Knappemeny (Ring, Melding, Videosamtale) */}
      <View style={styles.menuContainer}>
        {/* Knapp 1: Vanlig samtale / Ring */}
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={() => console.log('Ringer...')}
        >
          <Ionicons name="call" size={28} color="#0066CC" />
        </TouchableOpacity>

        {/* Knapp 2: Melding / Chat */}
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={() => router.push('/meldinger')} 
        >
          <Ionicons name="chatbubble" size={28} color="#0066CC" />
        </TouchableOpacity>

        {/* Knapp 3: Videosamtale (Starter aktiv video eller går til liste) */}
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={() => {
            console.log(`Starter aktiv videosamtale med ${contactName}`);
            // Du kan eventuelt beholde router.push her om man skal tilbake til listen:
            // router.push('/contacts/VideosamtaleListe');
          }}
        >
          <Ionicons name="videocam" size={28} color="#0066CC" />
        </TouchableOpacity>
      </View>

      {/* Favoritt-merking under */}
      <View style={styles.favoriteSection}>
        <Ionicons name="star" size={32} color="#FFD700" />
        <Text style={styles.favoriteText}>Favoritter</Text>
      </View>
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
  backButton: {
    marginBottom: 10,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 15,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
  },
  menuContainer: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    borderRadius: 40,
    paddingVertical: 18,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    marginHorizontal: 10,
  },
  iconButton: {
    backgroundColor: '#FFFFFF',
    width: 65,
    height: 65,
    borderRadius: 32.5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  favoriteSection: {
    alignItems: 'center',
    marginTop: 60,
  },
  favoriteText: {
    fontSize: 18,
    marginTop: 8,
    color: '#000000',
    fontWeight: '500',
  },
});