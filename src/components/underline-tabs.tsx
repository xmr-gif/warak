import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors } from '@/theme';
import { Text } from './text';

type Tab<T extends string> = { value: T; label: string };

/** Onglets soulignés (fiche club, profil) : trait lavande sous l'onglet actif. */
export function UnderlineTabs<T extends string>({
  tabs,
  value,
  onChange,
  style,
}: {
  tabs: Tab<T>[];
  value: T;
  onChange: (value: T) => void;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      accessibilityRole="tablist"
      style={[
        {
          flexDirection: 'row',
          gap: 24,
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: colors.line,
        },
        style,
      ]}
    >
      {tabs.map((t) => {
        const active = t.value === value;
        return (
          <Pressable
            key={t.value}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onPress={() => onChange(t.value)}
            hitSlop={{ top: 8, bottom: 0, left: 8, right: 8 }}
            style={{ paddingBottom: 14 }}
          >
            <Text variant="bodyStrong" weight={active ? 'semibold' : 'medium'} color={active ? colors.ink : colors.ink3}>
              {t.label}
            </Text>
            {active ? (
              <View
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: -1,
                  height: 2,
                  borderRadius: 1,
                  backgroundColor: colors.lavender,
                }}
              />
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
}
