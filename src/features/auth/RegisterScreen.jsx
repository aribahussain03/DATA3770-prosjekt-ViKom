import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import { router } from 'expo-router';

// Registreringsskjerm for ViKom..
export default function RegisterScreen() {
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const canRegister = Boolean(
    username.trim() &&
    email.trim() &&
    password.trim() &&
    confirmPassword.trim()
);

    // Kontrollerer feltene før vi simulerer registrering.
    const handleRegister = () => {
        if (!canRegister) {
            setError('Fyll ut alle obligatoriske felt.');
            return;
        }
        if (!username.trim() || !email.trim() || !password || !confirmPassword) {
            setError('Fyll ut alle obligatoriske felt.');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            setError('Skriv inn en gyldig e-postadresse.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passordene er ikke like.');
            return;
        }

        setError('');
        
        // Navigerer til innlogging uten å opprette en ekte konto.
        router.replace('/login');
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
                    <Text style={styles.heading}>Opprett konto</Text>

                    <View style={styles.row}>
                        <View style={styles.field}>
                            <Text style={styles.label}>Brukernavn</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Velg et brukernavn"
                                placeholderTextColor="#909090"
                                value={username}
                                onChangeText={setUsername}
                                autoCapitalize="none"
                                autoComplete="username"
                            />
                        </View>

                        <View style={styles.field}>
                            <Text style={styles.label}>Telefonnummer</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Valgfritt"
                                placeholderTextColor="#909090"
                                value={phone}
                                onChangeText={setPhone}
                                keyboardType="phone-pad"
                                autoComplete="tel"
                            />
                        </View>
                    </View>

                    <View style={styles.fullField}>
                        <Text style={styles.label}>E-post</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Skriv inn e-post"
                            placeholderTextColor="#909090"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoComplete="email"
                        />
                    </View>

                    <View style={styles.row}>
                        <View style={styles.field}>
                            <Text style={styles.label}>Passord</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Skriv inn passord"
                                placeholderTextColor="#909090"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                autoComplete="new-password"
                            />
                        </View>

                        <View style={styles.field}>
                            <Text style={styles.label}>Bekreft passord</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Gjenta passord"
                                placeholderTextColor="#909090"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry
                                autoComplete="new-password"
                            />
                        </View>
                    </View>

                    {error ? (
                        <Text style={styles.error} accessibilityRole="alert">
                            {error}
                        </Text>
                    ) : null}    

                    <View style={styles.buttonRow}>
                        <Pressable
                            accessibilityRole="button"
                            accessibilityState={{ disabled: !canRegister }}
                            disabled={!canRegister}
                            onPress={handleRegister}
                            style={({ pressed }) => [
                                styles.button,
                                styles.registerButton,
                                !canRegister && styles.disabledButton,
                                pressed && styles.pressed,
                            ]}
                        >
                            <Text style={styles.buttonText}>Registrer</Text>
                        </Pressable>

                        <Pressable
                            accessibilityRole="button"
                            onPress={() => router.back()}
                            style={({ pressed }) => [
                                styles.button,
                                styles.backButton,
                                pressed && styles.pressed,
                            ]}
                        >
                            <Text style={styles.buttonText}>Tilbake</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
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
        paddingHorizontal: 28,
        paddingVertical: 48,
    },

    form: {
        width: '100%',
        maxWidth: 420,
        alignSelf: 'center',
    },

    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
        textAlign: 'center',
        marginBottom: 46,
    },

    row: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 24,
    },

    field: {
        flex: 1,
        minWidth: 0,
    },

    fullField: {
        marginBottom: 24,
    },

    label: {
        fontSize: 18,
        color: '#000000',
        marginBottom: 6,
    },

    input: {
        height: 43,
        backgroundColor: '#EAEAEA',
        borderRadius: 9,
        paddingHorizontal: 10,
        fontSize: 14,
        color: '#000000',
    },

    error: {
        color: '#B00020',
        fontSize: 14,
        marginBottom: 14,
    },

    buttonRow: {
    flexDirection: 'column',
    gap: 16,
    marginTop: 10,
    },
    button: {
        width: '100%',
        minHeight: 56,
        paddingVertical: 14,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    registerButton: {
        backgroundColor: '#246395',
    },
    backButton: {
        backgroundColor: '#246395',
    },
    disabledButton: {
        backgroundColor: '#94BFEA',
    },

    buttonText: {
        color: '#FFFFFF',
        fontSize: 20,
    },

    pressed: {
        opacity: 0.8,
    },
});
