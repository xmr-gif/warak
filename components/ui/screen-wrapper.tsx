import * as React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  type ViewStyle,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, SPACING } from '@/lib/theme';
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';

export interface ScreenWrapperProps {
  children: React.ReactNode;
  scrollable?: boolean;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  withTopHalo?: boolean;
  paddingHorizontal?: number;
}

export function ScreenWrapper({
  children,
  scrollable = false,
  style,
  contentContainerStyle,
  withTopHalo = true,
  paddingHorizontal = SPACING.screen,
}: ScreenWrapperProps) {
  const insets = useSafeAreaInsets();

  const content = scrollable ? (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[
        {
          paddingHorizontal,
          paddingTop: insets.top + 8,
          paddingBottom: insets.bottom + 24,
        },
        contentContainerStyle,
      ]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  ) : (
    <View
      style={[
        styles.fill,
        {
          paddingHorizontal,
          paddingTop: insets.top + 8,
          paddingBottom: insets.bottom + 16,
        },
        contentContainerStyle,
      ]}>
      {children}
    </View>
  );

  return (
    <View style={[styles.container, style]}>
      <StatusBar style="light" />

      {/* Ambient background glow (violet halo from page 1) */}
      {withTopHalo && (
        <View style={styles.haloContainer} pointerEvents="none">
          <Svg width="100%" height="320">
            <Defs>
              <RadialGradient
                id="halo"
                cx="50%"
                cy="0%"
                rx="60%"
                ry="60%"
                fx="50%"
                fy="0%">
                <Stop offset="0%" stopColor={COLORS.violet} stopOpacity="0.22" />
                <Stop offset="50%" stopColor={COLORS.violet} stopOpacity="0.08" />
                <Stop offset="100%" stopColor={COLORS.bg} stopOpacity="0" />
              </RadialGradient>
            </Defs>
            <Rect width="100%" height="100%" fill="url(#halo)" />
          </Svg>
        </View>
      )}

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.fill}>
        {content}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  fill: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  haloContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 320,
    zIndex: 0,
  },
});
