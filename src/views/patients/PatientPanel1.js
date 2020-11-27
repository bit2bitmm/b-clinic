import React, {useState, useEffect, useRef} from 'react';
import {View, Text, TextInput, StyleSheet, Alert, LogBox} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Button} from 'react-native-paper';

import patientAsync from '../../api/PatientsAsync';
const PatientPanel1 = ({navigation}) => {
  const [data, setData] = useState();
  useEffect(() => {}, []);
  const next = () => {
    navigation.navigate('PatientPanel2');
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
        style={{marginHorizontal: 20, marginVertical: 10}}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Complaints:</Text>
        <TextInput
          multiline={true}
          style={styles.detailBox}
          returnKeyType="next"
          blurOnSubmit={false}
          onChangeText={(address) => {}}
        />
        <Text style={styles.header}>History:</Text>
        <TextInput
          multiline={true}
          style={styles.detailBox}
          returnKeyType="next"
          blurOnSubmit={false}
          onChangeText={(address) => {}}
        />
        <Text style={styles.header}>Investigation:</Text>
        <TextInput
          multiline={true}
          style={styles.detailBox}
          returnKeyType="next"
          blurOnSubmit={false}
          onChangeText={(address) => {}}
        />

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
  detailBox: {
    width: '100%',
    height: 150,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    color: '#000000',
    marginBottom: 20,
    marginVertical: 2,
    borderColor: '#808080',
    borderWidth: 1,
    flexWrap: 'wrap',
    textAlignVertical: 'top',
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
export default PatientPanel1;
