import { useId } from 'react';
import { View } from 'react-native';
import Svg, { Circle, Defs, Ellipse, RadialGradient, Stop } from 'react-native-svg';

import { Gradient } from '@/components/gradient';
import { categoryGradients, colors, gradients, type Category } from '@/theme';

/** Étoiles relevées sur la maquette (repère 390 × 190). */
const STARS = [
  { x: 72, y: 32, r: 2.2, o: 0.95 },
  { x: 211, y: 39, r: 1.4, o: 0.75 },
  { x: 151, y: 71, r: 1.4, o: 0.7 },
  { x: 45, y: 121, r: 1.6, o: 0.75 },
  { x: 181, y: 142, r: 2, o: 0.6 },
  { x: 300, y: 22, r: 1.1, o: 0.5 },
];

/**
 * Bannière de la fiche club. Le club SF a l'illustration de la maquette
 * (planète et anneau) ; les autres catégories reçoivent une variante
 * construite sur leur dégradé.
 */
export function ClubBanner({ category, height }: { category: Category; height: number }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');

  if (category === 'sf') {
    return (
      <View style={{ height, overflow: 'hidden' }}>
        <Gradient {...gradients.bannerSf} style={{ position: 'absolute', inset: 0 }} />
        <Svg
          width="100%"
          height={height}
          viewBox={`0 0 390 ${height}`}
          preserveAspectRatio="xMidYMax slice"
          style={{ position: 'absolute', inset: 0 }}
        >
          <Defs>
            <RadialGradient id={`planet${id}`} cx="0.37" cy="0.37" r="0.75">
              {gradients.planet.colors.map((c, i) => (
                <Stop key={c} offset={gradients.planet.locations[i]} stopColor={c} />
              ))}
            </RadialGradient>
          </Defs>
          {STARS.map((s) => (
            <Circle key={`${s.x}-${s.y}`} cx={s.x} cy={s.y + (height - 190)} r={s.r} fill={colors.star} fillOpacity={s.o} />
          ))}
          <Circle cx="351" cy={119 + (height - 190)} r="75" fill={`url(#planet${id})`} />
          <Ellipse
            cx="335.5"
            cy={111.8 + (height - 190)}
            rx="124"
            ry="26.8"
            transform={`rotate(-18 335.5 ${111.8 + (height - 190)})`}
            stroke="rgba(255,232,244,0.72)"
            strokeWidth="2"
            fill="none"
          />
        </Svg>
      </View>
    );
  }

  const g = categoryGradients[category];
  return (
    <View style={{ height, overflow: 'hidden' }}>
      <Gradient colors={g.colors} style={{ position: 'absolute', inset: 0 }} />
      <Gradient
        colors={['rgba(8,7,13,0)', 'rgba(8,7,13,0.55)']}
        angle={180}
        style={{ position: 'absolute', inset: 0 }}
      />
      <Svg
        width="100%"
        height={height}
        viewBox={`0 0 390 ${height}`}
        preserveAspectRatio="xMidYMax slice"
        style={{ position: 'absolute', inset: 0 }}
      >
        <Circle cx="335" cy={height - 70} r="64" fill="rgba(255,255,255,0.16)" />
        <Circle cx="268" cy={height - 118} r="34" stroke="rgba(255,255,255,0.35)" strokeWidth="2" fill="none" />
      </Svg>
    </View>
  );
}
