import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";

const timeToMinutes = (t: string): number => {
  if (!t) return 0;
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

// Props endi quyosh o'rniga namoz vaqtlarini qabul qiladi
type Props = {
  fajr: string;   // Kun boshlanishi (Bomdod)
  isha: string;   // Kun tugashi (Xufton)
  now: Date;
};

const DayProgressBar = ({ fajr, isha, now }: Props) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  const startMin = timeToMinutes(fajr);
  const endMin   = timeToMinutes(isha);
  const nowMin   = now.getHours() * 60 + now.getMinutes();

  // Agar Xufton yarim tundan o'tib ketsa, hisoblash uchun 24 soat (1440 min) qo'shamiz
  const adjustedEndMin = endMin < startMin ? endMin + 1440 : endMin;
  const adjustedNowMin = nowMin < startMin && nowMin <= endMin ? nowMin + 1440 : nowMin;

  const totalDuration = adjustedEndMin - startMin;
  // Progress faqat Bomdod va Xufton oralig'ida bo'lsa hisoblanadi
  const elapsed = Math.min(Math.max(adjustedNowMin - startMin, 0), totalDuration);
  const rawPercent = totalDuration > 0 ? elapsed / totalDuration : 0;

  // Kun ichidamizmi yoki yo'q?
  const isWithinDay = rawPercent > 0 && rawPercent < 1;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: rawPercent,
      duration: 1000,
      easing: Easing.out(Easing.exp),
      useNativeDriver: false,
    }).start();
  }, [rawPercent]);

  return (
    <View style={styles.container}>
      {/* 1. Header Texts */}
      <View style={styles.textContainer}>
        <Text style={[styles.timeText, { color: "#9CA3AF" }]}>{fajr}</Text>
        <Text style={[styles.centerText, { color: isWithinDay ? "#3B82F6" : "#6B7280" }]}>
          {isWithinDay ? `Bugungi kun ${Math.round(rawPercent * 100)}%` : "Kun yakunlandi"}
        </Text>
        <Text style={[styles.timeText, { color: "#9CA3AF" }]}>{isha}</Text>
      </View>

      {/* 2. Progress Bar */}
      <View style={styles.track}>
        <Animated.View
          style={[
            styles.fill,
            {
              backgroundColor: isWithinDay ? "#3B82F6" : "#4B5563",
              width: animatedWidth.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
        
        {/* 3. Uchib yuruvchi nuqta (Indikator) */}
        {isWithinDay && (
          <Animated.View
            style={[
              styles.indicator,
              {
                left: animatedWidth.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0%", "100%"],
                }),
              },
            ]}
          >
            <View style={styles.innerDot} />
          </Animated.View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10, // Juda yopishib qolmasligi uchun
    paddingHorizontal: 5,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 6,
  },
  timeText: {
    fontSize: 10,
    fontWeight: "600",
  },
  centerText: {
    fontSize: 10,
    fontWeight: "700",
  },
  track: {
    height: 4, // Juda ingichka va nafis qildim
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 99,
    position: "relative",
    justifyContent: "center", // Nuqta o'rtada turishi uchun
  },
  fill: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: 99,
  },
  indicator: {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#161D2F", // Orqa fon bilan bir xil, ichi bo'sh ko'rinadi
    borderWidth: 2,
    borderColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -6, // Chiziq oxirida markazga kelishi uchun
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 3,
  },
  innerDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#3B82F6",
  }
});

export default DayProgressBar;