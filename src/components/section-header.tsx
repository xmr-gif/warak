import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors } from '@/theme';
import { Text } from './text';

type Props = {
  title: string;
  /** Lien à droite, par exemple « Voir tout ». */
  actionLabel?: string;
  onAction?: () => void;
  style?: StyleProp<ViewStyle>;
};

/** Titre de section en serif, avec un lien lavande optionnel à droite. */
export function SectionHeader({ title, actionLabel, onAction, style }: Props) {
  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, style]}>
      <Text variant="section" accessibilityRole="header">
        {title}
      </Text>
      {actionLabel ? (
        <Pressable
          onPress={onAction}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel={actionLabel}
          style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
        >
          <Text variant="label" color={colors.lavender}>
            {actionLabel}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
