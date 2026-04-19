import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  getCities,
  getCountries,
  getRegions,
  getTimings,
} from "../../src/client/api";

import LocationSelector from "@/src/components/Locationselector ";
import ClockWidget from "../../src/components/Clockwidget";
import LocationModal from "../../src/components/Locationmodal";
import PrayerTimesCard from "../../src/components/Prayertimescard";
import { useClock, useNextPrayer } from "../../src/hooks/clock";

// ─── Konstantalar ─────────────────────────────────────────────────────────────
const STORAGE_KEY = "selected_location";

const PLACES = [
  { id: 1, name: "Kaaba",   image: "https://www.komar.de/media/catalog/product/cache/8/image/9df78eab33525d08d6e5fb8d27136e95/import/api-v1.1-file-public-files-pim-assets-97-ad-84-62-6284ad972eff292d45ce1a2e-images-72-65-ba-65-65ba65725b4bee91324cc62f-8-110-i.01.jpg" },
  { id: 2, name: "Medina",  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/HAC_2010_MEDINE_MESCIDI_NEBEVI_-_panoramio.jpg/1280px-HAC_2010_MEDINE_MESCIDI_NEBEVI_-_panoramio.jpg" },
  { id: 3, name: "Al aqsa", image: "https://upload.wikimedia.org/wikipedia/commons/8/87/Jerusalem-2013-Temple_Mount-Al-Aqsa_Mosque_%28NE_exposure%29.jpg" },
];

// ─── Screen ───────────────────────────────────────────────────────────────────
const PrayerTimesScreen = () => {
  const now = useClock();

  const [modalVisible,   setModalVisible]   = useState(false);
  const [loading,        setLoading]        = useState(false);
  const [selectionStep,  setSelectionStep]  = useState<"country" | "region" | "city">("country");

  const [countries, setCountries] = useState<any[]>([]);
  const [regions,   setRegions]   = useState<any[]>([]);
  const [cities,    setCities]    = useState<any[]>([]);

  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [selectedRegion,  setSelectedRegion]  = useState<any>(null);
  const [selectedCity,    setSelectedCity]    = useState<any>(null);

  const [timings, setTimings] = useState<any>(null);

  const next = useNextPrayer(timings, now);

  // ── Init ────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const init = async () => {
      await fetchCountries();
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        const loc = JSON.parse(saved);
        setSelectedCountry(loc.country);
        setSelectedRegion(loc.region);
        setSelectedCity(loc.city);
        await loadTimings(loc.city.id);
      } else {
        setSelectionStep("country");
        setModalVisible(true);
      }
    };
    init();
  }, []);

  // ── API ─────────────────────────────────────────────────────────────────────
  const fetchCountries = async () => {
    try {
      setLoading(true);
      const res = await getCountries();
      setCountries(res.success && Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Davlatlarni yuklashda xato:", err);
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  const loadTimings = async (cityId: number) => {
    try {
      setLoading(true);
      const res = await getTimings(cityId);
      if (res.success && res.data?.country?.region?.cities?.[0]?.time) {
        setTimings(res.data.country.region.cities[0].time);
      }
    } catch (err) {
      console.error("Vaqtlarni yuklashda xato:", err);
    } finally {
      setLoading(false);
    }
  };

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleSelectCountry = async (country: any) => {
    setSelectedCountry(country);
    setSelectedRegion(null);
    setSelectedCity(null);
    setTimings(null);
    setSelectionStep("region");
    try {
      setLoading(true);
      const res = await getRegions(country.id);
      setRegions(
        res.success && Array.isArray(res.data) && res.data[0]?.regions
          ? res.data[0].regions
          : []
      );
    } catch (err) {
      console.error("Viloyat yuklashda xato:", err);
      setRegions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectRegion = async (region: any) => {
    setSelectedRegion(region);
    setSelectedCity(null);
    setTimings(null);
    setSelectionStep("city");
    try {
      setLoading(true);
      const res = await getCities(region.id);
      setCities(res.success && res.data?.country?.region?.cities ? res.data.country.region.cities : []);
    } catch (err) {
      console.error("Shahar yuklashda xato:", err);
      setCities([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCity = async (city: any) => {
    setSelectedCity(city);
    setModalVisible(false);
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ country: selectedCountry, region: selectedRegion, city })
    );
    await loadTimings(city.id);
  };

  const openLocationModal = () => {
    setSelectionStep(
      !selectedCountry ? "country" : !selectedRegion ? "region" : "city"
    );
    setModalVisible(true);
  };

  const handleModalBack = () => {
    setSelectionStep(selectionStep === "city" ? "region" : "country");
  };

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <SafeAreaView className="flex-1 bg-[#0D1321]">
      <ScrollView className="flex-1 px-5 pt-4" showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-white text-xl font-bold tracking-widest">UMMAH</Text>
          <View className="flex-row space-x-3 gap-2">
            <TouchableOpacity className="bg-white/10 p-2 rounded-full">
              <Feather name="bell" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <LocationSelector
          selectedCity={selectedCity}
          selectedRegion={selectedRegion}
          selectedCountry={selectedCountry}
          onPress={openLocationModal}
        />
        {/* Soat + keyingi namoz */}
        <ClockWidget now={now} next={next} />

        {/* Loading */}
        {loading && !timings && (
          <ActivityIndicator size="large" color="#2A64F6" className="mt-6" />
        )}

        {/* Namoz vaqtlari */}
        {timings && !loading && (
          <PrayerTimesCard
            timings={timings}
            selectedCity={selectedCity}
            nextPrayerName={next?.name}
            now={now}
          />
        )}

        {/* Muqaddas qadamjolar */}
        <Text className="text-white font-bold mb-4 text-lg">Muqaddas qadamjolar</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-10">
          {PLACES.map((place) => (
            <TouchableOpacity key={place.id} className="mr-4 items-center">
              <Image
                source={{ uri: place.image }}
                className="w-28 h-28 rounded-2xl mb-2"
                resizeMode="cover"
              />
              <Text className="text-gray-300 text-sm font-medium">{place.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>

      {/* Modal */}
      <LocationModal
        visible={modalVisible}
        loading={loading}
        selectionStep={selectionStep}
        countries={countries}
        regions={regions}
        cities={cities}
        selectedCity={selectedCity}
        onClose={() => setModalVisible(false)}
        onBack={handleModalBack}
        onSelectCountry={handleSelectCountry}
        onSelectRegion={handleSelectRegion}
        onSelectCity={handleSelectCity}
      />
    </SafeAreaView>
  );
};

export default PrayerTimesScreen;