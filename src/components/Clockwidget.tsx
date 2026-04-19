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
  const hoursMins = now.toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" });
  const seconds = now.getSeconds().toString().padStart(2, "0");
  
  const dateStr = now.toLocaleDateString("uz-UZ", {
    weekday: "short", 
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <View className="bg-[#161D2F] rounded-xl p-4 mb-4 flex-row items-center justify-between border-b-2 border-[#2A64F6]">
      {/* Chap taraf: Soat va Sana */}
      <View className="flex-1 justify-center">
        <View className="flex-row items-baseline mb-1">
          <Text className="text-white text-4xl font-light tracking-tight">{hoursMins}</Text>
          <Text className="text-[#3B82F6] text-base font-bold ml-1">:{seconds}</Text>
        </View>
        <Text className="text-gray-400 text-[10px] font-medium tracking-wide uppercase">{dateStr}</Text>
      </View>

      {/* O'ng taraf: Keyingi namoz */}
      <View className="flex-1 items-end">
        <NextPrayerBadge next={next} />
      </View>
    </View>
  );
};

export default ClockWidget;