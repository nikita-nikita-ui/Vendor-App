import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import OtpScreen from '../screens/OtpScreen';
import Header from '../components/Header';
import RagistrationFooter from '../components/RagistrationFooter';

export default function Otp() {
  const router = useRouter();
 const { email, flow } = useLocalSearchParams<{ email?: string; flow?: string }>();

  return (
    <OtpScreen
      header={<Header />}
      footer={<RagistrationFooter />}
      email={email}
      onEditEmail={() => router.back()}
   onVerify={(otp) => {
  console.log('Verify OTP:', otp);
  if (flow === 'forgot') {
    router.push('/create-password');
  } else {
    router.push('/shopkeeper-details');
  }
}}
      onResend={() => console.log('Resend OTP')}
    />
  );
}