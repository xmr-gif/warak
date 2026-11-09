import { useMemo, useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Plus, Search } from 'lucide-react-native';

import { Button } from '@/components/button';
import { Screen } from '@/components/halo';
import { IconButton } from '@/components/icon-button';
import { ScreenHeader } from '@/components/screen-header';
import { SectionHeader } from '@/components/section-header';
import { SegmentedControl } from '@/components/segmented-control';
import { Text } from '@/components/text';
import { TextField } from '@/components/text-field';
import { useClubs } from '@/data/clubs-store';
import { clubs, suggestedClubIds, type Club } from '@/data/mock';
import { useTabBarSpace } from '@/navigation/tab-bar';
import { colors, layout } from '@/theme';
import { ClubRow } from './club-row';
import { SuggestionCard } from './suggestion-card';

type Tab = 'mine' | 'discover';

/** Page 11 — Clubs : mes clubs, découverte et suggestions. */
export function ClubsScreen() {
  const navigation = useNavigation();
  const tabBarSpace = useTabBarSpace();
  const { memberships, isMember, join, unreadOf } = useClubs();
  const [tab, setTab] = useState<Tab>('mine');
  const [query, setQuery] = useState('');

  const visible = useMemo(() => {
    const source =
      tab === 'mine'
        ? memberships.map((id) => clubs[id]).filter(Boolean)
        : Object.values(clubs).filter((c) => !memberships.includes(c.id));
    const q = normalize(query);
    return q ? source.filter((c) => normalize(`${c.name} ${c.topic}`).includes(q)) : source;
  }, [tab, memberships, query]);

  const openClub = (club: Club) => navigation.navigate('ClubDetail', { clubId: club.id });
  const showSuggestions = tab === 'mine' && !query;

  return (
    <Screen halo="topLeft">
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: tabBarSpace + 24 }}
      >
        <ScreenHeader style={{ justifyContent: 'space-between' }}>
          <Text variant="title" accessibilityRole="header">
            Clubs
          </Text>
          <IconButton
            icon={Plus}
            variant="accent"
            accessibilityLabel="Créer un club"
            onPress={() => Alert.alert('Créer un club', 'La création de club arrive dans une prochaine version.')}
          />
        </ScreenHeader>

        <View style={{ paddingHorizontal: layout.screenMargin, marginTop: 14, gap: 14 }}>
          <TextField
            icon={Search}
            placeholder="Rechercher un club"
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
            autoCorrect={false}
            clearButtonMode="while-editing"
            accessibilityLabel="Rechercher un club"
          />
          <SegmentedControl
            options={[
              { value: 'mine', label: `Mes clubs · ${memberships.length}` },
              { value: 'discover', label: 'Découvrir' },
            ]}
            value={tab}
            onChange={setTab}
          />
        </View>

        <View style={{ paddingHorizontal: layout.screenMargin, marginTop: 16, gap: layout.listGap }}>
          {visible.map((club) => (
            <ClubRow
              key={club.id}
              club={club}
              unread={tab === 'mine' ? unreadOf(club.id, club.unread) : 0}
              onPress={() => openClub(club)}
              trailing={
                tab === 'discover' ? (
                  <Button size="sm" variant="outline" title="Rejoindre" onPress={() => join(club.id)} />
                ) : undefined
              }
            />
          ))}
          {visible.length === 0 ? (
            <Text variant="bodySm" color={colors.ink3} align="center" style={{ paddingVertical: 24 }}>
              {query
                ? `Aucun club ne correspond à «\u00A0${query}\u00A0».`
                : tab === 'mine'
                  ? "Tu ne fais partie d'aucun club pour l'instant."
                  : 'Tu as déjà rejoint tous les clubs. Bravo !'}
            </Text>
          ) : null}
        </View>

        {showSuggestions ? (
          <>
            <SectionHeader
              title="Suggestions pour toi"
              actionLabel="Voir tout"
              onAction={() => setTab('discover')}
              style={{ marginTop: 16, paddingHorizontal: layout.screenMargin }}
            />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 14 }}
              contentContainerStyle={{ paddingHorizontal: layout.screenMargin, gap: 12 }}
            >
              {suggestedClubIds.map((id) => (
                <SuggestionCard
                  key={id}
                  club={clubs[id]}
                  joined={isMember(id)}
                  onJoin={() => join(id)}
                  onPress={() => openClub(clubs[id])}
                />
              ))}
            </ScrollView>
          </>
        ) : null}
      </ScrollView>
    </Screen>
  );
}

/** Recherche insensible à la casse et aux accents. */
function normalize(s: string) {
  try {
    return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
  } catch {
    return s.toLowerCase().trim();
  }
}
