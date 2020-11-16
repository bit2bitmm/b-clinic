import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Animated,
  Image,
  View,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  TouchableHighlight,
  Keyboard,
  Text,
  TextInput,
  Button,
} from 'react-native';

const SettingScreen = ({navigation}) => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#EEEEEE',
      }}></View>
  );
};

export default SettingScreen;
