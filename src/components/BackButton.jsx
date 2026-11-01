import { Pressable } from "react-native";
import { router } from 'expo-router';

import { AppColors } from '@/theme/colors';
import { opacity } from "react-native-reanimated/lib/typescript/Colors";

/* 
Gjenbrukbar knapp på hovedsiden.

icon sendes inn som et React-element slik at de endelige ikonene fra Figma kan brukes senere uten å gjøre endringer.
*/

export default function HomeTile({ title, icon, onPress}) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.tile,
                pressed && styles.tilePressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel={title}
        >
            <View style={styles.iconContainer}>
                {icon}
            </View>

            <Text style={styles.tile}>
                {title}   
            </Text>
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
        allignItems: 'center',
        padding: 16,

        // Enkel skygge som ligner kortene i Figma.
        shadowColor: '#000'
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.22,
        shadowRadius: 3,
        elevation: 4,
    },

    tilePressed: {
        opacity: 0.8,
    },

    iconContainer: {
        flex: 1,
        justifyContent: 'center',
        allignItems: 'center',
    },

    title: {
        ...Typography.caption,
        color: AppColors.text,
        textAlign: 'center',
        marginTop: 10,
    },
});