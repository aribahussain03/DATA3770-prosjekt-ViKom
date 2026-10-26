import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { AppColors } from '../theme/colors';
import { Typography } from '../theme/typography';

export default function AppDialog({
  visible,
  title,
  message,
  confirmLabel = 'OK',
  cancelLabel,
  onConfirm,
  onClose,
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View
          style={styles.dialog}
          accessibilityViewIsModal
        >
          <ScrollView>
            <Text accessibilityRole="header" style={styles.title}>
              {title}
            </Text>

            <Text style={styles.message}>{message}</Text>

            <View style={styles.actions}>
              <Pressable
                accessibilityRole="button"
                onPress={onConfirm}
                style={({ pressed }) => [
                  styles.button,
                  styles.confirm,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.buttonText}>{confirmLabel}</Text>
              </Pressable>

              {cancelLabel ? (
                <Pressable
                  accessibilityRole="button"
                  onPress={onClose}
                  style={({ pressed }) => [
                    styles.button,
                    styles.cancel,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text style={styles.buttonText}>{cancelLabel}</Text>
                </Pressable>
              ) : null}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: AppColors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  dialog: {
    width: '100%',
    maxWidth: 420,
    maxHeight: '85%',
    backgroundColor: AppColors.background,
    borderRadius: 16,
    padding: 24,
  },
  title: {
    ...Typography.subheading,
    color: AppColors.text,
    marginBottom: 16,
  },
  message: {
    ...Typography.body,
    color: AppColors.text,
    marginBottom: 24,
  },
  actions: {
    gap: 12,
  },
  button: {
    minHeight: 48,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirm: {
    backgroundColor: AppColors.primaryLight,
  },
  cancel: {
    backgroundColor: AppColors.cancel,
  },
  buttonText: {
    ...Typography.button,
    color: AppColors.text,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
});