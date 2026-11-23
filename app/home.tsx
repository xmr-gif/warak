import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Bell,
  Heart,
  MessageCircle,
  Bookmark,
  MoreHorizontal,
  Star,
  PenTool,
} from 'lucide-react-native';
import { COLORS, FONTS, RADIUS } from '@/lib/theme';
import { ScreenWrapper } from '@/components/ui/screen-wrapper';
import { Avatar } from '@/components/ui/avatar';
import { SegmentedControl } from '@/components/ui/segmented-control';
import { BookCard, BookCover, type BookItem } from '@/components/ui/book-card';
import { BottomBar, type TabKey } from '@/components/ui/bottom-bar';

const BOOKS: BookItem[] = [
  {
    id: 'fondation',
    title: 'Fondation',
    author: 'Isaac Asimov',
    rating: '4,4',
    gradient: ['#14B8A6', '#0F766E'],
    artVariant: 'concentric',
    coverUrl: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1417900846i/29579.jpg',
  },
  {
    id: 'sophie',
    title: 'Le Monde de Sophie',
    author: 'J. Gaarder',
    rating: '4,2',
    gradient: ['#8B5CF6', '#6D28D9'],
    artVariant: 'arch',
    coverUrl: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1347412845i/222172.jpg',
  },
  {
    id: 'systeme',
    title: 'Système 1, Système 2',
    author: 'D. Kahneman',
    rating: '4,1',
    gradient: ['#F97316', '#DC2626'],
    artVariant: 'double-circle',
    coverUrl: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1560757185i/13062120.jpg',
  },
  {
    id: 'etranger',
    title: "L'Étranger",
    author: 'Albert Camus',
    rating: '4,3',
    gradient: ['#3B82F6', '#1E3A8A'],
    artVariant: 'single-circle',
    coverUrl: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1711471767i/15688.jpg',
  },
];

const MINI_BOOK: BookItem = {
  id: 'chanson-douce',
  title: 'Chanson douce',
  author: 'Leïla Slimani',
  rating: '4/5',
  gradient: ['#EC4899', '#9D174D'],
  artVariant: 'rings',
  coverUrl: 'https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1531505463i/40801501.jpg',
};

export default function HomeScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<'Pour toi' | 'Abonnements'>('Pour toi');
  const [bottomTab, setBottomTab] = React.useState<TabKey>('accueil');
  const [isLiked, setIsLiked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(128);
  const [isBookmarked, setIsBookmarked] = React.useState(false);

  const toggleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikeCount((c) => c - 1);
    } else {
      setIsLiked(true);
      setLikeCount((c) => c + 1);
    }
  };

  return (
    <View style={styles.screenRoot}>
      <ScreenWrapper scrollable contentContainerStyle={styles.container}>
        {/* Top Header: Avatar + Greeting + Bell */}
        <View style={styles.topHeader}>
          <View style={styles.userProfileRow}>
            <Avatar
              initials="SI"
              size={44}
              backgroundColor={COLORS.surface}
              textColor={COLORS.ink}
              hasHalo={true}
            />
            <View style={styles.greetingWrap}>
              <Text style={styles.greetingSub}>Bonsoir</Text>
              <Text style={styles.greetingName}>Salma</Text>
            </View>
          </View>

          <Pressable style={styles.bellButton} hitSlop={10}>
            <Bell size={22} color={COLORS.ink} />
            <View style={styles.notificationDot} />
          </Pressable>
        </View>

        {/* Feed Filter: Pour toi | Abonnements */}
        <View style={styles.filterSection}>
          <SegmentedControl
            options={['Pour toi', 'Abonnements'] as const}
            value={activeTab}
            onChange={setActiveTab}
            variant="tabs"
          />
        </View>

        {/* Section: Choisis pour toi */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Choisis pour toi</Text>
          <Pressable hitSlop={8}>
            <Text style={styles.seeAllText}>Voir tout</Text>
          </Pressable>
        </View>

        {/* Horizontal Book List */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalBooksScroll}
          style={styles.booksScrollView}>
          {BOOKS.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </ScrollView>

        {/* Section: Community Review Post Card */}
        <View style={styles.reviewCard}>
          {/* Post Author */}
          <View style={styles.postHeader}>
            <View style={styles.postAuthorInfo}>
              <Avatar
                initials="YE"
                size={40}
                backgroundColor={COLORS.note}
                textColor="#160E2B"
              />
              <View style={styles.authorMeta}>
                <Text style={styles.authorName}>Yassine El Amrani</Text>
                <Text style={styles.authorSub}>Lecteur de SF · il y a 2 h</Text>
              </View>
            </View>
            <Pressable hitSlop={8}>
              <MoreHorizontal size={20} color={COLORS.ink3} />
            </Pressable>
          </View>

          {/* Book Row Preview */}
          <View style={styles.bookSnippetRow}>
            <BookCover book={MINI_BOOK} width={42} height={58} />
            <View style={styles.snippetDetails}>
              <Text style={styles.snippetTitle}>Chanson douce</Text>
              <Text style={styles.snippetAuthor}>Leïla Slimani</Text>
            </View>
            <View style={styles.snippetRating}>
              <Star size={13} color={COLORS.note} fill={COLORS.note} />
              <Text style={styles.ratingValue}>4/5</Text>
            </View>
          </View>

          {/* Review Quote Body */}
          <Text style={styles.reviewText}>
            Un thriller domestique glaçant. Slimani installe le malaise dès la première phrase et ne lâche plus le lecteur jusqu'à la dernière page.
          </Text>

          {/* Card Social Actions */}
          <View style={styles.actionsRow}>
            <View style={styles.leftActions}>
              <Pressable
                onPress={toggleLike}
                hitSlop={8}
                style={styles.actionBtn}>
                <Heart
                  size={18}
                  color={isLiked ? COLORS.like : COLORS.ink2}
                  fill={isLiked ? COLORS.like : 'transparent'}
                />
                <Text
                  style={[
                    styles.actionCount,
                    isLiked && { color: COLORS.like },
                  ]}>
                  {likeCount}
                </Text>
              </Pressable>

              <Pressable hitSlop={8} style={styles.actionBtn}>
                <MessageCircle size={18} color={COLORS.ink2} />
                <Text style={styles.actionCount}>24</Text>
              </Pressable>
            </View>

            <Pressable
              onPress={() => setIsBookmarked(!isBookmarked)}
              hitSlop={8}>
              <Bookmark
                size={19}
                color={isBookmarked ? COLORS.lavender : COLORS.ink2}
                fill={isBookmarked ? COLORS.lavender : 'transparent'}
              />
            </Pressable>
          </View>
        </View>

        {/* Section: Next article preview */}
        <View style={styles.articleCard}>
          <View style={styles.articleTagRow}>
            <PenTool size={12} color={COLORS.online} />
            <Text style={styles.articleTag}>ARTICLE · 5 MIN</Text>
          </View>
          <Text style={styles.articleTitle}>
            Pourquoi relire Camus à trente ans
          </Text>
        </View>
      </ScreenWrapper>

      {/* Persistent Bottom Bar */}
      <BottomBar
        activeTab={bottomTab}
        onTabPress={setBottomTab}
        onPlusPress={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screenRoot: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  container: {
    paddingBottom: 20,
    paddingTop: 16,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  userProfileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  greetingWrap: {
    justifyContent: 'center',
  },
  greetingSub: {
    fontSize: 13,
    color: COLORS.ink2,
    fontFamily: FONTS.sans,
  },
  greetingName: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.ink,
    fontFamily: FONTS.serif,
  },
  bellButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.surface,
    borderColor: COLORS.line,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: COLORS.like,
  },
  filterSection: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitle: {
    fontFamily: FONTS.serif,
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.ink,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.ink2,
  },
  booksScrollView: {
    marginHorizontal: -20,
    marginBottom: 24,
  },
  horizontalBooksScroll: {
    paddingHorizontal: 20,
  },
  reviewCard: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.line,
    borderWidth: 1,
    borderRadius: RADIUS.card,
    padding: 16,
    marginBottom: 16,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  postAuthorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  authorMeta: {
    gap: 2,
  },
  authorName: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.ink,
  },
  authorSub: {
    fontSize: 12,
    color: COLORS.ink3,
  },
  bookSnippetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderRadius: RADIUS.btnS,
    padding: 10,
    marginBottom: 14,
  },
  snippetDetails: {
    flex: 1,
    marginLeft: 12,
  },
  snippetTitle: {
    fontFamily: FONTS.serif,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.ink,
    marginBottom: 2,
  },
  snippetAuthor: {
    fontSize: 12,
    color: COLORS.ink2,
  },
  snippetRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(251, 191, 36, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.pill,
  },
  ratingValue: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.note,
  },
  reviewText: {
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.ink,
    marginBottom: 16,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionCount: {
    fontSize: 13,
    color: COLORS.ink2,
    fontWeight: '500',
  },
  articleCard: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.line,
    borderWidth: 1,
    borderRadius: RADIUS.card,
    padding: 16,
    marginBottom: 16,
  },
  articleTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  articleTag: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    color: COLORS.online,
  },
  articleTitle: {
    fontFamily: FONTS.serif,
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.ink,
    lineHeight: 22,
  },
});
