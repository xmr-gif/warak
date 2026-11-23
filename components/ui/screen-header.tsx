import * as React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '@/lib/theme';

export interface ScreenHeaderProps {
  onBack?: () => void;
  step?: {
    current: number;
    total: number;
  };
  rightElement?: React.ReactNode;
}

export function ScreenHeader({ onBack, step, rightElement }: ScreenHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <View style={styles.header}>
      <Pressable
        onPress={handleBack}
        hitSlop={12}
        style={({ pressed }) => [
          styles.backButton,
          pressed && styles.backButtonPressed,
        ]}>
        <ChevronLeft size={22} color={COLORS.ink} />
      </Pressable>

      {step && (
        <View style={styles.stepContainer}>
          <Text style={styles.stepText}>
            Étape {step.current} sur {step.total}
          </Text>
          <View style={styles.progressBars}>
            {Array.from({ length: step.total }).map((_, index) => {
              const isActive = index < step.current;
              return (
                <View
                  key={index}
                  style={[
                    styles.progressBar,
                    isActive ? styles.progressBarActive : styles.progressBarInactive,
                  ]}
                />
              );
            })}
          </View>
        </View>
      )}

      {rightElement ? (
        <View style={styles.rightElement}>{rightElement}</View>
      ) : (
        <View style={styles.placeholder} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    minHeight: 52,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.surface,
    borderColor: COLORS.line,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonPressed: {
    backgroundColor: COLORS.surfaceLight,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  stepText: {
    color: COLORS.ink2,
    fontSize: 14,
    fontWeight: '500',
  },
  progressBars: {
    flexDirection: 'row',
    gap: 6,
  },
  progressBar: {
    width: 24,
    height: 4,
    borderRadius: 2,
  },
  progressBarActive: {
    backgroundColor: COLORS.lavender,
  },
  progressBarInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  placeholder: {
    width: 44,
  },
  rightElement: {
    minWidth: 44,
    alignItems: 'flex-end',
  },
});
