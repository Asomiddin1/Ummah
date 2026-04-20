import { Feather } from "@expo/vector-icons";
import {
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";
import { LinearGradient } from "expo-linear-gradient";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function CustomDrawerContent(props: any) {
  return (
    <LinearGradient
      colors={["#040814", "#0D1321", "#192B4D", "#0D1321", "#02040A"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      locations={[0, 0.2, 0.5, 0.8, 1]}
      style={{ flex: 1 }}
    >
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ paddingTop: 0 }}
      >
        {/* 1. PROFIL QISMI - Bosh sahifadagi kartalarga mos shaffoflik */}
        <View className="px-5 pt-16 pb-8 items-center mb-4 border-b border-white/5">
          <View className="relative">
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
              }}
              className="w-24 h-24 rounded-full border-[3px] border-[#2A64F6]/50"
            />
          </View>

          <Text className="text-white text-xl font-bold mt-4 tracking-wide">
            User Name
          </Text>
          <Text className="text-[#8492a6] text-sm font-medium mt-1">
            user@gmail.com
          </Text>
        </View>

        {/* 2. MENU RO'YXATI */}
        <View className="flex-1 px-3 mt-2">
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      {/* 3. LOGOUT QISMI */}
      <View className="p-6 pb-10 border-t border-white/5">
        <TouchableOpacity
          className="flex-row items-center gap-4 bg-red-500/10 p-4 rounded-2xl border border-red-500/20"
          onPress={() => console.log("Logout")}
        >
          <Feather name="log-out" size={22} color="#f87171" />
          <Text className="text-red-400 text-lg font-semibold">Chiqish</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
