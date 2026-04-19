import React from "react";
import { Text, View } from "react-native";
import NextPrayerBadge from "./Nextprayerbadge";

type NextPrayer = {
  name: string;
  time: string;
  diff: number;
};

type Props = {
  now: Date;
  next: NextPrayer | null;
};

const ClockWidget = ({ now, next }: Props) => {
  // Soat va soniyani alohida ajratib olamiz
  const hoursMins = now.toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" });
  const seconds = now.getSeconds().toString().padStart(2, "0");
  
  const dateStr = now.toLocaleDateString("uz-UZ", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <View className="bg-[#161D2F] rounded-3xl p-6 mb-6 items-center border-b-4 border-[#2A64F6]">
      <View className="flex-row items-baseline mb-2">
        <Text className="text-white text-7xl font-light tracking-tight">{hoursMins}</Text>
        <Text className="text-[#3B82F6] text-3xl font-bold ml-2">:{seconds}</Text>
      </View>
      <Text className="text-gray-400 text-sm font-medium mb-5 tracking-wide">{dateStr}</Text>
      <NextPrayerBadge next={next} />
    </View>
  );
};

export default ClockWidget;