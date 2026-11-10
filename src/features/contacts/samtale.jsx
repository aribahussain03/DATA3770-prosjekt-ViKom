import { Feather, Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SamtaleScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const contactName = params.name || 'Mamma';

  // ==========================================
  // 1. TILSTANDER (STATE) - Må ligge øverst her
  // ==========================================
  const [isFavorite, setIsFavorite] = useState(params.isFavorite === 'true');

  const [callState, setCallState] = useState(
    params.initialCall === 'video' ? 'ringing-video' : 'idle'
  );

  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOff, setIsSpeakerOff] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);

  // Automatisk svar etter 3 sekunder ved ringing
  useEffect(() => {
    let timer;
    if (callState === 'ringing-audio') {
      timer = setTimeout(() => setCallState('audio-calling'), 3000);
    } else if (callState === 'ringing-video') {
      timer = setTimeout(() => setCallState('video-calling'), 3000);
    }
    return () => clearTimeout(timer);
  }, [callState]);

  // ==========================================
  // 2. FUNKSJONER - Plassert før return()
  // ==========================================
  const toggleFavorite = () => {
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);
    // Oppdaterer parameteren slik at den merkes av når du går tilbake til oversikten
    router.setParams({ isFavorite: newFavoriteStatus.toString() });
  };

  // ==========================================
  // 3. UI / VISUELL STRUKTUR (Inne i return)
  // ==========================================
  return (
    <View style={styles.container}>
      {/* Tilbakeknapp (vises kun i idle-modus) */}
      {callState === 'idle' && (
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Feather name="arrow-left" size={28} color="black" />
        </TouchableOpacity>
      )}

      {/* Standard Profilikon og Navn */}
      {callState !== 'video-calling' && (
        <View style={styles.profileSection}>
          <Ionicons name="person-circle" size={130} color="#000000" style={styles.avatarIcon} />
          <Text style={styles.name}>{contactName}</Text>
          
          {callState === 'ringing-audio' && <Text style={styles.statusText}>Ringer ...</Text>}
          {callState === 'ringing-video' && <Text style={styles.statusText}>Ringer ...</Text>}
          {callState === 'ended' && <Text style={styles.endedText}>Samtale avsluttet</Text>}
        </View>
      )}

      {/* STANDARD VISNING (Hovedmeny og trykkbar favoritt-stjerne) */}
      {callState === 'idle' && (
        <>
          <View style={styles.menuContainer}>
            <TouchableOpacity 
              style={styles.iconButton} 
              onPress={() => setCallState('ringing-audio')}
            >
              <Ionicons name="call" size={28} color="#0066CC" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.iconButton} 
              onPress={() => router.push('/meldinger')} 
            >
              <Ionicons name="chatbubble" size={28} color="#0066CC" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.iconButton} 
              onPress={() => setCallState('ringing-video')}
            >
              <Ionicons name="videocam" size={28} color="#0066CC" />
            </TouchableOpacity>
          </View>

          {/* Trykkbar favorittseksjon med dynamisk gul/grå stjerne */}
          <TouchableOpacity style={styles.favoriteSection} onPress={toggleFavorite}>
            <Ionicons 
              name={isFavorite ? "star" : "star-outline"} 
              size={32} 
              color={isFavorite ? "#FFD700" : "#888"} 
            />
            <Text style={styles.favoriteText}>Favoritter</Text>
          </TouchableOpacity>
        </>
      )}

      {/* RINGER-VISNING */}
      {(callState === 'ringing-audio' || callState === 'ringing-video') && (
        <View style={styles.centerContainer}>
          <Text style={styles.actionLabel}>Avbryt</Text>
          <TouchableOpacity 
            style={styles.redEndButton} 
            onPress={() => setCallState('ended')}
          >
            <Ionicons name="call" size={32} color="#FFFFFF" style={styles.rotatedCallIcon} />
          </TouchableOpacity>
        </View>
      )}

      {/* AKTIV VANLIG SAMTALE */}
      {callState === 'audio-calling' && (
        <View style={styles.centerContainer}>
          <View style={styles.audioControlsBox}>
            <TouchableOpacity style={styles.controlButtonSmall} onPress={() => setIsSpeakerOff(!isSpeakerOff)}>
              <Ionicons name={isSpeakerOff ? "volume-mute" : "volume-high"} size={28} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButtonSmall} onPress={() => setIsMuted(!isMuted)}>
              <Ionicons name={isMuted ? "mic-off" : "mic"} size={28} color="#000" />
            </TouchableOpacity>
          </View>

          <Text style={styles.actionLabel}>Avbryt</Text>
          <TouchableOpacity 
            style={styles.redEndButton} 
            onPress={() => setCallState('ended')}
          >
            <Ionicons name="call" size={32} color="#FFFFFF" style={styles.rotatedCallIcon} />
          </TouchableOpacity>
        </View>
      )}

      {/* AKTIV VIDEOSAMTALE */}
      {callState === 'video-calling' && (
        <View style={styles.videoCallContainer}>
          <View style={styles.remoteVideoArea}>
            <Ionicons name="person-circle" size={250} color="#CCCCCC" />
            <Text style={styles.remoteVideoName}>{contactName}</Text>
          </View>

          <View style={styles.selfVideoPreview}>
            {isCameraOff ? (
              <Ionicons name="videocam-off" size={24} color="#FFF" />
            ) : (
              <Ionicons name="person-circle" size={50} color="#666" />
            )}
          </View>

          <View style={styles.videoControlsBox}>
            <TouchableOpacity style={styles.videoControlButton} onPress={() => setIsSpeakerOff(!isSpeakerOff)}>
              <Ionicons name={isSpeakerOff ? "volume-mute" : "volume-high"} size={26} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.videoControlButton} onPress={() => setIsMuted(!isMuted)}>
              <Ionicons name={isMuted ? "mic-off" : "mic"} size={26} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.videoControlButton} onPress={() => setIsCameraOff(!isCameraOff)}>
              <Ionicons name={isCameraOff ? "videocam-off" : "videocam"} size={26} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.redEndButtonSmall} onPress={() => setCallState('ended')}>
              <Ionicons name="call" size={26} color="#FFFFFF" style={styles.rotatedCallIcon} />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* AVSLUTTET SAMTALE */}
      {callState === 'ended' && (
        <View style={styles.centerContainer}>
          <TouchableOpacity 
            style={styles.okButton} 
            onPress={() => {
              if (params.initialCall === 'video') {
                router.back();
              } else {
                setCallState('idle');
              }
            }}
          >
            <Text style={styles.okButtonText}>Ok</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

// ==========================================
// 4. STILSETT (STYLESHEET)
// ==========================================
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
  avatarIcon: {
    marginBottom: 15,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
  },
  statusText: {
    fontSize: 22,
    color: '#333',
    marginTop: 15,
    fontWeight: '400',
  },
  endedText: {
    fontSize: 20,
    color: '#000000',
    marginTop: 15,
    fontWeight: '400',
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
  centerContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  actionLabel: {
    fontSize: 24,
    fontWeight: '400',
    marginBottom: 15,
    color: '#000',
  },
  redEndButton: {
    backgroundColor: '#FF3B30',
    width: 75,
    height: 75,
    borderRadius: 37.5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  redEndButtonSmall: {
    backgroundColor: '#FF3B30',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  rotatedCallIcon: {
    transform: [{ rotate: '135deg' }],
  },
  audioControlsBox: {
    flexDirection: 'row',
    backgroundColor: '#E0E0E0',
    borderRadius: 40,
    paddingVertical: 12,
    paddingHorizontal: 40,
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 40,
  },
  controlButtonSmall: {
    padding: 10,
  },
  videoCallContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#F5F5F5',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50,
  },
  remoteVideoArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  remoteVideoName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  selfVideoPreview: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 80,
    height: 110,
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  videoControlsBox: {
    flexDirection: 'row',
    backgroundColor: '#E0E0E0',
    borderRadius: 40,
    paddingVertical: 12,
    paddingHorizontal: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '85%',
  },
  videoControlButton: {
    backgroundColor: '#FFFFFF',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  okButton: {
    backgroundColor: '#90CAF9',
    width: '80%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  okButtonText: {
    fontSize: 22,
    fontWeight: '500',
    color: '#000000',
  },
});