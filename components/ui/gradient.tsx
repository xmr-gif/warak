import * as React from 'react';
import { View, StyleSheet, type ViewProps } from 'react-native';
import Svg, { Defs, LinearGradient as SvgLinearGradient, Stop, Rect } from 'react-native-svg';

export interface LinearGradientProps extends ViewProps {
  colors: readonly string[] | string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  borderRadius?: number;
  children?: React.ReactNode;
}

let gradientCount = 0;

export function LinearGradient({
  colors,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
  borderRadius = 0,
  style,
  children,
  ...props
}: LinearGradientProps) {
  const [gradientId] = React.useState(() => `grad-${++gradientCount}`);

  return (
    <View style={[{ overflow: 'hidden', borderRadius }, style]} {...props}>
      <Svg style={StyleSheet.absoluteFill} width="100%" height="100%">
        <Defs>
          <SvgLinearGradient
            id={gradientId}
            x1={`${start.x * 100}%`}
            y1={`${start.y * 100}%`}
            x2={`${end.x * 100}%`}
            y2={`${end.y * 100}%`}>
            {colors.map((c, i) => {
              const offset = colors.length === 1 ? 0 : (i / (colors.length - 1)) * 100;
              return <Stop key={i} offset={`${offset}%`} stopColor={c} />;
            })}
          </SvgLinearGradient>
        </Defs>
        <Rect
          width="100%"
          height="100%"
          rx={borderRadius}
          ry={borderRadius}
          fill={`url(#${gradientId})`}
        />
      </Svg>
      {children}
    </View>
  );
}
