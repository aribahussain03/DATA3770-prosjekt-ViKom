import { SymbolView } from "expo-symbols";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { AppColors } from "../../theme/colors";
import { Typography } from "../../theme/typography";
import MessagesHeader from "../messages/MessagesHeader";

const ROW_GREY = "#EFEFEF";
const PILL_GREY = "#D9D9D9";
const LOG_OUT_RED = "#E60000";

export default function SettingsScreen({
  language = "Norsk",
  onBack,
  onLogOut,
}) {
  const [ringtoneOn, setRingtoneOn] = useState(false);
  const [notificationSoundOn, setNotificationSoundOn] = useState(true);

  return (
    <View style={styles.container}>
      <MessagesHeader
        title="Innstillinger"
        onBack={onBack}
        titleIcon={
          <SymbolView
            name={{
              ios: "gearshape.fill",
              android: "settings",
              web: "settings",
            }}
            size={32}
            tintColor={AppColors.primary}
          />
        }
      />

      <View style={styles.rows}>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Språk</Text>
          <Text style={styles.rowValue}>{language}</Text>
        </View>

        <SoundRow
          label="Ringetone"
          value={ringtoneOn}
          onToggle={() => setRingtoneOn((current) => !current)}
        />
        <SoundRow
          label="Varselslyd"
          value={notificationSoundOn}
          onToggle={() => setNotificationSoundOn((current) => !current)}
        />
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={onLogOut}
        style={({ pressed }) => [
          styles.logOutButton,
          pressed && styles.pressed,
        ]}
      >
        <Text style={styles.logOutText}>Logg ut</Text>
      </Pressable>
    </View>
  );
}

function SoundRow({ label, value, onToggle }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>

      <Pressable
        accessibilityRole="switch"
        accessibilityLabel={label}
        accessibilityState={{ checked: value }}
        onPress={onToggle}
        style={({ pressed }) => [styles.pill, pressed && styles.pressed]}
      >
        <Text style={styles.pillText}>{value ? "På" : "Av"}</Text>
        <SymbolView
          name={
            value
              ? {
                  ios: "speaker.wave.2.fill",
                  android: "volume_up",
                  web: "volume_up",
                }
              : {
                  ios: "speaker.slash.fill",
                  android: "volume_off",
                  web: "volume_off",
                }
          }
          size={24}
          tintColor={AppColors.text}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  rows: {
    flex: 1,
    justifyContent: "center",
    gap: 16,
    padding: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    minHeight: 72,
    backgroundColor: ROW_GREY,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  rowLabel: {
    ...Typography.subheading,
    fontWeight: "400",
    color: AppColors.text,
    flexShrink: 1,
  },
  rowValue: {
    ...Typography.body,
    color: AppColors.text,
    paddingRight: 12,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    minHeight: 52,
    minWidth: 96,
    justifyContent: "center",
    backgroundColor: PILL_GREY,
    borderRadius: 26,
    paddingHorizontal: 16,
  },
  pillText: {
    ...Typography.body,
    color: AppColors.text,
  },
  logOutButton: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 64,
    minWidth: 240,
    backgroundColor: LOG_OUT_RED,
    borderRadius: 32,
    paddingHorizontal: 32,
    marginBottom: 32,
  },
  logOutText: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "400",
    color: AppColors.background,
  },
  pressed: {
    opacity: 0.75,
  },
});
