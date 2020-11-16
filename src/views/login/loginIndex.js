import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import ForgoPassScreen from './ForgotPasswordScreen';
const Stack = createStackNavigator();

function loginIndex() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgoPassScreen}
        options={{headerTitleAlign: 'center'}}
      />
    </Stack.Navigator>
  );
}
export default loginIndex;
