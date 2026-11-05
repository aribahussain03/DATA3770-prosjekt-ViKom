import { Pressable } from "react-native";
import { router } from 'expo-router';

import { AppColors } from '@/theme/colors';

/**
 * Gjenbrukbar tilbakeknapp
 * Brukes på undersidersider der brukeren skal kunne gå tilbake.
*/

export default function BackButton() {
    return (
        <Pressable
            onPress={() => {
                if (router.canGoBack)) {
                    router.back();
                } else {
                    router.replace('/home');
                }
            }}
            style={styles.button}
            accessibilityRole="button"
            accessibilityLabel="Gå tilbake"
            hitSlop={12}
        >
            <Text style={styles.icon}>←</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 48,
        height: 48,
        justifyContent: 'center',
        allignItems: 'center',
    },

    icon: {
        fontSize: 42,
        lineHeight: 42,
        color: AppColors.primary,
    },
});