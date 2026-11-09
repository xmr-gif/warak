import { useEffect, useState } from 'react';
import { AccessibilityInfo, Animated, View } from 'react-native';

import { Avatar } from '@/components/avatar';
import { people } from '@/data/mock';
import { colors, radius } from '@/theme';

/** « … est en train d'écrire » : trois points qui pulsent (fixes si « Réduire les animations »). */
export function TypingIndicator({ personId }: { personId: string }) {
  const person = people[personId];
  const [dots] = useState(() => [0, 1, 2].map(() => new Animated.Value(0.35)));
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion).catch(() => undefined);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const loops = dots.map((v, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 160),
          Animated.timing(v, { toValue: 1, duration: 320, useNativeDriver: true }),
          Animated.timing(v, { toValue: 0.35, duration: 320, useNativeDriver: true }),
          Animated.delay((2 - i) * 160),
        ]),
      ),
    );
    loops.forEach((l) => l.start());
    return () => loops.forEach((l) => l.stop());
  }, [dots, reduceMotion]);

  return (
    <View
      style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 10 }}
      accessibilityLabel={`${person.short} est en train d'écrire`}
    >
      <Avatar initials={person.initials} tone={person.tone} size={32} />
      <View
        style={{
          height: 36,
          paddingHorizontal: 16,
          borderRadius: radius.button,
          borderBottomLeftRadius: 6,
          borderCurve: 'continuous',
          backgroundColor: colors.surfaceRaised,
          borderWidth: 1,
          borderColor: colors.line,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5,
        }}
      >
        {dots.map((v, i) => (
          <Animated.View
            key={i}
            style={{
              width: 7,
              height: 7,
              borderRadius: 4,
              backgroundColor: colors.ink2,
              opacity: reduceMotion ? 0.35 + i * 0.25 : v,
            }}
          />
        ))}
      </View>
    </View>
  );
}
