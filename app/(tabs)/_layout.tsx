import { Feather, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform, View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2A64F6",
        tabBarInactiveTintColor: "#9CA3AF",

        // 🌟 ASOSIY QISM: Dumaloq konteynerning fonini shu yerda beramiz
        tabBarBackground: () => (
          <View
            style={{
              flex: 1,
              backgroundColor: "#1D2733", // Sizning to'q rangingiz
              borderRadius: 32, // To'liq dumaloq shakl
              overflow: "hidden", // Hech narsa dumaloqdan tashqariga chiqmasligi uchun!
            }}
          />
        ),

        tabBarStyle: {
          position: "absolute",
          bottom: Platform.OS === "ios" ? 30 : 20,
          marginHorizontal: 40,
          height: 64,
          borderRadius: 32,
          
          // Asosiy barni shaffof qilamizki, orqadagi dumaloq View (tabBarBackground) ko'rinsin
          backgroundColor: "transparent", 
          
          borderTopWidth: 0, // Tepadagi oq chiziqni o'chirish
          
          // Soya effektlari (dumaloq konteyner tagida)
          elevation: 5, 
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.25,
          shadowRadius: 10,
        },

        tabBarItemStyle: {
          height: 64,
          borderRadius: 32,
        },

        tabBarLabelStyle: {
          fontSize: 10,
          marginBottom: 10,
          fontWeight: "500",
        },

        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Feather name="home" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <Ionicons name="settings-outline" size={22} color={color} />,
        }}
      />
    </Tabs>
  );
}