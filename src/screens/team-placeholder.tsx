import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Bell, ChevronLeft, ChevronRight, X } from 'lucide-react-native';

import { Card } from '@/components/card';
import { Screen } from '@/components/halo';
import { IconButton } from '@/components/icon-button';
import { ScreenHeader } from '@/components/screen-header';
import { Text } from '@/components/text';
import { useTabBarSpace } from '@/navigation/tab-bar';
import type { RootScreenProps } from '@/navigation/types';
import { colors, layout } from '@/theme';

/**
 * Écrans des coéquipiers (pages 2 à 10 du PDF). Ils servent seulement à faire
 * tourner la navigation : à remplacer par leurs vrais écrans lors de la fusion.
 */
function Placeholder({
  title,
  page,
  close,
  inTabs,
}: {
  title: string;
  page: string;
  close?: 'back' | 'modal';
  inTabs?: boolean;
}) {
  const navigation = useNavigation();
  const tabBarSpace = useTabBarSpace();
  return (
    <Screen halo="top">
      <ScreenHeader paddingHorizontal={close ? 8 : layout.screenMargin}>
        {close ? (
          <IconButton
            icon={close === 'modal' ? X : ChevronLeft}
            variant="plain"
            iconSize={24}
            accessibilityLabel={close === 'modal' ? 'Fermer' : 'Retour'}
            onPress={navigation.goBack}
          />
        ) : null}
        <Text variant="headline" accessibilityRole="header" style={{ marginLeft: close ? 2 : 0 }}>
          {title}
        </Text>
      </ScreenHeader>
      <View style={{ padding: layout.screenMargin, paddingBottom: inTabs ? tabBarSpace : 0 }}>
        <Card>
          <Text variant="bodySm" color={colors.ink2}>
            Écran pris en charge par un coéquipier ({page} du PDF). Il remplacera ce bloc lors de la fusion.
          </Text>
        </Card>
      </View>
    </Screen>
  );
}

/** Accueil provisoire : cloche vers Notifications et raccourcis vers les pages 11 à 15. */
export function HomePlaceholder() {
  const navigation = useNavigation();
  const tabBarSpace = useTabBarSpace();
  const links = [
    { label: 'Clubs', page: 'page 11', go: () => navigation.navigate('Tabs', { screen: 'Clubs' }) },
    { label: 'Les Nuits de la SF', page: 'page 12', go: () => navigation.navigate('ClubDetail', { clubId: 'nuits-sf' }) },
    { label: 'Discussion du club', page: 'page 13', go: () => navigation.navigate('ClubChat', { clubId: 'nuits-sf' }) },
    { label: 'Notifications', page: 'page 14', go: () => navigation.navigate('Notifications') },
    { label: 'Profil', page: 'page 15', go: () => navigation.navigate('Tabs', { screen: 'Profil' }) },
  ];
  return (
    <Screen halo="top">
      <ScrollView contentContainerStyle={{ paddingBottom: tabBarSpace + 24 }}>
        <ScreenHeader style={{ justifyContent: 'space-between' }}>
          <Text variant="title" accessibilityRole="header">
            Accueil
          </Text>
          <View>
            <IconButton icon={Bell} accessibilityLabel="Notifications" onPress={() => navigation.navigate('Notifications')} />
            <View
              style={{
                position: 'absolute',
                top: 10,
                right: 11,
                width: 9,
                height: 9,
                borderRadius: 5,
                backgroundColor: colors.like,
                borderWidth: 1.5,
                borderColor: colors.bg,
                pointerEvents: 'none',
              }}
            />
          </View>
        </ScreenHeader>
        <View style={{ paddingHorizontal: layout.screenMargin, marginTop: 16, gap: layout.listGap }}>
          <Card>
            <Text variant="bodySm" color={colors.ink2}>
              {"Le fil d'accueil (page 6 du PDF) est pris en charge par un coéquipier. En attendant, voici des raccourcis vers les écrans 11 à 15."}
            </Text>
          </Card>
          {links.map((l) => (
            <Card
              key={l.label}
              onPress={l.go}
              accessibilityLabel={`Ouvrir ${l.label}`}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}
            >
              <View style={{ flex: 1 }}>
                <Text variant="bodyStrong">{l.label}</Text>
                <Text variant="caption" color={colors.ink3}>
                  {l.page}
                </Text>
              </View>
              <ChevronRight size={18} color={colors.ink3} />
            </Card>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}

export function ExplorerPlaceholder() {
  return <Placeholder title="Explorer" page="page 7" inTabs />;
}

export function NewPostPlaceholder() {
  return <Placeholder title="Nouvelle publication" page="page 9" close="modal" />;
}

export function BookPlaceholder({ route }: RootScreenProps<'Livre'>) {
  return <Placeholder title="Fiche livre" page={`page 8, livre « ${route.params.bookId} »`} close="back" />;
}

export function ReviewPlaceholder(_: RootScreenProps<'Avis'>) {
  return <Placeholder title="Avis" page="page 10" close="back" />;
}
