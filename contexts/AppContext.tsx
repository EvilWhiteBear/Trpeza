import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Language = 'ru' | 'sr';

export interface CityData {
  name: string;
  nameSr: string;
  lat: number;
  lng: number;
}

export const CITIES: CityData[] = [
  { name: 'Белград', nameSr: 'Beograd', lat: 44.8150, lng: 20.4587 },
  { name: 'Нови Сад', nameSr: 'Novi Sad', lat: 45.2671, lng: 19.8335 },
  { name: 'Ниш', nameSr: 'Niš', lat: 43.3209, lng: 21.8958 },
  { name: 'Крагуевац', nameSr: 'Kragujevac', lat: 44.0165, lng: 20.9114 },
];

export interface UserStats {
  viewed: number;
  saved: number;
  cooked: number;
  awards: number;
}

export interface Achievement {
  id: string;
  icon: string;
  titleRu: string;
  titleSr: string;
  hintRu: string;
  hintSr: string;
  unlocked: boolean;
}

interface AppContextType {
  language: Language;
  setLanguage: (l: Language) => void;
  toggleLanguage: () => void;
  
  rateRUB: number;
  rateLoading: boolean;
  rateLive: boolean;
  refreshRate: () => void;
  
  city: CityData;
  setCity: (c: CityData) => void;
  
  savedIds: string[];
  toggleSaved: (id: string) => void;
  isSaved: (id: string) => boolean;
  
  viewedIds: string[];
  addViewed: (id: string) => void;
  
  cookedIds: string[];
  addCooked: (id: string) => void;
  
  achievements: Achievement[];
  
  stats: UserStats;
  
  showCurrencyInRubles: boolean;
  setShowCurrencyInRubles: (v: boolean) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { id: 'first_recipe', icon: '✦', titleRu: 'Первая проба', titleSr: 'Prva proba', hintRu: 'Откройте любой рецепт', hintSr: 'Otvorite bilo koji recept', unlocked: false },
  { id: 'sarma_master', icon: '♛', titleRu: 'Sarma Master', titleSr: 'Sarma Master', hintRu: 'Откройте рецепт Сармы', hintSr: 'Otvorite recept Sarme', unlocked: false },
  { id: 'gourmet', icon: '★', titleRu: 'Гурман', titleSr: 'Gurman', hintRu: 'Сохраните 3 рецепта', hintSr: 'Sačuvajte 3 recepta', unlocked: false },
  { id: 'polyglot', icon: '❂', titleRu: 'Полиглот', titleSr: 'Poliglot', hintRu: 'Используйте оба языка', hintSr: 'Koristite oba jezika', unlocked: false },
  { id: 'speedster', icon: '⚡', titleRu: 'Скоростной', titleSr: 'Brzi kuvar', hintRu: 'Откройте рецепт до 30 мин', hintSr: 'Otvorite recept do 30 min', unlocked: false },
  { id: 'explorer', icon: '❊', titleRu: 'Исследователь', titleSr: 'Istraživač', hintRu: 'Откройте 5 рецептов', hintSr: 'Otvorite 5 recepata', unlocked: false },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ru');
  const [rateRUB, setRateRUB] = useState(0.76);
  const [rateLoading, setRateLoading] = useState(false);
  const [rateLive, setRateLive] = useState(false);
  const [city, setCityState] = useState<CityData>(CITIES[0]);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [viewedIds, setViewedIds] = useState<string[]>([]);
  const [cookedIds, setCookedIds] = useState<string[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);
  const [showCurrencyInRubles, setShowCurrencyInRubles] = useState(true);
  const [usedBothLangs, setUsedBothLangs] = useState(false);
  const [initialLang] = useState<Language>('ru');

  // Load persisted state
  useEffect(() => {
    const load = async () => {
      try {
        const [langStr, savedStr, viewedStr, cookedStr, achStr, cityStr, rateStr] = await Promise.all([
          AsyncStorage.getItem('language'),
          AsyncStorage.getItem('savedIds'),
          AsyncStorage.getItem('viewedIds'),
          AsyncStorage.getItem('cookedIds'),
          AsyncStorage.getItem('achievements'),
          AsyncStorage.getItem('city'),
          AsyncStorage.getItem('showRubles'),
        ]);
        if (langStr) setLanguageState(langStr as Language);
        if (savedStr) setSavedIds(JSON.parse(savedStr));
        if (viewedStr) setViewedIds(JSON.parse(viewedStr));
        if (cookedStr) setCookedIds(JSON.parse(cookedStr));
        if (achStr) setAchievements(JSON.parse(achStr));
        if (cityStr) setCityState(JSON.parse(cityStr));
        if (rateStr) setShowCurrencyInRubles(JSON.parse(rateStr));
      } catch {}
    };
    load();
    fetchRate();
  }, []);

  const fetchRate = useCallback(async () => {
    setRateLoading(true);
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/RSD');
      const data = await res.json();
      if (data?.rates?.RUB) {
        setRateRUB(parseFloat(data.rates.RUB.toFixed(4)));
        setRateLive(true);
      } else {
        setRateLive(false);
      }
    } catch {
      setRateLive(false);
    } finally {
      setRateLoading(false);
    }
  }, []);

  const unlockAchievement = useCallback((id: string) => {
    setAchievements(prev => {
      const updated = prev.map(a => a.id === id ? { ...a, unlocked: true } : a);
      AsyncStorage.setItem('achievements', JSON.stringify(updated)).catch(() => {});
      return updated;
    });
  }, []);

  const setLanguage = useCallback((l: Language) => {
    setLanguageState(l);
    AsyncStorage.setItem('language', l).catch(() => {});
    // Track bilingual usage
    if (l !== initialLang && !usedBothLangs) {
      setUsedBothLangs(true);
      unlockAchievement('polyglot');
    }
  }, [initialLang, usedBothLangs, unlockAchievement]);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'ru' ? 'sr' : 'ru');
  }, [language, setLanguage]);

  const setCity = useCallback((c: CityData) => {
    setCityState(c);
    AsyncStorage.setItem('city', JSON.stringify(c)).catch(() => {});
  }, []);

  const toggleSaved = useCallback((id: string) => {
    setSavedIds(prev => {
      const next = prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id];
      AsyncStorage.setItem('savedIds', JSON.stringify(next)).catch(() => {});
      if (next.length >= 3) unlockAchievement('gourmet');
      return next;
    });
  }, [unlockAchievement]);

  const isSaved = useCallback((id: string) => savedIds.includes(id), [savedIds]);

  const addViewed = useCallback((id: string) => {
    setViewedIds(prev => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      AsyncStorage.setItem('viewedIds', JSON.stringify(next)).catch(() => {});
      unlockAchievement('first_recipe');
      if (id === 'sarma') unlockAchievement('sarma_master');
      if (next.length >= 5) unlockAchievement('explorer');
      return next;
    });
  }, [unlockAchievement]);

  const addCooked = useCallback((id: string) => {
    setCookedIds(prev => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      AsyncStorage.setItem('cookedIds', JSON.stringify(next)).catch(() => {});
      return next;
    });
  }, []);

  const stats: UserStats = {
    viewed: viewedIds.length,
    saved: savedIds.length,
    cooked: cookedIds.length,
    awards: achievements.filter(a => a.unlocked).length,
  };

  const refreshRate = useCallback(() => fetchRate(), [fetchRate]);

  return (
    <AppContext.Provider value={{
      language, setLanguage, toggleLanguage,
      rateRUB, rateLoading, rateLive, refreshRate,
      city, setCity,
      savedIds, toggleSaved, isSaved,
      viewedIds, addViewed,
      cookedIds, addCooked,
      achievements,
      stats,
      showCurrencyInRubles, setShowCurrencyInRubles,
    }}>
      {children}
    </AppContext.Provider>
  );
}
