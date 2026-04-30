import React, { useState, useRef } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Dimensions, Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Heart, Clock, ChefHat, Flame, ShoppingCart } from 'lucide-react-native';
import { useApp } from '@/hooks/useApp';
import { DISHES } from '@/constants/dishes';
import { Colors, Fonts, Spacing, Radius, Shadow } from '@/constants/theme';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { FilmGrain } from '@/components/ui/FilmGrain';
import { MotifSvg } from '@/components/feature/MotifSvg';
import { RecipeIngredients } from '@/components/feature/RecipeIngredients';
import { RecipeSteps } from '@/components/feature/RecipeSteps';
import { RECIPES, FULL_RECIPE_IDS } from '@/constants/recipes';
import { DishCard } from '@/components/feature/DishCard';
import { useRouter as useRtr } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type TabType = 'ingredients' | 'steps';

export default function RecipeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { language, toggleSaved, isSaved, addViewed } = useApp();

  const dish = DISHES.find(d => d.id === id) || DISHES[0];
  const hasFullRecipe = FULL_RECIPE_IDS.has(id ?? '');
  const recipeData = hasFullRecipe ? RECIPES[id!] : null;
  const isSarma = id === 'sarma';
  const saved = isSaved(dish.id);

  const [servings, setServings] = useState(recipeData?.baseServings ?? 4);
  const [activeTab, setActiveTab] = useState<TabType>('ingredients');

  const name = language === 'ru' ? dish.ru.name : dish.sr.name;
  const cat = language === 'ru' ? dish.ru.cat : dish.sr.cat;
  const desc = language === 'ru' ? dish.ru.desc : dish.sr.desc;
  const tagline = dish.origin === 'ru'
    ? (language === 'ru' ? 'Русская классика' : 'Ruska klasika')
    : (language === 'ru' ? 'Балканская классика' : 'Balkanska klasika');
  const diffLabels = language === 'ru' ? ['Лёгкое', 'Среднее', 'Сложное'] : ['Lako', 'Srednje', 'Teško'];

  // Related dishes
  const related = DISHES.filter(d => d.id !== dish.id && d.cats.some(c => dish.cats.includes(c))).slice(0, 10);

  const cartLabel = language === 'ru' ? 'В корзину' : 'U korpu';
  const servingsLabel = language === 'ru' ? 'Порции' : 'Porcije';
  const descLabel = language === 'ru' ? 'О блюде' : 'O jelu';
  const ingTab = language === 'ru' ? 'Ингредиенты' : 'Sastojci';
  const stepsTab = language === 'ru' ? 'Приготовление' : 'Priprema';
  const relatedLabel = language === 'ru' ? 'Похожие блюда' : 'Slična jela';
  const comingSoonTitle = language === 'ru' ? '· · ·' : '· · ·';
  const comingSoonText = language === 'ru'
    ? 'Полный рецепт дорабатывается нашим шеф-поваром\nи появится в следующем выпуске'
    : 'Pun recept priprema naš šef-kuvar\ni pojaviće se u sledećem broju';

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bg }}>
      <FilmGrain />
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: isSarma ? 100 : 32 }}>

        {/* Hero Cover */}
        <LinearGradient
          colors={[dish.accent, dish.secondary, '#180800']}
          style={[styles.hero, { paddingTop: insets.top }]}
          start={{ x: 0.1, y: 0 }}
          end={{ x: 0.9, y: 1 }}
        >
          <View style={styles.bgMotif}>
            <MotifSvg motif={dish.motif} size={180} color="rgba(255,255,255,0.08)" />
          </View>

          {/* Nav */}
          <View style={styles.nav}>
            <TouchableOpacity style={styles.navBtn} onPress={() => router.back()}>
              <ArrowLeft size={20} color={Colors.white} />
            </TouchableOpacity>
            <View style={{ flex: 1 }} />
            <LanguageToggle />
            <TouchableOpacity style={styles.navBtn} onPress={() => toggleSaved(dish.id)}>
              <Heart size={20} color={saved ? Colors.gold : Colors.white} fill={saved ? Colors.gold : 'none'} />
            </TouchableOpacity>
          </View>

          {/* Category */}
          <View style={styles.catPill}>
            <Text style={styles.catPillText}>{cat}</Text>
          </View>

          {/* Name */}
          <Text style={styles.heroName}>{name}</Text>
          <Text style={styles.heroTagline}>{tagline}</Text>

          {/* Stats bottom */}
          <View style={styles.heroStats}>
            <View style={styles.heroStat}>
              <Clock size={14} color="rgba(255,255,255,0.7)" />
              <Text style={styles.heroStatText}>{dish.time} мин</Text>
            </View>
            <View style={styles.heroDot} />
            <Text style={styles.heroStatText}>{dish.cal} ккал</Text>
            <View style={styles.heroDot} />
            <View style={styles.heroStat}>
              <ChefHat size={14} color="rgba(255,255,255,0.7)" />
              <Text style={styles.heroStatText}>{diffLabels[dish.diff]}</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {[
            { label: language === 'ru' ? 'Время' : 'Vreme', value: `${dish.time}${language === 'ru' ? 'мин' : 'min'}` },
            { label: language === 'ru' ? 'Порции' : 'Porcije', value: `${servings}` },
            { label: language === 'ru' ? 'Сложность' : 'Težina', value: diffLabels[dish.diff] },
            { label: language === 'ru' ? 'Калории' : 'Kalorije', value: `${dish.cal}` },
          ].map((stat, i) => (
            <View key={i} style={styles.statCard}>
              <Text style={styles.statValue} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.7}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{descLabel}</Text>
          <Text style={styles.description}>{desc}</Text>
        </View>

        {/* Full recipe content (Sarma + 5 others) */}
        {hasFullRecipe && recipeData ? (
          <>
            {/* Servings selector */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{servingsLabel}</Text>
              <View style={styles.servingsRow}>
                {[2, recipeData.baseServings, 6, 8].filter((v, i, a) => a.indexOf(v) === i).map(s => (
                  <TouchableOpacity
                    key={s}
                    style={[styles.servingPill, servings === s && styles.servingPillActive]}
                    onPress={() => setServings(s)}
                  >
                    <Text style={[styles.servingText, servings === s && styles.servingTextActive]}>{s}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Tabs */}
            <View style={styles.tabs}>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'ingredients' && styles.tabActive]}
                onPress={() => setActiveTab('ingredients')}
              >
                <Text style={[styles.tabText, activeTab === 'ingredients' && styles.tabTextActive]}>{ingTab}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'steps' && styles.tabActive]}
                onPress={() => setActiveTab('steps')}
              >
                <Text style={[styles.tabText, activeTab === 'steps' && styles.tabTextActive]}>{stepsTab}</Text>
              </TouchableOpacity>
            </View>

            {activeTab === 'ingredients'
              ? <RecipeIngredients recipe={recipeData} servings={servings} />
              : <RecipeSteps recipe={recipeData} />
            }
          </>
        ) : (
          /* Coming Soon for other dishes */
          <View style={styles.comingSoon}>
            <Text style={styles.comingSoonDots}>{comingSoonTitle}</Text>
            <Text style={styles.comingSoonText}>{comingSoonText}</Text>
          </View>
        )}

        {/* Related dishes */}
        <View style={[styles.sectionHeader, { marginTop: 32 }]}>
          <Text style={styles.sectionTitle}>{relatedLabel}</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: Spacing.md, gap: 10 }}
        >
          {related.map(d => (
            <DishCard
              key={d.id}
              dish={d}
              onPress={() => {
                addViewed(d.id);
                router.replace(`/recipe/${d.id}`);
              }}
              width={150}
            />
          ))}
        </ScrollView>
      </ScrollView>

      {/* Floating cart button (Sarma only — cart is pre-filled with Sarma ingredients) */}
      {isSarma && (
        <View style={[styles.floatBar, { paddingBottom: insets.bottom + 12 }]}>
          <TouchableOpacity
            style={styles.floatBtn}
            onPress={() => router.push('/(tabs)/cart')}
            activeOpacity={0.85}
          >
            <ShoppingCart size={18} color={Colors.bg} />
            <Text style={styles.floatBtnText}>{cartLabel}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    width: '100%',
    minHeight: SCREEN_WIDTH * 0.9,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.lg,
    justifyContent: 'flex-end',
  },
  bgMotif: {
    position: 'absolute',
    right: -10,
    top: 80,
    opacity: 0.8,
  },
  nav: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: Spacing.md,
    paddingTop: 0,
  },
  navBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  catPill: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(244,236,216,0.2)',
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 8,
  },
  catPillText: {
    fontFamily: Fonts.manropeSemiBold,
    fontSize: 10,
    color: Colors.white,
    letterSpacing: 1.5,
  },
  heroName: {
    fontFamily: Fonts.playfair,
    fontSize: 52,
    color: Colors.white,
    lineHeight: 58,
    includeFontPadding: false,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 2, height: 3 },
    textShadowRadius: 8,
  },
  heroTagline: {
    fontFamily: Fonts.caveat,
    fontSize: 18,
    color: 'rgba(255,255,255,0.75)',
    marginBottom: 14,
    marginTop: 4,
  },
  heroStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  heroStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  heroDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  heroStatText: {
    fontFamily: Fonts.manrope,
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.md,
    gap: 8,
    marginTop: 16,
    marginBottom: 4,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 10,
    alignItems: 'center',
    ...Shadow.sm,
  },
  statValue: {
    fontFamily: Fonts.playfair,
    fontSize: 16,
    color: Colors.textDark,
    marginBottom: 2,
  },
  statLabel: {
    fontFamily: Fonts.manrope,
    fontSize: 9,
    color: Colors.textMuted,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: Spacing.md,
    marginTop: 20,
    marginBottom: 4,
  },
  sectionHeader: {
    paddingHorizontal: Spacing.md,
    marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: Fonts.playfair,
    fontSize: 20,
    color: Colors.textDark,
    marginBottom: 8,
  },
  description: {
    fontFamily: Fonts.manrope,
    fontSize: 14,
    color: Colors.textMuted,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  servingsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  servingPill: {
    width: 48,
    height: 44,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.bgDark,
  },
  servingPillActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  servingText: {
    fontFamily: Fonts.manropeBold,
    fontSize: 16,
    color: Colors.textMuted,
  },
  servingTextActive: {
    color: Colors.white,
  },
  tabs: {
    flexDirection: 'row',
    marginHorizontal: Spacing.md,
    marginTop: 20,
    marginBottom: 16,
    borderRadius: Radius.md,
    backgroundColor: Colors.bgDark,
    padding: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: Radius.sm,
  },
  tabActive: {
    backgroundColor: Colors.bg,
    ...Shadow.sm,
  },
  tabText: {
    fontFamily: Fonts.manropeSemiBold,
    fontSize: 13,
    color: Colors.textMuted,
  },
  tabTextActive: {
    color: Colors.textDark,
  },
  comingSoon: {
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: 40,
  },
  comingSoonDots: {
    fontFamily: Fonts.playfair,
    fontSize: 36,
    color: Colors.textLight,
    marginBottom: 16,
    letterSpacing: 8,
  },
  comingSoonText: {
    fontFamily: Fonts.manrope,
    fontSize: 14,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
    fontStyle: 'italic',
  },
  floatBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.md,
    paddingTop: 12,
    backgroundColor: Colors.bg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  floatBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    paddingVertical: 15,
  },
  floatBtnText: {
    fontFamily: Fonts.manropeBold,
    fontSize: 15,
    color: Colors.bg,
  },
});
