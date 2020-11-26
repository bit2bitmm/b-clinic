import React, {useEffect} from 'react';
import {StyleSheet, View, StatusBar, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from './src/components/Context';
import AsyncStorage from '@react-native-community/async-storage';
import {BarIndicator} from 'react-native-indicators';
import LoginIndex from './src/views/login/loginIndex';
import DrawerIndex from './src/views/NavigationDrawer';
import {getStatusBarHeight} from 'react-native-status-bar-height';
const App = () => {
  const initialLoginState = {
    isLoading: true,
    id: 0,
    name: null,
    token: null,
  };
  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          id: action.id,
          name: action.username,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          id: action.id,
          name: action.username,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          id: null,
          name: null,
          isLoading: false,
          token: null,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (foundUser) => {
        try {
          await AsyncStorage.setItem('data', JSON.stringify(foundUser));
        } catch (e) {
          console.log(e);
        }
        dispatch({
          type: 'LOGIN',
          id: foundUser.id,
          name: foundUser.username,
        });
      },
      signOut: async () => {
        try {
          // await AsyncStorage.removeItem('data');
          dispatch({type: 'LOGOUT', id: null, name: null});
        } catch (e) {
          Alert.alert(e);
        }
      },
    }),
    [],
  );
  useEffect(() => {
    setTimeout(async () => {
      let data = null;
      try {
        data = JSON.parse(await AsyncStorage.getItem('data'));
      } catch (err) {
        Alert.alert(err);
      }
      dispatch({type: 'RETRIEVE_TOKEN', id: data});
    }, 2000);
  }, []);
  if (loginState.isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: 70,
            height: 70,
            borderRadius: 10,
            backgroundColor: 'a6000000',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <BarIndicator color="black" />
        </View>
      </View>
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <View style={styles.appContainer}>
        <AuthContext.Provider value={authContext}>
          <NavigationContainer>
            {loginState.id !== null ? <DrawerIndex /> : <LoginIndex />}
          </NavigationContainer>
        </AuthContext.Provider>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    marginTop:
      Platform.OS === 'ios' ? getStatusBarHeight() : getStatusBarHeight(true),
    backgroundColor: '#e6ffe6',
  },
});

export default App;
