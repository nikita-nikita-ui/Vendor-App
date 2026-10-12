import React from 'react';
import { useRouter } from 'expo-router';
import SplashScreen from '../screens/SplashScreen';

export default function Index() {
  const router = useRouter();
  return <SplashScreen onStart={() => router.push('/login')} />;
}