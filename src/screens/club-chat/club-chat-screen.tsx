import { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, FlatList, Keyboard, KeyboardAvoidingView, Pressable, StyleSheet, View } from 'react-native';
import { BookOpen, ChevronLeft, Ellipsis, Plus, Send } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ClubIcon } from '@/components/club-icon';
import { Screen } from '@/components/halo';
import { IconButton } from '@/components/icon-button';
import { ScreenHeader } from '@/components/screen-header';
import { Text } from '@/components/text';
import { TextField } from '@/components/text-field';
import { useClubs } from '@/data/clubs-store';
import { books, clubs, ME, typingIn, type Message } from '@/data/mock';
import type { RootScreenProps } from '@/navigation/types';
import { colors, layout } from '@/theme';
import { MyMessage, OtherMessage } from './message-bubble';
import { TypingIndicator } from './typing-indicator';

type Row =
  | { key: string; kind: 'day'; label: string }
  | { key: string; kind: 'message'; message: Message; showName: boolean; showAvatar: boolean; gapTop: number }
  | { key: string; kind: 'typing'; personId: string };

/** Page 13 — Discussion d'un club. */
export function ClubChatScreen({ route, navigation }: RootScreenProps<'ClubChat'>) {
  const club = clubs[route.params.clubId];
  const book = books[club.bookId];
  const insets = useSafeAreaInsets();
  const { messagesOf, send, toggleLike, markRead } = useClubs();
  const messages = messagesOf(club.id);
  const typing = typingIn[club.id];
  const [draft, setDraft] = useState('');
  const keyboardVisible = useKeyboardVisible();
  const list = useRef<FlatList<Row>>(null);

  useEffect(() => {
    markRead(club.id);
  }, [club.id, markRead]);

  const rows = useMemo<Row[]>(() => {
    const out: Row[] = [{ key: 'day', kind: 'day', label: "Aujourd'hui" }];
    messages.forEach((m, i) => {
      const prev = messages[i - 1];
      const next = messages[i + 1];
      const firstOfGroup = !prev || prev.authorId !== m.authorId;
      out.push({
        key: m.id,
        kind: 'message',
        message: m,
        showName: firstOfGroup && m.authorId !== ME,
        showAvatar: !next || next.authorId !== m.authorId,
        gapTop: i === 0 ? 0 : firstOfGroup ? 10 : 4,
      });
    });
    if (typing) out.push({ key: 'typing', kind: 'typing', personId: typing });
    return out;
  }, [messages, typing]);

  const sendDraft = () => {
    const text = draft.trim();
    if (!text) return;
    send(club.id, text);
    setDraft('');
  };

  return (
    <Screen halo="top">
      <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.line, paddingBottom: 12 }}>
        <ScreenHeader paddingHorizontal={8}>
          <IconButton icon={ChevronLeft} variant="plain" iconSize={24} accessibilityLabel="Retour" onPress={navigation.goBack} />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${club.name}, ${club.online} en ligne. Ouvrir la fiche du club.`}
            onPress={() => navigation.navigate('ClubDetail', { clubId: club.id })}
            style={({ pressed }) => ({
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              marginLeft: 6,
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <ClubIcon category={club.category} icon={club.icon} size={40} />
            <View style={{ flex: 1 }}>
              <Text variant="button" numberOfLines={1}>
                {club.name}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 }}>
                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.online }} />
                <Text variant="caption" color={colors.ink2}>
                  {club.online} en ligne
                </Text>
              </View>
            </View>
          </Pressable>
          <IconButton
            icon={Ellipsis}
            variant="plain"
            color={colors.ink2}
            accessibilityLabel="Options de la discussion"
            onPress={() =>
              Alert.alert(club.name, undefined, [
                { text: 'Rechercher dans la discussion' },
                { text: 'Couper les notifications' },
                { text: 'Annuler', style: 'cancel' },
              ])
            }
            style={{ marginRight: 4 }}
          />
        </ScreenHeader>
      </View>

      <View
        style={{
          marginHorizontal: layout.screenMargin,
          marginTop: 12,
          height: 40,
          paddingHorizontal: 16,
          borderRadius: 14,
          borderCurve: 'continuous',
          borderWidth: 1,
          borderColor: colors.pinnedLine,
          backgroundColor: colors.pinned,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <BookOpen size={18} color={colors.lavender} strokeWidth={2} />
        <Text variant="label" numberOfLines={1} style={{ flex: 1 }}>
          Lecture du mois · {book.title}, chapitre {club.discussedChapter ?? club.chapter}
        </Text>
      </View>

      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <FlatList
          ref={list}
          data={rows}
          keyExtractor={(r) => r.key}
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingHorizontal: layout.screenMargin, paddingTop: 12, paddingBottom: 16 }}
          onContentSizeChange={() => list.current?.scrollToEnd({ animated: true })}
          onLayout={() => list.current?.scrollToEnd({ animated: false })}
          renderItem={({ item }) => {
            if (item.kind === 'day') {
              return (
                <Text variant="caption" weight="medium" color={colors.ink3} align="center" style={{ marginBottom: 10 }}>
                  {item.label}
                </Text>
              );
            }
            if (item.kind === 'typing') {
              return (
                <View style={{ marginTop: 12 }}>
                  <TypingIndicator personId={item.personId} />
                </View>
              );
            }
            const { message } = item;
            return (
              <View style={{ marginTop: item.gapTop }}>
                {message.authorId === ME ? (
                  <MyMessage message={message} />
                ) : (
                  <OtherMessage
                    message={message}
                    showName={item.showName}
                    showAvatar={item.showAvatar}
                    onToggleLike={() => toggleLike(club.id, message.id)}
                  />
                )}
              </View>
            );
          }}
        />

        <View
          style={{
            borderTopWidth: StyleSheet.hairlineWidth,
            borderTopColor: colors.line,
            backgroundColor: colors.bar,
            paddingHorizontal: 16,
            paddingTop: 12,
            paddingBottom: keyboardVisible ? 12 : Math.max(insets.bottom - 6, 12),
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <IconButton
            icon={Plus}
            size={48}
            iconSize={22}
            accessibilityLabel="Joindre un livre, un passage ou une photo"
            onPress={() => Alert.alert('Joindre', "L'envoi de pièces jointes arrive bientôt.")}
          />
          <TextField
            shape="pill"
            height={48}
            placeholder="Écrire un message..."
            value={draft}
            onChangeText={setDraft}
            returnKeyType="send"
            onSubmitEditing={sendDraft}
            submitBehavior="submit"
            accessibilityLabel="Message"
            style={{ flex: 1 }}
          />
          <IconButton
            icon={Send}
            variant="accent"
            size={48}
            iconSize={20}
            accessibilityLabel="Envoyer"
            onPress={sendDraft}
          />
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

function useKeyboardVisible() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const show = Keyboard.addListener(process.env.EXPO_OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow', () =>
      setVisible(true),
    );
    const hide = Keyboard.addListener(process.env.EXPO_OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide', () =>
      setVisible(false),
    );
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);
  return visible;
}
