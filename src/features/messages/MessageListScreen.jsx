import { FlatList, StyleSheet, Text, View } from "react-native";

import { mockConversations } from "../../data/messagesMockData";
import { AppColors } from "../../theme/colors";
import { Typography } from "../../theme/typography";

export default function MessageListScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Send melding</Text>
      <FlatList
        data={mockConversations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
    padding: 20,
  },
  title: {
    ...Typography.heading,
    color: AppColors.text,
  },
});
