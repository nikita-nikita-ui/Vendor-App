import React, { useState, ReactNode } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  header?: ReactNode;
  footer?: ReactNode;
  onSendOtp?: (email: string) => void;
  onLogin?: () => void;
};

export default function LoginScreen({ header, footer, onSendOtp, onLogin }: Props) {
  const [email, setEmail] = useState('');
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  // 390 = design width. Har size isi se scale hota hai.
  const s = (n: number) => Math.round((width / 390) * n);
  const styles = makeStyles(s);

  const handleSendOtp = () => {
    const valid = /^\S+@\S+\.\S+$/.test(email.trim());
    if (!valid) {
      alert('Please enter a valid email address');
      return;
    }
    onSendOtp?.(email.trim());
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingTop: insets.top + s(36), paddingBottom: insets.bottom + s(20) },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
      {header}

        {/* Middle: card + login link */}
        <View style={styles.middle}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Sign in / Register</Text>

            <Text style={styles.label}>Enter your Email</Text>
            <View style={styles.inputWrap}>
              <Text style={styles.inputIcon}>✉️</Text>
              <TextInput
                style={styles.input}
                placeholder="vendor@domain.com"
                placeholderTextColor="#6B7280"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <TouchableOpacity style={styles.otpBtn} onPress={handleSendOtp} activeOpacity={0.85}>
              <Text style={styles.otpText}>Send OTP</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <Text style={styles.goldText}>Already have an account? </Text>
            <TouchableOpacity onPress={onLogin}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom: shared footer */}
        {footer}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const makeStyles = (s: (n: number) => number) =>
  StyleSheet.create({
    flex: { flex: 1, backgroundColor: '#0F5B3A' },
    container: {
      flexGrow: 1,
      backgroundColor: '#0F5B3A',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    middle: { width: '100%', alignItems: 'center' },
    card: {
      width: '88%',
      backgroundColor: '#fff',
      borderRadius: s(26),
      paddingHorizontal: s(22),
      paddingVertical: s(26),
      elevation: 6,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 },
    },
    cardTitle: {
      fontSize: s(26),
      fontWeight: 'bold',
      color: '#C9A24B',
      textAlign: 'center',
      marginBottom: s(24),
    },
    label: { fontSize: s(13), color: '#C9A24B', marginBottom: s(8) },
    inputWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F3F4F6',
      borderRadius: s(14),
      borderWidth: 1,
      borderColor: '#E5E7EB',
      paddingHorizontal: s(14),
      height: s(54),
    },
    inputIcon: { fontSize: s(18), marginRight: s(10) },
    input: { flex: 1, fontSize: s(16), color: '#111827', paddingVertical: 0 },

    otpBtn: {
      backgroundColor: '#14663F',
      borderRadius: s(14),
      height: s(54),
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: s(24),
    },
    otpText: { color: '#fff', fontSize: s(17), fontWeight: 'bold' },

    row: { flexDirection: 'row', alignItems: 'center', marginTop: s(26) },
    goldText: { color: '#C9A24B', fontSize: s(14) },
    loginLink: { color: '#fff', fontSize: s(14), fontWeight: 'bold' },
  });