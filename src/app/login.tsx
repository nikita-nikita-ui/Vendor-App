import React from 'react';
import { useRouter } from 'expo-router';
import LoginScreen from '../screens/LoginScreen';
import Header from '../components/Header';
import RagistrationFooter from '../components/RagistrationFooter';

export default function Login() {
  const router = useRouter();

  return (
  <LoginScreen
  header={<Header />}
  footer={<RagistrationFooter />}
  onSendOtp={(email) => router.push({ pathname: '/otp', params: { email } })}
  onLogin={() => router.push('/login-password')}
/>
  );
}