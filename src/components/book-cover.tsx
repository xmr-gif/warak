import { Text as RNText, View, type StyleProp, type ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import Svg, { Circle, Defs, Path, RadialGradient, Rect, Stop } from 'react-native-svg';

import type { Book } from '@/data/mock';
import { colors, fonts, radius } from '@/theme';
import { Gradient } from './gradient';

const RATIO = 0.7; // largeur / hauteur des couvertures

type Props = {
  book: Book;
  width: number;
  /** Par défaut, déduite de la largeur (format 0,7). */
  height?: number;
  /** Titre et auteur imprimés sur la couverture (masqués sous 80 pt). */
  showText?: boolean;
  style?: StyleProp<ViewStyle>;
};

/**
 * Couverture : image réelle de l'API, avec le dégradé du livre en repli
 * (règle de la planche). Le motif imite les maquettes.
 */
export function BookCover({ book, width, height: fixedHeight, showText = width >= 80, style }: Props) {
  const height = fixedHeight ?? Math.round(width / RATIO);
  const r = width >= 80 ? radius.cover : width >= 48 ? 8 : radius.thumb;

  return (
    <View
      style={[{ width, height, borderRadius: r, borderCurve: 'continuous', overflow: 'hidden' }, style]}
      accessibilityRole="image"
      accessibilityLabel={`Couverture de ${book.title}, ${book.author}`}
    >
      <Gradient colors={book.palette} angle={165} style={{ position: 'absolute', inset: 0 }} />
      {book.coverUri ? (
        <Image source={{ uri: book.coverUri }} style={{ position: 'absolute', inset: 0 }} contentFit="cover" transition={150} />
      ) : (
        <>
          {width >= 48 ? <Motif book={book} width={width} height={height} /> : null}
          {showText ? <CoverText book={book} width={width} /> : null}
        </>
      )}
      {/* Liseré clair des maquettes */}
      <View
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: r,
          borderCurve: 'continuous',
          borderWidth: 1,
          borderColor: colors.lineStrong,
          pointerEvents: 'none',
        }}
      />
    </View>
  );
}

function CoverText({ book, width }: { book: Book; width: number }) {
  const pad = Math.round(width * 0.1);
  const titleSize = Math.round(width * 0.15);
  const authorSize = Math.max(7, Math.round(width * 0.08));
  const author = width < 110 && book.authorShort ? book.authorShort : book.author;
  return (
    <View style={{ position: 'absolute', left: pad, right: pad - 2, bottom: pad + 2, gap: 2 }}>
      <RNText
        allowFontScaling={false}
        numberOfLines={2}
        style={{ fontFamily: fonts.serifSemiBold, fontSize: titleSize, lineHeight: titleSize * 1.08, color: '#FFFFFF' }}
      >
        {book.title}
      </RNText>
      <RNText
        allowFontScaling={false}
        numberOfLines={1}
        style={{
          fontFamily: fonts.semiBold,
          fontSize: authorSize,
          letterSpacing: authorSize * 0.08,
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.82)',
        }}
      >
        {author}
      </RNText>
    </View>
  );
}

/** Motifs dessinés dans un repère 100 × 143 (format 0,7). */
function Motif({ book, width, height }: { book: Book; width: number; height: number }) {
  const tint = book.motifColor ?? 'rgba(255,255,255,0.85)';
  const id = `sphere-${book.id}`;

  let shape: React.ReactNode = null;
  switch (book.motif) {
    case 'ring':
      shape = <Circle cx="50" cy="43" r="25.5" stroke="rgba(255,255,255,0.58)" strokeWidth="2" fill="none" />;
      break;
    case 'sun':
      shape = <Circle cx="84.7" cy="47.6" r="31.6" fill={tint} />;
      break;
    case 'sphere':
      shape = (
        <>
          <Defs>
            <RadialGradient id={id} cx="0.38" cy="0.32" r="0.75">
              <Stop offset="0" stopColor="#FFE1F0" />
              <Stop offset="0.5" stopColor={tint} />
              <Stop offset="1" stopColor="#C2407F" />
            </RadialGradient>
          </Defs>
          <Circle cx="50" cy="44" r="23" fill={`url(#${id})`} />
        </>
      );
      break;
    case 'arch':
      shape = <Path d="M33 62 V35 A17 17 0 0 1 67 35 V62 Z" fill="rgba(255,255,255,0.82)" />;
      break;
    case 'circles':
      shape = (
        <>
          <Circle cx="34" cy="40" r="16" fill={tint} fillOpacity={0.9} />
          <Circle cx="62" cy="40" r="16" stroke={tint} strokeWidth="2.4" fill="none" />
        </>
      );
      break;
    case 'moon':
      // Croissant : cercle (60,42) r20 privé du cercle (68,36) r17.
      shape = <Path d="M58.25 22.08 A20 20 0 1 0 78.63 49.26 A17 17 0 1 1 58.25 22.08 Z" fill={tint} />;
      break;
    default:
      shape = (
        <>
          <Rect x="14" y="24" width="64" height="4" rx="2" fill="#F472B6" />
          <Rect x="14" y="34" width="36" height="4" rx="2" fill="#5EEAD4" />
        </>
      );
  }

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 100 143"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0 }}
    >
      {shape}
    </Svg>
  );
}
