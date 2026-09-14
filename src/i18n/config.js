import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ar from "./locales/ar.json";
import "./rtl.css";

const savedLanguage = localStorage.getItem("i18nextLng");
const initialLanguage = savedLanguage === "ar" ? "ar" : "en";

export const updateDocumentDirection = (lng) => {
  const dir = lng === "ar" ? "rtl" : "ltr";
  document.documentElement.dir = dir;
  document.documentElement.lang = lng;
};

// Set direction immediately before initial render
updateDocumentDirection(initialLanguage);

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: initialLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

i18n.on("languageChanged", (lng) => {
  localStorage.setItem("i18nextLng", lng);
  updateDocumentDirection(lng);
});

export default i18n;
