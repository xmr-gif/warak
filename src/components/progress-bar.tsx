import { View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, type GradientSpec } from '@/theme';
import { Gradient } from './gradient';

type Props = {
  /** Entre 0 et 1. */
  value: number;
  height?: number;
  /** Couleur unie (lavande par défaut) ou dégradé. */
  fill?: string | GradientSpec;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
};

export function ProgressBar({ value, height = 6, fill = colors.lavender, style, accessibilityLabel }: Props) {
  const pct = Math.max(0, Math.min(1, value));
  const r = height / 2;
  const bar = { width: `${pct * 100}%` as const, height, borderRadius: r };

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{ min: 0, max: 100, now: Math.round(pct * 100) }}
      style={[{ height, borderRadius: r, backgroundColor: colors.track, overflow: 'hidden' }, style]}
    >
      {typeof fill === 'string' ? (
        <View style={[bar, { backgroundColor: fill }]} />
      ) : (
        <Gradient {...fill} style={bar} />
      )}
    </View>
  );
}
