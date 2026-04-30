import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Search, X } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '@/hooks/useApp';
import { DISHES } from '@/constants/dishes';
import { Colors, Fonts, Radius, Spacing, Shadow } from '@/constants/theme';

interface Props { onSelectDish: (id: string) => void; }

export function SearchBar({ onSelectDish }: Props) {
  const { language } = useApp();
  const [query, setQuery] = useState('');

  const results = useCallback(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return DISHES.filter(d => {
      const name = language === 'ru' ? d.ru.name : d.sr.name;
      const cat = language === 'ru' ? d.ru.cat : d.sr.cat;
      return name.toLowerCase().includes(q) || cat.toLowerCase().includes(q);
    }).slice(0, 5);
  }, [query, language])();

  const placeholder = language === 'ru' ? 'Найти блюдо...' : 'Pronađi jelo...';

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <Search size={16} color={Colors.textMuted} style={{ marginLeft: 12 }} />
        <TextInput
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          placeholder={placeholder}
          placeholderTextColor={Colors.textLight}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')} style={{ padding: 8 }}>
            <X size={14} color={Colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>
      {results.length > 0 && (
        <View style={styles.dropdown}>
          {results.map((d, i) => {
            const name = language === 'ru' ? d.ru.name : d.sr.name;
            const cat = language === 'ru' ? d.ru.cat : d.sr.cat;
            const initial = name.charAt(0).toUpperCase();
            return (
              <TouchableOpacity
                key={d.id}
                style={[styles.suggestion, i < results.length - 1 && styles.suggestionBorder]}
                onPress={() => { onSelectDish(d.id); setQuery(''); }}
                activeOpacity={0.8}
              >
                <LinearGradient colors={[d.accent, d.secondary]} style={styles.suggestionInitial}>
                  <Text style={styles.suggestionInitialText}>{initial}</Text>
                </LinearGradient>
                <View style={{ flex: 1 }}>
                  <Text style={styles.suggestionName}>{name}</Text>
                  <Text style={styles.suggestionCat}>{cat} · {d.time} мин</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    zIndex: 100,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadow.sm,
  },
  input: {
    flex: 1,
    fontFamily: Fonts.manrope,
    fontSize: 14,
    color: Colors.textDark,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  dropdown: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: 4,
    ...Shadow.md,
  },
  suggestion: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
  },
  suggestionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  suggestionInitial: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  suggestionInitialText: {
    fontFamily: Fonts.playfair,
    fontSize: 18,
    color: 'rgba(255,255,255,0.9)',
  },
  suggestionName: {
    fontFamily: Fonts.manropeSemiBold,
    fontSize: 13,
    color: Colors.textDark,
  },
  suggestionCat: {
    fontFamily: Fonts.manrope,
    fontSize: 11,
    color: Colors.textMuted,
  },
});
