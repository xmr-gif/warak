import { Pressable, type StyleProp, type ViewStyle } from 'react-native';

import { colors, layout, shadows } from '@/theme';
import type { IconComponent } from './button';

const variants = {
  surface: { bg: colors.surfaceRaised, border: colors.lineStrong, fg: colors.ink }, // « + » de la saisie, réglages
  accent: { bg: colors.lavender, border: undefined, fg: colors.onAccent }, // « + » de l'en-tête, envoi
  scrim: { bg: colors.scrim, border: 'rgba(255,255,255,0.12)', fg: colors.ink }, // posé sur une bannière
  plain: { bg: 'transparent', border: undefined, fg: colors.ink }, // retour simple
} as const;

type Props = {
  icon: IconComponent;
  accessibilityLabel: string;
  onPress?: () => void;
  variant?: keyof typeof variants;
  /** Diamètre du bouton (44 minimum pour la cible tactile). */
  size?: number;
  iconSize?: number;
  color?: string;
  glow?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

/** Bouton rond à icône. */
export function IconButton({
  icon: Icon,
  accessibilityLabel,
  onPress,
  variant = 'surface',
  size = layout.touch,
  iconSize = 20,
  color,
  glow,
  disabled,
  style,
}: Props) {
  const v = variants[variant];
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      onPress={onPress}
      hitSlop={size < layout.touch ? (layout.touch - size) / 2 : undefined}
      style={({ pressed }) => [
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: v.bg,
          borderColor: v.border,
          borderWidth: v.border ? 1 : 0,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: disabled ? 0.5 : pressed ? 0.65 : 1,
          boxShadow: glow ? shadows.accentGlow : undefined,
        },
        style,
      ]}
    >
      <Icon size={iconSize} color={color ?? v.fg} strokeWidth={2} />
    </Pressable>
  );
}
