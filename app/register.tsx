import * as React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react-native';
import { COLORS, FONTS } from '@/lib/theme';
import { Button } from '@/components/ui/button';
import { ScreenWrapper } from '@/components/ui/screen-wrapper';
import { ScreenHeader } from '@/components/ui/screen-header';
import { GoogleButton } from '@/components/ui/google-button';
import { Input } from '@/src/components/input/input';

export default function RegisterStep1Screen() {
  const router = useRouter();
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleContinue = () => {
    if (!username.trim() && !email.trim()) {
      setError('Veuillez remplir vos informations');
      return;
    }
    setError(null);
    router.push('/interests' as any);
  };

  return (
    <ScreenWrapper scrollable contentContainerStyle={styles.container}>
      {/* Top Header with Step indicator */}
      <ScreenHeader
        onBack={() => router.push('/')}
        step={{ current: 1, total: 2 }}
      />

      {/* Title & Subtitle */}
      <View style={styles.headerSection}>
        <Text style={styles.title}>Crée ton compte</Text>
        <Text style={styles.subtitle}>
          Rejoins Warak et commence à découvrir tes prochains livres.
        </Text>
      </View>

      {/* Form */}
      <View style={styles.formSection}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Nom d'utilisateur</Text>
          <Input
            value={username}
            onChangeText={setUsername}
            placeholder="@ton.pseudo"
            placeholderTextColor={COLORS.ink3}
            autoCapitalize="none"
            leftIcon={<User size={20} color={COLORS.ink3} />}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Adresse e-mail</Text>
          <Input
            value={email}
            onChangeText={setEmail}
            placeholder="prenom@exemple.com"
            placeholderTextColor={COLORS.ink3}
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon={<Mail size={20} color={COLORS.ink3} />}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Mot de passe</Text>
          <Input
            value={password}
            onChangeText={setPassword}
            placeholder="8 caractères minimum"
            placeholderTextColor={COLORS.ink3}
            secureTextEntry={!showPassword}
            leftIcon={<Lock size={20} color={COLORS.ink3} />}
            rightIcon={
              <Pressable
                onPress={() => setShowPassword(!showPassword)}
                hitSlop={10}
                style={styles.eyeButton}>
                {showPassword ? (
                  <EyeOff size={20} color={COLORS.ink3} />
                ) : (
                  <Eye size={20} color={COLORS.ink3} />
                )}
              </Pressable>
            }
          />
        </View>

        {/* Continue Button */}
        <Button
          size="default"
          variant="default"
          onPress={handleContinue}
          className="w-full mt-2">
          <Text style={styles.buttonText}>Continuer</Text>
        </Button>

        {/* Terms text */}
        <Text style={styles.termsText}>
          En continuant, tu acceptes nos conditions d'utilisation et notre politique de confidentialité.
        </Text>
      </View>

      {/* Divider */}
      <View style={styles.dividerRow}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>ou</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* Google Button */}
      <GoogleButton
        label="S'inscrire avec Google"
        onPress={() => router.push('/interests' as any)}
      />

      {/* Bottom Switcher */}
      <View style={styles.bottomSection}>
        <Text style={styles.bottomText}>
          Déjà inscrit ?{' '}
          <Text
            onPress={() => router.push('/login' as any)}
            style={styles.bottomLink}>
            Se connecter
          </Text>
        </Text>
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
    marginBottom: 24,
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
  formSection: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.ink,
    marginLeft: 2,
  },
  eyeButton: {
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.onAccent,
    fontSize: 16,
    fontWeight: '600',
  },
  termsText: {
    color: COLORS.ink3,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 6,
    paddingHorizontal: 8,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.line,
  },
  dividerText: {
    color: COLORS.ink3,
    fontSize: 14,
  },
  bottomSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 28,
  },
  bottomText: {
    color: COLORS.ink2,
    fontSize: 14,
  },
  bottomLink: {
    color: COLORS.ink,
    fontWeight: '700',
  },
});
