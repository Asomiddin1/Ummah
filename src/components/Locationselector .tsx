import { Feather, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  selectedCity: any;
  selectedRegion: any;
  selectedCountry: any;
  onPress: () => void;
};

const LocationSelector = ({ selectedCity, selectedRegion, selectedCountry, onPress }: Props) => {
  return (
    <TouchableOpacity
      className="bg-white/5 border border-white/10 flex-row items-center justify-between rounded-2xl p-3 mb-6 w-full"
      onPress={onPress}
    >
      <View className="flex-row items-center space-x-3 gap-3">
        <View className="bg-white/10 p-2 rounded-full">
          <Ionicons name="location-outline" size={20} color="#3B82F6" />
        </View>
        <View>
          <Text className="text-white font-medium text-base">
            {selectedCity ? selectedCity.name : "Manzilni tanlang"}
          </Text>
          <Text className="text-gray-400 text-xs mt-1">
            {selectedRegion ? `${selectedRegion.name}, ` : ""}
            {selectedCountry ? selectedCountry.name : "Davlat, Viloyat, Shahar"}
          </Text>
        </View>
      </View>
      <Feather name="chevron-down" size={20} color="#9CA3AF" />
    </TouchableOpacity>
  );
};

export default LocationSelector;