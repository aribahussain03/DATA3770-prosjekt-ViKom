import { StyleSheet, Text, View } from "react-native";

import BottomNavigation from "@/components/BottomNavigation";
import { AppColors } from '@/theme/colors';

// Midlertidig profilside
export default function ProfileRoute() {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Profil</Text>
            </View>

            <BottomNavigation activeTab="profile" />
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