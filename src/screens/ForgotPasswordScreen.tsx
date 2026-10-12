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
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GoogleIcon from '../components/GoogleIcon';
type Props = {
  header?: ReactNode;
  footer?: ReactNode;
  onSendCode?: (email: string) => void;
  onGoogle?: () => void;
  onApple?: () => void;
  onCreateAccount?: () => void;
};

export default function ForgotPasswordScreen({
  header,
  footer,
  onSendCode,
  onGoogle,
  onApple,
  onCreateAccount,
}: Props) {
  const [email, setEmail] = useState('');
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  // 390 = design width. Har size isi se scale hota hai.
  const s = (n: number) => Math.round((width / 390) * n);
  const styles = makeStyles(s);

  const handleSend = () => {
    const valid = /^\S+@\S+\.\S+$/.test(email.trim());
    if (!valid) {
      alert('Please enter a valid email address');
      return;
    }
    onSendCode?.(email.trim());
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Top: green rounded block + header */}
        <View style={[styles.topBlock, { paddingTop: insets.top + s(28) }]}>{header}</View>

        {/* Middle: card (green block par overlap karta hai) */}
        <View style={styles.middle}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Forgot Password?</Text>
            <Text style={styles.desc}>
              Don't worry! Enter your registered email address and we'll send you a verification
              code.
            </Text>

            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputWrap}>
              <Ionicons name="mail-outline" size={s(22)} color="#1F2937" style={styles.leftIcon} />
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

            <TouchableOpacity style={styles.sendBtn} onPress={handleSend} activeOpacity={0.85}>
              <Text style={styles.sendText}>Send Verification Code</Text>
              <Ionicons name="arrow-forward" size={s(20)} color="#fff" style={{ marginLeft: s(8) }} />
            </TouchableOpacity>

            {/* Social buttons */}
            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialBtn} onPress={onGoogle} activeOpacity={0.85}>
                <GoogleIcon size={s(20)} />
                <Text style={styles.socialText}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialBtn} onPress={onApple} activeOpacity={0.85}>
                <Ionicons name="logo-apple" size={s(20)} color="#111827" />
                <Text style={styles.socialText}>Apple</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            <View style={styles.row}>
              <Text style={styles.goldText}>New Vendor? </Text>
              <TouchableOpacity onPress={onCreateAccount}>
                <Text style={styles.createLink}>Create Account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const makeStyles = (s: (n: number) => number) =>
  StyleSheet.create({
    flex: { flex: 1, backgroundColor: '#F4F7F5' },
    container: {
      flexGrow: 1,
      backgroundColor: '#F4F7F5', // halka off-white background
      justifyContent: 'flex-start',
    },

 topBlock: {
  backgroundColor: '#0F5B3A',
  alignItems: 'center',
  paddingBottom: s(120),
  borderBottomLeftRadius: s(40),
  borderBottomRightRadius: s(40),
},

   middle: { width: '100%', alignItems: 'center', marginTop: -s(45) },
    card: {
      width: '90%',
      backgroundColor: '#fff',
      borderRadius: s(26),
      paddingHorizontal: s(22),
      paddingVertical: s(26),
      elevation: 8,
      shadowColor: '#000',
      shadowOpacity: 0.12,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 4 },
       marginBottom: s(85),
    },
    cardTitle: {
      fontSize: s(24),
      fontWeight: 'bold',
      color: '#C9A24B',
      marginBottom: s(8),
    },
    desc: {
      fontSize: s(14),
      lineHeight: s(20),
      color: '#374151',
      marginBottom: s(20),
    },
    label: { fontSize: s(12), fontWeight: '600', color: '#C9A24B', marginBottom: s(8) },
    inputWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F3F4F6',
      borderRadius: s(12),
      borderWidth: 1,
      borderColor: '#E5E7EB',
      paddingHorizontal: s(14),
      height: s(50),
    },
    leftIcon: { marginRight: s(10) },
    input: { flex: 1, fontSize: s(15), color: '#111827', paddingVertical: 0 },

    sendBtn: {
      flexDirection: 'row',
      backgroundColor: '#14663F',
      borderRadius: s(12),
      height: s(52),
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: s(22),
      elevation: 3,
    },
    sendText: { color: '#fff', fontSize: s(16), fontWeight: 'bold' },

    socialRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: s(18),
    },
    socialBtn: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: s(44),
      borderRadius: s(22),
      borderWidth: 1,
      borderColor: '#D1D5DB',
      backgroundColor: '#fff',
      marginHorizontal: s(6),
    },
    socialText: { fontSize: s(14), fontWeight: '600', color: '#111827', marginLeft: s(8) },

    divider: { height: 1, backgroundColor: '#E5E7EB', marginTop: s(20) },

    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: s(16),
    },
    goldText: { color: '#C9A24B', fontSize: s(14), fontWeight: '600' },
    createLink: { color: '#14663F', fontSize: s(14), fontWeight: 'bold' },

  
  });