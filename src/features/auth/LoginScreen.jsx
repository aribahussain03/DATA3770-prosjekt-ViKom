import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    View,
    Text,
    TextInput,
} from 'react-native';

import { router } from 'expo-router';

/**
 * Innloggingsskjerm for ViKom..
 * Frontend-prototype: Ingen ekte autentisering.
 */
export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Visning av popup-vinduet "Tilbakestill passord".
    const [forgotModalVisible, setForgotModalVisible] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [resetError, setResetError] = useState('');

    // Sjekker inndata før vi simulerer innlogging.
    const handleLogin = () => {
        if (!email.trim() || !password) {
            setError('Fyll ut både e-post og passord.');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            setError('Skriv inn en gyldig e-postadresse.');
            return;
        }

        setError('');

        // Simulerer vellykket innlogging.
        router.replace('/home');
    };

    // Åpner popup-vinduet med et tomt e-postfelt.
    const handleForgotPassword = () => {
        setError('');
        setResetError('');
        setResetEmail('');
        setForgotModalVisible(true);
    };

    // Sjekker e-postfeltet i popup-vidnuet for glemt passord.
    const handleResetPassword = () => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            setResetError('Skriv inn en gyldig e-postadresse.');
            return;
        }

        setResetError('');
        setForgotModalVisible(false);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.form}>
                    <Text style={styles.logo}>ViKom</Text>

                    {/* E-post */}
                    <View style={styles.field}>
                        <Text style={styles.label}>E-post</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="skriv inn e-post"
                            placeholderTextColor="#909090"}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-adress"
                            autoCapitalize="none"
                            autoComplete="email"
                        />
                    </View>

                    {/* Passord */}
                    <View style={styles.field}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Skriv inn password"
                            placeholderTextColor="#909090"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            autoComplete="password"
                        />    
                    </View>

                    {/* Åpner popup-vindu for glemt passord */}
                    <Pressable
                        style={styles.forgotPassword}
                        onPress={handleForgotPassword}
                        accessibilityRole="button"
                    >
                        <Text style={styles.forgotText}>
                            Glemt Passord?
                        </Text>
                    </Pressable>

                    {error ? (
                        <Text style={styles.error} accessibilityRole="alert">
                            {error}
                        </Text>
                    ) : null}

                    {/* Innlogging og registrering */}
                    <View style={styles.buttonRow}>
                        <Pressable
                            style={({ pressed }) => [
                                styles.button,
                                styles.loginButton,
                                pressed && styles.pressed,
                            ]}
                            onPress={handleLogin}
                            accessibilityRole="button"
                        >
                            <Text style={styles.buttonText}>
                                Logg inn
                            </Text>
                        </Pressable>

                        <Pressable
                            style={({ pressed }) => [
                                style.button,
                                styles.registerButton,
                                pressed && styles.pressed,
                            ]}
                            onPress={() => router.push('/register')}
                            accessibilityRole="button"
                        >
                            <Text style={styles.buttonText}>
                                Register
                            </Text>                        
                        </Pressable>
                    </View>
                </View>
            </ScrollView>        

            {/* Popup-vindu for tilbakestilling av passord */}
            <Modal
                visible={forgotModalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setForgotModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>
                            Tilbakestill passord
                        </Text>

                        <Text style={styles.modalDescription}>
                            Skriv inn e-postadressen din, så sender vi 
                            deg en lenke for å tilbakestille passordet.
                        </Text>

                        <TextInput
                            style={styles.modalInput}
                            placeholder="Skriv inn e-post"
                            placeholderTextColor="#909090"
                            value={resetEmail}
                            onChangeText={setResetEmail}
                            keyboardType="email-adress"
                            autoCapitalize="none"
                            autoComplete="email"
                        />

                        {resetError ? (
                            <Text
                                style={styles.error}
                                accessibilityRole="alert"
                            >
                                {resetError}
                            </Text>
                        ) : null}

                        <View style={styles.modalButtons}>
                            <Pressable
                                onPress={() => setForgotModalVisible(false)}
                                accessibilityRole="button"
                            >
                                <Text style={styles.modalButtonText}>
                                    Avbryt
                                </Text>
                            </Pressable>

                            <Pressable
                                onPress={handleResetPassword}
                                accessibilityRole="button"
                            >
                                <Text style={styles.modalButtonText}>
                                    Send
                                </Text>
                            </Pressable>   
                        </View>
                    </View>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    );
}    

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },

    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 32,
        paddingVertical: 48,
    },

    form: {
        width: '100%',
        maxWidth: 420,
        alignSelf: 'center',
    },

    logo: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#0789F5',
        textAlign: 'center',
        marginBottom: 78,
    },

    field: {
        marginBottom: 22,
    },

    label: {
        fontSize: 20,
        color: '#000000',
        marginBottom: 6,
    },

    input: {
        height: 43,
        backgroundColor: '#EAEAEA',
        borderRadius: 9,
        paddingHorizontal: 12,
        fontSize: 14,
        color: '#000000',
    },

    forgotPassword: {
        alignSelf: 'flex-start',
        marginTop: -4,
    },

    error: {
        marginTop: 12,
        color: '#B0020',
        fotnSize: 14,
    },

    buttonRow: {
        flexDirection: 'row',
        gap: 16,
        marginTop: 76,
        paddingHorizontal: 12,
    },

    button: {
        flex: 1,
        height: 42,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },

    loginButton: {
        backgroundColor: '#94BFEA',
    },

    registerButton: {
        backgroundColor: '#246395',
    },

    buttonText: {
        fontSize: 20,
        color: '#FFFFFF',
    },

    pressed: {
        opacity: 0.8,
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        justifyContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 36,
    },

    modalContent: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: '#D9D9D9',
        paddingTop: 14,
        paddingHorizontal: 20,
        paddingBottom: 12,
    },

    modalTitle: {
        fontSize: 21,
        color: '#000000',
        textAlign: 'center',
        marginBottom: 6,
    },

    modalInput: {
        height: 43,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 14,
        fontSize: 14,
        color: '#000000',
    },

    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 36,
        marginTop: 58,
    },

    modalButtonText: {
        fontSize: 20,
        color: '#000000',
    },

});
