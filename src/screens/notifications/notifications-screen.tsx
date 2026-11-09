import { useMemo, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { FilterChip } from '@/components/chip';
import { Screen } from '@/components/halo';
import { IconButton } from '@/components/icon-button';
import { ScreenHeader } from '@/components/screen-header';
import { Text } from '@/components/text';
import { useClubs } from '@/data/clubs-store';
import { clubs, initialNotifications, type AppNotification, type NotificationKind } from '@/data/mock';
import type { RootScreenProps } from '@/navigation/types';
import { colors, layout } from '@/theme';
import { NotificationRow, NotificationThumb } from './notification-row';

type Filter = 'all' | 'mentions' | 'clubs' | 'followers';

const FILTERS: { value: Filter; label: string; kinds?: NotificationKind[] }[] = [
  { value: 'all', label: 'Tout' },
  { value: 'mentions', label: 'Mentions', kinds: ['like', 'comment'] },
  { value: 'clubs', label: 'Clubs', kinds: ['invite'] },
  { value: 'followers', label: 'Abonnés', kinds: ['follow'] },
];

const GROUPS = [
  { value: 'today', label: "Aujourd'hui" },
  { value: 'week', label: 'Cette semaine' },
] as const;

/** Page 14 — Notifications. */
export function NotificationsScreen({ navigation }: RootScreenProps<'Notifications'>) {
  const insets = useSafeAreaInsets();
  const { join } = useClubs();
  const [items, setItems] = useState<AppNotification[]>(initialNotifications);
  const [filter, setFilter] = useState<Filter>('all');
  const [invites, setInvites] = useState<Record<string, 'accepted' | 'declined'>>({});
  const [followed, setFollowed] = useState<Record<string, boolean>>({});

  const visible = useMemo(() => {
    const kinds = FILTERS.find((f) => f.value === filter)?.kinds;
    return kinds ? items.filter((n) => kinds.includes(n.kind)) : items;
  }, [items, filter]);

  const markRead = (id: string) => setItems((all) => all.map((n) => (n.id === id ? { ...n, unread: false } : n)));
  const markAllRead = () => setItems((all) => all.map((n) => ({ ...n, unread: false })));

  const open = (n: AppNotification) => {
    markRead(n.id);
    if (n.kind === 'like' || n.kind === 'comment') navigation.navigate('Avis', { bookId: n.bookId });
    else if (n.kind === 'recommendation' && n.bookId) navigation.navigate('Livre', { bookId: n.bookId });
    else if (n.kind === 'invite' && n.clubId) navigation.navigate('ClubDetail', { clubId: n.clubId });
  };

  const answerInvite = (n: AppNotification, answer: 'accepted' | 'declined') => {
    markRead(n.id);
    setInvites((s) => ({ ...s, [n.id]: answer }));
    if (answer === 'accepted' && n.clubId) join(n.clubId);
  };

  const trailingFor = (n: AppNotification) => {
    if (n.kind === 'follow' && n.actorId) {
      const on = !!followed[n.actorId];
      return (
        <Button
          size="sm"
          variant={on ? 'secondary' : 'outline'}
          title={on ? 'Abonné' : 'Suivre'}
          onPress={() => setFollowed((s) => ({ ...s, [n.actorId!]: !on }))}
        />
      );
    }
    if (n.bookId && n.kind !== 'comment') return <NotificationThumb bookId={n.bookId} />;
    if (n.unread) return <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.lavender }} />;
    return null;
  };

  const actionsFor = (n: AppNotification) => {
    if (n.kind !== 'invite') return undefined;
    const answer = invites[n.id];
    if (answer) {
      return (
        <Text variant="label" color={answer === 'accepted' ? colors.lavender : colors.ink3}>
          {answer === 'accepted'
            ? `Tu as rejoint «\u00A0${clubs[n.clubId!].name}\u00A0».`
            : 'Invitation refusée.'}
        </Text>
      );
    }
    return (
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Button size="md" title="Accepter" onPress={() => answerInvite(n, 'accepted')} />
        <Button size="md" variant="secondary" title="Refuser" onPress={() => answerInvite(n, 'declined')} />
      </View>
    );
  };

  return (
    <Screen halo="topRight">
      <ScreenHeader paddingHorizontal={8} style={{ paddingRight: layout.screenMargin }}>
        <IconButton icon={ChevronLeft} variant="plain" iconSize={24} accessibilityLabel="Retour" onPress={navigation.goBack} />
        <Text
          variant="headline"
          accessibilityRole="header"
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.8}
          style={{ flex: 1, marginLeft: 2, marginRight: 6 }}
        >
          Notifications
        </Text>
        <Pressable accessibilityRole="button" onPress={markAllRead} hitSlop={10}>
          {({ pressed }) => (
            <Text variant="label" color={colors.lavender} style={{ opacity: pressed ? 0.6 : 1 }}>
              Tout marquer comme lu
            </Text>
          )}
        </Pressable>
      </ScreenHeader>

      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 8, flexGrow: 0 }}
          contentContainerStyle={{ paddingHorizontal: layout.screenMargin, gap: 8 }}
        >
          {FILTERS.map((f) => (
            <FilterChip key={f.value} label={f.label} active={filter === f.value} onPress={() => setFilter(f.value)} />
          ))}
        </ScrollView>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: Math.max(insets.bottom, 16) + 16 }}
      >
        {GROUPS.map((g) => {
          const group = visible.filter((n) => n.group === g.value);
          if (group.length === 0) return null;
          return (
            <View key={g.value} style={{ marginBottom: 8 }}>
              <Text
                variant="overline"
                color={colors.ink3}
                style={{ paddingHorizontal: layout.screenMargin, marginBottom: 8 }}
              >
                {g.label}
              </Text>
              {group.map((n) => (
                <NotificationRow
                  key={n.id}
                  item={n}
                  onPress={n.kind === 'follow' ? undefined : () => open(n)}
                  trailing={trailingFor(n)}
                  actions={actionsFor(n)}
                />
              ))}
            </View>
          );
        })}
        {visible.length === 0 ? (
          <Text variant="bodySm" color={colors.ink3} align="center" style={{ paddingVertical: 32 }}>
            {"Rien de neuf ici pour l'instant."}
          </Text>
        ) : null}
      </ScrollView>
    </Screen>
  );
}
