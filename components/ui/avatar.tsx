import * as React from 'react';
import { View, Text, StyleSheet, type ViewStyle } from 'react-native';
import { COLORS } from '@/lib/theme';

export interface AvatarProps {
  initials: string;
  size?: number;
  backgroundColor?: string;
  textColor?: string;
  hasHalo?: boolean;
  style?: ViewStyle;
}

export function Avatar({
  initials,
  size = 44,
  backgroundColor = COLORS.surfaceLight,
  textColor = COLORS.ink,
  hasHalo = false,
  style,
}: AvatarProps) {
  const innerSize = hasHalo ? size - 6 : size;

  const content = (
    <View
      style={[
        styles.circle,
        {
          width: innerSize,
          height: innerSize,
          borderRadius: innerSize / 2,
          backgroundColor,
        },
      ]}>
      <Text
        style={[
          styles.text,
          {
            color: textColor,
            fontSize: innerSize * 0.38,
          },
        ]}>
        {initials}
      </Text>
    </View>
  );

  if (hasHalo) {
    return (
      <View
        style={[
          styles.halo,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderColor: COLORS.lavender,
          },
          style,
        ]}>
        {content}
      </View>
    );
  }

  return <View style={style}>{content}</View>;
}

const styles = StyleSheet.create({
  halo: {
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
