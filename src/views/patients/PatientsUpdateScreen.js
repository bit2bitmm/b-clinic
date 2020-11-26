import React, {useState, useEffect, useRef} from 'react';
import {View, Text, TextInput, StyleSheet, Alert, LogBox} from 'react-native';
import {RadioButton, Button} from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import patientAsync from '../../api/PatientsAsync';

const PatientsUpdateScreen = ({route, navigation}) => {
  const [data, setData] = useState({
    name: '',
    gender: 1,
    address: '',
    year: '',
    month: '',
    day: '',
    id: '',
  });
  const [yearsList, setYearsList] = React.useState([]);
  const [monthsList, setMonthsList] = React.useState([]);
  const [dayList, setDayList] = React.useState([]);

  const [val, setVal] = useState({
    nameReq: '',
    addressReq: '',
  });

  useEffect(() => {
    const {params} = route;
    console.log(params.item.year);
    LogBox.ignoreAllLogs(true);
    var years = [];
    var months = [];
    var days = [];
    years.push({label: 'Y', value: 0});
    months.push({label: 'M', value: 0});
    days.push({label: 'D', value: 0});
    for (var y = 1; y <= 100; y++) {
      years.push({label: y.toString(), value: y});
    }
    for (var m = 1; m <= 12; m++) {
      months.push({label: m.toString(), value: m});
    }
    for (var d = 1; d <= 31; d++) {
      days.push({label: d.toString(), value: d});
    }
    setYearsList(years);
    setMonthsList(months);
    setDayList(days);
    setData({
      ...data,
      id: params.item.id,
      name: params.item.name,
      gender: params.item.gender,
      address: params.item.address,
      year: params.item.year,
      month: params.item.month,
      day: params.item.day,
    });
  }, []);

  const update = () => {
    var namereq = '';
    var addreq = '';
    var namestatus = true;
    var addressStatus = true;
    if (data.name == '') {
      namereq = 'Name is required.';
      namestatus = false;
    }
    if (data.address == '') {
      addreq = 'Address is required.';
      addressStatus = false;
    }
    if (namestatus && addressStatus) {
      //   patientAsync
      //     .RegisterPatient({
      //       name: data.name,
      //       gender: data.gender,
      //       year: data.year,
      //       month: data.month,
      //       day: data.day,
      //       address: data.address,
      //     })
      //     .then(async (resp) => {
      //       const result = resp;
      //       if (result.messageCode == '1') {
      //         Alert.alert('Update Successfully!', '', [
      //           {
      //             text: 'Ok',
      //             onPress: () => {
      //               navigation.reset({
      //                 index: 0,
      //                 routes: [{name: 'Patients'}],
      //               });
      //             },
      //           },
      //         ]);
      //       } else {
      //         Alert.alert('Update falied. Try again!');
      //       }
      //     });
    }
    setVal({
      nameReq: namereq,
      addressReq: addreq,
    });
  };
  return (
    <View style={{flex: 1, backgroundColor: '#EEEEEE'}}>
      <View style={{marginHorizontal: 20, marginVertical: 20}}>
        <Text>Id:</Text>
        <TextInput
          style={styles.inputBox}
          returnKeyType="next"
          blurOnSubmit={false}
          onChangeText={(name) => {
            setData({...data, name: name});
            setVal({...val, nameReq: ''});
          }}
          editable={false}
          value={data.id}
        />
        <View style={{flexDirection: 'row'}}>
          <Text>Name:</Text>
          <Text style={styles.valText}>{val.nameReq} </Text>
        </View>
        <TextInput
          style={styles.inputBox}
          returnKeyType="next"
          blurOnSubmit={false}
          onChangeText={(name) => {
            setData({...data, name: name});
            setVal({...val, nameReq: ''});
          }}
          value={data.name}
        />
        <Text>Gender:</Text>
        <View style={{flexDirection: 'row'}}>
          <RadioButton
            value={1}
            status={data.gender === '1' ? 'checked' : 'unchecked'}
            onPress={() => setData({...data, gender: 1})}
          />
          <Text style={{marginTop: 7, marginRight: 10}}>Male</Text>
          <RadioButton
            value={2}
            status={data.gender !== '1' ? 'checked' : 'unchecked'}
            onPress={() => setData({...data, gender: 2})}
          />
          <Text style={{marginTop: 7}}>Female</Text>
        </View>
        <Text>Age:</Text>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.selecYeartBox}>
            <RNPickerSelect
              onValueChange={(years) => setData({...data, year: years})}
              items={yearsList}
              value={data.year != '' ? parseInt(data.year) : 0}
              placeholder={{}}
            />
          </View>
          <View style={styles.selectBox}>
            <RNPickerSelect
              onValueChange={(months) => setData({...data, month: months})}
              items={monthsList}
              value={data.month != '' ? parseInt(data.month) : 0}
              placeholder={{}}
            />
          </View>
          <View style={styles.selectBox}>
            <RNPickerSelect
              onValueChange={(days) => setData({...data, day: days})}
              items={dayList}
              value={data.day != '' ? parseInt(data.day) : 0}
              placeholder={{}}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>Address:</Text>
          <Text style={styles.valText}>{val.addressReq} </Text>
        </View>
        <TextInput
          multiline={true}
          style={styles.addressBox}
          returnKeyType="next"
          blurOnSubmit={false}
          onChangeText={(address) => {
            setData({...data, address: address});
            setVal({...val, addressReq: ''});
          }}
          value={data.address}
        />
        <Button
          mode="contained"
          contentStyle={{height: 48}}
          style={styles.button}
          onPress={update}>
          Update
        </Button>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  inputBox: {
    width: '100%',
    height: 38,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    color: '#000000',
    marginBottom: 20,
    marginVertical: 2,
    borderColor: '#808080',
    borderWidth: 1,
  },
  addressBox: {
    width: '100%',
    height: 100,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    color: '#000000',
    marginBottom: 20,
    marginVertical: 2,
    borderColor: '#808080',
    borderWidth: 1,
    flexWrap: 'wrap',
  },
  button: {
    height: 48,
    marginTop: 20,
    backgroundColor: 'black',
    borderRadius: 5,
    justifyContent: 'center',
  },
  selectBox: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    width: '30%',
    marginHorizontal: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    height: 40,
    color: '#000000',
    marginVertical: 6,
    borderColor: '#808080',
    borderWidth: 1,
  },
  selecYeartBox: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    width: '35%',
    marginRight: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    height: 40,
    color: '#000000',
    marginVertical: 6,
    borderColor: '#808080',
    borderWidth: 1,
  },
  valText: {
    color: '#FF0000',
    position: 'absolute',
    right: 0,
  },
});
export default PatientsUpdateScreen;
