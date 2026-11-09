import Svg, { Circle, Ellipse } from 'react-native-svg';

/**
 * Planète à anneau (icône du club SF). Lucide n'en propose pas :
 * même grille 24 × 24 et même trait que ses icônes.
 */
export function PlanetIcon({
  size = 24,
  color = '#000',
  strokeWidth = 2,
}: {
  size?: number;
  color?: string;
  strokeWidth?: number;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="4.6" stroke={color} strokeWidth={strokeWidth} />
      <Ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="3.6"
        transform="rotate(-20 12 12)"
        stroke={color}
        strokeWidth={strokeWidth}
      />
    </Svg>
  );
}
