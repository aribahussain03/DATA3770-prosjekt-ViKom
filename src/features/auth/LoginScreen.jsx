import { router } from 'expo-router';
import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [forgotModalVisible, setForgotModalVisible] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetError, setResetError] = useState('');

  const canLogin = Boolean(email.trim() && password.trim());

  function handleLogin() {
    if (!canLogin) {
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Skriv inn en gyldig e-postadresse.');
      return;
    }

    setError('');

    // Prototypen simulerer innlogging.
    router.replace('/home');
  }

  function openForgotPassword() {
    setResetEmail('');
    setResetError('');
    setForgotModalVisible(true);
  }

  function handleResetPassword() {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resetEmail.trim())) {
      setResetError('Skriv inn en gyldig e-postadresse.');
      return;
    }

    // Ingen e-post sendes i prototypen.
    setResetError('');
    setForgotModalVisible(false);
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.form}>
          <Text style={styles.logo}>ViKom</Text>

          <View style={styles.field}>
            <Text style={styles.label}>E-post</Text>

            <TextInput
              accessibilityLabel="E-post"
              value={email}
              onChangeText={(value) => {
                setEmail(value);
                setError('');
              }}
              placeholder="Skriv inn e-post"
              placeholderTextColor="#909090"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              style={styles.input}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Passord</Text>

            <TextInput
              accessibilityLabel="Passord"
              value={password}
              onChangeText={(value) => {
                setPassword(value);
                setError('');
              }}
              placeholder="Skriv inn passord"
              placeholderTextColor="#909090"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="password"
              returnKeyType="go"
              onSubmitEditing={handleLogin}
              style={styles.input}
            />
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={openForgotPassword}
            style={({ pressed }) => [
              styles.forgotButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.forgotText}>Glemt passord?</Text>
          </Pressable>

          {error ? (
            <Text accessibilityRole="alert" style={styles.error}>
              {error}
            </Text>
          ) : null}

          <View style={styles.buttonGroup}>
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ disabled: !canLogin }}
              disabled={!canLogin}
              onPress={handleLogin}
              style={({ pressed }) => [
                styles.button,
                !canLogin && styles.disabledButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.buttonText}>Logg inn</Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              onPress={() => router.push('/register')}
              style={({ pressed }) => [
                styles.button,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.buttonText}>Registrer</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={forgotModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setForgotModalVisible(false)}
      >
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.modalContent}>
            <Text accessibilityRole="header" style={styles.modalTitle}>
              Tilbakestill passord
            </Text>

            <Text style={styles.modalDescription}>
              Skriv inn e-postadressen din. I prototypen simuleres
              forespørselen uten at en e-post sendes.
            </Text>

            <TextInput
              accessibilityLabel="E-post for tilbakestilling"
              value={resetEmail}
              onChangeText={(value) => {
                setResetEmail(value);
                setResetError('');
              }}
              placeholder="Skriv inn e-post"
              placeholderTextColor="#909090"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              style={styles.input}
            />

            {resetError ? (
              <Text accessibilityRole="alert" style={styles.error}>
                {resetError}
              </Text>
            ) : null}

            <View style={styles.modalButtons}>
              <Pressable
                accessibilityRole="button"
                onPress={() => setForgotModalVisible(false)}
                style={({ pressed }) => [
                  styles.modalButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.modalButtonText}>Avbryt</Text>
              </Pressable>

              <Pressable
                accessibilityRole="button"
                onPress={handleResetPassword}
                style={({ pressed }) => [
                  styles.modalButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.modalButtonText}>Send</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
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
    width: '100%',
    marginBottom: 22,
  },
  label: {
    fontSize: 20,
    color: '#000000',
    marginBottom: 6,
  },
  input: {
    width: '100%',
    minHeight: 48,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 9,
    backgroundColor: '#EAEAEA',
    fontSize: 16,
    color: '#000000',
  },
  forgotButton: {
    alignSelf: 'flex-start',
    minHeight: 44,
    justifyContent: 'center',
  },
  forgotText: {
    fontSize: 16,
    color: '#000000',
  },
  error: {
    fontSize: 14,
    color: '#B00020',
    marginTop: 12,
  },
  buttonGroup: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: 16,
    marginTop: 40,
  },
  button: {
    width: '100%',
    minHeight: 56,
    paddingHorizontal: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
    backgroundColor: '#246395',
  },
  disabledButton: {
    backgroundColor: '#94BFEA',
  },
  buttonText: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
  modalOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContent: {
    width: '100%',
    maxWidth: 380,
    padding: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000000',
    marginBottom: 12,
  },
  modalDescription: {
    fontSize: 16,
    lineHeight: 23,
    color: '#444444',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
    marginTop: 20,
  },
  modalButton: {
    minHeight: 48,
    minWidth: 64,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  modalButtonText: {
    fontSize: 18,
    color: '#246395',
  },
});