import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useApp } from '@/hooks/useApp';
import { RecipeData } from '@/constants/recipes';
import { Colors, Fonts, Spacing } from '@/constants/theme';
import { StepTimer } from './StepTimer';

interface Props {
  recipe: RecipeData;
}

export function RecipeSteps({ recipe }: Props) {
  const { language } = useApp();

  return (
    <View style={styles.container}>
      {recipe.steps.map((step, i) => {
        const loc = language === 'ru' ? step.ru : step.sr;
        return (
          <View key={i} style={styles.step}>
            <View style={styles.numberCircle}>
              <Text style={styles.number}>{i + 1}</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.title}>{loc.title}</Text>
              <Text style={styles.desc}>{loc.body}</Text>
              {step.timer != null && step.timer > 0 && (
                <StepTimer totalSeconds={step.timer} label={loc.title} />
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: Spacing.md },
  step: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: Spacing.lg,
  },
  numberCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
    flexShrink: 0,
  },
  number: {
    fontFamily: Fonts.playfair,
    fontSize: 15,
    color: Colors.bg,
  },
  content: { flex: 1 },
  title: {
    fontFamily: Fonts.playfair,
    fontSize: 16,
    color: Colors.textDark,
    marginBottom: 5,
  },
  desc: {
    fontFamily: Fonts.manrope,
    fontSize: 13,
    color: Colors.textMuted,
    lineHeight: 20,
  },
});
