import { Pressable, View } from 'react-native';
import { Check } from 'lucide-react-native';

import { categoryGradients, colors, type Category } from '@/theme';
import { Gradient } from './gradient';
import { Text } from './text';

/** Filtre en pilule (Notifications) : lavande quand actif. */
export function FilterChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityState={{ selected: !!active }}
      onPress={onPress}
      style={({ pressed }) => ({
        height: 44,
        paddingHorizontal: 18,
        borderRadius: 22,
        justifyContent: 'center',
        backgroundColor: active ? colors.lavender : colors.surfaceRaised,
        borderWidth: active ? 0 : 1,
        borderColor: colors.line,
        opacity: pressed ? 0.75 : 1,
      })}
    >
      <Text variant="bodySm" weight="medium" color={active ? colors.onAccent : colors.ink}>
        {label}
      </Text>
    </Pressable>
  );
}

/**
 * Chip d'intérêt : dégradé de la catégorie quand il est choisi.
 * `sm` (32) sur le profil, `md` (44, avec coche) à l'inscription.
 */
export function InterestChip({
  label,
  category,
  selected = true,
  size = 'sm',
  onPress,
}: {
  label: string;
  category: Category;
  selected?: boolean;
  size?: 'sm' | 'md';
  onPress?: () => void;
}) {
  const height = size === 'sm' ? 32 : 44;
  const padX = size === 'sm' ? 14 : 18;
  const content = (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
      {selected && size === 'md' ? <Check size={16} color={colors.onGradient} strokeWidth={2.5} /> : null}
      <Text
        variant={size === 'sm' ? 'label' : 'bodySm'}
        weight="semibold"
        color={selected ? colors.onGradient : colors.ink}
      >
        {label}
      </Text>
    </View>
  );
  const shape = { height, paddingHorizontal: padX, borderRadius: height / 2, justifyContent: 'center' as const };

  const chip = selected ? (
    <Gradient {...categoryGradients[category]} style={shape}>
      {content}
    </Gradient>
  ) : (
    <View style={[shape, { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line }]}>{content}</View>
  );

  if (!onPress) return chip;
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
    >
      {chip}
    </Pressable>
  );
}
