import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppColors } from '../../theme/colors';

export default function CallScreen() {
  // Status kan være 'ringing', 'active' eller 'ended'
  const [callStatus, setCallStatus] = useState('active'); 

  return (
    <View style={styles.container}>
      {callStatus === 'ringing' && (
        <View style={styles.centerContent}>
          <Text style={styles.statusText}>Ringer opp...</Text>
          <Text style={styles.nameText}>Kari Nordmann</Text>
          <TouchableOpacity style={styles.endButton} onPress={() => setCallStatus('ended')}>
            <Text style={styles.buttonText}>Avbryt</Text>
          </TouchableOpacity>
        </View>
      )}

      {callStatus === 'active' && (
        <View style={styles.centerContent}>
          <Text style={styles.statusText}>Aktiv videosamtale</Text>
          <Text style={styles.nameText}>Kari Nordmann</Text>
          
          <View style={styles.videoPlaceholder}>
            <Text style={styles.videoPlaceholderText}>[ Videobilde / Kamera ]</Text>
          </View>

          <TouchableOpacity style={styles.endButton} onPress={() => setCallStatus('ended')}>
            <Text style={styles.buttonText}>Avslutt samtalen</Text>
          </TouchableOpacity>
        </View>
      )}

      {callStatus === 'ended' && (
        <View style={styles.centerContent}>
          <Text style={styles.statusText}>Samtalen er avsluttet</Text>
          <TouchableOpacity style={styles.callButton} onPress={() => setCallStatus('active')}>
            <Text style={styles.buttonText}>Ring opp igjen</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  centerContent: {
    alignItems: 'center',
    width: '100%',
  },
  statusText: {
    color: '#aaa',
    fontSize: 16,
    marginBottom: 8,
  },
  nameText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  videoPlaceholder: {
    width: '100%',
    height: 300,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 40,
  },
  videoPlaceholderText: {
    color: '#888',
    fontSize: 16,
  },
  endButton: {
    backgroundColor: '#ff3b30',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
  },
  callButton: {
    backgroundColor: AppColors.primary || '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});