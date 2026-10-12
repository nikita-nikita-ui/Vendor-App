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

type Props = {
  header?: ReactNode;
  footer?: ReactNode;
  onReset?: (password: string) => void;
  onBack?: () => void;
};

type PasswordFieldProps = {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  s: (n: number) => number;
  styles: ReturnType<typeof makeStyles>;
};

// Component bahar define hai, taaki type karte waqt keyboard band na ho
function PasswordField({ label, value, onChangeText, s, styles }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrap}>
        <Ionicons name="lock-closed-outline" size={s(22)} color="#1F2937" style={styles.leftIcon} />
        <TextInput
          style={styles.input}
          placeholder="********"
          placeholderTextColor="#6B7280"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!visible}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity onPress={() => setVisible((v) => !v)} hitSlop={10}>
          <Ionicons
            name={visible ? 'eye-outline' : 'eye-off-outline'}
            size={s(22)}
            color="#1F2937"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function CreatePasswordScreen({ header, footer, onReset, onBack }: Props) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  // 390 = design width. Har size isi se scale hota hai.
  const s = (n: number) => Math.round((width / 390) * n);
  const styles = makeStyles(s);

  const handleReset = () => {
    if (password.length < 8) {
      alert('Password must be at least 8 characters');
      return;
    }
    if (password !== confirm) {
      alert('Passwords do not match');
      return;
    }
    onReset?.(password);
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

        {/* Middle: card */}
        <View style={styles.middle}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Create New Password</Text>
            <Text style={styles.desc}>Create a strong password to secure your vendor account.</Text>

            <PasswordField
              label="New Password"
              value={password}
              onChangeText={setPassword}
              s={s}
              styles={styles}
            />
            <PasswordField
              label="Confirm New Password"
              value={confirm}
              onChangeText={setConfirm}
              s={s}
              styles={styles}
            />

            <TouchableOpacity style={styles.resetBtn} onPress={handleReset} activeOpacity={0.85}>
              <Text style={styles.resetText}>Reset Password</Text>
              <Ionicons name="arrow-forward" size={s(20)} color="#fff" style={{ marginLeft: s(8) }} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.backRow} onPress={onBack} hitSlop={10}>
              <Ionicons name="arrow-back" size={s(18)} color="#14663F" />
              <Text style={styles.backText}>Back to Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom: footer */}
        <View style={[styles.bottomBlock, { paddingBottom: insets.bottom + s(8) }]}>{footer}</View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const makeStyles = (s: (n: number) => number) =>
  StyleSheet.create({
    flex: { flex: 1, backgroundColor: '#F4F7F5' },
    container: { flexGrow: 1, backgroundColor: '#F4F7F5', justifyContent: 'space-between' },

    topBlock: {
      backgroundColor: '#0F5B3A',
      alignItems: 'center',
      paddingBottom: s(80),
      borderBottomLeftRadius: s(40),
      borderBottomRightRadius: s(40),
    },

    middle: { width: '100%', alignItems: 'center', marginTop: -s(56) },
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
    },
    cardTitle: { fontSize: s(24), fontWeight: 'bold', color: '#C9A24B', marginBottom: s(8) },
    desc: { fontSize: s(14), lineHeight: s(20), color: '#374151', marginBottom: s(20) },

    fieldWrap: { marginBottom: s(16) },
    label: { fontSize: s(13), fontWeight: '600', color: '#C9A24B', marginBottom: s(8) },
    inputWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F3F4F6',
      borderRadius: s(12),
      borderWidth: 1,
      borderColor: '#D1D5DB',
      paddingHorizontal: s(14),
      height: s(52),
    },
    leftIcon: { marginRight: s(10) },
    input: { flex: 1, fontSize: s(16), color: '#111827', paddingVertical: 0 },

    resetBtn: {
      flexDirection: 'row',
      backgroundColor: '#14663F',
      borderRadius: s(26),
      height: s(54),
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: s(10),
      elevation: 3,
    },
    resetText: { color: '#fff', fontSize: s(17), fontWeight: 'bold' },

    backRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: s(20),
    },
    backText: { color: '#14663F', fontSize: s(15), fontWeight: 'bold', marginLeft: s(6) },

    bottomBlock: {
      backgroundColor: '#0F5B3A',
      alignItems: 'center',
      paddingTop: s(16),
      marginTop: s(24),
      borderTopLeftRadius: s(40),
      borderTopRightRadius: s(40),
    },
  });