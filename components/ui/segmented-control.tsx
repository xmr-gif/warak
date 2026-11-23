import * as React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { COLORS, RADIUS } from '@/lib/theme';

export interface SegmentedControlProps<T extends string = string> {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  variant?: 'pill' | 'tabs';
}

export function SegmentedControl<T extends string = string>({
  options,
  value,
  onChange,
  variant = 'pill',
}: SegmentedControlProps<T>) {
  if (variant === 'tabs') {
    return (
      <View style={styles.tabRow}>
        {options.map((option) => {
          const isActive = option === value;
          return (
            <Pressable
              key={option}
              onPress={() => onChange(option)}
              style={styles.tabButton}>
              <Text
                style={[
                  styles.tabText,
                  isActive ? styles.tabTextActive : styles.tabTextInactive,
                ]}>
                {option}
              </Text>
              {isActive && <View style={styles.tabUnderline} />}
            </Pressable>
          );
        })}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {options.map((option) => {
        const isSelected = option === value;
        return (
          <Pressable
            key={option}
            onPress={() => onChange(option)}
            style={[
              styles.segment,
              isSelected && styles.segmentSelected,
            ]}>
            <Text
              style={[
                styles.segmentText,
                isSelected ? styles.segmentTextSelected : styles.segmentTextUnselected,
              ]}>
              {option}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderColor: COLORS.line,
    borderWidth: 1,
    borderRadius: RADIUS.btn,
    padding: 4,
    height: 48,
    alignItems: 'center',
  },
  segment: {
    flex: 1,
    height: '100%',
    borderRadius: RADIUS.btnS,
    justifyContent: 'center',
    alignItems: 'center',
  },
  segmentSelected: {
    backgroundColor: COLORS.lavender,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '600',
  },
  segmentTextSelected: {
    color: COLORS.onAccent,
  },
  segmentTextUnselected: {
    color: COLORS.ink2,
  },
  tabRow: {
    flexDirection: 'row',
    gap: 24,
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabButton: {
    paddingVertical: 4,
    position: 'relative',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
  },
  tabTextActive: {
    color: COLORS.ink,
  },
  tabTextInactive: {
    color: COLORS.ink3,
  },
  tabUnderline: {
    position: 'absolute',
    bottom: -4,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: COLORS.ink,
    borderRadius: 1,
  },
});
