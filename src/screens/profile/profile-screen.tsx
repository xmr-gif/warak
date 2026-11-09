import { useState } from 'react';
import { Alert, Pressable, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Flame, Sun } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar } from '@/components/avatar';
import { BookCover } from '@/components/book-cover';
import { Button } from '@/components/button';
import { Card } from '@/components/card';
import { InterestChip } from '@/components/chip';
import { Screen } from '@/components/halo';
import { IconButton } from '@/components/icon-button';
import { ProgressBar } from '@/components/progress-bar';
import { Text } from '@/components/text';
import { UnderlineTabs } from '@/components/underline-tabs';
import { books, people, profile } from '@/data/mock';
import { useTabBarSpace } from '@/navigation/tab-bar';
import { colors, gradients, layout, radius } from '@/theme';

type Shelf = 'reading' | 'toRead' | 'read';

const COVER = 98;
const COVER_GAP = 14;

/** Page 15 — Profil. */
export function ProfileScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const tabBarSpace = useTabBarSpace();
  const [shelf, setShelf] = useState<Shelf>('reading');

  const me = people[profile.personId];
  const { stats, goal, shelves } = profile;
  const left = goal.target - goal.done;
  const openBook = (bookId: string) => navigation.navigate('Livre', { bookId });

  const shelfBooks =
    shelf === 'reading'
      ? shelves.reading
      : (shelf === 'toRead' ? shelves.toRead : shelves.read).map((bookId) => ({ bookId, progress: undefined }));
  const hiddenRead = shelf === 'read' ? stats.read - shelves.read.length : 0;

  return (
    <Screen halo={['topStrong', 'rightPink']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: tabBarSpace + 24 }}>
        <View style={{ paddingHorizontal: layout.screenMargin, marginTop: insets.top + 13 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <Avatar variant="ring" initials={me.initials} size={84} />
            <View style={{ flex: 1, paddingRight: 52 }}>
              <Text variant="headlineSm" accessibilityRole="header" numberOfLines={1}>
                {me.name}
              </Text>
              <Text variant="label" weight="regular" color={colors.ink3} style={{ marginTop: 4 }}>
                {profile.handle}
              </Text>
              <Button
                size="md"
                variant="secondary"
                title="Modifier le profil"
                onPress={() => Alert.alert('Modifier le profil', "L'édition du profil arrive bientôt.")}
                style={{ alignSelf: 'flex-start', marginTop: 9 }}
              />
            </View>
          </View>

          <Text variant="bodySm" style={{ marginTop: 8 }}>
            {profile.bio}
          </Text>

          <View style={{ flexDirection: 'row', gap: 10, marginTop: 18 }}>
            <Stat value={stats.read} label="livres lus" />
            <Stat value={stats.reviews} label="avis" />
            <Stat value={stats.followers} label="abonnés" />
          </View>

          <Text variant="overline" color={colors.ink3} style={{ marginTop: 14 }}>
            Mes intérêts
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
            {profile.interests.map((i) => (
              <InterestChip key={i.label} label={i.label} category={i.category} />
            ))}
          </View>

          <Card variant="feature" style={{ marginTop: 14, paddingTop: 10, paddingBottom: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text variant="bodySm" weight="semibold" style={{ flex: 1 }} numberOfLines={1}>
                Objectif de lecture {goal.year}
              </Text>
              <Flame size={14} color={colors.note} strokeWidth={2.2} />
              <Text variant="label" weight="semibold" color={colors.note}>
                {`${goal.streakDays} jours d'affilée`}
              </Text>
            </View>
            <ProgressBar
              value={goal.done / goal.target}
              height={6}
              fill={gradients.goal}
              style={{ marginTop: 12 }}
              accessibilityLabel={`${goal.done} livres lus sur ${goal.target}`}
            />
            <Text variant="caption" color={colors.ink2} style={{ marginTop: 6 }}>
              {goal.done} livres sur {goal.target} · {left > 0 ? `plus que ${left} pour y arriver` : 'objectif atteint !'}
            </Text>
          </Card>

          <UnderlineTabs<Shelf>
            tabs={[
              { value: 'reading', label: `En cours · ${shelves.reading.length}` },
              { value: 'toRead', label: `À lire · ${shelves.toRead.length}` },
              { value: 'read', label: `Lus · ${stats.read}` },
            ]}
            value={shelf}
            onChange={setShelf}
            style={{ marginTop: 16 }}
          />

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', columnGap: COVER_GAP, rowGap: 18, marginTop: 14 }}>
            {shelfBooks.map(({ bookId, progress }) => (
              <Pressable
                key={bookId}
                accessibilityRole="button"
                accessibilityLabel={`${books[bookId].title}${progress != null ? `, lu à ${Math.round(progress * 100)} %` : ''}`}
                onPress={() => openBook(bookId)}
                style={({ pressed }) => ({ width: COVER, opacity: pressed ? 0.8 : 1 })}
              >
                <BookCover book={books[bookId]} width={COVER} />
                {progress != null ? (
                  <>
                    <ProgressBar value={progress} height={4} style={{ marginTop: 8 }} />
                    <Text variant="label" weight="regular" color={colors.ink2} style={{ marginTop: 2 }}>
                      {Math.round(progress * 100)}
                      {'\u00A0'}%
                    </Text>
                  </>
                ) : null}
              </Pressable>
            ))}
          </View>
          {hiddenRead > 0 ? (
            <Text variant="caption" color={colors.ink3} style={{ marginTop: 14 }}>
              Et {hiddenRead} autres livres lus
            </Text>
          ) : null}
        </View>
      </ScrollView>

      <IconButton
        icon={Sun}
        accessibilityLabel="Apparence"
        onPress={() => Alert.alert('Apparence', "Le thème clair n'est pas encore disponible.")}
        style={{ position: 'absolute', top: insets.top + layout.headerTop, right: layout.screenMargin }}
      />
    </Screen>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <View
      accessibilityLabel={`${value} ${label}`}
      style={{
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: radius.tile,
        borderCurve: 'continuous',
        borderWidth: 1,
        borderColor: colors.line,
        backgroundColor: colors.surface,
      }}
    >
      <Text variant="stat" style={{ fontVariant: ['tabular-nums'] }}>
        {value}
      </Text>
      <Text variant="caption" color={colors.ink2} style={{ marginTop: 3 }}>
        {label}
      </Text>
    </View>
  );
}
