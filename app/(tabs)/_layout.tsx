import { Feather, Ionicons } from "@expo/vector-icons";
import * as NavigationBar from "expo-navigation-bar"; // <- Shu import qo'shildi
import { Tabs } from "expo-router";
import React, { useEffect } from "react";
import { Platform, StatusBar } from "react-native";

export default function TabLayout() {
  // Android pastki panelini (oq chiziqni) qora qilish uchun kod
  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync("#0D1321"); // Ilova foni bilan bir xil rang
      NavigationBar.setButtonStyleAsync("light"); // Ikonkalarni oq rangga o'tkazish
    }
  }, []);

  return (
    <>
      {/* StatusBar Tabs dan tashqarida bo'lishi kerak */}
      <StatusBar barStyle="light-content" backgroundColor="#0D1321" />

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#2A64F6", // Faol (bosilgan) menyu rangi (Ko'k)
          tabBarInactiveTintColor: "#9CA3AF", // Faol bo'lmagan menyu rangi (Kulrang)
          tabBarStyle: {
            backgroundColor: "#0D1321", // Orqa fon rangi (To'q ko'k/Qora)
            borderTopWidth: 1,
            borderTopColor: "rgba(255, 255, 255, 0.05)", // Ustki yupqa chiziq
            height: Platform.OS === "ios" ? 85 : 70, // Menyuni balandligi
            paddingBottom: Platform.OS === "ios" ? 25 : 10,
            paddingTop: 10,
            position: "absolute", // Ekranning ustida suzib turishi uchun
            elevation: 0, // Androidda soyani yo'qotish uchun
          },
          tabBarLabelStyle: {
            fontSize: 10,
            marginTop: 4,
            fontFamily: Platform.OS === "ios" ? "System" : "sans-serif-medium",
          },
        }}
      >
        {/* 1. Home Ekrani */}
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <Feather name="home" size={24} color={color} />
            ),
          }}
        />

        {/* 2. Prayers Ekrani */}
        <Tabs.Screen
          name="settings"
          options={{
            title: "Prayers",
            tabBarIcon: ({ color }) => (
              <Ionicons name="time-outline" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
