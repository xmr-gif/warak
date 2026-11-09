import type { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

/** Onglets de la barre du bas (le « + » central ouvre une modale, ce n'est pas un onglet). */
export type TabParamList = {
  Accueil: undefined;
  Explorer: undefined;
  Clubs: undefined;
  Profil: undefined;
};

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList> | undefined;
  ClubDetail: { clubId: string };
  ClubChat: { clubId: string };
  Notifications: undefined;
  // Écrans des coéquipiers (pages 6 à 10 du PDF), en attente ici :
  NouvellePublication: undefined;
  Livre: { bookId: string };
  Avis: { bookId?: string };
};

export type RootScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

declare global {
  // Rend `useNavigation()` typé partout dans l'app.
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends RootStackParamList {}
  }
}
