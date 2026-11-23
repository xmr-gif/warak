import * as React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
} from 'react-native';
import Animated, {
  type SharedValue,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolation,
  withRepeat,
  withSequence,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import { RADIUS } from '@/lib/theme';
import { LinearGradient } from '@/components/ui/gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export interface ShowcaseBook {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  gradient: readonly [string, string];
}

const BOOKS: ShowcaseBook[] = [
  {
    id: 'etranger',
    title: "L'Étranger",
    author: 'Albert Camus',
    coverUrl: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1711471767i/15688.jpg',
    gradient: ['#1E3A8A', '#0F172A'],
  },
  {
    id: 'le-pain-nu',
    title: 'Le Pain nu',
    author: 'Mohamed Choukri',
    coverUrl: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1358742809i/387926.jpg',
    gradient: ['#B45309', '#451A03'],
  },
  {
    id: 'chanson-douce',
    title: 'Chanson douce',
    author: 'Leïla Slimani',
    coverUrl: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1531505463i/40801501.jpg',
    gradient: ['#9D174D', '#500724'],
  },
  {
    id: 'fondation',
    title: 'Fondation',
    author: 'Isaac Asimov',
    coverUrl: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1417900846i/29579.jpg',
    gradient: ['#0F766E', '#134E4A'],
  },
  {
    id: 'sophie',
    title: 'Le Monde de Sophie',
    author: 'Jostein Gaarder',
    coverUrl: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1347412845i/222172.jpg',
    gradient: ['#6D28D9', '#3B0764'],
  },
  {
    id: 'systeme',
    title: 'Système 1, Système 2',
    author: 'Daniel Kahneman',
    coverUrl: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1560757185i/13062120.jpg',
    gradient: ['#C2410C', '#7C2D12'],
  },
];

const CARD_WIDTH = 155;
const CARD_HEIGHT = 220;
const SPACING = 16;
const ITEM_SIZE = CARD_WIDTH + SPACING;
const SPACER = (SCREEN_WIDTH - ITEM_SIZE) / 2;

function CarouselCard({
  book,
  index,
  scrollX,
  floatAnim,
}: {
  book: ShowcaseBook;
  index: number;
  scrollX: SharedValue<number>;
  floatAnim: SharedValue<number>;
}) {
  const pressScale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * ITEM_SIZE,
      index * ITEM_SIZE,
      (index + 1) * ITEM_SIZE,
    ];

    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.86, 1.0, 0.86],
      Extrapolation.CLAMP
    );

    const rotateZ = interpolate(
      scrollX.value,
      inputRange,
      [14, 0, -14],
      Extrapolation.CLAMP
    );

    const translateY =
      interpolate(
        scrollX.value,
        inputRange,
        [16, -6, 16],
        Extrapolation.CLAMP
      ) + (index % 2 === 0 ? floatAnim.value : -floatAnim.value);

    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.72, 1.0, 0.72],
      Extrapolation.CLAMP
    );

    const zIndex = Math.round(
      interpolate(
        scrollX.value,
        inputRange,
        [1, 10, 1],
        Extrapolation.CLAMP
      )
    );

    return {
      zIndex,
      opacity,
      transform: [
        { perspective: 900 },
        { translateY },
        { rotateZ: `${rotateZ}deg` },
        { scale: scale * pressScale.value },
      ],
    };
  });

  return (
    <Animated.View style={[styles.cardContainer, animatedStyle]}>
      <Pressable
        onPressIn={() => (pressScale.value = withSpring(0.95))}
        onPressOut={() => (pressScale.value = withSpring(1))}
        style={styles.cardShadow}>
        <View style={styles.cardInner}>
          <LinearGradient
            colors={book.gradient}
            borderRadius={RADIUS.couv}
            style={StyleSheet.absoluteFill}
          />
          <Image
            source={{ uri: book.coverUrl }}
            style={styles.coverImage}
            resizeMode="cover"
          />
        </View>
      </Pressable>
    </Animated.View>
  );
}

export function AnimatedBooksShowcase() {
  const scrollX = useSharedValue(ITEM_SIZE); // Initial center at index 1 ("Le Pain nu")
  const floatAnim = useSharedValue(0);
  const scrollViewRef = React.useRef<Animated.ScrollView>(null);

  React.useEffect(() => {
    // Gentle continuous floating motion
    floatAnim.value = withRepeat(
      withSequence(
        withTiming(-6, { duration: 2400, easing: Easing.inOut(Easing.quad) }),
        withTiming(6, { duration: 2400, easing: Easing.inOut(Easing.quad) })
      ),
      -1,
      true
    );
  }, [floatAnim]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  // Scroll to index 1 on initial layout
  const onLayout = React.useCallback(() => {
    scrollViewRef.current?.scrollTo({
      x: ITEM_SIZE, // Center on "Le Pain nu"
      animated: false,
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        nestedScrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_SIZE}
        decelerationRate="fast"
        bounces={true}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingHorizontal: SPACER },
        ]}
        onLayout={onLayout}>
        {BOOKS.map((book, index) => (
          <CarouselCard
            key={book.id}
            book={book}
            index={index}
            scrollX={scrollX}
            floatAnim={floatAnim}
          />
        ))}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 260,
    justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal: -20, // stretch edge-to-edge for smooth carousel overflow
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  cardContainer: {
    width: ITEM_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardShadow: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.55,
    shadowRadius: 18,
    elevation: 10,
  },
  cardInner: {
    width: '100%',
    height: '100%',
    borderRadius: RADIUS.couv,
    overflow: 'hidden',
    backgroundColor: '#1E1E24',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  coverImage: {
    width: '100%',
    height: '100%',
    borderRadius: RADIUS.couv,
  },
});
