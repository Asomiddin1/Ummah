import { Feather } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

const minutesToLabel = (diff: number): string => {
  if (diff <= 0) return "hozir";
  const h = Math.floor(diff / 60);
  const m = diff % 60;
  if (h > 0) return `${h}s ${m}d`;
  return `${m}d`;
};

type NextPrayer = { name: string; time: string; diff: number; };
type Props = { next: NextPrayer | null; };

const NextPrayerBadge = ({ next }: Props) => {
  if (!next) {
    return (
      <View className="bg-white/5 rounded-lg py-3 px-4 items-center w-full max-w-[140px]">
        <Text className="text-gray-400 text-[10px] text-center">Manzilni tanlang</Text>
      </View>
    );
  }

  return (
    // Vertikal dizayn (flex-col) uchun moslashtirildi
    <View className="bg-[#2A64F6]/15 rounded-lg py-2 px-3 items-center justify-center flex-col w-full max-w-[140px]">
      <Text className="text-gray-300 text-[10px] font-medium uppercase tracking-widest mb-1">
        {next.name}
      </Text>
      
      <Text className="text-white font-bold text-xl leading-tight mb-1">
        {next.time}
      </Text>
      
      {/* Qolgan vaqtni chiroyli qutichada ko'rsatish */}
      <View className="flex-row items-center gap-1 bg-[#2A64F6]/20 px-2 py-1 rounded">
        <Feather name="bell" size={10} color="#3B82F6" />
        <Text className="text-[#3B82F6] font-bold text-[10px]">{minutesToLabel(next.diff)}</Text>
      </View>
    </View>
  );
};

export default NextPrayerBadge;