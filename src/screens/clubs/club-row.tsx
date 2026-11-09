import type { ReactNode } from 'react';
import { View } from 'react-native';

import { Card } from '@/components/card';
import { ClubIcon } from '@/components/club-icon';
import { Text } from '@/components/text';
import { books, formatCount, type Club } from '@/data/mock';
import { colors } from '@/theme';

/** Carte d'un club dans la liste : icône, nom, membres, lecture en cours. */
export function ClubRow({
  club,
  unread = 0,
  trailing,
  onPress,
}: {
  club: Club;
  unread?: number;
  trailing?: ReactNode;
  onPress?: () => void;
}) {
  const book = books[club.bookId];
  return (
    <Card
      onPress={onPress}
      accessibilityLabel={`${club.name}, ${club.members} membres${unread ? `, ${unread} messages non lus` : ''}`}
      style={{ flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 12 }}
    >
      <ClubIcon category={club.category} icon={club.icon} size={56} />
      <View style={{ flex: 1, gap: 4 }}>
        <Text variant="button" numberOfLines={2}>
          {club.name}
        </Text>
        <Text variant="caption" color={colors.ink3} numberOfLines={1}>
          {formatCount(club.members)} membres · {club.topic}
        </Text>
        <Text variant="caption" weight="medium" color={colors.ink2} numberOfLines={2}>
          Lecture en cours{'\u00A0'}: {book.title}
        </Text>
      </View>
      {unread > 0 ? <UnreadBadge count={unread} /> : trailing}
    </Card>
  );
}

function UnreadBadge({ count }: { count: number }) {
  return (
    <View
      style={{
        minWidth: 26,
        height: 26,
        paddingHorizontal: 7,
        borderRadius: 13,
        backgroundColor: colors.lavender,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text variant="caption" weight="semibold" color={colors.onAccent}>
        {count > 99 ? '99+' : count}
      </Text>
    </View>
  );
}
