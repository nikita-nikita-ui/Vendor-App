import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../components/Header';

const houseImg = require('../../assets/expo.icon/Assets/images/splash/house.png');
const plantLeftImg = require('../../assets/expo.icon/Assets/images/splash/plant.png');
const plantRightImg = require('../../assets/expo.icon/Assets/images/splash/plant1.png');

export default function SplashScreen({ onStart }: { onStart: () => void }) {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const s = (n: number) => Math.round((width / 390) * n);
  const styles = makeStyles(s);

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + s(36), paddingBottom: insets.bottom + s(70) },
      ]}
    >
      {/* Top: shared header */}
      <Header />

      {/* Main illustration */}
      <Image
        source={houseImg}
        style={{ width: width, height: width * 0.98 }}
        resizeMode="cover"
      />

      {/* Start button */}
      <TouchableOpacity style={styles.buttonWrap} onPress={onStart} activeOpacity={0.85}>
        <LinearGradient
          colors={['#E8CD84', '#C9A24B', '#E8CD84']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Start</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Bottom trees */}
      <Image source={plantRightImg} style={styles.plantLeft} resizeMode="cover" />
      <Image source={plantLeftImg} style={styles.plantRight} resizeMode="cover" />
    </View>
  );
}

const makeStyles = (s: (n: number) => number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0F5B3A',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    buttonWrap: { width: '70%', alignSelf: 'center', marginBottom: 25 },
    button: {
      paddingVertical: s(14),
      borderRadius: s(30),
      alignItems: 'center',
    },
    buttonText: { fontSize: s(20), fontWeight: 'bold', color: '#0F5B3A' },

    plantLeft: { position: 'absolute', bottom: 0, left: 0, width: s(100), height: s(120) },
    plantRight: { position: 'absolute', bottom: 0, right: 0, width: s(100), height: s(140) },
  });