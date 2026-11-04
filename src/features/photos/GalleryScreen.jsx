import { Image } from 'expo-image';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

import { mockGalleryPhotos } from '../../data/photosMockData';
import { AppColors } from '../../theme/colors';
import MessagesHeader from '../messages/MessagesHeader';
import PhotoButton from './PhotoButton';

// Viser eksempelbildene fra Figma, ikke bildene på telefonen.
export default function GalleryScreen({
  photos = mockGalleryPhotos,
  onBack,
  onSelectPhoto,
}) {
  // Bare ett bilde kan være valgt om gangen.
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <View style={styles.container}>
      <MessagesHeader onBack={onBack} />

      <FlatList
        data={photos}
        numColumns={3}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => {
          const selected = selectedPhoto?.id === item.id;

          return (
            <Pressable
              accessibilityRole="radio"
              accessibilityLabel={item.label}
              accessibilityState={{ selected }}
              onPress={() => setSelectedPhoto(item)}
              style={[styles.tile, selected && styles.tileSelected]}
            >
              <Image source={item.source} contentFit="cover" style={styles.image} />

              {selected ? (
                <View style={styles.badge}>
                  <SymbolView
                    name={{ ios: 'checkmark', android: 'check', web: 'check' }}
                    size={22}
                    tintColor={AppColors.background}
                  />
                </View>
              ) : null}
            </Pressable>
          );
        }}
      />

      <View style={styles.footer}>
        <PhotoButton
          label="Velg bildet"
          disabled={selectedPhoto === null}
          onPress={() => onSelectPhoto?.(selectedPhoto.source)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  grid: {
    gap: 12,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  row: {
    gap: 12,
  },
  tile: {
    flex: 1,
    aspectRatio: 1,
    overflow: 'hidden',
    borderRadius: 8,
  },
  tileSelected: {
    borderWidth: 4,
    borderColor: AppColors.primary,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: AppColors.primary,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});
