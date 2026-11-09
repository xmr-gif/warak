import { useState, type ReactNode } from 'react';
import { StyleSheet, type LayoutChangeEvent, type StyleProp, type ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import type { GradientSpec } from '@/theme';

type Props = GradientSpec & {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
};

/**
 * Dégradé linéaire défini par un angle CSS (135° par défaut, comme la planche).
 * expo-linear-gradient attend des points de départ et d'arrivée : on les calcule
 * à partir de la taille réelle de la vue pour obtenir le même rendu qu'en CSS,
 * quel que soit le rapport largeur / hauteur (chip, carte, couverture…).
 */
export function Gradient({ colors, locations, angle = 135, style, children }: Props) {
  const fixed = StyleSheet.flatten(style) ?? {};
  const initial =
    typeof fixed.width === 'number' && typeof fixed.height === 'number'
      ? { width: fixed.width, height: fixed.height }
      : { width: 1, height: 1 };
  const [size, setSize] = useState(initial);

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    if (Math.abs(width - size.width) > 0.5 || Math.abs(height - size.height) > 0.5) {
      setSize({ width, height });
    }
  };

  const { start, end } = pointsForAngle(angle, size.width, size.height);

  return (
    <LinearGradient
      colors={colors}
      locations={locations}
      start={start}
      end={end}
      style={style}
      onLayout={onLayout}
    >
      {children}
    </LinearGradient>
  );
}

/** Même ligne de dégradé que `linear-gradient(<angle>deg, …)` en CSS. */
function pointsForAngle(angle: number, width: number, height: number) {
  const rad = (angle * Math.PI) / 180;
  const dx = Math.sin(rad);
  const dy = -Math.cos(rad);
  const length = Math.abs(width * dx) + Math.abs(height * dy);
  const hx = (dx * length) / 2;
  const hy = (dy * length) / 2;
  return {
    start: { x: (width / 2 - hx) / width, y: (height / 2 - hy) / height },
    end: { x: (width / 2 + hx) / width, y: (height / 2 + hy) / height },
  };
}
