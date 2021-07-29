import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, Switch} from 'react-native-paper';
import ReactNativeBiometrics from 'react-native-biometrics';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../../components/Context';
const SettingScreen = ({}) => {
  const {signOut} = React.useContext(AuthContext);
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    var isBioM = await AsyncStorage.getItem('isBioMatric');
    setIsSwitchOn(isBioM === 'true');
  }

  const onToggleSwitch = async () => {
    await AsyncStorage.setItem('isBioMatric', (!isSwitchOn).toString());
    setIsSwitchOn(!isSwitchOn);
    if (!isSwitchOn) {
      const {biometryType} = await ReactNativeBiometrics.isSensorAvailable();
      if (
        biometryType === ReactNativeBiometrics.Biometrics ||
        biometryType === ReactNativeBiometrics.TouchID ||
        biometryType === ReactNativeBiometrics.FaceID
      ) {
        ReactNativeBiometrics.createKeys('Confirm fingerprint').then(
          (resultObject) => {
            const {publicKey} = resultObject;
          },
        );
      } else {
        setIsSwitchOn(false);
        await AsyncStorage.setItem('isBioMatric', 'false');
        Alert.alert("This device doesn't Support finger Id or Touch Id");
      }
    } else {
      setIsSwitchOn(false);
      await AsyncStorage.setItem('isBioMatric', 'false');
      ReactNativeBiometrics.deleteKeys().then((resultObject) => {
        const {keysDeleted} = resultObject;
        if (keysDeleted) {
          console.log('Successful deletion');
        } else {
          console.log(
            'Unsuccessful deletion because there were no keys to delete',
          );
        }
      });
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.modalContent}>
        <Card>
          <Card.Content>
            <View style={{flexDirection: 'row'}}>
              <Text style={{margin: 5, fontSize: 16}}>
                Enable Fingerprint Login
              </Text>
              <Switch
                value={isSwitchOn}
                onValueChange={onToggleSwitch}
                style={{position: 'absolute', right: 0, marginTop: 4}}
              />
            </View>
          </Card.Content>
        </Card>
      </View>

      <TouchableOpacity
        onPress={() => signOut()}
        style={{
          position: 'absolute',
          bottom: 5,
          right: 25,
        }}>
        <Icon name="log-out" size={40} color="#000000" />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEEEEE',
    flex: 1,
    alignItems: 'center',
  },
  modalContent: {
    marginVertical: 20,
    width: '95%',
    backgroundColor: 'white',
  },
});
export default SettingScreen;
