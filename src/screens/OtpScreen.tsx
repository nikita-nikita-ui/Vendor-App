import React, { useEffect, useRef, useState, ReactNode } from 'react';
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

const OTP_LENGTH = 6;
const RESEND_SECONDS = 45;

type Props = {
  header?: ReactNode;
  footer?: ReactNode;
  email?: string;
  onVerify?: (otp: string) => void;
  onResend?: () => void;
  onEditEmail?: () => void;
};

export default function OtpScreen({
  header,
  footer,
  email = 'vendor@domain.com',
  onVerify,
  onResend,
  onEditEmail,
}: Props) {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  // 390 = design width. Har size isi se scale hota hai.
  const s = (n: number) => Math.round((width / 390) * n);

  // 6 boxes ki width card ke andar barabar baant di jati hai
  const gap = s(8);
  const cardInner = width * 0.88 - s(44);
  const boxSize = Math.floor((cardInner - gap * (OTP_LENGTH - 1)) / OTP_LENGTH);
  const styles = makeStyles(s, boxSize, gap);

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [seconds, setSeconds] = useState(RESEND_SECONDS);
  const inputs = useRef<Array<TextInput | null>>([]);

  // Resend countdown
  useEffect(() => {
    if (seconds <= 0) return;
    const id = setInterval(() => setSeconds((v) => v - 1), 1000);
    return () => clearInterval(id);
  }, [seconds]);

  const handleChange = (text: string, index: number) => {
    const digits = text.replace(/\D/g, '');
    const next = [...otp];

    if (digits.length > 1) {
      // Paste: poora code boxes mein baant do
      digits
        .slice(0, OTP_LENGTH - index)
        .split('')
        .forEach((d, i) => (next[index + i] = d));
      setOtp(next);
      inputs.current[Math.min(index + digits.length, OTP_LENGTH - 1)]?.focus();
      return;
    }

    next[index] = digits;
    setOtp(next);
    if (digits && index < OTP_LENGTH - 1) inputs.current[index + 1]?.focus();
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      const next = [...otp];
      next[index - 1] = '';
      setOtp(next);
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length < OTP_LENGTH) {
      alert('Please enter the 6-digit code');
      return;
    }
    onVerify?.(code);
  };

  const handleResend = () => {
    setOtp(Array(OTP_LENGTH).fill(''));
    setSeconds(RESEND_SECONDS);
    inputs.current[0]?.focus();
    onResend?.();
  };

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

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

        {/* Middle: OTP card */}
        <View style={styles.middle}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Verify OTP</Text>

            <Text style={styles.subText}>We've sent a verification code to</Text>
            <View style={styles.emailRow}>
              <Text style={styles.emailText}>{email}</Text>
              <TouchableOpacity onPress={onEditEmail} hitSlop={10}>
                <Text style={styles.editIcon}>✎</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.otpRow}>
              {otp.map((digit, i) => (
              <TextInput
  key={i}
  ref={(r) => {
    inputs.current[i] = r;
  }}
  style={[styles.otpBox, digit ? styles.otpBoxFilled : null]}
  value={digit}
  onChangeText={(t) => handleChange(t, i)}
  onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, i)}
  keyboardType="number-pad"
  placeholder="•"
  placeholderTextColor="#6B7280"
  maxLength={i === 0 ? OTP_LENGTH : 1}
  textAlign="center"
  selectTextOnFocus
  autoFocus={i === 0}
/>
              ))}
            </View>

            {seconds > 0 ? (
              <Text style={styles.resendText}>
                Resend OTP in <Text style={styles.timer}>{mm}:{ss}</Text>
              </Text>
            ) : (
              <TouchableOpacity onPress={handleResend}>
                <Text style={[styles.resendText, styles.resendLink]}>Resend OTP</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.verifyBtn} onPress={handleVerify} activeOpacity={0.85}>
              <Text style={styles.verifyText}>Verify OTP</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom: footer (route file se aata hai) */}
        {footer}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const makeStyles = (s: (n: number) => number, boxSize: number, gap: number) =>
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
      alignItems: 'center',
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
      marginBottom: s(14),
    },
    subText: { fontSize: s(13), color: '#374151', textAlign: 'center' },
    emailRow: { flexDirection: 'row', alignItems: 'center', marginTop: s(2) },
    emailText: { fontSize: s(13), color: '#374151' },
    editIcon: { fontSize: s(14), color: '#14663F', marginLeft: s(6) },

    otpRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: s(22),
    },
    otpBox: {
      width: boxSize,
      height: s(50),
      marginRight: 0,
      borderRadius: s(10),
      borderWidth: 1,
      borderColor: '#E5E7EB',
      backgroundColor: '#F3F4F6',
      fontSize: s(18),
      fontWeight: 'bold',
      color: '#111827',
      padding: 0,
    },
    otpBoxFilled: { borderColor: '#14663F', backgroundColor: '#fff' },

    resendText: { fontSize: s(12), color: '#374151', marginTop: s(18) },
    timer: { color: '#14663F', fontWeight: 'bold' },
    resendLink: { color: '#C9A24B', fontWeight: 'bold' },

    verifyBtn: {
      width: '100%',
      backgroundColor: '#14663F',
      borderRadius: s(14),
      height: s(54),
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: s(22),
    },
    verifyText: { color: '#fff', fontSize: s(17), fontWeight: 'bold' },
  });