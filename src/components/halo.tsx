import { useId } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

import { colors } from '@/theme';

/** Positions relevées sur les maquettes (repère 390 pt de large). */
const presets = {
  topLeft: { cx: 40, cy: -10, rx: 260, ry: 215, opacity: 0.22, color: colors.violet },
  top: { cx: 195, cy: -30, rx: 290, ry: 230, opacity: 0.2, color: colors.violet },
  topStrong: { cx: 195, cy: -20, rx: 270, ry: 240, opacity: 0.3, color: colors.violet },
  topRight: { cx: 350, cy: -10, rx: 260, ry: 210, opacity: 0.22, color: colors.violet },
  rightPink: { cx: 420, cy: 360, rx: 150, ry: 190, opacity: 0.07, color: colors.like },
} as const;

export type HaloPosition = keyof typeof presets;

/** Lueur violette en fond d'écran (« violet · halos » sur la planche). */
export function Halo({ position }: { position: HaloPosition }) {
  const { width, height } = useWindowDimensions();
  const id = `halo${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const p = presets[position];
  const k = width / 390;

  return (
    <View style={[StyleSheet.absoluteFill, { pointerEvents: 'none' }]}>
      <Svg width={width} height={height}>
        <Defs>
          <RadialGradient
            id={id}
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform={`translate(${p.cx * k} ${p.cy * k}) scale(${p.rx * k} ${p.ry * k})`}
          >
            <Stop offset="0" stopColor={p.color} stopOpacity={p.opacity} />
            <Stop offset="1" stopColor={p.color} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width={width} height={height} fill={`url(#${id})`} />
      </Svg>
    </View>
  );
}

/** Fond d'écran : couleur `bg` et halos éventuels. */
export function Screen({
  halo,
  children,
}: {
  halo?: HaloPosition | HaloPosition[];
  children: React.ReactNode;
}) {
  const halos = halo ? (Array.isArray(halo) ? halo : [halo]) : [];
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      {halos.map((h) => (
        <Halo key={h} position={h} />
      ))}
      {children}
    </View>
  );
}
