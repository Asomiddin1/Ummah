const BASE_URL = process.env.BASE_URL_API || "https://api.ummah.uz/api";

const HEADERS = {
  "Accept": "application/json",
  "Content-Type": "application/json",
  "Accept-Language": "uz" // API doim o'zbek tilida javob qaytaradi
};

// 1. Mamlakatlarni olish (GET)
export const getCountries = async () => {
  const response = await fetch(`${BASE_URL}/countries`, {
    method: "GET",
    headers: HEADERS,
  });
  if (!response.ok) throw new Error("Davlatlarni yuklashda xatolik");
  return response.json();
};

// 2. Viloyatlarni olish (POST)
export const getRegions = async (countryId: number) => {
  const response = await fetch(`${BASE_URL}/regions`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ country: countryId }),
  });
  if (!response.ok) throw new Error("Viloyatlarni yuklashda xatolik");
  return response.json();
};

// 3. Shaharlarni olish (POST)
export const getCities = async (regionId: number) => {
  const response = await fetch(`${BASE_URL}/cities`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ region: regionId }),
  });
  if (!response.ok) throw new Error("Shaharlarni yuklashda xatolik");
  return response.json();
};

// 4. Namoz vaqtlarini olish (POST)
export const getTimings = async (cityId: number) => {
  const response = await fetch(`${BASE_URL}/timings`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ city: cityId }),
  });
  if (!response.ok) throw new Error("Namoz vaqtlarini yuklashda xatolik");
  return response.json();
};