import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { MapPin, Clock, Navigation } from 'lucide-react-native';
import { useApp } from '@/hooks/useApp';
import { Colors, Fonts, Radius, Spacing, Shadow } from '@/constants/theme';

export interface StoreData {
  id: string;
  nameRu: string;
  nameSr: string;
  addressRu: string;
  addressSr: string;
  lat: number;
  lng: number;
  color: string;
  letter: string;
  closingRu: string;
  closingSr: string;
}

export const STORES: StoreData[] = [
  { id: 'maxi', nameRu: 'Maxi', nameSr: 'Maxi', addressRu: 'Bulevar kralja Aleksandra 86', addressSr: 'Bulevar kralja Aleksandra 86', lat: 44.8037, lng: 20.4783, color: '#E30613', letter: 'M', closingRu: 'до 22:00', closingSr: 'do 22:00' },
  { id: 'idea', nameRu: 'IDEA', nameSr: 'IDEA', addressRu: 'Vojvode Stepe 12', addressSr: 'Vojvode Stepe 12', lat: 44.7961, lng: 20.4942, color: '#005CA9', letter: 'i', closingRu: 'до 21:00', closingSr: 'do 21:00' },
  { id: 'lidl', nameRu: 'Lidl', nameSr: 'Lidl', addressRu: 'Autoput za Zagreb 2', addressSr: 'Autoput za Zagreb 2', lat: 44.8121, lng: 20.3721, color: '#0050AA', letter: 'L', closingRu: 'до 22:00', closingSr: 'do 22:00' },
];

function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

interface Props { store: StoreData; }

export function StoreCard({ store }: Props) {
  const { language, city } = useApp();
  const dist = haversine(city.lat, city.lng, store.lat, store.lng);
  const walkMins = Math.round((dist / 5) * 60);
  const name = language === 'ru' ? store.nameRu : store.nameSr;
  const address = language === 'ru' ? store.addressRu : store.addressSr;
  const closing = language === 'ru' ? store.closingRu : store.closingSr;

  const openMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}`;
    Linking.openURL(url);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={openMaps} activeOpacity={0.85}>
      {/* Monogram */}
      <View style={[styles.monogram, { backgroundColor: store.color }]}>
        <Text style={styles.monogramText}>{store.letter}</Text>
      </View>
      {/* Info */}
      <View style={{ flex: 1 }}>
        <Text style={styles.storeName}>{name}</Text>
        <View style={styles.infoRow}>
          <MapPin size={10} color={Colors.textMuted} />
          <Text style={styles.infoText} numberOfLines={1}>{address}</Text>
        </View>
        <View style={styles.infoRow}>
          <Clock size={10} color={Colors.textMuted} />
          <Text style={styles.infoText}>{closing}</Text>
        </View>
      </View>
      {/* Distance */}
      <View style={styles.distCol}>
        <Text style={styles.distKm}>{dist.toFixed(1)} км</Text>
        <Text style={styles.distWalk}>~{walkMins} мин</Text>
        <Navigation size={12} color={store.color} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.sm,
    width: 220,
    ...Shadow.sm,
  },
  monogram: {
    width: 44,
    height: 44,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monogramText: {
    fontFamily: Fonts.manropeBold,
    fontSize: 20,
    color: Colors.white,
  },
  storeName: {
    fontFamily: Fonts.manropeBold,
    fontSize: 13,
    color: Colors.textDark,
    marginBottom: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  infoText: {
    fontFamily: Fonts.manrope,
    fontSize: 10,
    color: Colors.textMuted,
    flex: 1,
  },
  distCol: {
    alignItems: 'center',
    gap: 2,
  },
  distKm: {
    fontFamily: Fonts.jetbrains,
    fontSize: 11,
    color: Colors.textDark,
  },
  distWalk: {
    fontFamily: Fonts.manrope,
    fontSize: 9,
    color: Colors.textMuted,
  },
});
