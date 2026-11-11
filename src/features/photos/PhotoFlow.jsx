import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

import AppDialog from '../../components/AppDialog';
import ChoosePhotoSourceScreen from './ChoosePhotoSourceScreen';
import GalleryScreen from './GalleryScreen';
import PhotoSentScreen from './PhotoSentScreen';
import SendPhotoScreen from './SendPhotoScreen';

// Kobler sammen bildeskjermene og husker valgene når man bytter mellom dem.
export default function PhotoFlow({ onBack, onGoHome }) {
  const [screen, setScreen] = useState('send');
  const [photo, setPhoto] = useState(null);
  const [note, setNote] = useState('');
  const [selectedRecipientIds, setSelectedRecipientIds] = useState([]);
  const [cameraError, setCameraError] = useState(null);

  // `source` er et bilde fra galleriet eller { uri } fra kameraet.
  function choosePhoto(source) {
    setPhoto(source);
    setScreen('send');
  }

  function toggleRecipient(id) {
    setSelectedRecipientIds((current) =>
      current.includes(id)
        ? current.filter((recipientId) => recipientId !== id)
        : [...current, id]
    );
  }

  function resetForm() {
    setPhoto(null);
    setNote('');
    setSelectedRecipientIds([]);
  }

  // Kameraet krever tillatelse. I nettleseren på PC åpnes en filvelger i stedet.
  async function openCamera() {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();

      if (!permission.granted) {
        setCameraError(
          'Appen har ikke tilgang til kameraet. Du kan gi tilgang i innstillingene på telefonen, eller velge et bilde fra galleriet.'
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        quality: 0.8,
      });

      if (!result.canceled) {
        choosePhoto({ uri: result.assets[0].uri });
      }
    } catch {
      setCameraError(
        'Kameraet kunne ikke åpnes. Du kan velge et bilde fra galleriet i stedet.'
      );
    }
  }

  if (screen === 'sent') {
    return (
      <PhotoSentScreen
        onSendNew={() => setScreen('send')}
        onGoHome={onGoHome}
      />
    );
  }

  if (screen === 'gallery') {
    return (
      <GalleryScreen
        onBack={() => setScreen('source')}
        onSelectPhoto={choosePhoto}
      />
    );
  }

  if (screen === 'source') {
    return (
      <>
        <ChoosePhotoSourceScreen
          onBack={() => setScreen('send')}
          onOpenCamera={openCamera}
          onOpenGallery={() => setScreen('gallery')}
        />

        <AppDialog
          visible={cameraError !== null}
          title="Kamera"
          message={cameraError}
          onConfirm={() => setCameraError(null)}
          onClose={() => setCameraError(null)}
        />
      </>
    );
  }

  return (
    <SendPhotoScreen
      photo={photo}
      note={note}
      selectedRecipientIds={selectedRecipientIds}
      onBack={onBack}
      onChoosePhoto={() => setScreen('source')}
      onChangeNote={setNote}
      onToggleRecipient={toggleRecipient}
      onSend={() => {
        // Prototype: bildet sendes ikke noe sted før backend er klar.
        resetForm();
        setScreen('sent');
      }}
    />
  );
}
