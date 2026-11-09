import type { ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import { Heart, MessageCircle, Plus, Sparkle, User } from 'lucide-react-native';

import { Avatar } from '@/components/avatar';
import { BookCover } from '@/components/book-cover';
import { Text } from '@/components/text';
import { books, clubs, people, type AppNotification } from '@/data/mock';
import { categoryGradients, colors, layout } from '@/theme';

const badges = {
  like: { icon: Heart, color: colors.like, filled: true },
  comment: { icon: MessageCircle, color: categoryGradients.sf.colors[0] },
  invite: { icon: User, color: categoryGradients.philo.colors[0] },
  follow: { icon: Plus, color: colors.online },
} as const;

/** Une notification : avatar et pastille, texte, heure, élément à droite, actions éventuelles. */
export function NotificationRow({
  item,
  trailing,
  actions,
  onPress,
}: {
  item: AppNotification;
  trailing?: ReactNode;
  actions?: ReactNode;
  onPress?: () => void;
}) {
  const actor = item.actorId ? people[item.actorId] : undefined;
  const backdrop = item.unread ? colors.unread : colors.bg;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      style={({ pressed }) => ({
        paddingHorizontal: layout.screenMargin,
        paddingVertical: 11,
        backgroundColor: pressed && onPress ? colors.surfaceRaised : backdrop,
      })}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
        {actor && item.kind !== 'recommendation' ? (
          <Avatar initials={actor.initials} tone={actor.tone} size={44} badge={badges[item.kind]} backdrop={backdrop} />
        ) : (
          <Avatar variant="icon" icon={Sparkle} size={44} />
        )}
        <View style={{ flex: 1 }}>
          <Text variant="bodySm" color={colors.ink}>
            <Message item={item} />
          </Text>
          <Text variant="caption" color={colors.ink3} style={{ marginTop: 3 }}>
            {item.when}
          </Text>
        </View>
        {trailing}
      </View>
      {actions ? <View style={{ marginLeft: 44 + 14, marginTop: 10 }}>{actions}</View> : null}
    </Pressable>
  );
}

function Strong({ children }: { children: ReactNode }) {
  return (
    <Text variant="bodySm" weight="semibold" color={colors.ink}>
      {children}
    </Text>
  );
}

/** Texte de la notification selon son type. */
function Message({ item }: { item: AppNotification }) {
  const actor = item.actorId ? people[item.actorId].name.split(' ')[0] : '';
  const q = (s: string) => `«\u00A0${s}\u00A0»`;
  switch (item.kind) {
    case 'like':
      return (
        <>
          <Strong>{actor}</Strong> a aimé ton avis sur {q(books[item.bookId!].title)}
        </>
      );
    case 'comment':
      return (
        <>
          <Strong>{actor}</Strong> a commenté{'\u00A0'}: {q(item.quote ?? '')}
        </>
      );
    case 'invite':
      return (
        <>
          <Strong>{actor}</Strong> {"t'invite à rejoindre le club "}
          {q(clubs[item.clubId!].name)}
        </>
      );
    case 'follow':
      return (
        <>
          <Strong>{actor}</Strong> a commencé à te suivre
        </>
      );
    case 'recommendation':
      return (
        <>
          <Strong>Pour toi{'\u00A0'}:</Strong> {q(books[item.bookId!].title)}
          {`, d'après tes intérêts en ${item.reason}`}
        </>
      );
  }
}

/** Vignette de couverture à droite d'une notification. */
export function NotificationThumb({ bookId }: { bookId: string }) {
  return <BookCover book={books[bookId]} width={32} height={48} />;
}
