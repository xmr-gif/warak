import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, FONTS } from '@/lib/theme';
import { Button } from '@/components/ui/button';
import { ScreenWrapper } from '@/components/ui/screen-wrapper';
import { ScreenHeader } from '@/components/ui/screen-header';
import { Chip } from '@/components/ui/chip';

interface CategoryItem {
  id: string;
  label: string;
  gradient?: readonly string[] | string[];
}

const INTERESTS: CategoryItem[] = [
  { id: 'dev-perso', label: 'Développement personnel', gradient: COLORS.perso },
  { id: 'psycho', label: 'Psychologie', gradient: COLORS.psycho },
  { id: 'sf', label: 'Science-fiction', gradient: COLORS.sf },
  { id: 'classiques', label: 'Classiques', gradient: COLORS.classiques },
  { id: 'philo', label: 'Philosophie', gradient: COLORS.philo },
  { id: 'maghreb', label: 'Romans maghrébins', gradient: COLORS.philo },
  { id: 'polar', label: 'Polar et thriller', gradient: COLORS.perso },
  { id: 'poesie', label: 'Poésie', gradient: COLORS.sf },
  { id: 'histoire', label: 'Histoire', gradient: COLORS.classiques },
  { id: 'fantasy', label: 'Fantasy', gradient: COLORS.sf },
  { id: 'bio', label: 'Biographies', gradient: COLORS.perso },
  { id: 'spirit', label: 'Spiritualité', gradient: COLORS.psycho },
  { id: 'business', label: 'Business', gradient: COLORS.philo },
  { id: 'manga', label: 'Manga et BD', gradient: COLORS.perso },
  { id: 'sciences', label: 'Sciences', gradient: COLORS.psycho },
];

export default function InterestsStep2Screen() {
  const router = useRouter();
  // Default with the 5 selected items from page 5
  const [selectedIds, setSelectedIds] = React.useState<string[]>([
    'dev-perso',
    'psycho',
    'sf',
    'classiques',
    'philo',
  ]);

  const toggleInterest = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const count = selectedIds.length;

  return (
    <ScreenWrapper scrollable contentContainerStyle={styles.container}>
      {/* Top Header with Step indicator */}
      <ScreenHeader
        onBack={() => router.push('/register' as any)}
        step={{ current: 2, total: 2 }}
      />

      {/* Title & Subtitle */}
      <View style={styles.headerSection}>
        <Text style={styles.title}>
          Qu'est-ce qui te fait{'\n'}vibrer ?
        </Text>
        <Text style={styles.subtitle}>
          Choisis au moins 3 centres d'intérêt. On s'en sert pour te recommander des livres et des clubs.
        </Text>
      </View>

      {/* Selected count badge */}
      <View style={styles.counterRow}>
        <Text style={styles.counterText}>
          {count} SÉLECTIONNÉ{count > 1 ? 'S' : ''}
        </Text>
      </View>

      {/* Chips Cloud */}
      <View style={styles.chipsWrap}>
        {INTERESTS.map((item) => {
          const isSelected = selectedIds.includes(item.id);
          return (
            <Chip
              key={item.id}
              label={item.label}
              selected={isSelected}
              categoryGradient={item.gradient}
              onPress={() => toggleInterest(item.id)}
            />
          );
        })}
      </View>

      {/* Action Buttons */}
      <View style={styles.bottomSection}>
        <Button
          size="default"
          variant="default"
          onPress={() => router.push('/home')}
          className="w-full">
          <Text style={styles.primaryButtonText}>Découvrir mes lectures</Text>
        </Button>

        <Button
          size="default"
          variant="ghost"
          onPress={() => router.push('/home')}
          className="w-full mt-2">
          <Text style={styles.secondaryButtonText}>Passer pour l'instant</Text>
        </Button>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
    paddingTop: 12,
  },
  headerSection: {
    marginTop: 16,
    marginBottom: 20,
  },
  title: {
    fontFamily: FONTS.serif,
    fontSize: 32,
    lineHeight: 36,
    fontWeight: '600',
    color: COLORS.ink,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontFamily: FONTS.sans,
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.ink2,
    marginTop: 10,
  },
  counterRow: {
    marginBottom: 16,
  },
  counterText: {
    fontFamily: FONTS.sans,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: COLORS.ink3,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 28,
  },
  bottomSection: {
    width: '100%',
    gap: 8,
    marginTop: 12,
  },
  primaryButtonText: {
    color: COLORS.onAccent,
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: COLORS.ink2,
    fontSize: 15,
    fontWeight: '500',
  },
});
