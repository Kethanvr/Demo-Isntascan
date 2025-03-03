import { createContext, useContext, useState } from 'react';

const languages = {
  en: {
    name: 'English',
    dir: 'ltr',
    translations: {
      upload: 'Upload Image',
      search: 'Search Medicine',
      alternatives: 'Alternatives',
      sideEffects: 'Side Effects',
      warnings: 'Warnings',
      usage: 'Usage',
      scanHistory: 'Scan History',
      filters: 'Quick Filters',
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode',
      profile: 'Profile',
      settings: 'Settings',
      logout: 'Logout',
      brand: 'Brand Name',
      generic: 'Generic Name',
      price: 'Price',
      viewDetails: 'View Details',
      save: 'Save',
      download: 'Download',
      dragDrop: 'Drag & Drop your prescription or medicine image',
      or: 'OR',
      browseFile: 'Browse File',
    }
  },
  ta: {
    name: 'தமிழ்',
    dir: 'ltr',
    translations: {
      upload: 'படத்தை பதிவேற்றவும்',
      search: 'மருந்து தேடல்',
      alternatives: 'மாற்று மருந்துகள்',
      sideEffects: 'பக்க விளைவுகள்',
      warnings: 'எச்சரிக்கைகள்',
      usage: 'பயன்பாடு',
      scanHistory: 'ஸ்கேன் வரலாறு',
      filters: 'விரைவு வடிகட்டிகள்',
      darkMode: 'இருண்ட பயன்முறை',
      lightMode: 'ஒளி பயன்முறை',
      profile: 'சுயவிவரம்',
      settings: 'அமைப்புகள்',
      logout: 'வெளியேறு',
      brand: 'பிராண்ட் பெயர்',
      generic: 'பொது பெயர்',
      price: 'விலை',
      viewDetails: 'விவரங்களைக் காண்க',
      save: 'சேமி',
      download: 'பதிவிறக்கம்',
      dragDrop: 'உங்கள் மருந்து சீட்டு அல்லது மருந்து படத்தை இழுத்து விடவும்',
      or: 'அல்லது',
      browseFile: 'கோப்பைத் தேடு',
    }
  },
  te: {
    name: 'తెలుగు',
    dir: 'ltr',
    translations: {
      upload: 'చిత్రాన్ని అప్‌లోడ్ చేయండి',
      search: 'మందు వెతకండి',
      alternatives: 'ప్రత్యామ్నాయాలు',
      sideEffects: 'దుష్ప్రభావాలు',
      warnings: 'హెచ్చరికలు',
      usage: 'వాడుక',
      scanHistory: 'స్కాన్ చరిత్ర',
      filters: 'త్వరిత ఫిల్టర్లు',
      darkMode: 'డార్క్ మోడ్',
      lightMode: 'లైట్ మోడ్',
      profile: 'ప్రొఫైల్',
      settings: 'సెట్టింగ్‌లు',
      logout: 'లాగ్అవుట్',
      brand: 'బ్రాండ్ పేరు',
      generic: 'జెనెరిక్ పేరు',
      price: 'ధర',
      viewDetails: 'వివరాలను చూడండి',
      save: 'సేవ్ చేయండి',
      download: 'డౌన్‌లోడ్ చేయండి',
      dragDrop: 'మీ ప్రిస్క్రిప్షన్ లేదా మందు చిత్రాన్ని లాగి వదలండి',
      or: 'లేదా',
      browseFile: 'ఫైల్‌ను బ్రౌజ్ చేయండి',
    }
  },
  ml: {
    name: 'മലയാളം',
    dir: 'ltr',
    translations: {
      upload: 'ചിത്രം അപ്‌ലോഡ് ചെയ്യുക',
      search: 'മരുന്ന് തിരയുക',
      alternatives: 'ബദലുകൾ',
      sideEffects: 'പാർശ്വഫലങ്ങൾ',
      warnings: 'മുന്നറിയിപ്പുകൾ',
      usage: 'ഉപയോഗം',
      scanHistory: 'സ്കാൻ ചരിത്രം',
      filters: 'ദ്രുത ഫിൽട്ടറുകൾ',
      darkMode: 'ഇരുണ്ട മോഡ്',
      lightMode: 'ലൈറ്റ് മോഡ്',
      profile: 'പ്രൊഫൈൽ',
      settings: 'ക്രമീകരണങ്ങൾ',
      logout: 'പുറത്തുകടക്കുക',
      brand: 'ബ്രാൻഡ് നാമം',
      generic: 'ജനറിക് നാമം',
      price: 'വില',
      viewDetails: 'വിശദാംശങ്ങൾ കാണുക',
      save: 'സംരക്ഷിക്കുക',
      download: 'ഡൗൺലോഡ് ചെയ്യുക',
      dragDrop: 'നിങ്ങളുടെ കുറിപ്പടി അല്ലെങ്കിൽ മരുന്ന് ചിത്രം വലിച്ചിടുക',
      or: 'അല്ലെങ്കിൽ',
      browseFile: 'ഫയൽ ബ്രൗസ് ചെയ്യുക',
    }
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [currentLang, setCurrentLang] = useState('en');
  
  const changeLanguage = (langCode) => {
    if (languages[langCode]) {
      setCurrentLang(langCode);
      document.documentElement.setAttribute('dir', languages[langCode].dir);
    }
  };
  
  const t = (key) => {
    return languages[currentLang]?.translations[key] || languages.en.translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ 
      currentLang, 
      changeLanguage, 
      t, 
      languages,
      direction: languages[currentLang].dir 
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);