import React, {Component} from 'react';
import Global from '../Global';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
class LoginAsync extends Component {
  constructor(props) {
    super(props);
  }
  async Login(params) {
    try {
      let options = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
        method: 'POST',
      };
      options.body = new FormData();
      for (let key in params) {
        options.body.append(key, params[key]);
      }
      const response = await fetch(Global.url + '/Auth/login', options);

      return response.json();
    } catch (error) {
      Alert.alert(JSON.stringify(error));
    }
  }
}

const loginService = new LoginAsync();
export default loginService;
