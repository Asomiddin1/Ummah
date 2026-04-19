import { Feather, Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import * as NavigationBar from "expo-navigation-bar";
import { Tabs } from "expo-router";
import React, { useEffect } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";

function LiquidGlassTabBar({ state, descriptors, navigation }: any) {
  return (
    <View style={styles.tabBarWrapper}>
      <BlurView intensity={60} tint="dark" style={styles.blurContainer}>
        <View style={styles.glassInner}>
          {state.routes.map((route: any, index: number) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const icon = options.tabBarIcon?.({
              color: isFocused ? "#60A5FA" : "rgba(255,255,255,0.45)",
              size: 24,
              focused: isFocused,
            });

            return (
              <View
                key={route.key}
                style={[styles.tabItem, isFocused && styles.activeTabItem]}
                onTouchEnd={onPress}
              >
                {isFocused && <View style={styles.activeGlow} />}
                <View style={styles.iconWrapper}>{icon}</View>
                <View style={[styles.dot, isFocused && styles.dotActive]} />
              </View>
            );
          })}
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarWrapper: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 30 : 20,
    left: 40,
    right: 40,
    borderRadius: 32,
    overflow: "hidden",
    // Soya
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 20,
  },
  blurContainer: {
    borderRadius: 32,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
  },
  glassInner: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 32,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    borderRadius: 24,
    position: "relative",
  },
  activeTabItem: {
    backgroundColor: "rgba(96, 165, 250, 0.12)",
  },
  activeGlow: {
    position: "absolute",
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(96, 165, 250, 0.15)",
    // Blur effekti uchun
  },
  iconWrapper: {
    zIndex: 1,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "transparent",
    marginTop: 4,
  },
  dotActive: {
    backgroundColor: "#60A5FA",
  },
});

export default function TabLayout() {
  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync("transparent");
      NavigationBar.setButtonStyleAsync("light");
    }
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <Tabs
        tabBar={(props) => <LiquidGlassTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Feather name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}