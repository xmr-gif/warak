import type { ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { layout } from '@/theme';

/**
 * Rangée d'en-tête de 44 pt posée sous la zone sûre du haut.
 * Le contenu (titre, retour, actions) est libre : chaque écran compose le sien.
 */
export function ScreenHeader({
  children,
  paddingHorizontal = layout.screenMargin,
  style,
}: {
  children: ReactNode;
  paddingHorizontal?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        {
          marginTop: insets.top + layout.headerTop,
          minHeight: layout.headerHeight,
          paddingHorizontal,
          flexDirection: 'row',
          alignItems: 'center',
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
