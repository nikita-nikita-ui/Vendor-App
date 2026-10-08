import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function SplashScreen({ onStart }: { onStart: () => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MetKart</Text>
      <Text style={styles.tagline}>Turn waste into wallet.{'\n'}Shop local, live green.</Text>

      <TouchableOpacity style={styles.button} onPress={onStart}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F5B3A', alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 40, fontWeight: 'bold', color: '#C9A24B' },
  tagline: { fontSize: 14, color: '#fff', textAlign: 'center', marginTop: 8 },
  button: { position: 'absolute', bottom: 80, width: '85%', backgroundColor: '#C9A24B', paddingVertical: 16, borderRadius: 30, alignItems: 'center' },
  buttonText: { fontSize: 18, fontWeight: 'bold', color: '#0F5B3A' },
});