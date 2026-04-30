import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useApp } from '@/hooks/useApp';
import { CATEGORIES_RU, CATEGORIES_SR } from '@/constants/dishes';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';

interface Props {
  selected: string;
  onSelect: (cat: string) => void;
}

export function CategoryFilter({ selected, onSelect }: Props) {
  const { language } = useApp();
  const cats = language === 'ru' ? CATEGORIES_RU : CATEGORIES_SR;
  const scrollRef = useRef<ScrollView>(null);

  return (
    <View style={styles.outer}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {cats.map((cat, i) => {
          const isSelected = selected === cat || (i === 0 && (selected === 'Все' || selected === 'Sve'));
          return (
            <TouchableOpacity
              key={cat}
              style={[styles.pill, isSelected && styles.pillActive]}
              onPress={() => onSelect(cat)}
              activeOpacity={0.75}
            >
              <Text style={[styles.pillText, isSelected && styles.pillTextActive]}>{cat}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    height: 52,
    justifyContent: 'center',
  },
  scrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    gap: 8,
  },
  pill: {
    height: 36,
    borderRadius: 18,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.bgDark,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pillActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  pillText: {
    fontFamily: Fonts.manropeMedium,
    fontSize: 12.5,
    color: Colors.textMuted,
  },
  pillTextActive: {
    color: Colors.bg,
    fontFamily: Fonts.manropeBold,
  },
});
