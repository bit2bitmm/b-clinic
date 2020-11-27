import React, {useState, useEffect, useRef} from 'react';
import {View, Text, TextInput, StyleSheet, Alert, LogBox} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Button} from 'react-native-paper';

import patientAsync from '../../api/PatientsAsync';
const PatientPanel2 = ({navigation}) => {
  const [data, setData] = useState();
  useEffect(() => {}, []);
  const next = () => {
    navigation.navigate('PatientPanel3');
  };
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
        <View style={{padding: 10, flexDirection: 'row'}}>
          <Text style={{fontWeight: 'bold'}}> Name :</Text>
          <Text style={{marginRight: 20}}> Krishndfdsfafsdfdsa </Text>
          <Text style={{fontWeight: 'bold'}}> Gender :</Text>
          <Text style={{marginRight: 25}}> Male</Text>
          <Text style={{fontWeight: 'bold'}}> Age :</Text>
          <Text> 39yr 11mo 12d </Text>
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            paddingBottom: 15,
            flexDirection: 'row',
          }}>
          <Text style={{fontWeight: 'bold'}}> Address :</Text>
          <Text> Panpi</Text>
        </View>
      </View>
      <ScrollView
        style={{marginHorizontal: 20, marginVertical: 20}}
        showsVerticalScrollIndicator={false}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontWeight: 'bold'}}>BP:</Text>
          <Text style={{fontWeight: 'bold', marginLeft: 168}}>PR:</Text>
          <Text style={{fontWeight: 'bold', marginLeft: 97}}>TEMP (℉):</Text>
          <Text style={{fontWeight: 'bold', marginLeft: 45}}>SPO2:</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            style={styles.BPinputBox}
            returnKeyType="next"
            blurOnSubmit={false}
            onChangeText={(name) => {}}
          />
          <Text style={{margin: 8, fontWeight: 'bold'}}>/</Text>
          <TextInput
            style={styles.BPinputBox}
            returnKeyType="next"
            blurOnSubmit={false}
            onChangeText={(name) => {}}
          />

          <TextInput
            style={styles.inputBox}
            returnKeyType="next"
            blurOnSubmit={false}
            onChangeText={(name) => {}}
          />
          <TextInput
            style={styles.inputBox}
            returnKeyType="next"
            blurOnSubmit={false}
            onChangeText={(name) => {}}
          />
          <TextInput
            style={styles.inputBox}
            returnKeyType="next"
            blurOnSubmit={false}
            onChangeText={(name) => {}}
          />
        </View>
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
        Next
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
  },
  inputBox: {
    width: 70,
    height: 38,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    color: '#000000',
    marginBottom: 20,
    marginVertical: 2,
    marginHorizontal: 24,
    borderColor: '#808080',
    borderWidth: 1,
  },
  BPinputBox: {
    width: 70,
    height: 38,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    color: '#000000',
    marginBottom: 20,
    marginVertical: 2,

    borderColor: '#808080',
    borderWidth: 1,
  },
  button: {
    width: '20%',
    height: 40,
    backgroundColor: 'black',
    borderRadius: 25,
    position: 'absolute',
    bottom: 30,
    right: 20,
  },
  backbutton: {
    width: '20%',
    height: 40,
    backgroundColor: 'black',
    borderRadius: 25,
    position: 'absolute',
    bottom: 30,
    left: 20,
  },
});
export default PatientPanel2;
