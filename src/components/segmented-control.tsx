import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, layout, radius } from '@/theme';
import { Text } from './text';

type Option<T extends string> = { value: T; label: string };

/** Contrôle segmenté de la planche (« À lire · En cours · Lu », « Mes clubs · Découvrir »). */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  style,
}: {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      accessibilityRole="tablist"
      style={[
        {
          height: layout.fieldHeight,
          padding: 4,
          flexDirection: 'row',
          borderRadius: radius.button,
          borderCurve: 'continuous',
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.line,
        },
        style,
      ]}
    >
      {options.map((o) => {
        const active = o.value === value;
        return (
          <Pressable
            key={o.value}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onPress={() => onChange(o.value)}
            style={({ pressed }) => ({
              flex: 1,
              borderRadius: radius.buttonSm,
              borderCurve: 'continuous',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: active ? colors.lavender : 'transparent',
              opacity: pressed && !active ? 0.7 : 1,
            })}
          >
            <Text variant="bodySm" weight="semibold" color={active ? colors.onAccent : colors.ink2} numberOfLines={1}>
              {o.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
