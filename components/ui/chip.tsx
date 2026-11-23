import * as React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';
import { COLORS, RADIUS } from '@/lib/theme';
import { LinearGradient } from '@/components/ui/gradient';

export interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  categoryGradient?: readonly string[] | string[];
  categoryColor?: string;
}

export function Chip({
  label,
  selected = false,
  onPress,
  categoryGradient,
  categoryColor,
}: ChipProps) {
  // If no gradient/color specified, fallback to lavender or neutral selected style
  const gradient = categoryGradient ?? (categoryColor ? [categoryColor, categoryColor] : COLORS.perso);

  if (selected) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.chip,
          pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] },
        ]}>
        <LinearGradient
          colors={gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          borderRadius={RADIUS.pill}
          style={styles.gradientFill}>
          <View style={styles.contentRow}>
            <Check size={16} color="#160E2B" strokeWidth={2.8} />
            <Text style={styles.selectedText}>{label}</Text>
          </View>
        </LinearGradient>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        styles.unselectedChip,
        pressed && styles.unselectedPressed,
      ]}>
      <Text style={styles.unselectedText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    height: 44,
    borderRadius: RADIUS.pill,
    alignSelf: 'flex-start',
    marginRight: 8,
    marginBottom: 10,
  },
  gradientFill: {
    height: 44,
    paddingHorizontal: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  selectedText: {
    color: '#160E2B',
    fontSize: 14,
    fontWeight: '600',
  },
  unselectedChip: {
    height: 44,
    paddingHorizontal: 18,
    backgroundColor: COLORS.surface,
    borderColor: COLORS.line,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unselectedPressed: {
    backgroundColor: COLORS.surfaceLight,
  },
  unselectedText: {
    color: COLORS.ink,
    fontSize: 14,
    fontWeight: '500',
  },
});
