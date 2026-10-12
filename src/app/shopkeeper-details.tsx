import React from 'react';
import { useRouter } from 'expo-router';
import ShopkeeperDetailsScreen from '../screens/ShopkeeperDetailsScreen';
import Header from '../components/Header';
import RagistrationFooter from '../components/RagistrationFooter';
import ContinueButton from '../components/ContinueButton';

export default function ShopkeeperDetails() {
  const router = useRouter();

  return (
    <ShopkeeperDetailsScreen
      header={<Header />}
      footer={<RagistrationFooter />}
      continueButton={(onPress) => <ContinueButton onPress={onPress} />}
      onSubmit={(details, service) => {
        // TODO: API call yahan lagegi
        console.log('Service:', service);
        console.log('Details:', details);
      }}
    />
  );
}