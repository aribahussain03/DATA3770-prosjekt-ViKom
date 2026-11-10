import { StyleSheet, View } from "react-native";

import BottomNavigation from "@/components/BottomNavigation";
import Kontakter from '@/features/contacts/Kontakter';
import { AppColors } from '@/theme/colors';

export default function ContactsRoute() {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Kontakter />
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