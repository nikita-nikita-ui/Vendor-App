import React, { useState, ReactNode } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ServiceSelectDialog, { ServiceType } from '../components/ServiceSelectDialog';

export type ShopkeeperDetails = {
  panCard: string;
  gstNumber: string;
  serviceMenuImage: string;
  shopImage: string;
  accountHolder: string;
  accountNumber: string;
  ifsc: string;
  bankName: string;
};

type Props = {
  header?: ReactNode;
  footer?: ReactNode;
  onSubmit?: (details: ShopkeeperDetails, service: ServiceType) => void;
};

const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const GST_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;
const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/;

export default function ShopkeeperDetailsScreen({ header, footer, continueButton, onSubmit }: Props) {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const s = (n: number) => Math.round((width / 390) * n);
  const styles = makeStyles(s);

  const [panCard, setPanCard] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [serviceMenuImage, setServiceMenuImage] = useState('');
  const [shopImage, setShopImage] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [bankName, setBankName] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false);

  const pickImage = async (setter: (uri: string) => void) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.7,
    });
    if (!result.canceled) setter(result.assets[0].uri);
  };

  const handleContinue = () => {
    if (!PAN_REGEX.test(panCard)) return alert('Enter a valid PAN Card number (e.g. ABCDE1234F)');
    if (!GST_REGEX.test(gstNumber)) return alert('Enter a valid 15-character GST number');
    if (!serviceMenuImage) return alert('Please upload your service menu');
    if (!shopImage) return alert('Please upload your shop profile image');
    if (!accountHolder.trim()) return alert('Enter account holder name');
    if (accountNumber.length < 9) return alert('Enter a valid account number');
    if (!IFSC_REGEX.test(ifsc)) return alert('Enter a valid IFSC code (e.g. SBIN0001234)');
    if (!bankName.trim()) return alert('Enter bank name');
    setDialogVisible(true);
  };

  const handleSelectService = (service: ServiceType) => {
    setDialogVisible(false);
    onSubmit?.(
      {
        panCard,
        gstNumber,
        serviceMenuImage,
        shopImage,
        accountHolder: accountHolder.trim(),
        accountNumber,
        ifsc,
        bankName: bankName.trim(),
      },
      service
    );
  };

  const UploadBox = ({
    label,
    uri,
    onPress,
  }: {
    label: string;
    uri: string;
    onPress: () => void;
  }) => (
    <View style={{ flex: 1 }}>
      <Text style={styles.label}>
        {label} <Text style={styles.star}>*</Text>
      </Text>
      <TouchableOpacity style={styles.uploadBox} onPress={onPress} activeOpacity={0.8}>
        {uri ? (
          <Image source={{ uri }} style={styles.preview} resizeMode="cover" />
        ) : (
          <>
            <Ionicons name="cloud-upload-outline" size={s(28)} color="#14663F" />
            <Text style={styles.uploadText}>Tap to upload</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );

  const Field = ({
    label,
    icon,
    ...props
  }: { label: string; icon: any } & React.ComponentProps<typeof TextInput>) => (
    <View style={{ marginBottom: s(14) }}>
      <Text style={styles.label}>
        {label} <Text style={styles.star}>*</Text>
      </Text>
      <View style={styles.inputWrap}>
        <Ionicons name={icon} size={s(20)} color="#1F2937" style={styles.leftIcon} />
        <TextInput
          style={styles.input}
          placeholderTextColor="#6B7280"
          autoCorrect={false}
          {...props}
        />
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Top: green rounded block + header */}
        <View style={[styles.topBlock, { paddingTop: insets.top + s(28) }]}>{header}</View>

        {/* Middle: card */}
        <View style={styles.middle}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Shop Details</Text>
            <Text style={styles.desc}>
              Please provide your business documents to complete registration.
            </Text>

            <Field
              label="PAN Card"
              icon="card-outline"
              placeholder="ABCDE1234F"
              value={panCard}
              onChangeText={(t) => setPanCard(t.toUpperCase())}
              autoCapitalize="characters"
              maxLength={10}
            />
            <Field
              label="GST Number"
              icon="document-text-outline"
              placeholder="22AAAAA0000A1Z5"
              value={gstNumber}
              onChangeText={(t) => setGstNumber(t.toUpperCase())}
              autoCapitalize="characters"
              maxLength={15}
            />

            <View style={styles.uploadRow}>
              <UploadBox
                label="Service Menu"
                uri={serviceMenuImage}
                onPress={() => pickImage(setServiceMenuImage)}
              />
              <View style={{ width: s(12) }} />
              <UploadBox
                label="Shop Image"
                uri={shopImage}
                onPress={() => pickImage(setShopImage)}
              />
            </View>

            <Text style={styles.sectionTitle}>Bank Account Details</Text>

            <Field
              label="Account Holder Name"
              icon="person-outline"
              placeholder="Enter account holder name"
              value={accountHolder}
              onChangeText={setAccountHolder}
            />
            <Field
              label="Account Number"
              icon="wallet-outline"
              placeholder="Enter account number"
              value={accountNumber}
              onChangeText={(t) => setAccountNumber(t.replace(/\D/g, ''))}
              keyboardType="number-pad"
              maxLength={18}
            />
            <Field
              label="IFSC Code"
              icon="key-outline"
              placeholder="SBIN0001234"
              value={ifsc}
              onChangeText={(t) => setIfsc(t.toUpperCase())}
              autoCapitalize="characters"
              maxLength={11}
            />
            <Field
              label="Bank Name"
              icon="business-outline"
              placeholder="Enter bank name"
              value={bankName}
              onChangeText={setBankName}
            />
 {continueButton?.(handleContinue)}
           
          </View>
        </View>

      </ScrollView>

      <ServiceSelectDialog
        visible={dialogVisible}
        onClose={() => setDialogVisible(false)}
        onSelect={handleSelectService}
      />
    </KeyboardAvoidingView>
  );
}

const makeStyles = (s: (n: number) => number) =>
  StyleSheet.create({
    flex: { flex: 1, backgroundColor: '#F4F7F5' },
    container: { flexGrow: 1, backgroundColor: '#F4F7F5', justifyContent: 'space-between' },

    topBlock: {
      backgroundColor: '#0F5B3A',
      alignItems: 'center',
      paddingBottom: s(80),
      borderBottomLeftRadius: s(40),
      borderBottomRightRadius: s(40),
    },

    middle: { width: '100%', alignItems: 'center', marginTop: -s(56), marginBottom: s(50) },
    card: {
      width: '90%',
      backgroundColor: '#fff',
      borderRadius: s(26),
      paddingHorizontal: s(22),
      paddingVertical: s(26),
      elevation: 8,
      shadowColor: '#000',
      shadowOpacity: 0.12,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 4 },
    },
    cardTitle: { fontSize: s(24), fontWeight: 'bold', color: '#C9A24B', marginBottom: s(8) },
    desc: { fontSize: s(14), lineHeight: s(20), color: '#374151', marginBottom: s(20) },

    label: { fontSize: s(12), fontWeight: '600', color: '#C9A24B', marginBottom: s(8) },
    star: { color: '#DC2626' },
    inputWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F3F4F6',
      borderRadius: s(12),
      borderWidth: 1,
      borderColor: '#E5E7EB',
      paddingHorizontal: s(14),
      height: s(50),
    },
    leftIcon: { marginRight: s(10) },
    input: { flex: 1, fontSize: s(15), color: '#111827', paddingVertical: 0 },

    uploadRow: { flexDirection: 'row', marginBottom: s(8) },
    uploadBox: {
      height: s(110),
      borderRadius: s(14),
      borderWidth: 1.5,
      borderStyle: 'dashed',
      borderColor: '#14663F',
      backgroundColor: '#F3F8F5',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    uploadText: { fontSize: s(12), color: '#14663F', marginTop: s(4), fontWeight: '600' },
    preview: { width: '100%', height: '100%' },

    sectionTitle: {
      fontSize: s(18),
      fontWeight: 'bold',
      color: '#C9A24B',
      marginTop: s(14),
      marginBottom: s(14),
    },

  
  
  });