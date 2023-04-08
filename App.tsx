import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Toast from 'react-native-toast-message';

const App: React.FC = () => {
  const [scanned, setScanned] = useState(false);
  const [scanResult, setScanResult] = useState('');
  const [scannedUser, setScannedUser] = useState<any>(null);

  const [users, setUsers] = useState([
    {
      payment_id: 'TRX-123456789',
      name: 'Pranavdhar',
      email: 'email@gmail.com',
      phone: '0000000000',
      amount: 100,
      date: '2020-01-01',
      isPassUsed: false,
    },
  ]);

  const resetScan = () => {
    setScanned(false);
  };

  const onScan = (e: any) => {
    setScanned(true);
    setScanResult(e.data);
    const user = users?.find(item => item?.payment_id === e?.data);
    setScannedUser(user);
    if (user) {
      if (user.isPassUsed) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Pass already used',
        });
      } else {
        user.isPassUsed = true;
        setUsers([...users]);
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: user.name + ' pass used',
        });
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Invalid pass',
      });
    }
  };

  console.log('users', users);

  return (
    <>
      <View style={styles.container}>
        {scanned ? (
          <View style={styles.scanResult}>
            <Text style={styles.scanResultText}>Scan Result:</Text>
            <View style={styles.scanResultData}>
              {scannedUser ? (
                <>
                  <Text style={styles.name}>Name: {scannedUser.name}</Text>
                  <Text style={styles.email}>Email: {scannedUser.email}</Text>
                </>
              ) : (
                <Text>Invalid pass</Text>
              )}
            </View>
            <View style={styles.scanAgainButton}>
              <Text style={styles.scanAgain} onPress={resetScan}>
                Scan Again
              </Text>
            </View>
          </View>
        ) : (
          <QRCodeScanner
            onRead={onScan}
            reactivate={true}
            cameraStyle={styles.camera}
            containerStyle={styles.scannerContainer}
            showMarker={true}
            markerStyle={styles.marker}
            bottomContent={<Text style={styles.bottomText}>Scan QR Code</Text>}
          />
        )}
      </View>
      <Toast />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5fcff',
  },
  scanResult: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanResultText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#007aff',
  },
  scanResultData: {
    fontSize: 16,
    marginBottom: 20,
    color: '#007aff',
  },
  scanAgainButton: {
    width: '90%',
    backgroundColor: '#fff',
    elevation: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: '5%',
    marginHorizontal: 20,
    borderRadius: 10,
  },
  scanAgain: {
    fontSize: 16,
    paddingVertical: 15,
    color: '#007aff',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  camera: {
    height: '100%',
  },
  scannerContainer: {
    height: '100%',
  },
  marker: {
    borderColor: '#007aff',
  },
  bottomText: {
    fontSize: 16,
    color: '#fff',
  },
  name: {
    fontSize: 16,
    color: '#007aff',
  },
  email: {
    fontSize: 16,
    color: '#007aff',
  },
});

export default App;
