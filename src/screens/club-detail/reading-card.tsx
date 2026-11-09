import { View } from 'react-native';

import { BookCover } from '@/components/book-cover';
import { Card } from '@/components/card';
import { ProgressBar } from '@/components/progress-bar';
import { Text } from '@/components/text';
import { books, type Club } from '@/data/mock';
import { colors } from '@/theme';

/** Carte « Lecture du mois » : couverture, titre, avancement du club. */
export function ReadingCard({ club, onPress }: { club: Club; onPress?: () => void }) {
  const book = books[club.bookId];
  return (
    <Card
      variant="feature"
      onPress={onPress}
      accessibilityLabel={`Lecture du mois : ${book.title}, ${book.author}. Le club en est au chapitre ${club.chapter} sur ${club.chapters}.`}
      style={{ flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 12 }}
    >
      <BookCover book={book} width={56} />
      <View style={{ flex: 1 }}>
        <Text variant="overline" color={colors.lavender}>
          Lecture du mois
        </Text>
        <Text variant="cardTitle" numberOfLines={1} style={{ marginTop: 4 }}>
          {book.title}
        </Text>
        <Text variant="caption" color={colors.ink2} numberOfLines={1} style={{ marginTop: 1 }}>
          {book.author}
        </Text>
        <ProgressBar value={club.chapter / club.chapters} style={{ marginTop: 10 }} />
        <Text variant="caption" color={colors.ink2} style={{ marginTop: 4 }}>
          Le club en est au chapitre {club.chapter} sur {club.chapters}
        </Text>
      </View>
    </Card>
  );
}
