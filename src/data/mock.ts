/**
 * Données fictives des écrans Clubs, Discussion, Notifications et Profil.
 * Elles reprennent le contenu des maquettes ; à remplacer par les appels à l'API.
 */
import type { Category } from '@/theme';

/* ------------------------------------------------------------------ */
/* Personnes                                                           */
/* ------------------------------------------------------------------ */

export type Person = {
  id: string;
  name: string;
  /** Nom court affiché dans la discussion : « Nora D. » */
  short: string;
  initials: string;
  /** Dégradé de l'avatar. */
  tone: Category;
};

export const people: Record<string, Person> = {
  salma: { id: 'salma', name: 'Salma Idrissi', short: 'Salma I.', initials: 'SI', tone: 'maghreb' },
  yassine: { id: 'yassine', name: 'Yassine El Amrani', short: 'Yassine E.', initials: 'YE', tone: 'philo' },
  nora: { id: 'nora', name: 'Nora Daoudi', short: 'Nora D.', initials: 'ND', tone: 'perso' },
  karim: { id: 'karim', name: 'Karim Ouazzani', short: 'Karim O.', initials: 'KO', tone: 'sf' },
  imane: { id: 'imane', name: 'Imane Kettani', short: 'Imane K.', initials: 'IK', tone: 'psycho' },
  omar: { id: 'omar', name: 'Omar Benali', short: 'Omar B.', initials: 'OB', tone: 'classiques' },
  lina: { id: 'lina', name: 'Lina Haddad', short: 'Lina H.', initials: 'LH', tone: 'perso' },
};

export const ME = 'salma';

/* ------------------------------------------------------------------ */
/* Livres                                                              */
/* ------------------------------------------------------------------ */

/** Motif dessiné sur la couverture de repli (quand l'API n'a pas d'image). */
export type CoverMotif = 'ring' | 'sun' | 'sphere' | 'arch' | 'circles' | 'moon' | 'none';

export type Book = {
  id: string;
  title: string;
  author: string;
  /** Version courte pour les petites couvertures : « M. Choukri ». */
  authorShort?: string;
  category: Category;
  /** Image réelle de l'API ; si absente, on affiche le dégradé ci-dessous. */
  coverUri?: string;
  palette: readonly [string, string, string];
  motif: CoverMotif;
  motifColor?: string;
};

export const books: Record<string, Book> = {
  fondation: {
    id: 'fondation',
    title: 'Fondation',
    author: 'Isaac Asimov',
    category: 'sf',
    palette: ['#7CEEDB', '#268896', '#0A3044'],
    motif: 'ring',
  },
  'pain-nu': {
    id: 'pain-nu',
    title: 'Le Pain nu',
    author: 'Mohamed Choukri',
    authorShort: 'M. Choukri',
    category: 'classiques',
    palette: ['#F5BE6C', '#D27933', '#8A3A16'],
    motif: 'sun',
    motifColor: '#FADEB7',
  },
  solaris: {
    id: 'solaris',
    title: 'Solaris',
    author: 'Stanisław Lem',
    category: 'sf',
    palette: ['#6CDCD3', '#1F8A95', '#0F3549'],
    motif: 'sphere',
    motifColor: '#F472B6',
  },
  'monde-sophie': {
    id: 'monde-sophie',
    title: 'Le Monde de Sophie',
    author: 'Jostein Gaarder',
    authorShort: 'J. Gaarder',
    category: 'philo',
    palette: ['#D9CCFF', '#7C5CFF', '#33208F'],
    motif: 'arch',
  },
  'systeme-1-2': {
    id: 'systeme-1-2',
    title: 'Système 1, Système 2',
    author: 'Daniel Kahneman',
    authorShort: 'D. Kahneman',
    category: 'psycho',
    palette: ['#FFB59A', '#E25B52', '#7C1D2E'],
    motif: 'circles',
    motifColor: '#FFE1D6',
  },
  'nuit-sacree': {
    id: 'nuit-sacree',
    title: 'La Nuit sacrée',
    author: 'Tahar Ben Jelloun',
    authorShort: 'T. Ben Jelloun',
    category: 'maghreb',
    palette: ['#FCD681', '#8A63F0', '#2B1B6E'],
    motif: 'moon',
    motifColor: '#FCD681',
  },
  etranger: {
    id: 'etranger',
    title: "L'Étranger",
    author: 'Albert Camus',
    category: 'classiques',
    palette: ['#A9BDFF', '#4253D6', '#1B2372'],
    motif: 'sun',
    motifColor: '#FBE3A0',
  },
  'chanson-douce': {
    id: 'chanson-douce',
    title: 'Chanson douce',
    author: 'Leïla Slimani',
    authorShort: 'L. Slimani',
    category: 'psycho',
    palette: ['#F9B0D5', '#D6589F', '#5C1742'],
    motif: 'circles',
  },
  dune: {
    id: 'dune',
    title: 'Dune',
    author: 'Frank Herbert',
    category: 'sf',
    palette: ['#F7C46E', '#D8843B', '#8C481D'],
    motif: 'sun',
    motifColor: '#FDEBC8',
  },
  neuromancien: {
    id: 'neuromancien',
    title: 'Neuromancien',
    author: 'William Gibson',
    authorShort: 'W. Gibson',
    category: 'sf',
    palette: ['#3A4775', '#1C2547', '#0B1026'],
    motif: 'none',
  },
  meditations: {
    id: 'meditations',
    title: 'Pensées pour moi-même',
    author: 'Marc Aurèle',
    category: 'philo',
    palette: ['#FDE3A0', '#E9A23B', '#7A4A12'],
    motif: 'arch',
  },
  alchimiste: {
    id: 'alchimiste',
    title: "L'Alchimiste",
    author: 'Paulo Coelho',
    category: 'perso',
    palette: ['#FBC2DC', '#E26A9C', '#6B1D45'],
    motif: 'sun',
    motifColor: '#FFE7B3',
  },
  peste: {
    id: 'peste',
    title: 'La Peste',
    author: 'Albert Camus',
    category: 'classiques',
    palette: ['#B5EFA8', '#4E9E5C', '#173B27'],
    motif: 'ring',
  },
  miserables: {
    id: 'miserables',
    title: 'Les Misérables',
    author: 'Victor Hugo',
    category: 'classiques',
    palette: ['#C9D6FF', '#6277C9', '#1F2A5C'],
    motif: 'moon',
    motifColor: '#FFF3D6',
  },
};

/* ------------------------------------------------------------------ */
/* Clubs                                                               */
/* ------------------------------------------------------------------ */

export type ClubIconName = 'planet' | 'chat' | 'book' | 'brain' | 'feather' | 'sprout';

export type Thread = {
  id: string;
  title: string;
  replies: number;
  lastActivity: string;
};

export type Club = {
  id: string;
  name: string;
  category: Category;
  /** Thème affiché : « Science-fiction ». */
  topic: string;
  icon: ClubIconName;
  members: number;
  online: number;
  visibility: 'Public' | 'Privé';
  bookId: string;
  chapter: number;
  chapters: number;
  /** Chapitre débattu en ce moment dans la discussion (bandeau épinglé). */
  discussedChapter?: number;
  /** Messages non lus pour moi. */
  unread: number;
  threads: Thread[];
  /** Quelques membres pour l'onglet « Membres ». */
  memberIds: string[];
  admins: string[];
};

export const clubs: Record<string, Club> = {
  'nuits-sf': {
    id: 'nuits-sf',
    name: 'Les Nuits de la SF',
    category: 'sf',
    topic: 'Science-fiction',
    icon: 'planet',
    members: 1248,
    online: 128,
    visibility: 'Public',
    bookId: 'fondation',
    chapter: 7,
    chapters: 12,
    discussedChapter: 4,
    unread: 12,
    threads: [
      { id: 't1', title: 'Premières impressions sur le chapitre 4', replies: 24, lastActivity: 'il y a 5 min' },
      { id: 't2', title: 'Quel Asimov lire après Fondation\u00A0?', replies: 17, lastActivity: 'il y a 1 h' },
    ],
    memberIds: ['karim', 'nora', 'yassine', 'imane', 'salma', 'omar'],
    admins: ['karim'],
  },
  'philo-dimanche': {
    id: 'philo-dimanche',
    name: 'Philo du dimanche',
    category: 'philo',
    topic: 'Philosophie',
    icon: 'chat',
    members: 436,
    online: 21,
    visibility: 'Public',
    bookId: 'monde-sophie',
    chapter: 9,
    chapters: 35,
    unread: 3,
    threads: [
      { id: 't1', title: 'Le jardin de Sophie : symbole ou décor\u00A0?', replies: 11, lastActivity: 'il y a 20 min' },
      { id: 't2', title: 'Platon pour les débutants', replies: 8, lastActivity: 'hier' },
    ],
    memberIds: ['nora', 'salma', 'lina', 'omar'],
    admins: ['nora'],
  },
  'plumes-maghreb': {
    id: 'plumes-maghreb',
    name: 'Plumes du Maghreb',
    category: 'maghreb',
    topic: 'Littérature maghrébine',
    icon: 'book',
    members: 892,
    online: 47,
    visibility: 'Public',
    bookId: 'nuit-sacree',
    chapter: 5,
    chapters: 19,
    unread: 0,
    threads: [
      { id: 't1', title: 'Zahra et la question du nom', replies: 32, lastActivity: 'il y a 2 h' },
      { id: 't2', title: 'Vos lectures de Kateb Yacine', replies: 9, lastActivity: 'lundi' },
    ],
    memberIds: ['yassine', 'salma', 'imane', 'omar'],
    admins: ['yassine'],
  },
  'psycho-lecture': {
    id: 'psycho-lecture',
    name: 'Psycho et lecture',
    category: 'psycho',
    topic: 'Psychologie',
    icon: 'brain',
    members: 2104,
    online: 186,
    visibility: 'Public',
    bookId: 'systeme-1-2',
    chapter: 3,
    chapters: 38,
    unread: 0,
    threads: [
      { id: 't1', title: 'Biais cognitifs : vos exemples du quotidien', replies: 41, lastActivity: 'il y a 12 min' },
    ],
    memberIds: ['imane', 'lina', 'karim'],
    admins: ['imane'],
  },
  'classiques-voix-haute': {
    id: 'classiques-voix-haute',
    name: 'Classiques à voix haute',
    category: 'classiques',
    topic: 'Classiques',
    icon: 'feather',
    members: 310,
    online: 9,
    visibility: 'Public',
    bookId: 'miserables',
    chapter: 2,
    chapters: 48,
    unread: 0,
    threads: [{ id: 't1', title: 'Lecture du mardi : Fantine', replies: 6, lastActivity: 'hier' }],
    memberIds: ['omar', 'nora'],
    admins: ['omar'],
  },
  'grandir-lisant': {
    id: 'grandir-lisant',
    name: 'Grandir en lisant',
    category: 'perso',
    topic: 'Développement personnel',
    icon: 'sprout',
    members: 1530,
    online: 64,
    visibility: 'Public',
    bookId: 'alchimiste',
    chapter: 4,
    chapters: 10,
    unread: 0,
    threads: [{ id: 't1', title: 'Une habitude qui a changé votre année', replies: 57, lastActivity: 'il y a 3 h' }],
    memberIds: ['lina', 'imane'],
    admins: ['lina'],
  },
};

/** Clubs dont je suis membre au départ. */
export const initialMemberships = ['nuits-sf', 'philo-dimanche', 'plumes-maghreb'];

/** Ordre des suggestions (« Suggestions pour toi »). */
export const suggestedClubIds = ['psycho-lecture', 'classiques-voix-haute', 'grandir-lisant'];

/* ------------------------------------------------------------------ */
/* Discussion                                                          */
/* ------------------------------------------------------------------ */

export type Message = {
  id: string;
  authorId: string;
  text: string;
  time: string;
  likes?: number;
  likedByMe?: boolean;
  /** Pour mes messages : envoyé ou lu. */
  status?: 'sent' | 'read';
};

export const initialMessages: Record<string, Message[]> = {
  'nuits-sf': [
    {
      id: 'm1',
      authorId: 'nora',
      text: 'Je viens de finir le chapitre 4. Hardin est incroyable\u00A0: il gagne sans jamais élever la voix.',
      time: '21:31',
    },
    {
      id: 'm2',
      authorId: 'yassine',
      text: "Totalement d'accord. Il règle tout par la ruse, jamais par la force.",
      time: '21:39',
      likes: 3,
    },
    {
      id: 'm3',
      authorId: 'salma',
      text: "Moi j'hésite à enchaîner avec Fondation et Empire. Vous en pensez quoi\u00A0?",
      time: '21:47',
      status: 'read',
    },
    {
      id: 'm4',
      authorId: 'karim',
      text: 'Fonce, la suite est encore meilleure. Mais pas de spoilers ici\u00A0!',
      time: '21:49',
    },
  ],
};

/** Qui est en train d'écrire, par club. */
export const typingIn: Record<string, string | undefined> = { 'nuits-sf': 'imane' };

/* ------------------------------------------------------------------ */
/* Notifications                                                       */
/* ------------------------------------------------------------------ */

export type NotificationKind = 'like' | 'comment' | 'invite' | 'follow' | 'recommendation';

export type AppNotification = {
  id: string;
  kind: NotificationKind;
  actorId?: string;
  when: string;
  group: 'today' | 'week';
  unread: boolean;
  bookId?: string;
  clubId?: string;
  quote?: string;
  /** Pour une recommandation : le centre d'intérêt qui l'explique. */
  reason?: string;
};

export const initialNotifications: AppNotification[] = [
  { id: 'n1', kind: 'like', actorId: 'yassine', when: 'il y a 2 min', group: 'today', unread: true, bookId: 'pain-nu' },
  {
    id: 'n2',
    kind: 'comment',
    actorId: 'imane',
    when: 'il y a 18 min',
    group: 'today',
    unread: true,
    bookId: 'pain-nu',
    quote: "Ce passage m'a bouleversée.",
  },
  { id: 'n3', kind: 'invite', actorId: 'nora', when: 'il y a 1 h', group: 'today', unread: false, clubId: 'philo-dimanche' },
  { id: 'n4', kind: 'follow', actorId: 'karim', when: 'hier', group: 'week', unread: false },
  {
    id: 'n5',
    kind: 'recommendation',
    when: 'lundi',
    group: 'week',
    unread: false,
    bookId: 'solaris',
    reason: 'science-fiction',
  },
];

/* ------------------------------------------------------------------ */
/* Profil                                                              */
/* ------------------------------------------------------------------ */

export const profile = {
  personId: 'salma',
  handle: '@salma.reads',
  bio: 'Lectrice du soir. Science-fiction, philo et un peu de classiques.',
  stats: { read: 23, reviews: 12, followers: 186 },
  interests: [
    { label: 'Développement personnel', category: 'perso' },
    { label: 'Psychologie', category: 'psycho' },
    { label: 'Science-fiction', category: 'sf' },
    { label: 'Classiques', category: 'classiques' },
    { label: 'Philosophie', category: 'philo' },
  ] satisfies { label: string; category: Category }[],
  goal: { year: 2026, done: 15, target: 24, streakDays: 12 },
  shelves: {
    reading: [
      { bookId: 'fondation', progress: 0.58 },
      { bookId: 'pain-nu', progress: 0.21 },
    ],
    toRead: [
      'solaris',
      'monde-sophie',
      'systeme-1-2',
      'nuit-sacree',
      'dune',
      'neuromancien',
      'meditations',
      'alchimiste',
      'miserables',
    ],
    read: ['etranger', 'chanson-douce', 'peste'],
  },
};

/* ------------------------------------------------------------------ */
/* Utilitaires                                                         */
/* ------------------------------------------------------------------ */

/** 1248 → « 1 248 » avec l'espace fine insécable du français. */
export function formatCount(n: number) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '\u202F');
}
