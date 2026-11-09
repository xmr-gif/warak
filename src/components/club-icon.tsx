import { View, type StyleProp, type ViewStyle } from 'react-native';
import { BookOpen, Brain, Feather, MessageCircle, Sprout } from 'lucide-react-native';

import type { ClubIconName } from '@/data/mock';
import { categoryGradients, colors, type Category } from '@/theme';
import type { IconComponent } from './button';
import { Gradient } from './gradient';
import { PlanetIcon } from './icons/planet';

const icons: Record<ClubIconName, IconComponent> = {
  planet: PlanetIcon,
  chat: MessageCircle,
  book: BookOpen,
  brain: Brain,
  feather: Feather,
  sprout: Sprout,
};

type Props = {
  category: Category;
  icon: ClubIconName;
  /** 56 dans la liste, 64 sur la fiche, 40 dans la discussion. */
  size?: number;
  /** Liseré couleur du fond, quand l'icône chevauche une bannière. */
  framed?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function ClubIcon({ category, icon, size = 56, framed, style }: Props) {
  const Icon = icons[icon];
  const r = Math.round(size * 0.29);
  const tile = (
    <Gradient
      {...categoryGradients[category]}
      style={{
        width: size,
        height: size,
        borderRadius: r,
        borderCurve: 'continuous',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Icon size={Math.round(size * 0.43)} color={colors.onGradient} strokeWidth={2} />
    </Gradient>
  );

  if (!framed) return <View style={style}>{tile}</View>;
  return (
    <View
      style={[
        { padding: 4, borderRadius: r + 4, borderCurve: 'continuous', backgroundColor: colors.bg },
        style,
      ]}
    >
      {tile}
    </View>
  );
}
