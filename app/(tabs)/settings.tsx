import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Linking,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// ─── Konstantalar ─────────────────────────────────────────────────────────────
const SETTINGS_KEY = "app_settings";

const LANGUAGES = [
  { code: "uz", label: "O'zbekcha", flag: "🇺🇿" },
  { code: "ru", label: "Русский",   flag: "🇷🇺" },
  { code: "en", label: "English",   flag: "🇬🇧" },
];

const THEMES = [
  { id: "default", label: "Ko'k",      color: "#2A64F6" },
  { id: "brown",   label: "Qo'ng'ir",  color: "#92400E" },
  { id: "teal",    label: "Moviy",     color: "#0D9488" },
];

const PRAYERS = [
  { key: "fajr",    label: "Bomdod" },
  { key: "dhuhr",   label: "Peshin" },
  { key: "asr",     label: "Asr" },
  { key: "maghrib", label: "Shom" },
  { key: "isha",    label: "Xufton" },
];

// ─── Yordamchi komponentlar ───────────────────────────────────────────────────
const SectionHeader = ({ title }: { title: string }) => (
  <Text
    style={{
      color: "#6B7280",
      fontSize: 11,
      fontWeight: "700",
      letterSpacing: 1.2,
      textTransform: "uppercase",
      marginBottom: 8,
      marginTop: 24,
      paddingHorizontal: 4,
    }}
  >
    {title}
  </Text>
);

const Card = ({ children }: { children: React.ReactNode }) => (
  <View
    style={{
      backgroundColor: "#161D2F",
      borderRadius: 20,
      overflow: "hidden",
    }}
  >
    {children}
  </View>
);

const Divider = () => (
  <View
    style={{
      height: 1,
      backgroundColor: "rgba(255,255,255,0.05)",
      marginHorizontal: 16,
    }}
  />
);

// ─── Settings Page ────────────────────────────────────────────────────────────
const Settings = () => {
  const [language, setLanguage]   = useState("uz");
  const [theme, setTheme]         = useState("default");
  const [notifications, setNotifications] = useState<Record<string, boolean>>({
    fajr: true, dhuhr: true, asr: true, maghrib: true, isha: true,
  });

  // Sozlamalarni yuklash
  useEffect(() => {
    const load = async () => {
      try {
        const saved = await AsyncStorage.getItem(SETTINGS_KEY);
        if (saved) {
          const s = JSON.parse(saved);
          if (s.language)      setLanguage(s.language);
          if (s.theme)         setTheme(s.theme);
          if (s.notifications) setNotifications(s.notifications);
        }
      } catch (e) {
        console.error("Sozlamalarni yuklashda xato:", e);
      }
    };
    load();
  }, []);

  // Saqlash
  const save = async (patch: object) => {
    try {
      const saved = await AsyncStorage.getItem(SETTINGS_KEY);
      const current = saved ? JSON.parse(saved) : {};
      await AsyncStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify({ ...current, ...patch })
      );
    } catch (e) {
      console.error("Saqlashda xato:", e);
    }
  };

  const handleLanguage = (code: string) => {
    setLanguage(code);
    save({ language: code });
  };

  const handleTheme = (id: string) => {
    setTheme(id);
    save({ theme: id });
  };

  const handleNotification = (key: string, value: boolean) => {
    const updated = { ...notifications, [key]: value };
    setNotifications(updated);
    save({ notifications: updated });
  };

  const handleRate = () => {
    // App Store yoki Play Store havolasi
    Linking.openURL("https://apps.apple.com/app/idXXXXXXX").catch(() =>
      Alert.alert("Xato", "Ilova do'konini ochib bo'lmadi.")
    );
  };

  const handleFeedback = () => {
    Linking.openURL("mailto:support@ummahapp.uz?subject=Feedback").catch(() =>
      Alert.alert("Xato", "Email ilovasini ochib bo'lmadi.")
    );
  };

  const accentColor =
    theme === "brown" ? "#92400E" : theme === "teal" ? "#0D9488" : "#2A64F6";

  // ───────────────────────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0D1321" }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 8,
            marginBottom: 4,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 26,
              fontWeight: "700",
              letterSpacing: 1,
              flex: 1,
            }}
          >
            Sozlamalar
          </Text>
          <View
            style={{
              backgroundColor: accentColor + "22",
              borderRadius: 99,
              padding: 8,
              borderWidth: 1,
              borderColor: accentColor + "44",
            }}
          >
            <Feather name="settings" size={20} color={accentColor} />
          </View>
        </View>

        {/* ── Til ── */}
        <SectionHeader title="Til" />
        <Card>
          {LANGUAGES.map((lang, i) => (
            <React.Fragment key={lang.code}>
              <TouchableOpacity
                onPress={() => handleLanguage(lang.code)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                }}
                activeOpacity={0.7}
              >
                <Text style={{ fontSize: 22, marginRight: 12 }}>{lang.flag}</Text>
                <Text style={{ color: "white", fontSize: 15, flex: 1 }}>
                  {lang.label}
                </Text>
                {language === lang.code && (
                  <View
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 11,
                      backgroundColor: accentColor,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Feather name="check" size={13} color="white" />
                  </View>
                )}
              </TouchableOpacity>
              {i < LANGUAGES.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </Card>

        {/* ── Tema ── */}
        <SectionHeader title="Tema" />
        <Card>
          <View
            style={{
              flexDirection: "row",
              padding: 14,
              gap: 10,
            }}
          >
            {THEMES.map((t) => {
              const selected = theme === t.id;
              return (
                <TouchableOpacity
                  key={t.id}
                  onPress={() => handleTheme(t.id)}
                  activeOpacity={0.8}
                  style={{
                    flex: 1,
                    alignItems: "center",
                    paddingVertical: 14,
                    borderRadius: 14,
                    borderWidth: selected ? 2 : 1,
                    borderColor: selected ? t.color : "rgba(255,255,255,0.08)",
                    backgroundColor: selected
                      ? t.color + "18"
                      : "rgba(255,255,255,0.03)",
                  }}
                >
                  <View
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 14,
                      backgroundColor: t.color,
                      marginBottom: 8,
                    }}
                  />
                  <Text
                    style={{
                      color: selected ? t.color : "#9CA3AF",
                      fontSize: 12,
                      fontWeight: selected ? "700" : "400",
                    }}
                  >
                    {t.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </Card>

        {/* ── Bildirishnomalar ── */}
        <SectionHeader title="Azan bildirisnomalar" />
        <Card>
          {PRAYERS.map((prayer, i) => (
            <React.Fragment key={prayer.key}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 16,
                  paddingVertical: 13,
                }}
              >
                <MaterialCommunityIcons
                  name={
                    prayer.key === "fajr"    ? "weather-night-partly-cloudy" :
                    prayer.key === "dhuhr"   ? "weather-sunny" :
                    prayer.key === "asr"     ? "weather-partly-cloudy" :
                    prayer.key === "maghrib" ? "weather-sunset-down" :
                                              "moon-waning-crescent"
                  }
                  size={20}
                  color={notifications[prayer.key] ? accentColor : "#4B5563"}
                  style={{ marginRight: 12 }}
                />
                <Text style={{ color: "white", fontSize: 15, flex: 1 }}>
                  {prayer.label}
                </Text>
                <Switch
                  value={notifications[prayer.key]}
                  onValueChange={(val) => handleNotification(prayer.key, val)}
                  trackColor={{ false: "#374151", true: accentColor + "88" }}
                  thumbColor={notifications[prayer.key] ? accentColor : "#6B7280"}
                  ios_backgroundColor="#374151"
                />
              </View>
              {i < PRAYERS.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </Card>

        {/* ── Ilova haqida ── */}
        <SectionHeader title="Ilova" />
        <Card>
          {/* Baholash */}
          <TouchableOpacity
            onPress={handleRate}
            activeOpacity={0.7}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 16,
              paddingVertical: 14,
            }}
          >
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                backgroundColor: "#F59E0B22",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 12,
              }}
            >
              <Ionicons name="star" size={18} color="#F59E0B" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: "white", fontSize: 15 }}>Ilovani baholang</Text>
              <Text style={{ color: "#6B7280", fontSize: 12, marginTop: 1 }}>
                App Store'da yulduz qoldiring
              </Text>
            </View>
            <Feather name="chevron-right" size={18} color="#4B5563" />
          </TouchableOpacity>

          <Divider />

          {/* Feedback */}
          <TouchableOpacity
            onPress={handleFeedback}
            activeOpacity={0.7}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 16,
              paddingVertical: 14,
            }}
          >
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                backgroundColor: accentColor + "22",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 12,
              }}
            >
              <Feather name="message-circle" size={18} color={accentColor} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: "white", fontSize: 15 }}>Fikr-mulohaza</Text>
              <Text style={{ color: "#6B7280", fontSize: 12, marginTop: 1 }}>
                Taklif yoki muammolarni yuboring
              </Text>
            </View>
            <Feather name="chevron-right" size={18} color="#4B5563" />
          </TouchableOpacity>

          <Divider />

          {/* Version */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 16,
              paddingVertical: 14,
            }}
          >
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                backgroundColor: "rgba(255,255,255,0.06)",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 12,
              }}
            >
              <Feather name="info" size={18} color="#6B7280" />
            </View>
            <Text style={{ color: "white", fontSize: 15, flex: 1 }}>Versiya</Text>
            <Text style={{ color: "#6B7280", fontSize: 13 }}>1.0.0</Text>
          </View>
        </Card>

        {/* Footer */}
        <Text
          style={{
            color: "#374151",
            fontSize: 12,
            textAlign: "center",
            marginTop: 32,
          }}
        >
          UMMAH © 2025 — Barcha huquqlar himoyalangan
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;