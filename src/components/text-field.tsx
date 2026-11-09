import { useState, type ComponentRef, type Ref } from 'react';
import { TextInput, View, type StyleProp, type TextInputProps, type ViewStyle } from 'react-native';

import { colors, fonts, layout, radius, shadows } from '@/theme';
import type { IconComponent } from './button';

type Props = Omit<TextInputProps, 'style'> & {
  icon?: IconComponent;
  /** `rounded` (champs de la planche) ou `pill` (saisie de la discussion). */
  shape?: 'rounded' | 'pill';
  height?: number;
  style?: StyleProp<ViewStyle>;
  ref?: Ref<ComponentRef<typeof TextInput>>;
};

/** Champ de saisie « Champs · 54 à 56 » : repos, puis focus lavande. */
export function TextField({
  icon: Icon,
  shape = 'rounded',
  height = layout.fieldHeight,
  style,
  onFocus,
  onBlur,
  ref,
  ...input
}: Props) {
  const [focused, setFocused] = useState(false);
  return (
    <View
      style={[
        {
          height,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          paddingHorizontal: shape === 'pill' ? 18 : 16,
          borderRadius: shape === 'pill' ? height / 2 : radius.button,
          borderCurve: shape === 'pill' ? undefined : 'continuous',
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: focused ? colors.lavender : colors.line,
          boxShadow: focused ? shadows.focusRing : undefined,
        },
        style,
      ]}
    >
      {Icon ? <Icon size={18} color={focused ? colors.lavender : colors.ink3} strokeWidth={2} /> : null}
      <TextInput
        ref={ref}
        placeholderTextColor={colors.ink3}
        selectionColor={colors.lavender}
        cursorColor={colors.lavender}
        keyboardAppearance="dark"
        maxFontSizeMultiplier={1.4}
        {...input}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        style={{ flex: 1, height: '100%', fontFamily: fonts.regular, fontSize: 15, color: colors.ink, padding: 0 }}
      />
    </View>
  );
}
