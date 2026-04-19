import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import DayProgressBar from "./Sunprogressbar";


type Prayer = {
  id: number;
  name: string;
  time: string;
  icon: string;
};

type Timings = {
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  imsak: string;
  sunrise: string;
  midnight: string;
};

type Props = {
  timings: Timings;
  selectedCity: any;
  nextPrayerName: string | undefined;
  now: Date;
};

const PrayerTimesCard = ({ timings, selectedCity, nextPrayerName, now }: Props) => {
  const dailyPrayers: Prayer[] = [
    { id: 1, name: "Bomdod", time: timings.fajr,    icon: "weather-night-partly-cloudy" },
    { id: 2, name: "Peshin", time: timings.dhuhr,   icon: "weather-sunny" },
    { id: 3, name: "Asr",    time: timings.asr,     icon: "weather-partly-cloudy" },
    { id: 4, name: "Shom",   time: timings.maghrib, icon: "weather-sunset-down" },
    { id: 5, name: "Xufton", time: timings.isha,    icon: "moon-waning-crescent" },
  ];

  return (
    <View className="bg-[#161D2F] rounded-[32px] p-5 mb-8">
      
      {/* 1. Header (Shahar nomi va oraliq vaqt) - Ixchamlashtirildi */}
      <View className="flex-row justify-between items-center mb-6 pb-4 border-b border-white/10">
        <View className="flex-row items-center gap-2">
          <Feather name="map-pin" size={16} color="#3B82F6" />
          <Text className="text-white font-semibold text-base">
            {selectedCity?.name}
          </Text>
        </View>
        <View className="bg-white/5 px-3 py-1.5 rounded-full">
          <Text className="text-gray-400 text-xs font-medium">
            {timings.fajr} — {timings.isha}
          </Text>
        </View>
      </View>
      {/* 2. Asosiy 5 vaqt namozlari */}
      <View className="flex-row justify-between items-center mb-6">
        {dailyPrayers.map((prayer) => {
          const isNext = prayer.name === nextPrayerName;
          return (
            <View 
              key={prayer.id} 
              className={`items-center justify-center p-2 rounded-2xl w-[60px] ${isNext ? 'bg-[#2A64F6]/20' : ''}`}
            >
              <Text className={`text-[10px] mb-2 ${isNext ? "text-[#3B82F6] font-bold" : "text-gray-400"}`}>
                {prayer.name}
              </Text>
              <MaterialCommunityIcons
                name={prayer.icon as any}
                size={24}
                color={isNext ? "#3B82F6" : "white"}
                style={{ opacity: isNext ? 1 : 0.7 }}
              />
              <Text className={`font-bold text-xs mt-2 ${isNext ? "text-[#3B82F6]" : "text-white"}`}>
                {prayer.time}
              </Text>
            </View>
          );
        })}
      </View>
   <DayProgressBar fajr={timings.fajr} isha={timings.isha} now={now} />
      {/* 4. Qo'shimcha vaqtlar (Imsak, Quyosh, Tun) - Juda ixcham qator */}
      <View className="flex-row justify-between bg-white/5 rounded-2xl p-4 mt-2">
        <View className="items-center flex-1 border-r border-white/10">
          <Text className="text-gray-400 text-[10px] uppercase mb-1 tracking-wider">Saharlik</Text>
          <Text className="text-white font-medium text-sm">{timings.imsak}</Text>
        </View>
        
        <View className="items-center flex-1 border-r border-white/10">
          <Text className="text-gray-400 text-[10px] uppercase mb-1 tracking-wider">Quyosh</Text>
          <Text className="text-[#FBBF24] font-medium text-sm">{timings.sunrise}</Text>
        </View>
        
        <View className="items-center flex-1">
          <Text className="text-gray-400 text-[10px] uppercase mb-1 tracking-wider">Yarim tun</Text>
          <Text className="text-white font-medium text-sm">{timings.midnight}</Text>
        </View>
      </View>

    </View>
  );
};

export default PrayerTimesCard;