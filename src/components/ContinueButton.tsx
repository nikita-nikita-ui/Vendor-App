import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  onPress: () => void;
  label?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function ContinueButton({ onPress, label = 'Continue', disabled, style }: Props) {
  const { width } = useWindowDimensions();

  // 390 = design width. Har size isi se scale hota hai.
  const s = (n: number) => Math.round((width / 390) * n);
  const styles = makeStyles(s);

  return (
    <TouchableOpacity
      style={[styles.btn, disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.85}
    >
      <Text style={styles.text}>{label}</Text>
      <Ionicons name="arrow-forward" size={s(20)} color="#fff" style={{ marginLeft: s(8) }} />
    </TouchableOpacity>
  );
}

const makeStyles = (s: (n: number) => number) =>
  StyleSheet.create({
    btn: {
      flexDirection: 'row',
      backgroundColor: '#14663F',
      borderRadius: s(12),
      height: s(52),
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: s(10),
      marginBottom: s(30),
      elevation: 3,
    },
    disabled: { opacity: 0.5 },
    text: { color: '#fff', fontSize: s(16), fontWeight: 'bold' },
  });