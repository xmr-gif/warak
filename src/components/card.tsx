import type { ReactNode } from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, gradients, layout, radius } from '@/theme';
import { Gradient } from './gradient';

type Props = {
  children: ReactNode;
  /** `surface` : carte standard ; `feature` : carte mise en avant (dégradé violet). */
  variant?: 'surface' | 'feature';
  onPress?: () => void;
  accessibilityLabel?: string;
  /** Mise en page et rembourrage seulement. */
  style?: StyleProp<ViewStyle>;
};

/** Carte « 20 carte » de la planche. */
export function Card({ children, variant = 'surface', onPress, accessibilityLabel, style }: Props) {
  const base: ViewStyle = {
    borderRadius: radius.card,
    borderCurve: 'continuous',
    borderWidth: 1,
    borderColor: colors.line,
    padding: layout.cardPadding,
    overflow: 'hidden',
  };

  const body =
    variant === 'feature' ? (
      <Gradient {...gradients.feature} style={[base, style]}>
        {children}
      </Gradient>
    ) : (
      <View style={[base, { backgroundColor: colors.surface }, style]}>{children}</View>
    );

  if (!onPress) return body;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.78 : 1 })}
    >
      {body}
    </Pressable>
  );
}
