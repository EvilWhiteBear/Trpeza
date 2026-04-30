import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Animated, Linking, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Navigation, Star, Plus } from 'lucide-react-native';
import { useApp } from '@/hooks/useApp';
import { Colors, Fonts, Spacing, Radius, Shadow } from '@/constants/theme';
import { FilmGrain } from '@/components/ui/FilmGrain';
import { CurrencyPill } from '@/components/ui/CurrencyPill';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { InvoiceCard } from '@/components/feature/InvoiceCard';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const STORE_TOTALS = [
  {
    id: 'maxi', color: '#E30613', letter: 'M',
    nameRu: 'Maxi', nameSr: 'Maxi',
    addressRu: 'Bulevar kralja Aleksandra 86', addressSr: 'Bulevar kralja Aleksandra 86',
    closingRu: 'до 22:00', closingSr: 'do 22:00',
    total: 3089,
    lat: 44.8037, lng: 20.4783,
  },
  {
    id: 'idea', color: '#005CA9', letter: 'i',
    nameRu: 'IDEA', nameSr: 'IDEA',
    addressRu: 'Vojvode Stepe 12', addressSr: 'Vojvode Stepe 12',
    closingRu: 'до 21:00', closingSr: 'do 21:00',
    total: 2940,
    lat: 44.7961, lng: 20.4942,
  },
  {
    id: 'lidl', color: '#0050AA', letter: 'L',
    nameRu: 'Lidl', nameSr: 'Lidl',
    addressRu: 'Autoput za Zagreb 2', addressSr: 'Autoput za Zagreb 2',
    closingRu: 'до 22:00', closingSr: 'do 22:00',
    total: 2780,
    lat: 44.8121, lng: 20.3721,
  },
];
const CHEAPEST_ID = 'lidl';

function BestPriceStamp({ visible }: { visible: boolean }) {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 100,
          friction: 6,
        }).start();
      }, 300);
    }
  }, [visible]);

  const scale = scaleAnim.interpolate({
    inputRange: [0, 0.55, 0.8, 1],
    outputRange: [2.4, 0.92, 1.05, 1],
  });

  if (!visible) return null;

  return (
    <Animated.View style={[styles.stampWrap, { transform: [{ scale }, { rotate: '-12deg' }] }]}>
      <View style={styles.stampOuter}>
        <View style={styles.stampInner}>
          <Star size={10} color={Colors.olive} fill={Colors.olive} />
          <Text style={styles.stampMain}>BEST{'\n'}PRICE</Text>
          <Text style={styles.stampSub}>★ TRPEZA ★</Text>
        </View>
      </View>
    </Animated.View>
  );
}

export default function CartScreen() {
  const insets = useSafeAreaInsets();
  const { language, rateRUB } = useApp();
  const [selectedStore, setSelectedStore] = useState<string | null>(null);

  const sorted = [...STORE_TOTALS].sort((a, b) => a.total - b.total);
  const minTotal = sorted[0].total;

  const invoiceLabel = language === 'ru' ? 'ИНВОЙС' : 'INVOICE';
  const titleLabel = language === 'ru' ? 'Список покупок' : 'Spisak za kupovinu';
  const subtitleLabel = language === 'ru' ? 'Ингредиенты для Сармы' : 'Sastojci za Sarmu';
  const compareLabel = language === 'ru' ? 'Сравнение цен' : 'Poređenje cena';
  const routeLabel = language === 'ru' ? 'Построить маршрут' : 'Pokreni navigaciju';
  const cheapestLabel = language === 'ru' ? 'Дешевле всего' : 'Najjeftinije';
  const selectLabel = language === 'ru' ? 'Выбрать магазин' : 'Izaberi prodavnicu';

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bg }}>
      <FilmGrain />
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>

        {/* Header */}
        <LinearGradient
          colors={[Colors.bgDark, Colors.bg]}
          style={[styles.header, { paddingTop: insets.top + 12 }]}
        >
          <View>
            <Text style={styles.headerLabel}>{invoiceLabel} · ИНВ-2026-04-020</Text>
            <Text style={styles.headerTitle}>{titleLabel}</Text>
            <Text style={styles.headerSub}>{subtitleLabel}</Text>
          </View>
          <LanguageToggle />
        </LinearGradient>

        {/* Rate pill */}
        <View style={styles.ratePillRow}>
          <CurrencyPill />
        </View>

        {/* Invoice card */}
        <View style={{ marginBottom: Spacing.lg }}>
          <InvoiceCard showStamp />
        </View>

        {/* Store comparison */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{compareLabel}</Text>
          <Text style={styles.sectionSub}>{cheapestLabel}: Lidl</Text>
        </View>

        {sorted.map(store => {
          const isCheapest = store.total === minTotal;
          const diff = store.total - minTotal;
          const isSelected = selectedStore === store.id;
          const name = language === 'ru' ? store.nameRu : store.nameSr;
          const address = language === 'ru' ? store.addressRu : store.addressSr;
          const closing = language === 'ru' ? store.closingRu : store.closingSr;
          const totalRub = (store.total * rateRUB).toFixed(0);

          return (
            <TouchableOpacity
              key={store.id}
              style={[
                styles.storeCard,
                isSelected && { borderColor: store.color, borderWidth: 2 },
              ]}
              onPress={() => setSelectedStore(isSelected ? null : store.id)}
              activeOpacity={0.85}
            >
              <View style={styles.storeRow}>
                {/* Monogram */}
                <View style={[styles.monogram, { backgroundColor: store.color }]}>
                  <Text style={styles.monogramText}>{store.letter}</Text>
                </View>

                {/* Info */}
                <View style={{ flex: 1 }}>
                  <Text style={styles.storeName}>{name}</Text>
                  <Text style={styles.storeAddress} numberOfLines={1}>{address}</Text>
                  <Text style={styles.storeClosing}>{closing}</Text>
                </View>

                {/* Price */}
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.storeTotal}>{store.total} din</Text>
                  <Text style={styles.storeTotalRub}>≈ {totalRub} ₽</Text>
                  {isCheapest ? (
                    <View style={styles.bestBadge}>
                      <Star size={10} color={Colors.white} fill={Colors.white} />
                      <Text style={styles.bestBadgeText}>{language === 'ru' ? 'Выгодно' : 'Povoljno'}</Text>
                    </View>
                  ) : (
                    <View style={styles.diffBadge}>
                      <Plus size={9} color={Colors.white} />
                      <Text style={styles.diffBadgeText}>{diff} din</Text>
                    </View>
                  )}
                </View>

                {/* Best price stamp on Lidl */}
                {isCheapest && (
                  <BestPriceStamp visible={true} />
                )}
              </View>

              {/* Expanded section */}
              {isSelected && (
                <TouchableOpacity
                  style={[styles.routeBtn, { backgroundColor: store.color }]}
                  onPress={() => Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}`)}
                  activeOpacity={0.85}
                >
                  <Navigation size={16} color={Colors.white} />
                  <Text style={styles.routeBtnText}>{routeLabel}</Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          );
        })}

        <View style={{ height: 16 }} />
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
    paddingBottom: Spacing.md,
  },
  headerLabel: {
    fontFamily: Fonts.manropeSemiBold,
    fontSize: 9,
    color: Colors.textMuted,
    letterSpacing: 2,
    marginBottom: 4,
  },
  headerTitle: {
    fontFamily: Fonts.playfair,
    fontSize: 26,
    color: Colors.textDark,
  },
  headerSub: {
    fontFamily: Fonts.caveat,
    fontSize: 15,
    color: Colors.textMuted,
  },
  ratePillRow: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  sectionHeader: {
    paddingHorizontal: Spacing.md,
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: Fonts.playfair,
    fontSize: 20,
    color: Colors.textDark,
  },
  sectionSub: {
    fontFamily: Fonts.caveat,
    fontSize: 14,
    color: Colors.olive,
  },
  storeCard: {
    marginHorizontal: Spacing.md,
    marginBottom: 10,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    overflow: 'hidden',
    ...Shadow.sm,
  },
  storeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  monogram: {
    width: 48,
    height: 48,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  monogramText: {
    fontFamily: Fonts.manropeBold,
    fontSize: 22,
    color: Colors.white,
  },
  storeName: {
    fontFamily: Fonts.manropeBold,
    fontSize: 15,
    color: Colors.textDark,
    marginBottom: 3,
  },
  storeAddress: {
    fontFamily: Fonts.manrope,
    fontSize: 11,
    color: Colors.textMuted,
  },
  storeClosing: {
    fontFamily: Fonts.manrope,
    fontSize: 10,
    color: Colors.textLight,
    marginTop: 1,
  },
  storeTotal: {
    fontFamily: Fonts.playfair,
    fontSize: 18,
    color: Colors.textDark,
  },
  storeTotalRub: {
    fontFamily: Fonts.manrope,
    fontSize: 10,
    color: Colors.textMuted,
    marginBottom: 4,
  },
  bestBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: Colors.olive,
    borderRadius: Radius.full,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  bestBadgeText: {
    fontFamily: Fonts.manropeBold,
    fontSize: 9,
    color: Colors.white,
  },
  diffBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: Colors.primary,
    borderRadius: Radius.full,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  diffBadgeText: {
    fontFamily: Fonts.manropeBold,
    fontSize: 9,
    color: Colors.white,
  },
  stampWrap: {
    position: 'absolute',
    right: 8,
    top: -6,
  },
  stampOuter: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2.5,
    borderColor: Colors.olive,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stampInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.olive,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stampMain: {
    fontFamily: Fonts.playfair,
    fontSize: 11,
    color: Colors.olive,
    textAlign: 'center',
    lineHeight: 13,
  },
  stampSub: {
    fontFamily: Fonts.manropeBold,
    fontSize: 6,
    color: Colors.olive,
    letterSpacing: 0.5,
  },
  routeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: Radius.md,
    paddingVertical: 12,
    marginTop: Spacing.sm,
  },
  routeBtnText: {
    fontFamily: Fonts.manropeBold,
    fontSize: 14,
    color: Colors.white,
  },
});
