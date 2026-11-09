import { createContext, use, useMemo, useState, type ReactNode } from 'react';

import { initialMemberships, initialMessages, ME, type Message } from './mock';

/**
 * État partagé des clubs pendant la session : adhésions et messages.
 * Clubs, fiche club et discussion lisent la même source, ce qui garde
 * les écrans cohérents. À brancher plus tard sur l'API.
 */
type ClubsState = {
  isMember: (clubId: string) => boolean;
  memberships: string[];
  join: (clubId: string) => void;
  leave: (clubId: string) => void;
  messagesOf: (clubId: string) => Message[];
  send: (clubId: string, text: string) => void;
  toggleLike: (clubId: string, messageId: string) => void;
  markRead: (clubId: string) => void;
  unreadOf: (clubId: string, initial: number) => number;
};

const ClubsContext = createContext<ClubsState | null>(null);

export function ClubsProvider({ children }: { children: ReactNode }) {
  const [memberships, setMemberships] = useState<string[]>(initialMemberships);
  const [messages, setMessages] = useState<Record<string, Message[]>>(initialMessages);
  const [readClubs, setReadClubs] = useState<string[]>([]);

  const value = useMemo<ClubsState>(
    () => ({
      memberships,
      isMember: (id) => memberships.includes(id),
      join: (id) => setMemberships((m) => (m.includes(id) ? m : [...m, id])),
      leave: (id) => setMemberships((m) => m.filter((x) => x !== id)),
      messagesOf: (id) => messages[id] ?? [],
      send: (id, text) =>
        setMessages((all) => ({
          ...all,
          [id]: [
            ...(all[id] ?? []),
            {
              id: `m${Date.now()}`,
              authorId: ME,
              text,
              time: nowHHMM(),
              status: 'sent',
            },
          ],
        })),
      toggleLike: (id, messageId) =>
        setMessages((all) => ({
          ...all,
          [id]: (all[id] ?? []).map((m) =>
            m.id === messageId
              ? { ...m, likedByMe: !m.likedByMe, likes: (m.likes ?? 0) + (m.likedByMe ? -1 : 1) }
              : m,
          ),
        })),
      markRead: (id) => setReadClubs((r) => (r.includes(id) ? r : [...r, id])),
      unreadOf: (id, initial) => (readClubs.includes(id) ? 0 : initial),
    }),
    [memberships, messages, readClubs],
  );

  return <ClubsContext value={value}>{children}</ClubsContext>;
}

function nowHHMM() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export function useClubs() {
  const ctx = use(ClubsContext);
  if (!ctx) throw new Error('useClubs doit être utilisé sous <ClubsProvider>.');
  return ctx;
}
