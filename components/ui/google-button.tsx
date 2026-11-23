import * as React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { COLORS, RADIUS } from '@/lib/theme';

export interface GoogleButtonProps {
  label?: string;
  onPress?: () => void;
}

export function GoogleButton({
  label = 'Continuer avec Google',
  onPress,
}: GoogleButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
      ]}>
      <View style={styles.googleIconCircle}>
        <Text style={styles.googleLetter}>G</Text>
      </View>
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: RADIUS.btn,
    backgroundColor: COLORS.surface,
    borderColor: COLORS.line,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 20,
  },
  buttonPressed: {
    backgroundColor: COLORS.surfaceLight,
  },
  googleIconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleLetter: {
    color: '#08070D',
    fontSize: 15,
    fontWeight: '800',
    marginTop: -1,
  },
  buttonText: {
    color: COLORS.ink,
    fontSize: 16,
    fontWeight: '600',
  },
});
