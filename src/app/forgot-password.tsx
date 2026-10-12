import React from 'react';
import { useRouter } from 'expo-router';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import Header from '../components/Header';


export default function ForgotPassword() {
  const router = useRouter();

  return (
    <ForgotPasswordScreen
      header={<Header />}
   
   onSendCode={(email) => 
    
    router.push({ pathname: '/otp', params: { email, flow: 'forgot' } })}
      onGoogle={() => console.log('Google sign-in')}
      onApple={() => console.log('Apple sign-in')}
      onCreateAccount={() => router.push('/login')}
    />
  );
}