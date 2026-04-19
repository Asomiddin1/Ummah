import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
// Eski xato importni olib tashlang:
// import { View, Text, ScrollView, Image, TouchableOpacity, SafeAreaView, StatusBar } from "react-native";

// O'rniga shularni yozing:
import React from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; // <- Shu qator qo'shildi

const PrayerTimesScreen = () => {
  const dailyPrayers = [
    { id: 1, name: "Fajar", time: "5.25", icon: "weather-partly-cloudy" },
    { id: 2, name: "Johor", time: "1.30", icon: "weather-sunny" },
    { id: 3, name: "Asar", time: "4.30", icon: "weather-partly-cloudy" },
    { id: 4, name: "Maghrib", time: "5.50", icon: "weather-sunset-down" },
    { id: 5, name: "Isha", time: "7.45", icon: "moon-waning-crescent" },
  ];

  const places = [
    {
      id: 1,
      name: "Kaaba",
      image:
        "https://images.unsplash.com/photo-1565552643954-b4bfd14fc7b2?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 2,
      name: "Medina",
      image:
        "https://images.unsplash.com/photo-1591198904217-10640f098547?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: 3,
      name: "Jerusalem",
      image:
        "https://images.unsplash.com/photo-1549887552-cb1071d3e5ca?auto=format&fit=crop&w=300&q=80",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#0D1321]">
      <StatusBar barStyle="light-content" />

      <ScrollView
        className="flex-1 px-5 pt-4"
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-white text-xl font-bold tracking-widest">
            UMMAH
          </Text>
          <View className="flex-row space-x-3">
            <TouchableOpacity className="bg-white/10 p-2 rounded-full">
              <Feather name="bell" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity className="bg-blue-500 p-2 rounded-full">
              <Feather name="settings" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Title */}
        <Text className="text-white text-2xl font-semibold mb-4">
          Stay Notified for Prayer Times.{" "}
          <Text className="text-blue-400">🌙</Text>
        </Text>

        {/* Location Selector */}
        <TouchableOpacity className="bg-white/5 border border-white/10 flex-row items-center justify-between rounded-2xl p-3 mb-8 w-2/3">
          <View className="flex-row items-center space-x-3">
            <View className="bg-white/10 p-2 rounded-full">
              <Ionicons name="location-outline" size={18} color="#9CA3AF" />
            </View>
            <View>
              <Text className="text-white font-medium">Tangail</Text>
              <Text className="text-gray-400 text-xs">Bangladesh</Text>
            </View>
          </View>
          <Feather name="chevron-down" size={20} color="#9CA3AF" />
        </TouchableOpacity>

        {/* Main Clock */}
        <View className="items-center mb-8">
          <Text className="text-white text-6xl font-light tracking-wider">
            1:12:34
            <Text className="text-2xl text-gray-400 font-normal">pm</Text>
          </Text>
        </View>

        {/* Current Prayer Card */}
        <View className="bg-[#2A64F6] rounded-3xl p-5 mb-4 shadow-lg shadow-blue-500/30">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-white font-medium text-lg">Dhuhur</Text>
            <View className="flex-row space-x-4">
              <Feather name="volume-2" size={20} color="white" />
              <Feather name="more-vertical" size={20} color="white" />
            </View>
          </View>
          <Text className="text-white/80 font-medium">1:15 - 3:20 Pm</Text>
        </View>

        {/* Prayer Times List */}
        <View className="bg-[#161D2F] rounded-3xl p-5 mb-4">
          <View className="flex-row justify-between items-center">
            {dailyPrayers.map((prayer) => (
              <View key={prayer.id} className="items-center space-y-2">
                <Text className="text-gray-400 text-xs">{prayer.name}</Text>
                <MaterialCommunityIcons
                  name={prayer.icon as any}
                  size={24}
                  color={prayer.id === 5 ? "#FBBF24" : "white"}
                />
                <Text className="text-white font-medium text-xs">
                  {prayer.time}
                </Text>
              </View>
            ))}
          </View>

          {/* Divider */}
          <View className="h-[1px] bg-white/10 my-4" />

          {/* Extra Times */}
          <View className="flex-row justify-between">
            <View>
              <Text className="text-gray-400 text-xs mb-1">Tahajut</Text>
              <Text className="text-white font-medium text-sm">4:34</Text>
            </View>
            <View>
              <Text className="text-gray-400 text-xs mb-1">Sun Rises</Text>
              <Text className="text-white font-medium text-sm">5:59</Text>
            </View>
            <View>
              <Text className="text-gray-400 text-xs mb-1">Sunset</Text>
              <Text className="text-white font-medium text-sm">4:34</Text>
            </View>
          </View>
        </View>

        {/* Places ScrollView */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-24"
        >
          {places.map((place) => (
            <TouchableOpacity key={place.id} className="mr-4 items-center">
              <Image
                source={{ uri: place.image }}
                className="w-24 h-24 rounded-2xl mb-2"
                resizeMode="cover"
              />
              <Text className="text-gray-300 text-xs">{place.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrayerTimesScreen;
