import { Feather } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

const minutesToLabel = (diff: number): string => {
  if (diff <= 0) return "hozir";
  const h = Math.floor(diff / 60);
  const m = diff % 60;
  if (h > 0) return `${h} soat ${m} daqiqa`;
  return `${m} daqiqa`;
};

type NextPrayer = { name: string; time: string; diff: number; };
type Props = { next: NextPrayer | null; };

const NextPrayerBadge = ({ next }: Props) => {
  if (!next) {
    return (
      <View className="bg-white/5 rounded-xl px-4 py-2 items-center w-full">
        <Text className="text-gray-400 text-xs">Manzilni tanlang</Text>
      </View>
    );
  }

  return (
    <View className="bg-[#2A64F6]/15 rounded-2xl px-4 py-2.5 items-center justify-center flex-row gap-3 w-full">
      <Text className="text-gray-300 text-sm font-medium">{next.name}</Text>
      <View className="w-[1px] h-4 bg-white/20" />
      <Text className="text-white font-bold text-base">{next.time}</Text>
      <View className="w-[1px] h-4 bg-white/20" />
      <View className="flex-row items-center gap-1">
        <Feather name="bell" size={12} color="#3B82F6" />
        <Text className="text-[#3B82F6] font-bold text-xs">{minutesToLabel(next.diff)}</Text>
      </View>
    </View>
  );
};

export default NextPrayerBadge;