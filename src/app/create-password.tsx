import React from 'react';
import { useRouter } from 'expo-router';
import CreatePasswordScreen from '../screens/CreatePasswordScreen';
import Header from '../components/Header';
import RagistrationFooter from '../components/RagistrationFooter';

export default function CreatePassword() {
  const router = useRouter();

  return (
    <CreatePasswordScreen
      header={<Header />}
      footer={<RagistrationFooter />}
      onReset={(password) => {
        // TODO: reset password API yahan lagegi
        console.log('New password set');
        router.replace('/login-password');
      }}
      onBack={() => router.replace('/login-password')}
    />
  );
}