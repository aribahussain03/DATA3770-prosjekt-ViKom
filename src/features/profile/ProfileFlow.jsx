import { useState } from 'react';

import { usePermissions } from '../../context/PermissionsContext';
import ProfileScreen from './ProfileScreen';
import RequestPermissionsScreen from './RequestPermissionsScreen';

const exampleImages = ['🌸', '🌻', '🌿', '🦋'];

export default function ProfileFlow() {
  const [screen, setScreen] = useState('profile');

  const { profileImage, setProfileImage } = usePermissions();

  function changeImage() {
    const currentIndex = exampleImages.indexOf(profileImage);
    const nextIndex = (currentIndex + 1) % exampleImages.length;

    setProfileImage(exampleImages[nextIndex]);
  }

  if (screen === 'permissions') {
    return (
      <RequestPermissionsScreen
        onBack={() => setScreen('profile')}
      />
    );
  }

  return (
    <ProfileScreen
      onChangeImage={changeImage}
      onRequestPermissions={() => setScreen('permissions')}
    />
  );
}