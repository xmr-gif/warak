import * as React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react-native';
import { COLORS, FONTS } from '@/lib/theme';
import { Button } from '@/components/ui/button';
import { ScreenWrapper } from '@/components/ui/screen-wrapper';
import { ScreenHeader } from '@/components/ui/screen-header';
import { GoogleButton } from '@/components/ui/google-button';
import { Input } from '@/src/components/input/input';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleLogin = () => {
    if (!email) {
      setError("Veuillez saisir votre adresse e-mail");
      return;
    }
    setError(null);
    router.push('/home');
  };

  return (
    <ScreenWrapper scrollable contentContainerStyle={styles.container}>
      {/* Top Header */}
      <ScreenHeader onBack={() => router.push('/')} />

      {/* Title & Subtitle */}
      <View style={styles.headerSection}>
        <Text style={styles.title}>
          Bon retour parmi{'\n'}nous
        </Text>
        <Text style={styles.subtitle}>
          Retrouve tes lectures, tes clubs et ta communauté de lecteurs.
        </Text>
      </View>

      {/* Form */}
      <View style={styles.formSection}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Adresse e-mail</Text>
          <Input
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (error) setError(null);
            }}
            placeholder="prenom@exemple.com"
            placeholderTextColor={COLORS.ink3}
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon={<Mail size={20} color={COLORS.ink3} />}
            error={error ? true : false}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Mot de passe</Text>
          <Input
            value={password}
            onChangeText={setPassword}
            placeholder="Ton mot de passe"
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

        {/* Forgot password */}
        <Pressable style={styles.forgotWrap}>
          <Text style={styles.forgotText}>Mot de passe oublié ?</Text>
        </Pressable>

        {/* Submit */}
        <Button
          size="default"
          variant="default"
          onPress={handleLogin}
          className="w-full mt-2">
          <Text style={styles.buttonText}>Se connecter</Text>
        </Button>
      </View>

      {/* Divider */}
      <View style={styles.dividerRow}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>ou</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* Google Button */}
      <GoogleButton
        label="Continuer avec Google"
        onPress={() => router.push('/home')}
      />

      {/* Bottom Switcher */}
      <View style={styles.bottomSection}>
        <Text style={styles.bottomText}>
          Pas encore de compte ?{' '}
          <Text
            onPress={() => router.push('/register' as any)}
            style={styles.bottomLink}>
            Créer un compte
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
    marginBottom: 28,
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
  forgotWrap: {
    alignSelf: 'flex-end',
    marginTop: -4,
    marginBottom: 8,
  },
  forgotText: {
    color: COLORS.ink2,
    fontSize: 14,
    fontWeight: '500',
  },
  buttonText: {
    color: COLORS.onAccent,
    fontSize: 16,
    fontWeight: '600',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
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
    marginTop: 36,
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
