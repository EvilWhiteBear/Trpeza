import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Svg, { Circle, Path, Text as SvgText, TextPath, Defs } from 'react-native-svg';
import { useApp } from '@/hooks/useApp';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';
import { UNIT_LABELS, UnitId } from '@/constants/recipes';

const INGREDIENTS: { ru: string; sr: string; amount: number; unit: UnitId; price: number }[] = [
  { ru: 'Квашеная капуста', sr: 'Kiseli kupus',    amount: 1,   unit: 'kg',    price: 360 },
  { ru: 'Фарш мясной',      sr: 'Mleveno meso',    amount: 500, unit: 'g',     price: 980 },
  { ru: 'Рис',               sr: 'Pirinač',         amount: 100, unit: 'g',     price: 85  },
  { ru: 'Лук репчатый',      sr: 'Crni luk',        amount: 2,   unit: 'pcs',   price: 95  },
  { ru: 'Копч. грудинка',    sr: 'Suva slanina',    amount: 200, unit: 'g',     price: 620 },
  { ru: 'Копч. колбаса',     sr: 'Sušena kobasica', amount: 200, unit: 'g',     price: 750 },
  { ru: 'Томатная паста',    sr: 'Paradajz pasta',  amount: 2,   unit: 'tbsp',  price: 65  },
  { ru: 'Паприка',           sr: 'Aleva paprika',   amount: 2,   unit: 'tsp',   price: 45  },
  { ru: 'Лавровый лист',     sr: 'List lovora',     amount: 3,   unit: 'pcs',   price: 35  },
  { ru: 'Масло',             sr: 'Suncokretovo ulje', amount: 50, unit: 'ml',   price: 32  },
  { ru: 'Соль и перец',      sr: 'So i biber',      amount: 1,   unit: 'pinch', price: 22  },
];

const TOTAL = INGREDIENTS.reduce((s, i) => s + i.price, 0);

function DotLine() {
  return <Text style={styles.dotLine}>{'···············································'}</Text>;
}

interface Props {
  showStamp?: boolean;
}

export function InvoiceCard({ showStamp = true }: Props) {
  const { language, rateRUB } = useApp();
  const stampAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showStamp) {
      setTimeout(() => {
        Animated.spring(stampAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 120,
          friction: 7,
        }).start();
      }, 600);
    }
  }, [showStamp]);

  const stampScale = stampAnim.interpolate({
    inputRange: [0, 0.6, 0.85, 1],
    outputRange: [2.4, 0.88, 1.08, 1],
  });

  const invoiceTitle = language === 'ru' ? 'Список покупок' : 'Spisak za kupovinu';
  const items11 = language === 'ru' ? '11 позиций · Maxi' : '11 stavki · Maxi';
  const thankYou = language === 'ru' ? 'Благодарим за выбор Трапезы' : 'Hvala na izboru Trpeze';
  const totalRub = (TOTAL * rateRUB).toFixed(0);

  return (
    <View style={styles.invoiceOuter}>
      {/* Perforation top */}
      <View style={styles.perfRow}>
        {Array.from({ length: 22 }).map((_, i) => (
          <View key={i} style={styles.perfDot} />
        ))}
      </View>

      <View style={styles.invoiceInner}>
        {/* Header */}
        <View style={styles.invoiceHeader}>
          <View style={styles.logoRow}>
            <View style={styles.redDot} />
            <Text style={styles.logoText}>ТРАПЕЗА · ТРПЕЗА</Text>
          </View>
          <Text style={styles.invNumber}>ИНВ-2026-04-020</Text>
        </View>
        <View style={styles.invDateRow}>
          <Text style={styles.invDate}>24 апреля 2026 г.</Text>
          <Text style={styles.invDate}>JetBrains Mono</Text>
        </View>

        <View style={styles.divider} />

        {/* Column headers */}
        <View style={styles.colHeader}>
          <Text style={styles.colHeaderText}>№   {items11}</Text>
          <Text style={styles.colHeaderText}>ЦЕНА</Text>
        </View>

        <View style={styles.dividerThin} />

        {/* Items */}
        {INGREDIENTS.map((ing, i) => {
          const name = language === 'ru' ? ing.ru : ing.sr;
          const unitLabel = UNIT_LABELS[ing.unit][language];
          const amountStr = `${ing.amount} ${unitLabel}`;
          const num = (i + 1).toString().padStart(2, '0');
          const rubPrice = (ing.price * rateRUB).toFixed(0);
          return (
            <View key={i} style={styles.ingRow}>
              <Text style={styles.ingNum}>{num}</Text>
              <View style={{ width: 110 }}>
                <Text style={styles.ingName} numberOfLines={1}>{name}</Text>
                <Text style={styles.ingAmountInline}>{amountStr}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <DotLine />
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.ingPrice}>{ing.price} din</Text>
                <Text style={styles.ingPriceRub}>≈ {rubPrice} ₽</Text>
              </View>
            </View>
          );
        })}

        <View style={styles.dividerDouble} />

        {/* Total */}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>{language === 'ru' ? 'ИТОГО' : 'UKUPNO'}</Text>
          <View style={{ flex: 1 }}><DotLine /></View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.totalAmount}>{TOTAL} din</Text>
            <Text style={styles.totalRub}>≈ {totalRub} ₽</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Thank you */}
        <Text style={styles.thankYou}>{thankYou}</Text>

        {/* PAID stamp — placed below thank-you, centered */}
        {showStamp && (
          <View style={styles.stampWrapper}>
            <Animated.View style={[styles.stampContainer, { transform: [{ scale: stampScale }, { rotate: '8deg' }] }]}>
              <View style={styles.stampOuter}>
                <View style={styles.stampInner}>
                  <Text style={styles.stampText}>PAID</Text>
                  <Text style={styles.stampSub}>✓ ОПЛАЧЕНО</Text>
                </View>
              </View>
            </Animated.View>
          </View>
        )}
      </View>

      {/* Perforation bottom */}
      <View style={styles.perfRow}>
        {Array.from({ length: 22 }).map((_, i) => (
          <View key={i} style={styles.perfDot} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  invoiceOuter: {
    marginHorizontal: Spacing.md,
    backgroundColor: '#D4B896',
    borderRadius: Radius.lg,
    overflow: 'hidden',
  },
  perfRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 4,
    backgroundColor: '#C4A882',
  },
  perfDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.bg,
  },
  invoiceInner: {
    backgroundColor: '#EDE0C4',
    margin: 0,
    padding: Spacing.md,
    position: 'relative',
  },
  invoiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  redDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
  logoText: {
    fontFamily: Fonts.manropeBold,
    fontSize: 11,
    color: Colors.textDark,
    letterSpacing: 2,
  },
  invNumber: {
    fontFamily: Fonts.jetbrains,
    fontSize: 10,
    color: Colors.textMuted,
  },
  invDateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  invDate: {
    fontFamily: Fonts.manrope,
    fontSize: 10,
    color: Colors.textMuted,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderDark,
    marginVertical: 8,
  },
  dividerThin: {
    height: 0.5,
    backgroundColor: Colors.border,
    marginBottom: 6,
  },
  dividerDouble: {
    borderTopWidth: 1,
    borderTopColor: Colors.borderDark,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderDark,
    height: 4,
    marginVertical: 8,
    backgroundColor: 'transparent',
  },
  colHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  colHeaderText: {
    fontFamily: Fonts.manropeBold,
    fontSize: 9,
    color: Colors.textMuted,
    letterSpacing: 1.5,
  },
  ingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 4,
  },
  ingNum: {
    fontFamily: Fonts.jetbrains,
    fontSize: 10,
    color: Colors.textMuted,
    width: 20,
  },
  ingName: {
    fontFamily: Fonts.manropeMedium,
    fontSize: 11,
    color: Colors.textDark,
  },
  ingAmountInline: {
    fontFamily: Fonts.manrope,
    fontSize: 9,
    color: Colors.textMuted,
    marginTop: 1,
  },
  dotLine: {
    fontFamily: Fonts.jetbrains,
    fontSize: 10,
    color: Colors.textLight,
    letterSpacing: -2,
  },
  ingPrice: {
    fontFamily: Fonts.jetbrains,
    fontSize: 11,
    color: Colors.textDark,
  },
  ingPriceRub: {
    fontFamily: Fonts.manrope,
    fontSize: 9,
    color: Colors.textMuted,
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  totalLabel: {
    fontFamily: Fonts.manropeBold,
    fontSize: 12,
    color: Colors.textDark,
    letterSpacing: 1.5,
    width: 60,
  },
  totalAmount: {
    fontFamily: Fonts.playfair,
    fontSize: 20,
    color: Colors.textDark,
  },
  totalRub: {
    fontFamily: Fonts.manrope,
    fontSize: 10,
    color: Colors.textMuted,
  },
  thankYou: {
    fontFamily: Fonts.caveat,
    fontSize: 16,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 8,
  },
  stampWrapper: {
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 4,
    height: 88,
    justifyContent: 'center',
  },
  stampContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  stampOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: Colors.olive,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stampInner: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 1.5,
    borderColor: Colors.olive,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stampText: {
    fontFamily: Fonts.playfair,
    fontSize: 15,
    color: Colors.olive,
    letterSpacing: 2,
  },
  stampSub: {
    fontFamily: Fonts.manropeBold,
    fontSize: 7,
    color: Colors.olive,
    letterSpacing: 1,
  },
});
