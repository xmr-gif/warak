import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { COLORS, FONTS } from '@/lib/theme';

export function WarakLogo({ size = 32 }: { size?: number }) {
  return (
    <View style={styles.container}>
      <Svg width={size} height={size} viewBox="0 0 32 32">
        <Circle cx="16" cy="16" r="14" stroke={COLORS.lavender} strokeWidth="2.5" fill="none" />
        <Path
          d="M 16 7 A 9 9 0 0 1 25 16 A 5 5 0 0 1 20 21 A 3 3 0 0 1 17 18"
          stroke={COLORS.lavender}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </Svg>
      <View style={styles.textContainer}>
        <Text style={styles.brandLatin}>warak</Text>
        <Text style={styles.brandArabic}>ورق</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  brandLatin: {
    color: COLORS.ink,
    fontFamily: FONTS.serif,
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  brandArabic: {
    color: COLORS.ink,
    fontSize: 22,
    fontWeight: '600',
  },
});
