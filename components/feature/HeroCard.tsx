import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Clock, ChefHat, ArrowRight } from 'lucide-react-native';
import { useApp } from '@/hooks/useApp';
import { DISHES } from '@/constants/dishes';
import { Colors, Fonts, Spacing, Radius, Shadow } from '@/constants/theme';
import { MotifSvg } from './MotifSvg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Props { onPress: () => void; }

const HERO_DISH_ID = 'gibanica';

export function HeroCard({ onPress }: Props) {
  const { language } = useApp();
  const dish = DISHES.find(d => d.id === HERO_DISH_ID) || DISHES[0];
  const name = language === 'ru' ? dish.ru.name : dish.sr.name;
  const tagline = language === 'ru' ? 'Балканская классика · Сербский пирог' : 'Balkanska klasika · Srpska pita';
  const openBtn = language === 'ru' ? 'Открыть рецепт' : 'Otvori recept';
  const weekRecipe = language === 'ru' ? 'РЕЦЕПТ НЕДЕЛИ' : 'RECEPT NEDELJE';

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.95} style={styles.container}>
      <LinearGradient
        colors={[dish.accent, dish.secondary, '#1A0A00']}
        style={styles.gradient}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
      >
        {/* Decorative motif large */}
        <View style={styles.bgMotif}>
          <MotifSvg motif={dish.motif} size={200} color="rgba(255,255,255,0.08)" />
        </View>

        {/* Top row */}
        <View style={styles.topRow}>
          <Text style={styles.weekLabel}>{weekRecipe}</Text>
          <Text style={styles.issueNum}>№ 04 · апрель 2026</Text>
        </View>

        {/* Main name */}
        <View style={styles.nameArea}>
          <Text style={styles.dishName}>{name}</Text>
          <Text style={styles.tagline}>{tagline}</Text>
        </View>

        {/* Bottom bar */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.55)']}
          style={styles.bottomBar}
        >
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Clock size={13} color="rgba(255,255,255,0.7)" />
              <Text style={styles.metaText}>{dish.time} мин</Text>
            </View>
            <View style={styles.metaDot} />
            <View style={styles.metaItem}>
              <ChefHat size={13} color="rgba(255,255,255,0.7)" />
              <Text style={styles.metaText}>{['Лёгкое', 'Среднее', 'Сложное'][dish.diff]}</Text>
            </View>
            <View style={styles.metaDot} />
            <Text style={styles.metaText}>{dish.cal} ккал</Text>
          </View>
          <TouchableOpacity style={styles.openBtn} onPress={onPress} activeOpacity={0.85}>
            <Text style={styles.openBtnText}>{openBtn}</Text>
            <ArrowRight size={14} color={Colors.textDark} />
          </TouchableOpacity>
        </LinearGradient>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    ...Shadow.lg,
  },
  gradient: {
    width: '100%',
    height: SCREEN_WIDTH * 0.85,
    justifyContent: 'space-between',
  },
  bgMotif: {
    position: 'absolute',
    right: -20,
    top: SCREEN_WIDTH * 0.1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    paddingTop: Spacing.lg,
  },
  weekLabel: {
    fontFamily: Fonts.manropeSemiBold,
    fontSize: 9,
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 2.5,
  },
  issueNum: {
    fontFamily: Fonts.jetbrains,
    fontSize: 10,
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 1,
  },
  nameArea: {
    paddingHorizontal: Spacing.md,
    flex: 1,
    justifyContent: 'center',
  },
  dishName: {
    fontFamily: Fonts.playfair,
    fontSize: 56,
    color: Colors.white,
    lineHeight: 60,
    includeFontPadding: false,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 2, height: 3 },
    textShadowRadius: 8,
  },
  tagline: {
    fontFamily: Fonts.caveat,
    fontSize: 17,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  bottomBar: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
    paddingTop: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  metaText: {
    fontFamily: Fonts.manrope,
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  openBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.gold,
    borderRadius: Radius.full,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  openBtnText: {
    fontFamily: Fonts.manropeBold,
    fontSize: 12,
    color: Colors.textDark,
  },
});
