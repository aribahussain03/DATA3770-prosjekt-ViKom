import { AppColors } from '@/theme/colors';
import { Pressable, StyleSheet, Text, View } from "react-native";

// Gjenbrukbar knapp for de fire hovedfunksjonene på Hjem.
export default function HomeTile({ title, icon, onPress }) {
    return (
        <Pressable
            onPress={onPress}
            style={styles.tile}
            accessibilityRole="button"
            accessibilityLabel={title}
        >
            <View style={styles.iconContainer}>
                {icon}
            </View>

            <Text style={styles.title}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    tile: {
        flex: 1,
        minHeight: 145,
        backgroundColor: AppColors.primaryLight,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },

    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },

    title: {
        fontSize: 16,
        color: AppColors.text,
        textAlign: 'center',
    },
});