import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, FONTS } from '@/lib/theme';
import { Button } from '@/components/ui/button';
import { ScreenWrapper } from '@/components/ui/screen-wrapper';
import { WarakLogo } from '@/components/ui/warak-logo';
import { AnimatedBooksShowcase } from '@/components/ui/animated-books-showcase';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <ScreenWrapper scrollable contentContainerStyle={styles.container}>
      {/* Top Logo */}
      <View style={styles.logoRow}>
        <WarakLogo size={32} />
      </View>

      {/* Reanimated Real Books Showcase (Le Pain nu, L'Étranger, Chanson douce) */}
      <AnimatedBooksShowcase />

      {/* Hero Typography */}
      <View style={styles.textSection}>
        <Text style={styles.heroTitle}>
          Découvre.{'\n'}
          Partage.{'\n'}
          Échange.
        </Text>
        <Text style={styles.heroSubtitle}>
          Trouve ta prochaine lecture selon tes centres d'intérêt et rejoins une communauté de lecteurs passionnés.
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionSection}>
        <Button
          size="default"
          variant="default"
          onPress={() => router.push('/register' as any)}
          className="w-full">
          <Text style={styles.primaryButtonText}>Créer mon compte</Text>
        </Button>

        <Button
          size="default"
          variant="ghost"
          onPress={() => router.push('/login' as any)}
          className="w-full mt-2">
          <Text style={styles.secondaryButtonText}>J'ai déjà un compte</Text>
        </Button>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingBottom: 20,
  },
  logoRow: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  textSection: {
    marginTop: 6,
    marginBottom: 20,
  },
  heroTitle: {
    fontFamily: FONTS.serif,
    fontSize: 38,
    lineHeight: 42,
    fontWeight: '600',
    color: COLORS.ink,
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontFamily: FONTS.sans,
    fontSize: 15,
    lineHeight: 23,
    color: COLORS.ink2,
    marginTop: 12,
  },
  actionSection: {
    width: '100%',
    gap: 8,
  },
  primaryButtonText: {
    color: COLORS.onAccent,
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: COLORS.ink,
    fontSize: 15,
    fontWeight: '500',
  },
});
