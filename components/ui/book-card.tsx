import * as React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Star } from 'lucide-react-native';
import { COLORS, RADIUS, FONTS } from '@/lib/theme';
import { LinearGradient } from '@/components/ui/gradient';
import Svg, { Circle, Path } from 'react-native-svg';

export interface BookItem {
  id: string;
  title: string;
  author: string;
  rating?: string;
  gradient: readonly string[] | string[];
  artVariant?: 'concentric' | 'arch' | 'double-circle' | 'single-circle' | 'rings';
  category?: string;
  coverUrl?: string;
}

export function BookCoverArt({
  variant = 'single-circle',
  width,
  height,
}: {
  variant?: 'concentric' | 'arch' | 'double-circle' | 'single-circle' | 'rings';
  width: number;
  height: number;
}) {
  const cx = width / 2;
  const cy = height * 0.35;

  switch (variant) {
    case 'concentric':
      return (
        <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
          <Circle cx={cx} cy={cy} r={32} stroke="rgba(255,255,255,0.3)" strokeWidth={10} fill="none" />
          <Circle cx={cx} cy={cy} r={14} fill="rgba(255,255,255,0.7)" />
        </Svg>
      );
    case 'arch':
      return (
        <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
          <Path
            d={`M ${cx - 20} ${cy + 25} L ${cx - 20} ${cy - 5} A 20 20 0 0 1 ${cx + 20} ${cy - 5} L ${cx + 20} ${cy + 25} Z`}
            fill="rgba(255,255,255,0.6)"
          />
        </Svg>
      );
    case 'double-circle':
      return (
        <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
          <Circle cx={cx - 14} cy={cy} r={20} fill="rgba(255,255,255,0.6)" />
          <Circle cx={cx + 14} cy={cy} r={20} fill="rgba(255,255,255,0.4)" />
        </Svg>
      );
    case 'rings':
      return (
        <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
          <Circle cx={cx - 10} cy={cy} r={22} stroke="rgba(255,255,255,0.6)" strokeWidth={3} fill="none" />
          <Circle cx={cx + 10} cy={cy} r={22} stroke="rgba(255,255,255,0.6)" strokeWidth={3} fill="none" />
        </Svg>
      );
    case 'single-circle':
    default:
      return (
        <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
          <Circle cx={cx + 10} cy={cy - 5} r={28} fill="rgba(255,255,255,0.65)" />
        </Svg>
      );
  }
}

export function BookCover({
  book,
  width = 124,
  height = 176,
  showLabelWhenImage = false,
}: {
  book: BookItem;
  width?: number;
  height?: number;
  showLabelWhenImage?: boolean;
}) {
  const [imageError, setImageError] = React.useState(false);
  const hasImage = Boolean(book.coverUrl) && !imageError;

  return (
    <View style={[styles.coverContainer, { width, height }]}>
      {/* Background Gradient Fallback */}
      <LinearGradient
        colors={book.gradient}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 0.9, y: 0.9 }}
        borderRadius={RADIUS.couv}
        style={StyleSheet.absoluteFill}>
        {!hasImage && (
          <>
            <BookCoverArt variant={book.artVariant} width={width} height={height} />
            <View style={styles.coverTextWrap}>
              <Text style={styles.coverTitle} numberOfLines={2}>
                {book.title}
              </Text>
              <Text style={styles.coverAuthor} numberOfLines={1}>
                {book.author.toUpperCase()}
              </Text>
            </View>
          </>
        )}
      </LinearGradient>

      {/* Real Cover Image */}
      {hasImage && book.coverUrl && (
        <View style={[StyleSheet.absoluteFill, { borderRadius: RADIUS.couv, overflow: 'hidden' }]}>
          <Image
            source={{ uri: book.coverUrl }}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
            onError={() => setImageError(true)}
          />
          {showLabelWhenImage && (
            <LinearGradient
              colors={['transparent', 'rgba(8,7,13,0.85)']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 0, y: 1 }}
              style={StyleSheet.absoluteFill}>
              <View style={[styles.coverTextWrap, { flex: 1, justifyContent: 'flex-end', padding: 8 }]}>
                <Text style={[styles.coverTitle, { color: '#FFFFFF' }]} numberOfLines={2}>
                  {book.title}
                </Text>
                <Text style={[styles.coverAuthor, { color: 'rgba(255,255,255,0.8)' }]} numberOfLines={1}>
                  {book.author.toUpperCase()}
                </Text>
              </View>
            </LinearGradient>
          )}
        </View>
      )}
    </View>
  );
}

export function BookCard({
  book,
  onPress,
}: {
  book: BookItem;
  onPress?: () => void;
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={onPress}
        onPressIn={() => (scale.value = withSpring(0.96))}
        onPressOut={() => (scale.value = withSpring(1))}
        style={styles.cardContainer}>
        <BookCover book={book} width={124} height={176} />
        <View style={styles.infoWrap}>
          <Text style={styles.cardTitle} numberOfLines={2}>
            {book.title}
          </Text>
          {book.rating && (
            <View style={styles.ratingRow}>
              <Star size={13} color={COLORS.note} fill={COLORS.note} />
              <Text style={styles.ratingText}>{book.rating}</Text>
            </View>
          )}
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: 124,
    marginRight: 14,
  },
  coverContainer: {
    position: 'relative',
    borderRadius: RADIUS.couv,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  coverTextWrap: {
    zIndex: 2,
    padding: 12,
    flex: 1,
    justifyContent: 'flex-end',
  },
  coverTitle: {
    color: '#160E2B',
    fontFamily: FONTS.serif,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 18,
    marginBottom: 4,
  },
  coverAuthor: {
    color: 'rgba(22, 14, 43, 0.75)',
    fontFamily: FONTS.sans,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  infoWrap: {
    marginTop: 8,
  },
  cardTitle: {
    color: COLORS.ink,
    fontFamily: FONTS.serif,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
    minHeight: 36,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  ratingText: {
    color: COLORS.ink2,
    fontSize: 12,
    fontWeight: '500',
  },
});
