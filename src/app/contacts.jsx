import { StyleSheet, Text, View } from "react-native";

import BottomNavigation from "@/components/BottomNavigation";
import { AppColors } from '@/theme/colors';

// Midlertidig kontaktside
export default function ContactsRoute() {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Kontakter</Text>
            </View>

            <BottomNavigation activeTab="contacts" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.background,
    },

    content: {
        flex: 1,
        padding: 24,
    },

    title: {
        fontSize: 24,
        color: AppColors.text,
    },
});