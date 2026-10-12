import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';

export default function Footer() {
  const { width } = useWindowDimensions();

  // 390 = design width. Har size isi se scale hota hai.
  const s = (n: number) => Math.round((width / 390) * n);
  const styles = makeStyles(s);

  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>
        Presented by <Text style={styles.goldText}>METODX</Text>
      </Text>
      <Text style={styles.footerText}>© All rights reserved 2026</Text>
    <Text style={[styles.footerText, { marginTop: s(10), color: '#bb893f' }]}>Made in India 🇮🇳</Text>
    </View>
  );
}

const makeStyles = (s: (n: number) => number) =>
  StyleSheet.create({
    footer: { alignItems: 'center', marginBottom: 20 },
    footerText: { color: '#fff', fontSize: s(12), marginTop: s(2) },
    goldText: { color: '#C9A24B', fontSize: s(12) },
  });