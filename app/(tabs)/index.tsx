import React, { useState, useMemo, useRef, useCallback } from 'react';
import {
  View, Text, ScrollView, StyleSheet, FlatList,
  Dimensions, Animated, TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useApp } from '@/hooks/useApp';
import { DISHES, CATEGORIES_RU, CATEGORIES_SR } from '@/constants/dishes';
import { Colors, Fonts, Spacing } from '@/constants/theme';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { CurrencyPill } from '@/components/ui/CurrencyPill';
import { LocationPill } from '@/components/ui/LocationPill';
import { FilmGrain } from '@/components/ui/FilmGrain';
import { DishCard } from '@/components/feature/DishCard';
import { HeroCard } from '@/components/feature/HeroCard';
import { CategoryFilter } from '@/components/feature/CategoryFilter';
import { SearchBar } from '@/components/feature/SearchBar';
import { StoreCard, STORES } from '@/components/feature/StoreCard';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const NUM_COLS = SCREEN_WIDTH >= 768 ? 3 : 2;
const CARD_WIDTH = (SCREEN_WIDTH - Spacing.md * 2 - (NUM_COLS - 1) * Spacing.sm) / NUM_COLS;

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { language, addViewed } = useApp();
  const [selectedCat, setSelectedCat] = useState(language === 'ru' ? 'Все' : 'Sve');

  const cats = language === 'ru' ? CATEGORIES_RU : CATEGORIES_SR;

  // Sync category label on language change
  const prevSelectedRef = useRef(selectedCat);

  const filteredDishes = useMemo(() => {
    const isAll = selectedCat === 'Все' || selectedCat === 'Sve' || selectedCat === cats[0];
    if (isAll) return DISHES;
    return DISHES.filter(d => {
      const cat = language === 'ru' ? d.ru.cat : d.sr.cat;
      const dishCats = d.cats;
      // Try matching by category name or cats array
      const ruIdx = CATEGORIES_RU.indexOf(selectedCat);
      const srIdx = CATEGORIES_SR.indexOf(selectedCat);
      const idx = ruIdx >= 0 ? ruIdx : srIdx;
      if (idx >= 0) {
        const ruCat = CATEGORIES_RU[idx];
        const srCat = CATEGORIES_SR[idx];
        return dishCats.includes(ruCat) || dishCats.includes(srCat);
      }
      return dishCats.some(c => c === selectedCat) || cat === selectedCat;
    });
  }, [selectedCat, language, cats]);

  const handleDishPress = useCallback((id: string) => {
    addViewed(id);
    router.push(`/recipe/${id}`);
  }, [addViewed, router]);

  const handleCatSelect = (cat: string) => {
    setSelectedCat(cat);
  };

  const nearbyLabel = language === 'ru' ? 'Рядом с вами' : 'U vašoj blizini';
  const storesLabel = language === 'ru' ? 'Магазины' : 'Prodavnice';

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bg }}>
      <FilmGrain />
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
          <View>
            <View style={styles.logoRow}>
              <View style={styles.redDot} />
              <Text style={styles.logo}>{language === 'ru' ? 'ТРАПЕЗА' : 'TRPEZA'}</Text>
            </View>
            <Text style={styles.subtitle}>
              {language === 'ru' ? 'Балканский выпуск' : 'Balkansko izdanje'}
            </Text>
          </View>
          <LanguageToggle />
        </View>

        {/* Pills row */}
        <View style={styles.pillsRow}>
          <LocationPill />
          <CurrencyPill />
        </View>

        {/* Search */}
        <SearchBar onSelectDish={handleDishPress} />

        {/* Hero */}
        <HeroCard onPress={() => handleDishPress('gibanica')} />

        {/* Category filter */}
        <CategoryFilter selected={selectedCat} onSelect={handleCatSelect} />

        {/* Recipe grid */}
        <View style={styles.grid}>
          {filteredDishes.map((dish, i) => (
            <DishCard
              key={dish.id}
              dish={dish}
              onPress={() => handleDishPress(dish.id)}
              width={CARD_WIDTH}
            />
          ))}
        </View>

        {/* Nearby stores */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{storesLabel}</Text>
          <Text style={styles.sectionSub}>{nearbyLabel}</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: Spacing.md, gap: 12 }}
        >
          {STORES.map(store => (
            <StoreCard key={store.id} store={store} />
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: Spacing.md,
    paddingBottom: 12,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  redDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
    marginRight: 6,
  },
  logo: {
    fontFamily: Fonts.playfair,
    fontSize: 22,
    color: Colors.textDark,
  },
  logoDivider: {
    fontFamily: Fonts.playfair,
    fontSize: 20,
    color: Colors.textMuted,
  },
  logoLatin: {
    fontFamily: Fonts.playfairRegular,
    fontSize: 20,
    color: Colors.primary,
  },
  subtitle: {
    fontFamily: Fonts.manrope,
    fontSize: 9,
    color: Colors.textMuted,
    letterSpacing: 1.5,
    marginTop: 2,
  },
  pillsRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: Spacing.md,
    marginBottom: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
    marginTop: 8,
    marginBottom: Spacing.lg,
  },
  sectionHeader: {
    paddingHorizontal: Spacing.md,
    marginBottom: 10,
    marginTop: 4,
  },
  sectionTitle: {
    fontFamily: Fonts.playfair,
    fontSize: 20,
    color: Colors.textDark,
  },
  sectionSub: {
    fontFamily: Fonts.caveat,
    fontSize: 14,
    color: Colors.textMuted,
  },
});
