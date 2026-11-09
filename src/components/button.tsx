import type { ComponentType } from 'react';
import { ActivityIndicator, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, layout, radius, type TextVariant, type Weight } from '@/theme';
import { Text } from './text';

/** Signature commune des icônes lucide-react-native et de nos icônes SVG. */
export type IconComponent = ComponentType<{
  size?: number;
  color?: string;
  strokeWidth?: number;
  fill?: string;
}>;

const variants = {
  primary: { bg: colors.lavender, fg: colors.onAccent, border: undefined, borderWidth: 0 },
  secondary: { bg: colors.surfaceRaised, fg: colors.ink, border: colors.lineStrong, borderWidth: 1 },
  outline: { bg: 'transparent', fg: colors.lavender, border: colors.lavender, borderWidth: 1.5 },
} as const;

const sizes: Record<
  'lg' | 'md' | 'sm',
  { height: number; padX: number; radius: number; text: TextVariant; weight?: Weight; icon: number; gap: number }
> = {
  lg: { height: layout.buttonHeight, padX: 24, radius: radius.button, text: 'button', icon: 20, gap: 10 }, // Primaire · 56
  md: { height: layout.buttonHeightSm, padX: 18, radius: radius.buttonSm, text: 'bodySm', weight: 'semibold', icon: 18, gap: 8 },
  sm: { height: layout.buttonHeightSm, padX: 16, radius: radius.pill, text: 'label', weight: 'semibold', icon: 16, gap: 6 }, // « Suivre », « Rejoindre »
};

export type ButtonProps = {
  title: string;
  onPress?: () => void;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  icon?: IconComponent;
  disabled?: boolean;
  loading?: boolean;
  accessibilityLabel?: string;
  /** Mise en page seulement (marges, flex, largeur). */
  style?: StyleProp<ViewStyle>;
};

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'lg',
  icon: Icon,
  disabled,
  loading,
  accessibilityLabel,
  style,
}: ButtonProps) {
  const v = variants[variant];
  const s = sizes[size];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: !!disabled, busy: !!loading }}
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        {
          height: s.height,
          paddingHorizontal: s.padX,
          borderRadius: s.radius,
          borderCurve: s.radius === radius.pill ? undefined : 'continuous',
          backgroundColor: v.bg,
          borderColor: v.border,
          borderWidth: v.borderWidth,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: disabled ? 0.45 : pressed ? 0.72 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={v.fg} />
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: s.gap }}>
          {Icon ? <Icon size={s.icon} color={v.fg} strokeWidth={2} /> : null}
          <Text variant={s.text} weight={s.weight} color={v.fg} numberOfLines={1}>
            {title}
          </Text>
        </View>
      )}
    </Pressable>
  );
}
