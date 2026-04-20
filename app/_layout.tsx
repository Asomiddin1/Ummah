import { Feather } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import React from "react";
import { StatusBar } from "react-native";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "./global.css";

// ─── CUSTOM DRAWER COMPONENT ────────────────────────────────────────────────
import CustomDrawerContent from "@/src/components/CustomDrawerContent";

// ─── ROOT LAYOUT ─────────────────────────────────────────────────────────────
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />

      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerType: "slide",
          // Orqa fonni gradient eng to'q rangiga moslaymiz
          drawerStyle: {
            width: "75%",
            backgroundColor: "#040814",
          },
          // Menu elementlarining stili (Rasmga mos shaffof hoverlar)
          drawerActiveBackgroundColor: "rgba(42, 100, 246, 0.15)", // Ko'k rangning shaffof holati
          drawerActiveTintColor: "#2A64F6", // Bosh sahifadagi ko'k rang
          drawerInactiveTintColor: "#8492a6", // Ochiq kulrang/ko'k
          drawerLabelStyle: {
            fontSize: 16,
            fontWeight: "600",
            marginLeft: -10,
          },
          drawerItemStyle: {
            borderRadius: 16,
            paddingVertical: 5,
            marginVertical: 4,
          },
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: "Bosh sahifa",
            drawerIcon: ({ color }) => (
              <Feather name="home" size={22} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: "Sozlamalar",
            drawerIcon: ({ color }) => (
              <Feather name="settings" size={22} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
