import { Text as RNText, View, type StyleProp, type ViewStyle } from 'react-native';

import { categoryGradients, colors, fonts, gradients, type Category } from '@/theme';
import type { IconComponent } from './button';
import { Gradient } from './gradient';

type Badge = {
  icon: IconComponent;
  color: string;
  /** Icône pleine (cœur du « j'aime »). */
  filled?: boolean;
};

type Props = {
  initials?: string;
  /** Dégradé de catégorie pour le fond (variante `gradient`). */
  tone?: Category;
  /**
   * `gradient` : pastille pleine, initiales foncées (discussion, notifications).
   * `ring` : anneau dégradé, initiales claires (profil, accueil).
   * `icon` : pastille lavande avec une icône (recommandations).
   */
  variant?: 'gradient' | 'ring' | 'icon';
  size?: number;
  icon?: IconComponent;
  badge?: Badge;
  /** Couleur du fond derrière l'avatar, pour détourer la pastille. */
  backdrop?: string;
  style?: StyleProp<ViewStyle>;
};

export function Avatar({
  initials = '',
  tone = 'sf',
  variant = 'gradient',
  size = 44,
  icon: Icon,
  badge,
  backdrop = colors.bg,
  style,
}: Props) {
  const fontSize = Math.max(12, Math.round(size * 0.35));
  const initialsText = (color: string) => (
    <RNText
      allowFontScaling={false}
      style={{ fontFamily: size >= 64 ? fonts.bold : fonts.semiBold, fontSize, color }}
    >
      {initials}
    </RNText>
  );

  const circle = { width: size, height: size, borderRadius: size / 2 };

  let body: React.ReactNode;
  if (variant === 'ring') {
    const ring = Math.max(2, Math.round(size * 0.035));
    body = (
      <Gradient {...gradients.avatarRing} style={[circle, { padding: ring }]}>
        <View
          style={{
            flex: 1,
            borderRadius: size,
            backgroundColor: colors.bg,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {initialsText(colors.ink)}
        </View>
      </Gradient>
    );
  } else if (variant === 'icon') {
    body = (
      <View
        style={[
          circle,
          {
            backgroundColor: colors.sparkle,
            borderWidth: 1,
            borderColor: colors.lineStrong,
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}
      >
        {Icon ? <Icon size={Math.round(size * 0.4)} color={colors.lavender} strokeWidth={2} /> : null}
      </View>
    );
  } else {
    body = (
      <Gradient {...categoryGradients[tone]} style={[circle, { alignItems: 'center', justifyContent: 'center' }]}>
        {initialsText(colors.onGradient)}
      </Gradient>
    );
  }

  return (
    <View style={[{ width: size, height: size }, style]} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      {body}
      {badge ? <AvatarBadge {...badge} backdrop={backdrop} /> : null}
    </View>
  );
}

function AvatarBadge({ icon: Icon, color, filled, backdrop }: Badge & { backdrop: string }) {
  const size = 20; // pastille 18 + liseré 2 couleur du fond (relevé sur Notifications)
  return (
    <View
      style={{
        position: 'absolute',
        right: -3,
        bottom: -3,
        width: size + 2,
        height: size + 2,
        borderRadius: size,
        backgroundColor: backdrop,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: size - 2,
          height: size - 2,
          borderRadius: size,
          backgroundColor: color,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon size={10} color={colors.onGradient} strokeWidth={2.6} {...(filled ? { fill: colors.onGradient } : null)} />
      </View>
    </View>
  );
}
