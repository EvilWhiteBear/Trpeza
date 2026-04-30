import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform, View, Text, StyleSheet } from 'react-native';
import { Home, ShoppingCart, User } from 'lucide-react-native';
import { useApp } from '@/hooks/useApp';
import { Colors, Fonts } from '@/constants/theme';

function TabIcon({ icon: Icon, focused, color, badge }: { icon: any; focused: boolean; color: string; badge?: number }) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      {focused && <View style={styles.activeBar} />}
      <Icon size={22} color={color} strokeWidth={focused ? 2.2 : 1.8} />
      {badge != null && badge > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}
    </View>
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const { savedIds } = useApp();

  const tabBarStyle = {
    height: Platform.select({ ios: insets.bottom + 62, android: insets.bottom + 62, default: 72 }),
    paddingTop: 10,
    paddingBottom: Platform.select({ ios: insets.bottom + 10, android: insets.bottom + 10, default: 10 }),
    paddingHorizontal: 16,
    backgroundColor: Colors.bg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarLabelStyle: {
          fontFamily: Fonts.manropeSemiBold,
          fontSize: 11,
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Главная',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon icon={Home} focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Корзина',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon icon={ShoppingCart} focused={focused} color={color} badge={11} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Профиль',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon icon={User} focused={focused} color={color} badge={savedIds.length || undefined} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  activeBar: {
    position: 'absolute',
    top: -10,
    width: 24,
    height: 2.5,
    borderRadius: 2,
    backgroundColor: Colors.primary,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -10,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    fontFamily: Fonts.manropeBold,
    fontSize: 9,
    color: Colors.white,
  },
});
