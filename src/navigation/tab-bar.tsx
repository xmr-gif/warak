import { Pressable, StyleSheet, View } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { House, Plus, Search, User, Users } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { IconComponent } from '@/components/button';
import { Text } from '@/components/text';
import { colors, layout, shadows } from '@/theme';
import type { TabParamList } from './types';

const tabs: Record<keyof TabParamList, { label: string; icon: IconComponent }> = {
  Accueil: { label: 'Accueil', icon: House },
  Explorer: { label: 'Explorer', icon: Search },
  Clubs: { label: 'Clubs', icon: Users },
  Profil: { label: 'Profil', icon: User },
};

/** Espace à réserver en bas des écrans à onglets (la barre flotte au-dessus du contenu). */
export function useTabBarSpace() {
  const insets = useSafeAreaInsets();
  return layout.tabBarHeight + Math.max(insets.bottom, 8);
}

/** « Barre d'onglets · 92 avec zone sûre » : 4 onglets et le bouton « + » au centre. */
export function TabBar({ state, navigation }: BottomTabBarProps) {
  const height = useTabBarSpace();

  const renderTab = (index: number) => {
    const route = state.routes[index];
    const { label, icon: Icon } = tabs[route.name as keyof TabParamList];
    const focused = state.index === index;
    const color = focused ? colors.lavender : colors.ink3;
    const onPress = () => {
      const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
      if (!focused && !event.defaultPrevented) navigation.navigate(route.name, route.params);
    };
    return (
      <Pressable
        key={route.key}
        accessibilityRole="tab"
        accessibilityState={{ selected: focused }}
        accessibilityLabel={label}
        onPress={onPress}
        style={({ pressed }) => ({ flex: 1, alignItems: 'center', gap: 3, opacity: pressed ? 0.7 : 1 })}
      >
        <Icon size={24} color={color} strokeWidth={1.9} />
        <Text variant="tab" weight={focused ? 'semibold' : 'medium'} color={color} numberOfLines={1}>
          {label}
        </Text>
      </Pressable>
    );
  };

  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height,
        paddingTop: 14,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: colors.bar,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: colors.line,
      }}
    >
      {renderTab(0)}
      {renderTab(1)}
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Nouvelle publication"
          onPress={() => navigation.getParent()?.navigate('NouvellePublication')}
          style={({ pressed }) => ({
            marginTop: -5,
            width: 52,
            height: 52,
            borderRadius: 18,
            borderCurve: 'continuous',
            backgroundColor: colors.lavender,
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: shadows.accentGlow,
            opacity: pressed ? 0.8 : 1,
          })}
        >
          <Plus size={24} color={colors.onAccent} strokeWidth={2} />
        </Pressable>
      </View>
      {renderTab(2)}
      {renderTab(3)}
    </View>
  );
}
