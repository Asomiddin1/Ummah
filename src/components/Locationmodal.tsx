import { Feather } from "@expo/vector-icons";
import React from "react";
import {
    ActivityIndicator,
    Modal,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

// ─── CountryList ──────────────────────────────────────────────────────────────
type CountryListProps = {
  countries: any[];
  onSelect: (country: any) => void;
};

const CountryList = ({ countries, onSelect }: CountryListProps) => (
  <>
    {countries.map((item) => (
      <TouchableOpacity
        key={item.id}
        className="py-4 border-b border-white/5 flex-row items-center"
        onPress={() => onSelect(item)}
      >
        <Text className="text-2xl mr-4">{item.flag_emoji}</Text>
        <Text className="text-white text-base font-medium">{item.name}</Text>
        <Feather name="chevron-right" size={20} color="#4B5563" style={{ marginLeft: "auto" }} />
      </TouchableOpacity>
    ))}
  </>
);

// ─── RegionList ───────────────────────────────────────────────────────────────
type RegionListProps = {
  regions: any[];
  onSelect: (region: any) => void;
};

const RegionList = ({ regions, onSelect }: RegionListProps) => (
  <>
    {regions.map((item) => (
      <TouchableOpacity
        key={item.id}
        className="py-4 border-b border-white/5 flex-row items-center"
        onPress={() => onSelect(item)}
      >
        <Text className="text-white text-base font-medium">{item.name}</Text>
        <Feather name="chevron-right" size={20} color="#4B5563" style={{ marginLeft: "auto" }} />
      </TouchableOpacity>
    ))}
  </>
);

// ─── CityList ─────────────────────────────────────────────────────────────────
type CityListProps = {
  cities: any[];
  selectedCity: any;
  onSelect: (city: any) => void;
};

const CityList = ({ cities, selectedCity, onSelect }: CityListProps) => (
  <>
    {cities.map((item) => (
      <TouchableOpacity
        key={item.id}
        className="py-4 border-b border-white/5 flex-row items-center"
        onPress={() => onSelect(item)}
      >
        <Text className="text-white text-base font-medium">{item.name}</Text>
        <Feather
          name="check-circle"
          size={18}
          color={selectedCity?.id === item.id ? "#2A64F6" : "transparent"}
          style={{ marginLeft: "auto" }}
        />
      </TouchableOpacity>
    ))}
  </>
);

// ─── LocationModal ────────────────────────────────────────────────────────────
type SelectionStep = "country" | "region" | "city";

type LocationModalProps = {
  visible: boolean;
  loading: boolean;
  selectionStep: SelectionStep;
  countries: any[];
  regions: any[];
  cities: any[];
  selectedCity: any;
  onClose: () => void;
  onBack: () => void;
  onSelectCountry: (country: any) => void;
  onSelectRegion: (region: any) => void;
  onSelectCity: (city: any) => void;
};

const STEP_TITLE: Record<SelectionStep, string> = {
  country: "Davlatni tanlang",
  region:  "Viloyatni tanlang",
  city:    "Shaharni tanlang",
};

const LocationModal = ({
  visible,
  loading,
  selectionStep,
  countries,
  regions,
  cities,
  selectedCity,
  onClose,
  onBack,
  onSelectCountry,
  onSelectRegion,
  onSelectCity,
}: LocationModalProps) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View className="flex-1 justify-end bg-black/60">
        <View className="bg-[#161D2F] rounded-t-3xl p-5 min-h-[50%] max-h-[85%]">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-5 pb-3 border-b border-white/10">
            {selectionStep !== "country" ? (
              <TouchableOpacity className="p-1" onPress={onBack}>
                <Feather name="arrow-left" size={24} color="white" />
              </TouchableOpacity>
            ) : (
              <View style={{ width: 32 }} />
            )}

            <Text className="text-white font-bold text-lg">
              {STEP_TITLE[selectionStep]}
            </Text>

            <TouchableOpacity
              className="p-1"
              onPress={() => selectedCity && onClose()}
            >
              <Feather
                name="x"
                size={24}
                color={selectedCity ? "white" : "#4B5563"}
              />
            </TouchableOpacity>
          </View>

          {/* Content */}
          {loading ? (
            <View className="flex-1 justify-center items-center py-10">
              <ActivityIndicator size="large" color="#2A64F6" />
              <Text className="text-gray-400 mt-4">Yuklanmoqda...</Text>
            </View>
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
            >
              {selectionStep === "country" && (
                <CountryList countries={countries} onSelect={onSelectCountry} />
              )}
              {selectionStep === "region" && (
                <RegionList regions={regions} onSelect={onSelectRegion} />
              )}
              {selectionStep === "city" && (
                <CityList
                  cities={cities}
                  selectedCity={selectedCity}
                  onSelect={onSelectCity}
                />
              )}
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default LocationModal;