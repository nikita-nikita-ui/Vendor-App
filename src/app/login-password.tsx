import React from 'react';
import { useRouter } from 'expo-router';
import PasswordLoginScreen from '../screens/PasswordLoginScreen';
import Header from '../components/Header';
import RagistrationFooter from '../components/RagistrationFooter';

export default function LoginPassword() {
  const router = useRouter();

  return (
    <PasswordLoginScreen
      header={<Header />}
      footer={<RagistrationFooter />}
      onLogin={(email, password) => console.log('Login:', email, password)}
     onForgotPassword={() => router.push('/forgot-password')}
      onCreateAccount={() => router.push('/login')}
    />
  );
}