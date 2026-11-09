import { useState } from 'react';
import { Alert, ScrollView, Share, View } from 'react-native';
import { Check, ChevronLeft, ChevronRight, Ellipsis, MessageCircle, Share as ShareIcon, UserPlus } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar } from '@/components/avatar';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { ClubIcon } from '@/components/club-icon';
import { Gradient } from '@/components/gradient';
import { Screen } from '@/components/halo';
import { IconButton } from '@/components/icon-button';
import { Text } from '@/components/text';
import { UnderlineTabs } from '@/components/underline-tabs';
import { useClubs } from '@/data/clubs-store';
import { clubs, formatCount, people, type Club } from '@/data/mock';
import type { RootScreenProps } from '@/navigation/types';
import { colors, gradients, layout, radius } from '@/theme';
import { ClubBanner } from './club-banner';
import { ReadingCard } from './reading-card';

type Tab = 'discussions' | 'lecture' | 'membres';

/** Page 12 — Fiche d'un club. */
export function ClubDetailScreen({ route, navigation }: RootScreenProps<'ClubDetail'>) {
  const club = clubs[route.params.clubId];
  const insets = useSafeAreaInsets();
  const { isMember, join, leave } = useClubs();
  const member = isMember(club.id);
  const [tab, setTab] = useState<Tab>('discussions');

  const bannerHeight = 190 + Math.max(0, insets.top - 47);
  const footerHeight = layout.buttonHeight + 16 + Math.max(insets.bottom, 16);
  const openChat = () => navigation.navigate('ClubChat', { clubId: club.id });

  const toggleMembership = () => {
    if (!member) return join(club.id);
    Alert.alert(`Quitter «\u00A0${club.name}\u00A0»\u00A0?`, 'Tu ne verras plus ses discussions.', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Quitter', style: 'destructive', onPress: () => leave(club.id) },
    ]);
  };

  const invite = () =>
    Share.share({
      message: `Rejoins «\u00A0${club.name}\u00A0» sur Warak : ${formatCount(club.members)} lecteurs autour de ${club.topic.toLowerCase()}.`,
    }).catch(() => undefined);

  const more = () =>
    Alert.alert(club.name, undefined, [
      { text: 'Couper les notifications' },
      { text: 'Signaler le club', style: 'destructive' },
      { text: 'Annuler', style: 'cancel' },
    ]);

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: footerHeight + 16 }}>
        <ClubBanner category={club.category} height={bannerHeight} />

        <View style={{ paddingHorizontal: layout.screenMargin }}>
          <ClubIcon category={club.category} icon={club.icon} size={64} framed style={{ marginTop: -36, alignSelf: 'flex-start' }} />
          <Text variant="headline" accessibilityRole="header" style={{ marginTop: 11 }}>
            {club.name}
          </Text>
          <Text variant="label" weight="regular" color={colors.ink2} style={{ marginTop: 4 }}>
            {club.topic} · {formatCount(club.members)} membres · {club.visibility}
          </Text>

          <View style={{ flexDirection: 'row', gap: 10, marginTop: 13 }}>
            <Button
              size="md"
              variant={member ? 'secondary' : 'primary'}
              title={member ? 'Membre' : 'Rejoindre'}
              icon={member ? Check : UserPlus}
              onPress={toggleMembership}
              accessibilityLabel={member ? 'Membre du club. Toucher pour quitter.' : 'Rejoindre le club'}
              style={{ flex: 1 }}
            />
            <Button size="md" variant="secondary" title="Inviter" icon={ShareIcon} onPress={invite} style={{ flex: 1 }} />
          </View>

          <UnderlineTabs<Tab>
            tabs={[
              { value: 'discussions', label: 'Discussions' },
              { value: 'lecture', label: 'Lecture' },
              { value: 'membres', label: 'Membres' },
            ]}
            value={tab}
            onChange={setTab}
            style={{ marginTop: 18 }}
          />

          <View style={{ marginTop: 16 }}>
            {tab === 'discussions' ? (
              <DiscussionsTab
                club={club}
                onOpenBook={() => navigation.navigate('Livre', { bookId: club.bookId })}
                onOpenThread={openChat}
              />
            ) : tab === 'lecture' ? (
              <ReadingTab club={club} onOpenBook={() => navigation.navigate('Livre', { bookId: club.bookId })} />
            ) : (
              <MembersTab club={club} />
            )}
          </View>
        </View>
      </ScrollView>

      {/* Boutons posés sur la bannière, fixes pendant le défilement */}
      <View
        style={{
          position: 'absolute',
          top: insets.top + layout.headerTop,
          left: layout.screenMargin,
          right: layout.screenMargin,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <IconButton icon={ChevronLeft} variant="scrim" iconSize={22} accessibilityLabel="Retour" onPress={navigation.goBack} />
        <IconButton icon={Ellipsis} variant="scrim" iconSize={22} accessibilityLabel="Plus d'options" onPress={more} />
      </View>

      {/* Action principale fixée en bas */}
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
        <Gradient {...gradients.fadeToBg} style={{ height: 24 }} />
        <View
          style={{
            backgroundColor: colors.bg,
            paddingHorizontal: layout.screenMargin,
            paddingBottom: Math.max(insets.bottom, 16),
          }}
        >
          {member ? (
            <Button title="Rejoindre la discussion" icon={MessageCircle} onPress={openChat} />
          ) : (
            <Button title="Rejoindre le club" icon={UserPlus} onPress={() => join(club.id)} />
          )}
        </View>
      </View>
    </Screen>
  );
}

function DiscussionsTab({
  club,
  onOpenBook,
  onOpenThread,
}: {
  club: Club;
  onOpenBook: () => void;
  onOpenThread: () => void;
}) {
  return (
    <View>
      <ReadingCard club={club} onPress={onOpenBook} />
      <Text variant="overline" color={colors.ink3} style={{ marginTop: 14 }}>
        Fils de discussion
      </Text>
      <View style={{ marginTop: 12, gap: 8 }}>
        {club.threads.map((t) => (
          <Card
            key={t.id}
            onPress={onOpenThread}
            accessibilityLabel={`${t.title}, ${t.replies} réponses, ${t.lastActivity}`}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12 }}
          >
            <View style={{ flex: 1, gap: 4 }}>
              <Text variant="bodyStrong" numberOfLines={2}>
                {t.title}
              </Text>
              <Text variant="caption" color={colors.ink3}>
                {t.replies} réponses · {t.lastActivity}
              </Text>
            </View>
            <ChevronRight size={18} color={colors.ink3} strokeWidth={2} />
          </Card>
        ))}
      </View>
    </View>
  );
}

function ReadingTab({ club, onOpenBook }: { club: Club; onOpenBook: () => void }) {
  return (
    <View>
      <ReadingCard club={club} onPress={onOpenBook} />
      <Text variant="overline" color={colors.ink3} style={{ marginTop: 14 }}>
        Programme · {club.chapters} chapitres
      </Text>
      <View style={{ marginTop: 12, flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {Array.from({ length: club.chapters }, (_, i) => i + 1).map((n) => {
          const done = n < club.chapter;
          const current = n === club.chapter;
          return (
            <View
              key={n}
              accessibilityLabel={`Chapitre ${n}${done ? ', lu' : current ? ', en cours' : ''}`}
              style={{
                width: 40,
                height: 40,
                borderRadius: radius.buttonSm,
                borderCurve: 'continuous',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: done ? colors.lavender : colors.surface,
                borderWidth: done ? 0 : current ? 1.5 : 1,
                borderColor: current ? colors.lavender : colors.line,
              }}
            >
              <Text variant="label" weight="semibold" color={done ? colors.onAccent : current ? colors.lavender : colors.ink3}>
                {n}
              </Text>
            </View>
          );
        })}
      </View>
      <Card style={{ marginTop: 16, gap: 4 }}>
        <Text variant="overline" color={colors.ink3}>
          Prochaine séance
        </Text>
        <Text variant="bodyStrong">Dimanche · 21:00</Text>
        <Text variant="caption" color={colors.ink2}>
          Discussion des chapitres {club.chapter} et {Math.min(club.chapter + 1, club.chapters)}
        </Text>
      </Card>
    </View>
  );
}

function MembersTab({ club }: { club: Club }) {
  return (
    <View>
      <Text variant="caption" color={colors.ink3}>
        {formatCount(club.members)} membres · {club.online} en ligne
      </Text>
      <View style={{ marginTop: 12, gap: 8 }}>
        {club.memberIds.map((id) => {
          const p = people[id];
          const admin = club.admins.includes(id);
          return (
            <Card key={id} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10 }}>
              <Avatar initials={p.initials} tone={p.tone} size={40} />
              <View style={{ flex: 1 }}>
                <Text variant="bodyStrong" numberOfLines={1}>
                  {p.id === 'salma' ? `${p.name} (toi)` : p.name}
                </Text>
                <Text variant="caption" color={admin ? colors.lavender : colors.ink3}>
                  {admin ? 'Admin du club' : 'Membre'}
                </Text>
              </View>
            </Card>
          );
        })}
      </View>
    </View>
  );
}
