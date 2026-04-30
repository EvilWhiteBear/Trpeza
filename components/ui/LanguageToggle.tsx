import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { useApp } from '@/hooks/useApp';
import { Colors, Fonts } from '@/constants/theme';

export function LanguageToggle() {
  const { language, toggleLanguage } = useApp();
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(rotateAnim, { toValue: 1, duration: 275, useNativeDriver: true }),
      Animated.timing(rotateAnim, { toValue: 0, duration: 0, useNativeDriver: true }),
    ]).start();
    toggleLanguage();
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '90deg', '0deg'],
  });

  const label = language === 'ru' ? 'SR' : 'RU';

  return (
    <TouchableOpacity onPress={handlePress} style={styles.btn} activeOpacity={0.8}>
      <Animated.View style={{ transform: [{ rotateY: rotate }] }}>
        <Text style={styles.label}>{label}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.gold,
  },
  label: {
    fontFamily: Fonts.manropeBold,
    fontSize: 12,
    color: Colors.bg,
    letterSpacing: 1,
  },
});
