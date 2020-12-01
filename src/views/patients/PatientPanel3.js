import React, {useState, useEffect, useRef} from 'react';
import {View, Text, TextInput, StyleSheet, Alert, LogBox} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Button} from 'react-native-paper';

import patientAsync from '../../api/PatientsAsync';
const PatientPanel3 = ({route, navigation}) => {
  const [data, setData] = useState({
    patientdata: [],
  });
  useEffect(() => {
    const {params} = route;
    setData({patientdata: params.patientData});
  }, []);
  const next = () => {};
  const back = () => {
    navigation.goBack();
  };
  return (
    <View style={{flex: 1, backgroundColor: '#EEEEEE'}}>
      <View
        style={{
          backgroundColor: 'white',
          marginHorizontal: 20,
          marginTop: 10,
          borderRadius: 5,
        }}>
        <View style={{padding: 10, flexDirection: 'row', flexWrap: 'wrap'}}>
          <Text style={{fontWeight: 'bold'}}> Id : </Text>
          <Text style={{marginRight: 20}}>{data.patientdata.id} </Text>
          <Text style={{fontWeight: 'bold'}}> Name :</Text>
          <Text style={{marginRight: 20}}> {data.patientdata.name} </Text>
          <Text style={{fontWeight: 'bold'}}> Gender : </Text>
          <Text style={{marginRight: 25}}>
            {data.patientdata.gender === '1' ? 'Male' : 'Female'}
          </Text>
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            paddingBottom: 15,
            flexDirection: 'row',
          }}>
          <Text style={{fontWeight: 'bold'}}> Age : </Text>
          <Text>
            {data.patientdata.year}yr {data.patientdata.month}mo{' '}
            {data.patientdata.day}d
          </Text>
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            paddingBottom: 15,
            flexDirection: 'row',
          }}>
          <Text style={{fontWeight: 'bold'}}> Address :</Text>
          <Text> {data.patientdata.address}</Text>
        </View>
      </View>
      <ScrollView
        style={{marginHorizontal: 20, marginVertical: 20}}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Assign Medicines:</Text>

        <View style={{marginBottom: 50}}></View>
      </ScrollView>
      <Button
        mode="contained"
        contentStyle={{height: 40}}
        style={styles.backbutton}
        onPress={back}>
        Back
      </Button>
      <Button
        mode="contained"
        contentStyle={{height: 40}}
        style={styles.button}
        onPress={next}>
        Save
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
  },

  button: {
    width: '20%',
    height: 40,
    backgroundColor: 'black',
    borderRadius: 25,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  backbutton: {
    width: '20%',
    height: 40,
    backgroundColor: 'black',
    borderRadius: 25,
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
});
export default PatientPanel3;