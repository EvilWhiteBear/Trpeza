import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Achievement } from '@/contexts/AppContext';
import { useApp } from '@/hooks/useApp';
import { Colors, Fonts, Radius } from '@/constants/theme';

const BADGE_COLORS: Record<string, string> = {
  first_recipe: '#C8893E',
  sarma_master: '#8B2635',
  gourmet: '#9B7B3F',
  polyglot: '#3F5944',
  speedster: '#A05C2E',
  explorer: '#7B6B9B',
};

interface Props { achievement: Achievement; }

export function AchievementBadge({ achievement }: Props) {
  const { language } = useApp();
  const title = language === 'ru' ? achievement.titleRu : achievement.titleSr;
  const hint = language === 'ru' ? achievement.hintRu : achievement.hintSr;
  const color = BADGE_COLORS[achievement.id] || Colors.primary;

  return (
    <View style={[styles.badge, !achievement.unlocked && styles.locked]}>
      <View style={[styles.iconCircle, { backgroundColor: achievement.unlocked ? color : Colors.border, shadowColor: achievement.unlocked ? color : 'transparent', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.5, shadowRadius: 6, elevation: achievement.unlocked ? 4 : 0 }]}>
        <Text style={[styles.icon, !achievement.unlocked && { opacity: 0.5 }]}>{achievement.icon}</Text>
      </View>
      <Text style={[styles.title, !achievement.unlocked && styles.titleLocked]} numberOfLines={1}>{title}</Text>
      {!achievement.unlocked && (
        <Text style={styles.hint} numberOfLines={2}>{hint}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    width: '30%',
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  locked: {
    opacity: 0.55,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  icon: {
    fontSize: 22,
  },
  title: {
    fontFamily: Fonts.manropeSemiBold,
    fontSize: 11,
    color: Colors.textDark,
    textAlign: 'center',
  },
  titleLocked: {
    color: Colors.textMuted,
  },
  hint: {
    fontFamily: Fonts.manrope,
    fontSize: 9,
    color: Colors.textLight,
    textAlign: 'center',
    marginTop: 2,
    lineHeight: 13,
  },
});
