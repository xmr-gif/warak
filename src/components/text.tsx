import { Text as RNText, type TextProps as RNTextProps } from 'react-native';

import { colors, fonts, type, weights, type TextVariant, type Weight } from '@/theme';

export type TextProps = RNTextProps & {
  /** Style de la planche : `title`, `section`, `body`, `caption`… */
  variant?: TextVariant;
  /** Change la graisse sans changer la taille. */
  weight?: Weight;
  color?: string;
  align?: 'left' | 'center' | 'right';
};

const serifFamilies: string[] = [fonts.serif, fonts.serifSemiBold];

/** Texte de l'app. Les écrans ne fixent jamais `fontSize` eux-mêmes. */
export function Text({
  variant = 'body',
  weight,
  color = colors.ink,
  align,
  style,
  maxFontSizeMultiplier = 1.4,
  ...props
}: TextProps) {
  const base = type[variant];
  const family = weight
    ? serifFamilies.includes(base.fontFamily)
      ? weights[weight].serif
      : weights[weight].sans
    : undefined;

  return (
    <RNText
      maxFontSizeMultiplier={maxFontSizeMultiplier}
      {...props}
      style={[
        base,
        { color },
        family ? { fontFamily: family } : null,
        align ? { textAlign: align } : null,
        style,
      ]}
    />
  );
}
