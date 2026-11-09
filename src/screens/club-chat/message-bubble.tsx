import { Pressable, View } from 'react-native';
import { Check, Heart } from 'lucide-react-native';

import { Avatar } from '@/components/avatar';
import { Text } from '@/components/text';
import { people, type Message } from '@/data/mock';
import { categoryGradients, colors, radius } from '@/theme';

const MAX_WIDTH = 272;
const AVATAR = 32;

/** Bulle d'un autre membre : nom en couleur, avatar en bas du groupe, réactions. */
export function OtherMessage({
  message,
  showName,
  showAvatar,
  onToggleLike,
}: {
  message: Message;
  showName: boolean;
  showAvatar: boolean;
  onToggleLike: () => void;
}) {
  const person = people[message.authorId];
  const nameColor = categoryGradients[person.tone].colors[0];

  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 10 }}>
      {showAvatar ? (
        <Avatar initials={person.initials} tone={person.tone} size={AVATAR} />
      ) : (
        <View style={{ width: AVATAR }} />
      )}
      <View style={{ maxWidth: MAX_WIDTH, alignItems: 'flex-start' }}>
        {showName ? (
          <Text variant="caption" weight="semibold" color={nameColor} style={{ marginLeft: 4, marginBottom: 4 }}>
            {person.short}
          </Text>
        ) : null}
        <Pressable
          onLongPress={onToggleLike}
          delayLongPress={280}
          accessibilityHint="Appui long pour aimer le message"
          style={{
            paddingHorizontal: 14,
            paddingVertical: 10,
            borderRadius: radius.button,
            borderBottomLeftRadius: showAvatar ? 6 : radius.button,
            borderCurve: 'continuous',
            backgroundColor: colors.surfaceRaised,
            borderWidth: 1,
            borderColor: colors.line,
          }}
        >
          <Text variant="bodySm">{message.text}</Text>
        </Pressable>
        {message.likes ? (
          <Pressable
            onPress={onToggleLike}
            accessibilityRole="button"
            accessibilityLabel={`${message.likes} j'aime${message.likedByMe ? ', dont toi' : ''}`}
            style={({ pressed }) => ({
              marginTop: 6,
              marginLeft: 4,
              height: 26,
              paddingHorizontal: 10,
              borderRadius: 13,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              backgroundColor: colors.likeTint,
              borderWidth: 1,
              borderColor: message.likedByMe ? colors.like : colors.likeTintLine,
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Heart size={12} color={colors.like} fill={colors.like} strokeWidth={2} />
            <Text variant="label" weight="semibold" color={colors.like}>
              {message.likes}
            </Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

/** Ma bulle : lavande, alignée à droite, heure et accusé de lecture. */
export function MyMessage({ message }: { message: Message }) {
  const read = message.status === 'read';
  return (
    <View style={{ alignItems: 'flex-end' }}>
      <View
        style={{
          maxWidth: MAX_WIDTH,
          paddingHorizontal: 14,
          paddingVertical: 10,
          borderRadius: radius.button,
          borderBottomRightRadius: 6,
          borderCurve: 'continuous',
          backgroundColor: colors.lavender,
        }}
      >
        <Text variant="bodySm" color={colors.onAccent}>
          {message.text}
        </Text>
      </View>
      <View
        style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2, marginRight: 2 }}
        accessibilityLabel={`Envoyé à ${message.time}${read ? ', lu' : ''}`}
      >
        <Text variant="caption" color={colors.ink3}>
          {message.time}
        </Text>
        <Check size={14} color={read ? colors.online : colors.ink3} strokeWidth={2.2} />
      </View>
    </View>
  );
}
