import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, Pressable, StyleSheet, View } from "react-native";

import BottomNavigation from '@/components/BottomNavigation';
import HomeTile from '@/components/HomeTile';
import { AppColors } from '@/theme/colors';

// Hovedskjermen i ViKom. Herfra kan brukeren navigere til appens fire hovedfunksjoner.

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            {/* Toppfelt med ViKom-logo og innstillinger.
            Bruker midlertidig tekst/symbol frem til de riktige
            elementene fra Figma kobles inn. */}
            <View style={styles.header}>
                <Image
                    source={require('../../../assets/images/vikom-logo.png')}
                    style={styles.logo}
                    resizeMode='contain'
                />
                {/* Tannhjulet åpner Innstillinger. */}
                <Pressable
                    onPress={() => router.push('/settings')}
                    accessibilityRole="button"
                    accessibilityLabel="Innstillinger"
                >
                    <Ionicons
                        name="settings-outline"
                        size={34}
                        color="#000000"
                    />
                </Pressable>
            </View>

            {/* Hovedfunksjonen på forsiden. */}
            <View style={styles.grid}>
                <View style={styles.row}>
                    <HomeTile
                        title="Videosamtale"
                        icon={<Ionicons name="videocam" size={60} color="#000000" />}
                        onPress={() => router.push('/video-call')}
                    />

                    <View style={styles.horizontalGap} />

                    <HomeTile
                        title="Send bilde"
                        icon={<Ionicons name="images" size={60} color="#000000" />}
                        onPress={() => router.push('/send-image')}
                    />
                </View>

                <View style={styles.verticalGap} />

                <View style={styles.row}>
                    <HomeTile
                        title="Send melding"
                        icon={<Ionicons name="chatbubble" size={60} color="#000000" />}
                        onPress={() => router.push('/messages')}
                    />      

                    <View style={styles.horizontalGap} />

                    <HomeTile
                        title="Helse og avtaler"
                        icon={<Ionicons name="medkit" size={60} color="#000000" />}
                        onPress={() => router.push('/health')}
                    />  
                </View>
            </View>

            {/* Fyller tomrommet mellom hovedknappen og bunnmenyen. */}
            <View style={styles.spacer} />

            {/* Hjem er aktiv side, derfor markeres Hjem blått. */}
            <BottomNavigation activeTab="home" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.background,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
    },

    logo: {
        width: 150,
        height: 60,
        marginTop: 15,
    },

    settings: {
        fontSize: 32,
        color: AppColors.primary,
    },

    grid: {
        paddingHorizontal: 24,
        marginTop: 70,
    },

    row: {
        flexDirection: 'row',
    },

    horizontalGap: {
        width: 12,
    },

    verticalGap: {
        height: 12,
    },

    tileIcon: {
        fontSize: 48,
        color: '#000000',
    },

    spacer: {
        flex: 1,
    },
});

