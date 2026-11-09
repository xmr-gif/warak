import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme, type LinkingOptions, type Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ClubChatScreen } from '@/screens/club-chat/club-chat-screen';
import { ClubDetailScreen } from '@/screens/club-detail/club-detail-screen';
import { ClubsScreen } from '@/screens/clubs/clubs-screen';
import { NotificationsScreen } from '@/screens/notifications/notifications-screen';
import { ProfileScreen } from '@/screens/profile/profile-screen';
import {
  BookPlaceholder,
  ExplorerPlaceholder,
  HomePlaceholder,
  NewPostPlaceholder,
  ReviewPlaceholder,
} from '@/screens/team-placeholder';
import { colors } from '@/theme';
import { TabBar } from './tab-bar';
import type { RootStackParamList, TabParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<TabParamList>();

function TabsNavigator() {
  return (
    <Tabs.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: colors.bg } }}
    >
      <Tabs.Screen name="Accueil" component={HomePlaceholder} />
      <Tabs.Screen name="Explorer" component={ExplorerPlaceholder} />
      <Tabs.Screen name="Clubs" component={ClubsScreen} />
      <Tabs.Screen name="Profil" component={ProfileScreen} />
    </Tabs.Navigator>
  );
}

/** Onglets + pile, comme prévu sur la planche (React Navigation). */
export function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bg }, animation: 'slide_from_right' }}
    >
      <Stack.Screen name="Tabs" component={TabsNavigator} />
      <Stack.Screen name="ClubDetail" component={ClubDetailScreen} />
      <Stack.Screen name="ClubChat" component={ClubChatScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen
        name="NouvellePublication"
        component={NewPostPlaceholder}
        options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
      />
      <Stack.Screen name="Livre" component={BookPlaceholder} />
      <Stack.Screen name="Avis" component={ReviewPlaceholder} />
    </Stack.Navigator>
  );
}

/** Thème de navigation aligné sur le fond de l'app (pas de flash blanc entre deux écrans). */
export const navigationTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.bg,
    card: colors.bg,
    primary: colors.lavender,
    text: colors.ink,
    border: colors.line,
    notification: colors.like,
  },
};

/** Adresses web (aperçu navigateur) : /clubs, /clubs/nuits-sf, /clubs/nuits-sf/discussion… */
export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [],
  config: {
    screens: {
      Tabs: {
        screens: { Accueil: '', Explorer: 'explorer', Clubs: 'clubs', Profil: 'profil' },
      },
      ClubDetail: 'clubs/:clubId',
      ClubChat: 'clubs/:clubId/discussion',
      Notifications: 'notifications',
      NouvellePublication: 'publier',
      Livre: 'livres/:bookId',
      Avis: 'avis',
    },
  },
};
