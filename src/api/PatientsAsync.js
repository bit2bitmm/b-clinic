import React, {Component} from 'react';
import Global from '../Global';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
class PatientsAsync extends Component {
  constructor(props) {
    super(props);
  }
  async Patients() {
    try {
      let options = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
        method: 'POST',
      };
      const response = await fetch(
        Global.url + '/Patients/fetchPatientData',
        options,
      );

      return response.json();
    } catch (error) {
      return {
        data: 'null',
        messageCode: '0',
        message: 'Session Time out .Please Login again.',
      };
    }
  }
  async RegisterPatient(params) {
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
      const response = await fetch(Global.url + '/Patients/create', options);
      return response.json();
    } catch (error) {
      return {
        data: 'null',
        messageCode: '0',
        message: 'Session Time out .Please Login again.',
      };
    }
  }
  async UpdatePatient(params) {
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
      const response = await fetch(
        Global.url + '/Patients/update/' + params.id,
        options,
      );
      return response.json();
    } catch (error) {
      return {
        data: 'null',
        messageCode: '0',
        message: 'Session Time out .Please Login again.',
      };
    }
  }
  async deletePatients(params) {
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
      const response = await fetch(Global.url + '/Patients/delete', options);

      return response.json();
    } catch (error) {
      return {
        data: 'null',
        messageCode: '0',
        message: 'Session Time out .Please Login again.',
      };
    }
  }

  async Panel(param) {
    try {
      let options = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
        method: 'POST',
      };
      const response = await fetch(
        Global.url + '/Patients/panel/' + param.id,
        options,
      );

      return response.json();
    } catch (error) {
      return {
        data: 'null',
        messageCode: '0',
        message: 'Session Time out .Please Login again.',
      };
    }
  }
}

const patientsService = new PatientsAsync();
export default patientsService;
