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
import { Ionicons } from '@expo/vector-icons';
type Props = {
  header?: ReactNode;
  footer?: ReactNode;
  onLogin?: (email: string, password: string) => void;
  onForgotPassword?: () => void;
  onCreateAccount?: () => void;
};

export default function PasswordLoginScreen({
  header,
  footer,
  onLogin,
  onForgotPassword,
  onCreateAccount,
}: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  // 390 = design width. Har size isi se scale hota hai.
  const s = (n: number) => Math.round((width / 390) * n);
  const styles = makeStyles(s);

  const handleLogin = () => {
    const validEmail = /^\S+@\S+\.\S+$/.test(email.trim());
    if (!validEmail) {
      alert('Please enter a valid email address');
      return;
    }
    if (password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    onLogin?.(email.trim(), password);
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
        {/* Top: header (route file se aata hai) */}
        {header}

        {/* Middle: card + create account link */}
        <View style={styles.middle}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Sign in / Register</Text>

            {/* Email */}
            <Text style={styles.label}>Enter your Email</Text>
            <View style={styles.inputWrap}>
          <Ionicons name="mail-outline" size={s(22)} color="#1F2937" style={styles.leftIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter your email address"
                placeholderTextColor="#6B7280"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Password */}
            <Text style={[styles.label, { marginTop: s(16) }]}>Enter your Password</Text>
            <View style={styles.inputWrap}>
              <Ionicons name="lock-closed-outline" size={s(22)} color="#1F2937" style={styles.leftIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#6B7280"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity onPress={() => setShowPassword((v) => !v)} hitSlop={10}>
        <Ionicons
  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
  size={s(22)}
  color="#1F2937"
/>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.forgotWrap} onPress={onForgotPassword}>
              <Text style={styles.forgotText}>Forget Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} activeOpacity={0.85}>
              <Text style={styles.loginText}>Login with Password</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <Text style={styles.goldText}>New to MetKart? </Text>
            <TouchableOpacity onPress={onCreateAccount}>
              <Text style={styles.createLink}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom: footer (route file se aata hai) */}
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
      marginBottom: s(22),
    },
    label: { fontSize: s(13), fontWeight: '600', color: '#C9A24B', marginBottom: s(8) },
    inputWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: s(14),
      borderWidth: 1,
      borderColor: '#D1D5DB',
      paddingHorizontal: s(14),
      height: s(54),
    },
    leftIcon: { fontSize: s(18), marginRight: s(10) },
    input: { flex: 1, fontSize: s(16), color: '#111827', paddingVertical: 0 },
    eyeIcon: { fontSize: s(18), marginLeft: s(8) },

    forgotWrap: { alignSelf: 'flex-end', marginTop: s(10) },
    forgotText: { fontSize: s(13), color: '#C9A24B' },

    loginBtn: {
      backgroundColor: '#14663F',
      borderRadius: s(14),
      height: s(54),
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: s(22),
      elevation: 3,
    },
    loginText: { color: '#fff', fontSize: s(17), fontWeight: 'bold' },

    row: { flexDirection: 'row', alignItems: 'center', marginTop: s(26) ,marginBottom: s(26)},
    goldText: { color: '#C9A24B', fontSize: s(14) },
    createLink: { color: '#fff', fontSize: s(14), fontWeight: 'bold' },
  });