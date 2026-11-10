import { Image } from 'expo-image';
import { useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import AppDialog from '../../components/AppDialog';
import { mockConversations } from '../../data/messagesMockData';
import { AppColors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import MessagesHeader from './MessagesHeader';

// Skjermen «Tidligere samtaler»: søk i, åpne og slett samtaler.
export default function MessageListScreen({
  initialConversations = mockConversations,
  onBack,
  onOpenConversation,
}) {
  const [conversations, setConversations] = useState(initialConversations);
  const [search, setSearch] = useState('');
  const [conversationToDelete, setConversationToDelete] = useState(null);

  // Søket ser bare på navn. Et tomt søk viser alle samtalene.
  const query = search.trim().toLowerCase();
  const filteredConversations = conversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(query)
  );

  // Slettingen gjelder bare lokalt: samtalen er tilbake når appen startes på nytt.
  function deleteConversation() {
    setConversations((current) =>
      current.filter((conversation) => conversation.id !== conversationToDelete.id)
    );
    setConversationToDelete(null);
  }

  return (
    <View style={styles.container}>
      <MessagesHeader title="Send melding" onBack={onBack} />

      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Søk etter navn"
        placeholderTextColor={AppColors.textSecondary}
        accessibilityLabel="Søk etter samtale"
        style={styles.search}
      />

      <FlatList
        data={filteredConversations}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Samtale med ${item.name}. Siste melding: ${item.lastMessage}`}
            accessibilityHint="Hold inne for å slette samtalen"
            // Lar skjermleserbrukere slette uten å holde inne.
            accessibilityActions={[{ name: 'delete', label: 'Slett samtale' }]}
            onAccessibilityAction={(event) => {
              if (event.nativeEvent.actionName === 'delete') {
                setConversationToDelete(item);
              }
            }}
            onPress={() => onOpenConversation?.(item)}
            onLongPress={() => setConversationToDelete(item)}
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
          >
            <Image source={item.picture} style={styles.avatar} />

            <View style={styles.textColumn}>
              <Text style={styles.time}>{item.time}</Text>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.lastMessage} numberOfLines={2}>
                {item.lastMessage}
              </Text>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {query ? 'Ingen samtaler funnet.' : 'Ingen tidligere samtaler.'}
          </Text>
        }
      />

      <AppDialog
        visible={conversationToDelete !== null}
        title="Slette samtalen?"
        message={`Samtalen med ${conversationToDelete?.name} blir slettet.`}
        confirmLabel="Slett"
        cancelLabel="Avbryt"
        onConfirm={deleteConversation}
        onClose={() => setConversationToDelete(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  search: {
    ...Typography.body,
    color: AppColors.text,
    backgroundColor: AppColors.surface,
    borderColor: AppColors.border,
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 12,
    paddingHorizontal: 16,
    minHeight: 52,
  },
  list: {
    padding: 20,
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: AppColors.primaryLight,
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardPressed: {
    opacity: 0.8,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
  },
  textColumn: {
    flex: 1,
  },
  time: {
    ...Typography.caption,
    color: AppColors.text,
    alignSelf: 'flex-end',
  },
  name: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '400',
    color: AppColors.text,
  },
  lastMessage: {
    ...Typography.body,
    color: AppColors.text,
  },
  emptyText: {
    ...Typography.body,
    color: AppColors.textSecondary,
    textAlign: 'center',
  },
});
