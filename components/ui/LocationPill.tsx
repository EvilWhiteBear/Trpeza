import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Pressable, ScrollView } from 'react-native';
import { MapPin, Navigation, X } from 'lucide-react-native';
import * as Location from 'expo-location';
import { useApp } from '@/hooks/useApp';
import { CITIES, CityData } from '@/contexts/AppContext';
import { Colors, Fonts, Radius, Spacing, Shadow } from '@/constants/theme';

export function LocationPill() {
  const { city, setCity, language } = useApp();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGPS = async () => {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') { setLoading(false); return; }
      const loc = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = loc.coords;
      // Find nearest city
      let nearest = CITIES[0];
      let minDist = Infinity;
      CITIES.forEach(c => {
        const d = haversine(latitude, longitude, c.lat, c.lng);
        if (d < minDist) { minDist = d; nearest = c; }
      });
      setCity(nearest);
      setModalVisible(false);
    } catch {}
    setLoading(false);
  };

  const cityName = language === 'ru' ? city.name : city.nameSr;

  return (
    <>
      <TouchableOpacity style={styles.pill} onPress={() => setModalVisible(true)} activeOpacity={0.8}>
        <MapPin size={12} color={Colors.primary} />
        <Text style={styles.text}>{cityName}</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setModalVisible(false)}>
          <Pressable style={styles.modal} onPress={() => {}}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{language === 'ru' ? 'Выберите город' : 'Izaberite grad'}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <X size={20} color={Colors.textMuted} />
              </TouchableOpacity>
            </View>
            {CITIES.map(c => (
              <TouchableOpacity
                key={c.nameSr}
                style={[styles.cityRow, city.nameSr === c.nameSr && styles.cityRowActive]}
                onPress={() => { setCity(c); setModalVisible(false); }}
              >
                <Text style={[styles.cityName, city.nameSr === c.nameSr && styles.cityNameActive]}>
                  {language === 'ru' ? c.name : c.nameSr}
                </Text>
                {city.nameSr === c.nameSr && <View style={styles.activeIndicator} />}
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.gpsBtn} onPress={handleGPS} disabled={loading} activeOpacity={0.8}>
              <Navigation size={14} color={Colors.bg} />
              <Text style={styles.gpsBtnText}>
                {loading ? '...' : language === 'ru' ? 'Использовать GPS' : 'Koristi GPS'}
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.bgDark,
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  text: {
    fontFamily: Fonts.manropeMedium,
    fontSize: 12,
    color: Colors.textDark,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(42,24,16,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modal: {
    backgroundColor: Colors.bg,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    width: '100%',
    ...Shadow.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  modalTitle: {
    fontFamily: Fonts.playfair,
    fontSize: 20,
    color: Colors.textDark,
  },
  cityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: Radius.sm,
    marginBottom: 4,
  },
  cityRowActive: {
    backgroundColor: Colors.bgDark,
  },
  cityName: {
    fontFamily: Fonts.manropeMedium,
    fontSize: 16,
    color: Colors.textDark,
  },
  cityNameActive: {
    color: Colors.primary,
    fontFamily: Fonts.manropeBold,
  },
  activeIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  gpsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.olive,
    borderRadius: Radius.md,
    paddingVertical: 12,
    marginTop: Spacing.md,
  },
  gpsBtnText: {
    fontFamily: Fonts.manropeBold,
    fontSize: 14,
    color: Colors.bg,
  },
});
