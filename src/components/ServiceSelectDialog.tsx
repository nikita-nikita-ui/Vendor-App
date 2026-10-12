import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export type ServiceType = 'wholesaler' | 'retailer';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelect: (type: ServiceType) => void;
};

const OPTIONS: { type: ServiceType; title: string; subtitle: string; icon: any }[] = [
  {
    type: 'wholesaler',
    title: 'Wholesaler / Distributor Only',
    subtitle: 'Sell in bulk to retailers and shops',
    icon: 'cube-outline',
  },
  {
    type: 'retailer',
    title: 'Retailer / Local Shop Only',
    subtitle: 'Sell directly to local customers',
    icon: 'storefront-outline',
  },
];

export default function ServiceSelectDialog({ visible, onClose, onSelect }: Props) {
  const { width } = useWindowDimensions();
  const s = (n: number) => Math.round((width / 390) * n);
  const styles = makeStyles(s);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          <TouchableOpacity style={styles.close} onPress={onClose} hitSlop={10}>
            <Ionicons name="close" size={s(24)} color="#6B7280" />
          </TouchableOpacity>

          <Text style={styles.title}>Select the service you want to register for</Text>

          {OPTIONS.map((opt) => (
            <View key={opt.type} style={styles.option}>
              <View style={styles.optionHead}>
                <View style={styles.iconWrap}>
                  <Ionicons name={opt.icon} size={s(22)} color="#14663F" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.optionTitle}>{opt.title}</Text>
                  <Text style={styles.optionSub}>{opt.subtitle}</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.registerBtn}
                onPress={() => onSelect(opt.type)}
                activeOpacity={0.85}
              >
                <Text style={styles.registerText}>Register Now</Text>
                <Ionicons name="arrow-forward" size={s(18)} color="#fff" style={{ marginLeft: s(6) }} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </Modal>
  );
}

const makeStyles = (s: (n: number) => number) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    dialog: {
      width: '90%',
      backgroundColor: '#fff',
      borderRadius: s(24),
      padding: s(22),
    },
    close: { position: 'absolute', top: s(14), right: s(14), zIndex: 2 },
    title: {
      fontSize: s(20),
      fontWeight: 'bold',
      color: '#C9A24B',
      marginBottom: s(16),
      marginRight: s(28),
    },
    option: {
      borderWidth: 1,
      borderColor: '#E5E7EB',
      borderRadius: s(16),
      padding: s(14),
      marginBottom: s(12),
      backgroundColor: '#F9FAFB',
    },
    optionHead: { flexDirection: 'row', alignItems: 'center' },
    iconWrap: {
      width: s(42),
      height: s(42),
      borderRadius: s(21),
      backgroundColor: '#E6F2EB',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: s(12),
    },
    optionTitle: { fontSize: s(15), fontWeight: 'bold', color: '#111827' },
    optionSub: { fontSize: s(12), color: '#6B7280', marginTop: s(2) },
    registerBtn: {
      flexDirection: 'row',
      backgroundColor: '#14663F',
      borderRadius: s(12),
      height: s(46),
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: s(12),
    },
    registerText: { color: '#fff', fontSize: s(15), fontWeight: 'bold' },
  });