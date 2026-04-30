import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Heart, Clock } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '@/hooks/useApp';
import { Dish } from '@/constants/dishes';
import { Colors, Fonts, Radius, Spacing, Shadow } from '@/constants/theme';
import { MotifSvg } from './MotifSvg';

interface Props {
  dish: Dish;
  onPress: () => void;
  width?: number;
}

function formatTime(min: number): string {
  if (min < 60) return `${min} мин`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m > 0 ? `${h}ч ${m}м` : `${h}ч`;
}

export const DishCard = memo(({ dish, onPress, width }: Props) => {
  const { language, toggleSaved, isSaved } = useApp();
  const saved = isSaved(dish.id);
  const name = language === 'ru' ? dish.ru.name : dish.sr.name;
  const desc = language === 'ru' ? dish.ru.desc : dish.sr.desc;
  const cat = language === 'ru' ? dish.ru.cat : dish.sr.cat;
  const initial = name.charAt(0).toUpperCase();

  return (
    <TouchableOpacity style={[styles.card, width ? { width } : {}]} onPress={onPress} activeOpacity={0.9}>
      {/* Cover */}
      <LinearGradient
        colors={[dish.accent, dish.secondary]}
        style={styles.cover}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Motif */}
        <View style={styles.motifContainer}>
          <MotifSvg motif={dish.motif} size={56} color="rgba(255,255,255,0.15)" />
        </View>
        {/* Initial */}
        <Text style={styles.initial}>{initial}</Text>
        {/* Category */}
        <View style={styles.catPill}>
          <Text style={styles.catText} numberOfLines={1}>{cat}</Text>
        </View>
        {/* Time pill */}
        <View style={styles.timePill}>
          <Clock size={9} color={Colors.textMuted} />
          <Text style={styles.timeText}>{formatTime(dish.time)}</Text>
        </View>
        {/* Heart */}
        <TouchableOpacity style={styles.heartBtn} onPress={() => toggleSaved(dish.id)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Heart size={16} color={saved ? Colors.primary : Colors.white} fill={saved ? Colors.primary : 'none'} />
        </TouchableOpacity>
        {/* Origin tag */}
        <View style={[styles.originDot, { backgroundColor: dish.origin === 'ru' ? '#7B6B9B' : Colors.olive }]} />
      </LinearGradient>
      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        <Text style={styles.desc} numberOfLines={2}>{desc}</Text>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
    ...Shadow.sm,
  },
  cover: {
    width: '100%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  motifContainer: {
    position: 'absolute',
    bottom: 6,
    right: 6,
  },
  initial: {
    fontFamily: Fonts.playfair,
    fontSize: 52,
    color: 'rgba(255,255,255,0.88)',
    lineHeight: 60,
    includeFontPadding: false,
  },
  catPill: {
    position: 'absolute',
    top: 7,
    left: 7,
    backgroundColor: 'rgba(244,236,216,0.92)',
    borderRadius: Radius.full,
    paddingHorizontal: 7,
    paddingVertical: 3,
    maxWidth: '70%',
  },
  catText: {
    fontFamily: Fonts.manropeSemiBold,
    fontSize: 8.5,
    color: Colors.textDark,
    letterSpacing: 0.3,
  },
  timePill: {
    position: 'absolute',
    bottom: 7,
    left: 7,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(244,236,216,0.92)',
    borderRadius: Radius.full,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  timeText: {
    fontFamily: Fonts.jetbrains,
    fontSize: 9,
    color: Colors.textMuted,
  },
  heartBtn: {
    position: 'absolute',
    top: 7,
    right: 7,
  },
  originDot: {
    position: 'absolute',
    bottom: 7,
    right: 28,
    width: 6,
    height: 6,
    borderRadius: 3,
    opacity: 0.8,
  },
  info: {
    padding: Spacing.sm,
    paddingTop: 7,
  },
  name: {
    fontFamily: Fonts.playfair,
    fontSize: 14,
    color: Colors.textDark,
    marginBottom: 3,
  },
  desc: {
    fontFamily: Fonts.manrope,
    fontSize: 11,
    color: Colors.textMuted,
    lineHeight: 16,
  },
});
