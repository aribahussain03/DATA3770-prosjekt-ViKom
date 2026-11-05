import { router } from 'expo-router';
import { StyleSheet, Text, View } from "react-native";

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
                <Text style={styles.logo}>ViKom</Text>
                <Text style={styles.settings}>⚙</Text>
            </View>

            {/* Hovedfunksjonen på forsiden. */}
            <View style={styles.grid}>
                <View style={styles.row}>
                    <HomeTile
                        title="Videosamtale"
                        icon={<Text style={styles.tileIcon}>▣</Text>}
                        onPress={() => router.push('/video-call')}
                    />

                    <View style={styles.horizontalGap} />

                    <HomeTile
                        title="Send bilde"
                        icon={<Text style={styles.tileIcon}>▧</Text>}
                        onPress={() => router.push('/send-image')}
                    />
                </View>

                <View style={styles.verticalGap} />

                <View style={styles.row}>
                    <HomeTile
                        title="Send melding"
                        icon={<Text style={styles.tileIcon}>•••</Text>}
                        onPress={() => router.push('/messages')}
                    />      

                    <View style={styles.horizontalGap} />

                    <HomeTile
                        title="Helse og avtaler"
                        icon={<Text style={styles.tileIcon}>+</Text>}
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
        fontSize: 34,
        fontWeight: '700',
        color: AppColors.primary,
    },

    settings: {
        fontSize: 32,
        color: AppColors.primary,
    },

    grid: {
        paddingHorizontal: 24,
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

