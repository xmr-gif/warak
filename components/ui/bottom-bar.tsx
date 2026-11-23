import * as React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Home, Compass, Plus, Users, User } from 'lucide-react-native';
import { COLORS, RADIUS } from '@/lib/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type TabKey = 'accueil' | 'explorer' | 'plus' | 'clubs' | 'profil';

export interface BottomBarProps {
  activeTab?: TabKey;
  onTabPress?: (tab: TabKey) => void;
  onPlusPress?: () => void;
}

export function BottomBar({
  activeTab = 'accueil',
  onTabPress,
  onPlusPress,
}: BottomBarProps) {
  const insets = useSafeAreaInsets();
  const paddingBottom = Math.max(insets.bottom, 12);

  return (
    <View style={[styles.wrapper, { paddingBottom }]}>
      <View style={styles.bar}>
        {/* Accueil */}
        <Pressable
          style={styles.tabItem}
          onPress={() => onTabPress?.('accueil')}>
          <Home
            size={22}
            color={activeTab === 'accueil' ? COLORS.lavender : COLORS.ink3}
          />
          <Text
            style={[
              styles.tabLabel,
              { color: activeTab === 'accueil' ? COLORS.lavender : COLORS.ink3 },
            ]}>
            Accueil
          </Text>
        </Pressable>

        {/* Explorer */}
        <Pressable
          style={styles.tabItem}
          onPress={() => onTabPress?.('explorer')}>
          <Compass
            size={22}
            color={activeTab === 'explorer' ? COLORS.lavender : COLORS.ink3}
          />
          <Text
            style={[
              styles.tabLabel,
              { color: activeTab === 'explorer' ? COLORS.lavender : COLORS.ink3 },
            ]}>
            Explorer
          </Text>
        </Pressable>

        {/* Center Plus Button */}
        <Pressable
          style={styles.plusButton}
          onPress={() => (onPlusPress ? onPlusPress() : onTabPress?.('plus'))}>
          <Plus size={24} color={COLORS.onAccent} strokeWidth={2.6} />
        </Pressable>

        {/* Clubs */}
        <Pressable
          style={styles.tabItem}
          onPress={() => onTabPress?.('clubs')}>
          <Users
            size={22}
            color={activeTab === 'clubs' ? COLORS.lavender : COLORS.ink3}
          />
          <Text
            style={[
              styles.tabLabel,
              { color: activeTab === 'clubs' ? COLORS.lavender : COLORS.ink3 },
            ]}>
            Clubs
          </Text>
        </Pressable>

        {/* Profil */}
        <Pressable
          style={styles.tabItem}
          onPress={() => onTabPress?.('profil')}>
          <User
            size={22}
            color={activeTab === 'profil' ? COLORS.lavender : COLORS.ink3}
          />
          <Text
            style={[
              styles.tabLabel,
              { color: activeTab === 'profil' ? COLORS.lavender : COLORS.ink3 },
            ]}>
            Profil
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'rgba(8, 7, 13, 0.95)',
    borderTopWidth: 1,
    borderTopColor: COLORS.line,
    paddingTop: 10,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    height: 52,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 56,
    gap: 4,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  plusButton: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.btn,
    backgroundColor: COLORS.lavender,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.violet,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
  },
});
