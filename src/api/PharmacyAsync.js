import React, {Component} from 'react';
import Global from '../Global';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
class PharmacyAsync extends Component {
  constructor(props) {
    super(props);
  }
  async Pharmacy() {
    try {
      let options = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
        method: 'POST',
      };
      // options.body = new FormData();
      // for (let key in params) {
      //   options.body.append(key, params[key]);
      // }
      const response = await fetch(Global.url + '/Pharmacy/index', options);

      return response.json();
    } catch (error) {
      Alert.alert(JSON.stringify(error));
    }
  }
  async RegisterMed(params) {
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
      const response = await fetch(Global.url + '/Pharmacy/create', options);
      return response.json();
    } catch (error) {
      Alert.alert(JSON.stringify(error));
    }
  }
  async DeleteMed(params) {
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
      const response = await fetch(Global.url + '/Pharmacy/delete', options);
      return response.json();
    } catch (error) {
      Alert.alert(JSON.stringify(error));
    }
  }
}

const pharmacyService = new PharmacyAsync();
export default pharmacyService;
