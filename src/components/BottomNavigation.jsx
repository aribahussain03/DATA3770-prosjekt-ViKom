import { Ionicons } from '@expo/vector-icons';
// import { Feather, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppColors } from '@/theme/colors';

/**
 * Felles bunnmeny for ViKom mobilapplikasjon.
 * activeTab bestemmer hvilket menypunkt som markeres blått, og de andre vises i svart.
 */


export default function BottomNavigation({ activeTab = 'home'}) {
    const items = [
    {    
        id: 'home',
        label: 'Hjem',
        icon: 'home-outline',
        route: '/home',
    },
    {
        id: 'contacts',
        label: 'Kontakter',
        icon: 'id-card-outline',
        route: '/contacts',
    },
    {
        id: 'profile',
        label: 'Profil',
        icon: 'person-circle-outline',
        route: '/profile',
    },
];

return (
    <View style={styles.container}>
        {items.map((item) => {
            // Sjekker om dette menypunket er den aktive delen av appen.
            const isActive = activeTab === item.id;

            return (
                <Pressable
                    key={item.id}
                    onPress={() => router.replace(item.route)}
                    style={({ pressed }) => [
                        styles.item,
                        pressed && styles.pressed,
                    ]}
                    // Tilgjengelighetskode for skjermleser brukere
                    accessibilityRole="button"
                    accessibilityLabel={`Gå til ${item.label}`}
                    accessibilityState={{ selected: isActive }}
                >
                    <Ionicons
                        name={item.icon}
                        size={34}
                        color={isActive ? AppColors.primary : '#000000'}
                    />

                    <Text
                        style={[
                            styles.label,
                            isActive && styles.active,
                        ]}
                    >
                        {item.label}
                    </Text>
                </Pressable>
            );
        })}
    </View>    
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: AppColors.background,
        paddingTop: 10,
        paddingBottom: 24,
    },

    item: {
        flex: 1,
        minHeight: 64,
        justifyContent: 'center',
        alignItems: 'center',
    },

    pressed: {
        opacity: 0.6,
    },

    icon: {
        fontSize: 30,
        color: '#000000',
        marginBottom: 3,
    },

    label: {
        fontSize: 15,
        color: '#000000',
    },

    active: {
        color: AppColors.primary,
    },
});