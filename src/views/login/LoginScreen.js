import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Image,
  View,
  ActivityIndicator,
  Keyboard,
  Alert,
} from 'react-native';
import {AuthContext} from '../../components/Context';
import {Text, TextInput, Button} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import loginAsync from '../../api/LoginAsync';
import ReactNativeBiometrics from 'react-native-biometrics';
import AsyncStorage from '@react-native-community/async-storage';
const LoginScreen = ({navigation}) => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [emailreq, setEmailreq] = useState('');
  const [passReq, setPassReq] = useState('');
  const {signIn} = React.useContext(AuthContext);
  const [spinner, setSpinner] = useState(false);
  const passwordRefer = useRef();
  useEffect(() => {
    CheckBioMetric();
  }, []);

  async function CheckBioMetric() {
    const {biometryType} = await ReactNativeBiometrics.isSensorAvailable();
    if (
      biometryType === ReactNativeBiometrics.Biometrics ||
      biometryType === ReactNativeBiometrics.TouchID ||
      biometryType === ReactNativeBiometrics.FaceID
    ) {
      ReactNativeBiometrics.biometricKeysExist().then(async (resultObject) => {
        const {keysExist} = resultObject;
        if (keysExist) {
          ReactNativeBiometrics.simplePrompt({
            promptMessage: 'Touch ID Confirmation',
          }).then(async (resultObject) => {
            const {success} = resultObject;
            if (success) {
              const userData = await AsyncStorage.getItem('data');
              const user = JSON.parse(userData);
              LoginHandler(user.email, user.password);
            } else {
              // Alert.alert('Authentication failed, Please login first.');
            }
          });
        }
      });
    }
  }

  const userChange = (val) => {
    setData({
      ...data,
      email: val,
    });
    setEmailreq('');
  };
  const passChange = (val) => {
    setData({
      ...data,
      password: val,
    });
    setPassReq('');
  };
  const LoginHandler = async (email, password) => {
    //const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var emailStatus = true;
    var passwordStatus = true;
    if (email.length == 0) {
      setEmailreq('Email is required.');
      emailStatus = false;
    }
    if (password.length == 0) {
      setPassReq('Password is required.');
      passwordStatus = false;
    }
    if (emailStatus && passwordStatus) {
      setSpinner(true);
      loginAsync
        .Login({email: email, password: password})
        .then(async (resp) => {
          const result = resp;
          if (result.messageCode == '1') {
            result.data.password = password;
            signIn(result.data);
          } else {
            setSpinner(false);
            setPassReq('Login falied. Try again!');
          }
        });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
      }}>
      <ScrollView
        bounces={false}
        style={styles.formContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          style={{width: 200, height: 150}}
          source={require('../../images/b2bicon.png')}
        />
        <Text style={styles.logoText}>Clinic Management System</Text>
        <TextInput
          theme={{roundness: 5}}
          autoCapitalize="none"
          mode={'outlined'}
          selectionColor={'gray'}
          keyboardType={'email-address'}
          returnKeyType={'next'}
          onChangeText={(val) => userChange(val)}
          value={data.email}
          style={styles.inputBox}
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={(event) => {
            passwordRefer.current.focus();
          }}
          label={'Email'}></TextInput>
        <Text style={styles.valText}> {emailreq}</Text>
        <TextInput
          theme={{roundness: 5}}
          ref={passwordRefer}
          onChangeText={(password) => passChange(password)}
          style={styles.inputBox}
          mode={'outlined'}
          label={'Password'}
          keyboardType={'default'}
          blurOnSubmit={false}
          autoCapitalize="none"
          onSubmitEditing={(event) => {
            Keyboard.dismiss();
          }}
          secureTextEntry={true}></TextInput>
        <Text style={styles.valText}> {passReq}</Text>
        <Button
          mode="contained"
          onPress={() => {
            LoginHandler(data.email, data.password);
          }}
          contentStyle={{height: 48}}
          style={styles.button}>
          Login
        </Button>
        <Text
          style={styles.signupText}
          onPress={() => navigation.navigate('ForgotPassword')}>
          Forgot Password?
        </Text>
      </ScrollView>
      <Text style={{alignSelf: 'center', color: 'gray'}}>
        {' '}
        {'\u00A9'}2020 Bit2Bit v-1.0{' '}
      </Text>
      {spinner && (
        <View style={styles.spinnerTextStyle}>
          <ActivityIndicator size="large" color="white" />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  inputBox: {
    width: '100%',
    height: 48,
    backgroundColor: '#ffffff',
    marginVertical: 10,
    color: '#000000',
    justifyContent: 'center',
  },
  formContainer: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },
  logoText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333333',
  },
  button: {
    width: '100%',
    height: 48,
    backgroundColor: 'black',
    marginVertical: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
  signupText: {
    textDecorationLine: 'underline',
    marginVertical: 10,
    marginBottom: 7,
    color: '#333333',
    fontSize: 16,
    fontWeight: '500',
  },
  valText: {
    color: '#FF0000',
    fontSize: 15,
  },
  spinnerTextStyle: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default LoginScreen;
