import React from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native';

const leafImg = require('../../assets/expo.icon/Assets/images/splash/leaf.png');

export default function Header() {
  const { width } = useWindowDimensions();

  // 390 = design width. Har size isi se scale hota hai.
  const s = (n: number) => Math.round((width / 390) * n);
  const styles = makeStyles(s);

  return (
    <View style={styles.header}>
      <Image source={leafImg} style={styles.leaf} resizeMode="contain" />
      <Text style={styles.title}>GoMetKart</Text>
      <Text style={styles.tagline}>
        Turn waste into wallet.{'\n'}Shop local, live green.
      </Text>
    </View>
  );
}

const makeStyles = (s: (n: number) => number) =>
  StyleSheet.create({
    header: { alignItems: 'center', marginTop: -s(30), },
    leaf: { width: s(110), height: s(110) },
    title: {
      fontSize: s(36),
      lineHeight: s(42),
      fontWeight: '800',
      letterSpacing: 0.5,
      color: '#D4B36A',
      textAlign: 'center',
      marginTop: -s(20),
    },
    tagline: {
      fontSize: s(14),
      lineHeight: s(19),
      color: '#fff',
      textAlign: 'center',
      marginTop: s(4),
      marginBottom:s(30),
    },
  });