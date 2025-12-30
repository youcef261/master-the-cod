import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const translations: Record<string, Record<Language, string>> = {
  "nav.home": { en: "Home", ar: "الرئيسية" },
  "nav.languages": { en: "Languages", ar: "لغات البرمجة" },
  "nav.tutor": { en: "AI Tutor", ar: "المعلم الذكي" },
  "hero.title": { en: "Master the Code", ar: "أتقن البرمجة" },
  "hero.subtitle": { en: "Explore the universe of programming languages with comprehensive guides, history, and AI-powered assistance.", ar: "استكشف عالم لغات البرمجة مع أدلة شاملة، تاريخ، ومساعدة ذكية." },
  "hero.cta": { en: "Start Learning", ar: "ابدأ التعلم" },
  "stats.label": { en: "Global Statistics", ar: "إحصائيات عالمية" },
  "featured.title": { en: "Featured Languages", ar: "لغات مميزة" },
  "footer.credit": { en: "Designed & Developed by Boukhalfa Mohamed Youcef", ar: "تصميم وتطوير بوخالفة محمد يوسف" },
  "tutor.placeholder": { en: "Ask me anything about code...", ar: "اسألني أي شيء عن البرمجة..." },
  "tutor.send": { en: "Send", ar: "إرسال" },
  "tutor.thinking": { en: "Thinking...", ar: "يفكر..." },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  };

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  const dir = language === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [dir, language]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
