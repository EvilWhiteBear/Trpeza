import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { RefreshCw } from 'lucide-react-native';
import { useApp } from '@/hooks/useApp';
import { Colors, Fonts, Radius } from '@/constants/theme';

export function CurrencyPill() {
  const { rateRUB, rateLoading, rateLive, refreshRate } = useApp();

  return (
    <View style={styles.pill}>
      <View style={[styles.dot, { backgroundColor: rateLive ? Colors.olive : Colors.textMuted }]} />
      {rateLoading ? (
        <ActivityIndicator size="small" color={Colors.textMuted} style={{ marginHorizontal: 4 }} />
      ) : (
        <Text style={styles.text}>1 din = {rateRUB.toFixed(2)} ₽</Text>
      )}
      <TouchableOpacity onPress={refreshRate} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
        <RefreshCw size={12} color={Colors.textMuted} />
      </TouchableOpacity>
    </View>
  );
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
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  text: {
    fontFamily: Fonts.jetbrains,
    fontSize: 11,
    color: Colors.textDark,
  },
});
