import React from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, Switch, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useApp } from '@/hooks/useApp';
import { DISHES } from '@/constants/dishes';
import { Colors, Fonts, Spacing, Radius, Shadow } from '@/constants/theme';
import { FilmGrain } from '@/components/ui/FilmGrain';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { DishCard } from '@/components/feature/DishCard';
import { AchievementBadge } from '@/components/feature/AchievementBadge';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_W = (SCREEN_WIDTH - Spacing.md * 2 - Spacing.sm) / 2;

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { language, setLanguage, stats, achievements, savedIds, showCurrencyInRubles, setShowCurrencyInRubles, addViewed } = useApp();

  const savedDishes = DISHES.filter(d => savedIds.includes(d.id));

  const headerLabel = language === 'ru' ? 'ЧИТАТЕЛЬСКАЯ КАРТА' : 'ČITAOČKA KARTA';
  const profileTitle = language === 'ru' ? 'Мой профиль' : 'Moj profil';
  const inviteLabel = language === 'ru' ? 'Редакция пригласила вас' : 'Redakcija vas je pozvala';
  const greetLabel = language === 'ru' ? 'Добрый день,' : 'Dobar dan,';
  const guestLabel = language === 'ru' ? 'дорогой гость' : 'dragi gost';
  const sinceLabel = language === 'ru' ? 'в редакции с 2026' : 'u redakciji od 2026';
  const photoLabel = 'ФОТО';

  const statsData = [
    { value: stats.viewed, labelRu: 'Просмотрено', labelSr: 'Pregledano' },
    { value: stats.saved, labelRu: 'Сохранено', labelSr: 'Sačuvano' },
    { value: stats.cooked, labelRu: 'Приготовлено', labelSr: 'Skuvano' },
    { value: stats.awards, labelRu: 'Наград', labelSr: 'Nagrada' },
  ];

  const achTitle = language === 'ru' ? 'Достижения' : 'Dostignuća';
  const savedTitle = language === 'ru' ? 'Сохранённые рецепты' : 'Sačuvani recepti';
  const noSavedLabel = language === 'ru' ? 'Пока ничего не сохранено' : 'Još nema sačuvanih';
  const settingsTitle = language === 'ru' ? 'Настройки' : 'Podešavanja';
  const langLabel = language === 'ru' ? 'Язык' : 'Jezik';
  const currLabel = language === 'ru' ? 'Показывать рубли' : 'Prikaži rublje';

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bg }}>
      <FilmGrain />
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

        {/* Header */}
        <LinearGradient colors={[Colors.bgDark, Colors.bg]} style={[styles.header, { paddingTop: insets.top + 12 }]}>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerLabel}>{headerLabel}</Text>
            <Text style={styles.profileTitle}>{profileTitle}</Text>
            <Text style={styles.inviteLabel}>{inviteLabel}</Text>
          </View>
          <LanguageToggle />
        </LinearGradient>

        {/* Reader card */}
        <View style={styles.readerCard}>
          {/* Left: photo frame */}
          <View style={styles.photoFrame}>
            <LinearGradient
              colors={['#8B7E6A', '#5A4030', '#3A2010']}
              style={styles.photoGradient}
            >
              <Text style={styles.photoInitial}>Г</Text>
              <View style={styles.photoStrip}>
                <Text style={styles.photoStripText}>{photoLabel}</Text>
              </View>
            </LinearGradient>
          </View>

          {/* Right: info */}
          <View style={{ flex: 1 }}>
            <Text style={styles.greet}>{greetLabel}</Text>
            <Text style={styles.guest}>{guestLabel}</Text>
            <Text style={styles.since}>{sinceLabel}</Text>

            <View style={styles.dividerDashed} />

            {/* Stats grid */}
            <View style={styles.statsGrid}>
              {statsData.map((s, i) => (
                <View key={i} style={styles.statCell}>
                  <Text style={styles.statNum}>{s.value.toString().padStart(2, '0')}</Text>
                  <Text style={styles.statLabel}>{language === 'ru' ? s.labelRu : s.labelSr}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{achTitle}</Text>
          <View style={styles.achGrid}>
            {achievements.map(a => (
              <AchievementBadge key={a.id} achievement={a} />
            ))}
          </View>
        </View>

        {/* Saved recipes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{savedTitle}</Text>
          {savedDishes.length === 0 ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyDots}>· · ·</Text>
              <Text style={styles.emptyText}>{noSavedLabel}</Text>
            </View>
          ) : (
            <View style={styles.savedGrid}>
              {savedDishes.map(d => (
                <DishCard
                  key={d.id}
                  dish={d}
                  width={CARD_W}
                  onPress={() => {
                    addViewed(d.id);
                    router.push(`/recipe/${d.id}`);
                  }}
                />
              ))}
            </View>
          )}
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{settingsTitle}</Text>
          <View style={styles.settingsCard}>
            {/* Language */}
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>{langLabel}</Text>
              <View style={styles.langToggle}>
                <TouchableOpacity
                  style={[styles.langBtn, language === 'ru' && styles.langBtnActive]}
                  onPress={() => setLanguage('ru')}
                >
                  <Text style={[styles.langBtnText, language === 'ru' && styles.langBtnTextActive]}>RU</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.langBtn, language === 'sr' && styles.langBtnActive]}
                  onPress={() => setLanguage('sr')}
                >
                  <Text style={[styles.langBtnText, language === 'sr' && styles.langBtnTextActive]}>SR</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.settingDivider} />

            {/* Show rubles */}
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>{currLabel}</Text>
              <Switch
                value={showCurrencyInRubles}
                onValueChange={setShowCurrencyInRubles}
                trackColor={{ false: Colors.border, true: Colors.olive }}
                thumbColor={Colors.white}
              />
            </View>
          </View>
        </View>
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
    letterSpacing: 2.5,
    marginBottom: 4,
  },
  profileTitle: {
    fontFamily: Fonts.playfair,
    fontSize: 26,
    color: Colors.textDark,
  },
  inviteLabel: {
    fontFamily: Fonts.caveat,
    fontSize: 15,
    color: Colors.textMuted,
  },
  readerCard: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    ...Shadow.md,
  },
  photoFrame: {
    shadowColor: Colors.primary,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 0,
    elevation: 8,
  },
  photoGradient: {
    width: 96,
    height: 124,
    borderRadius: Radius.sm,
    borderWidth: 2,
    borderColor: Colors.textDark,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  photoInitial: {
    fontFamily: Fonts.playfair,
    fontSize: 42,
    color: 'rgba(255,255,255,0.8)',
    flex: 1,
    textAlignVertical: 'center',
    textAlign: 'center',
    lineHeight: 100,
  },
  photoStrip: {
    width: '100%',
    backgroundColor: Colors.textDark,
    paddingVertical: 4,
    alignItems: 'center',
  },
  photoStripText: {
    fontFamily: Fonts.manropeBold,
    fontSize: 9,
    color: Colors.white,
    letterSpacing: 3,
  },
  greet: {
    fontFamily: Fonts.caveat,
    fontSize: 16,
    color: Colors.textMuted,
    marginBottom: 2,
  },
  guest: {
    fontFamily: Fonts.playfair,
    fontSize: 20,
    color: Colors.textDark,
    marginBottom: 2,
  },
  since: {
    fontFamily: Fonts.manrope,
    fontSize: 9,
    color: Colors.textLight,
    letterSpacing: 1.5,
  },
  dividerDashed: {
    height: 1,
    borderStyle: 'dashed',
    borderWidth: 0.5,
    borderColor: Colors.border,
    marginVertical: 10,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  statCell: {
    width: '47%',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  statNum: {
    fontFamily: Fonts.jetbrainsBold,
    fontSize: 18,
    color: Colors.textDark,
  },
  statLabel: {
    fontFamily: Fonts.manrope,
    fontSize: 8.5,
    color: Colors.textMuted,
    letterSpacing: 0.5,
  },
  section: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontFamily: Fonts.playfair,
    fontSize: 20,
    color: Colors.textDark,
    marginBottom: 12,
  },
  achGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  savedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  emptyBox: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: Colors.bgDark,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  emptyDots: {
    fontFamily: Fonts.playfair,
    fontSize: 28,
    color: Colors.textLight,
    letterSpacing: 8,
    marginBottom: 8,
  },
  emptyText: {
    fontFamily: Fonts.manrope,
    fontSize: 13,
    color: Colors.textMuted,
    fontStyle: 'italic',
  },
  settingsCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
    ...Shadow.sm,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: 14,
  },
  settingLabel: {
    fontFamily: Fonts.manropeMedium,
    fontSize: 14,
    color: Colors.textDark,
  },
  settingDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing.md,
  },
  langToggle: {
    flexDirection: 'row',
    backgroundColor: Colors.bgDark,
    borderRadius: Radius.sm,
    padding: 3,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  langBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: Radius.sm - 2,
  },
  langBtnActive: {
    backgroundColor: Colors.primary,
  },
  langBtnText: {
    fontFamily: Fonts.manropeBold,
    fontSize: 12,
    color: Colors.textMuted,
  },
  langBtnTextActive: {
    color: Colors.white,
  },
});
