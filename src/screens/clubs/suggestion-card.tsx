import { Pressable, View } from 'react-native';

import { Button } from '@/components/button';
import { Gradient } from '@/components/gradient';
import { Text } from '@/components/text';
import { formatCount, type Club } from '@/data/mock';
import { categoryGradients, colors, radius } from '@/theme';

/** Carte « Suggestions pour toi » : bandeau de la catégorie, nom, membres, Rejoindre. */
export function SuggestionCard({
  club,
  joined,
  onJoin,
  onPress,
}: {
  club: Club;
  joined: boolean;
  onJoin: () => void;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${club.name}, ${club.members} membres`}
      onPress={onPress}
      style={({ pressed }) => ({
        width: 228,
        borderRadius: radius.card,
        borderCurve: 'continuous',
        borderWidth: 1,
        borderColor: colors.line,
        backgroundColor: colors.surface,
        overflow: 'hidden',
        opacity: pressed ? 0.8 : 1,
      })}
    >
      <Gradient {...categoryGradients[club.category]} style={{ height: 52 }} />
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 14, paddingVertical: 12 }}>
        <View style={{ flex: 1, gap: 2 }}>
          <Text variant="bodyStrong" numberOfLines={2}>
            {club.name}
          </Text>
          <Text variant="caption" color={colors.ink3} numberOfLines={1}>
            {formatCount(club.members)} membres
          </Text>
        </View>
        <Button
          size="sm"
          variant={joined ? 'secondary' : 'outline'}
          title={joined ? 'Membre' : 'Rejoindre'}
          onPress={onJoin}
          accessibilityLabel={joined ? `Membre de ${club.name}` : `Rejoindre ${club.name}`}
        />
      </View>
    </Pressable>
  );
}
