import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';
import { useApp } from '@/hooks/useApp';
import { RecipeData, formatAmount } from '@/constants/recipes';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';

interface Props {
  recipe: RecipeData;
  servings: number;
}

export function RecipeIngredients({ recipe, servings }: Props) {
  const { language, rateRUB, showCurrencyInRubles } = useApp();
  const [checked, setChecked] = useState<boolean[]>(new Array(recipe.ingredients.length).fill(false));

  const toggle = (i: number) => {
    setChecked(prev => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  const boughtCount = checked.filter(Boolean).length;
  const total = recipe.ingredients.length;
  const boughtLabel = language === 'ru'
    ? `Куплено ${boughtCount} из ${total}`
    : `Kupljeno ${boughtCount} od ${total}`;

  return (
    <View style={styles.container}>
      {/* Progress */}
      <View style={styles.progressRow}>
        <Text style={styles.progressLabel}>{boughtLabel}</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(boughtCount / total) * 100}%` }]} />
        </View>
      </View>

      {recipe.ingredients.map((ing, i) => {
        const name = language === 'ru' ? ing.ru : ing.sr;
        const rawAmount = ing.amounts[servings] ?? ing.amounts[recipe.baseServings];
        const amountStr = formatAmount(rawAmount, ing.unit, language);
        const basePrice = ing.price ?? 0;
        const factor = servings / recipe.baseServings;
        const price = Math.round(basePrice * factor);
        const priceRub = (price * rateRUB).toFixed(0);

        return (
          <TouchableOpacity key={ing.id} style={styles.row} onPress={() => toggle(i)} activeOpacity={0.75}>
            <View style={[styles.checkbox, checked[i] && styles.checkboxChecked]}>
              {checked[i] && <Check size={12} color={Colors.bg} strokeWidth={3} />}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.ingName, checked[i] && styles.strikethrough]}>{name}</Text>
              <Text style={styles.amount}>{amountStr}</Text>
            </View>
            {basePrice > 0 && (
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.price}>{price} din</Text>
                {showCurrencyInRubles && <Text style={styles.priceRub}>≈ {priceRub} ₽</Text>}
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: Spacing.md },
  progressRow: { marginBottom: Spacing.md },
  progressLabel: { fontFamily: Fonts.manropeMedium, fontSize: 12, color: Colors.textMuted, marginBottom: 6 },
  progressBar: { height: 4, backgroundColor: Colors.border, borderRadius: 2 },
  progressFill: { height: 4, backgroundColor: Colors.olive, borderRadius: 2 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: { backgroundColor: Colors.olive, borderColor: Colors.olive },
  ingName: { fontFamily: Fonts.manropeMedium, fontSize: 13, color: Colors.textDark },
  strikethrough: { textDecorationLine: 'line-through', color: Colors.textMuted },
  amount: { fontFamily: Fonts.manrope, fontSize: 11, color: Colors.textMuted, marginTop: 2 },
  price: { fontFamily: Fonts.jetbrains, fontSize: 12, color: Colors.textDark },
  priceRub: { fontFamily: Fonts.manrope, fontSize: 10, color: Colors.textMuted },
});
