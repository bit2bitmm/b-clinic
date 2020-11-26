import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  LogBox,
  ScrollView,
} from 'react-native';
import {RadioButton, Button} from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Moment from 'moment';
import {interpolate} from 'react-native-reanimated';
import pharmacyAsync from '../../api/PharmacyAsync';
import {CommonActions} from '@react-navigation/native';
const PatientsRegisterScreen = ({navigation}) => {
  const [data, setData] = useState({
    name: '',
    qty: '',
    type: '',
    tab_quantity: '',
    regdate: new Date(),
    expdate: new Date(),
    actual_price: '',
    selling_price: '',
    profit: '',
    price_per_tab: '',
    status: 1,
    description: '',
  });
  const [val, setVal] = useState({
    nameReq: '',
    qtyReq: '',
    actualPriceReq: '',
    sellingPriceReq: '',
  });
  const [RegdateShow, setRegDateShow] = React.useState(false);
  const [ExpdateShow, setExpDateShow] = React.useState(false);
  const scrollRef = useRef();
  useEffect(() => {
    LogBox.ignoreAllLogs(true);
  }, []);
  const handleRegConfirm = (selectedDate) => {
    const currentDate = selectedDate || data.regdate;
    setData({...data, regdate: currentDate});
    setRegDateShow(false);
  };
  const hideRegDatePicker = () => {
    setRegDateShow(false);
  };
  const showRegDate = () => {
    setRegDateShow(true);
  };

  const handleExpConfirm = (selectedDate) => {
    const currentDate = selectedDate || data.regdate;
    setData({...data, expdate: currentDate});
    setExpDateShow(false);
  };
  const hideExpDatePicker = () => {
    setExpDateShow(false);
  };
  const showExpDate = () => {
    setExpDateShow(true);
  };
  const register = () => {
    var namereq = '';
    var qtyreq = '';
    var actreq = '';
    var sellreq = '';
    var namestatus = true;
    var qtystatus = true;
    var actualpricestatus = true;
    var sellingpricestatus = true;

    if (data.name == '') {
      namereq = 'Medicine Name is required.';
      namestatus = false;
    }
    if (data.qty == '') {
      qtyreq = 'Quantity is required.';
      qtystatus = false;
    }
    if (data.actual_price == '') {
      actreq = 'Actual Price is required.';
      actualpricestatus = false;
    }
    if (data.selling_price == '') {
      sellreq = 'Selling Price is required.';
      sellingpricestatus = false;
    }
    if (namestatus && qtystatus && actualpricestatus && sellingpricestatus) {
      var medicine_name = data.name;
      var quantity = data.qty;
      var tab_quantity = data.tab_quantity;
      var used_quantity = 0;
      var remain_quantity = data.qty;
      var remain_tab_quantity =
        parseInt(data.qty) *
        parseInt(data.tab_quantity == '' ? '0' : data.tab_quantity);
      var register_date = Moment(data.regdate).format('yyyy-MM-DD');
      var expire_date = Moment(data.expdate).format('yyyy-MM-DD');
      var description = data.description;
      var sell_type = data.type;
      var actual_price = data.actual_price;
      var selling_price = data.selling_price;
      var profit_price = data.profit;
      var status = data.status;
      var is_deleted = 0;

      pharmacyAsync
        .RegisterMed({
          medicine_name: medicine_name,
          quantity: quantity,
          tab_quantity: tab_quantity,
          used_quantity: used_quantity,
          remain_quantity: remain_quantity,
          remain_tab_quantity: remain_tab_quantity,
          register_date: register_date,
          expire_date: expire_date,
          description: description,
          sell_type: sell_type,
          actual_price: actual_price,
          selling_price: selling_price,
          profit_price: profit_price,
          status: status,
          is_deleted: is_deleted,
        })
        .then(async (resp) => {
          const result = resp;
          if (result.messageCode == '1') {
            Alert.alert(
              'Registered Successfully!',
              'Do you want to register another medicine?',
              [
                {
                  text: 'Yes',
                  onPress: () => {
                    navigation.dispatch(
                      CommonActions.reset({
                        index: 0,
                        routes: [
                          {
                            name: 'AddPharmacy',
                          },
                        ],
                      }),
                    );
                  },
                },
                {
                  text: 'No',
                  onPress: () => {
                    navigation.navigate('Pharmacy');
                  },
                },
              ],
            );
          } else {
            Alert.alert('Register falied. Try again!');
          }
        });
    } else {
      scrollRef.current.scrollTo({x: 0, y: 0, animated: true});
    }
    setVal({
      nameReq: namereq,
      qtyReq: qtyreq,
      actualPriceReq: actreq,
      sellingPriceReq: sellreq,
    });
  };
  return (
    <View style={{flex: 1, backgroundColor: '#EEEEEE'}}>
      <ScrollView
        ref={scrollRef}
        style={{marginHorizontal: 20, marginVertical: 10}}
        showsVerticalScrollIndicator={false}>
        <View style={{flexDirection: 'row'}}>
          <Text>Medicine Name:</Text>
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
        />

        <View style={{flexDirection: 'row'}}>
          <Text>Quantity:</Text>
          <Text style={styles.valText}>{val.qtyReq} </Text>
        </View>
        <TextInput
          style={styles.inputBox}
          returnKeyType="next"
          blurOnSubmit={false}
          keyboardType="numeric"
          onChangeText={(qty) => {
            setData({...data, qty: qty});
            setVal({...val, qtyReq: ''});
          }}
        />
        <Text>Type:</Text>
        <View style={styles.selectBox}>
          <RNPickerSelect
            onValueChange={(type) => setData({...data, type: type})}
            items={[
              {label: 'Bot', value: 'Bot'},
              {label: 'Stp', value: 'Stp'},
              {label: 'Box', value: 'Box'},
              {label: 'Tube', value: 'Tube'},
              {label: 'Inj', value: 'Inj'},
              {label: 'Unit', value: 'Unit'},
              {label: 'Sachet', value: 'Sachet'},
            ]}
            value={data.year}
            placeholder={{}}
          />
        </View>
        <Text>Tabs per Type Quantity:</Text>
        <TextInput
          style={styles.inputBox}
          returnKeyType="next"
          blurOnSubmit={false}
          keyboardType="numeric"
          onChangeText={(tabqty) => {
            var sellingprice = parseInt(data.selling_price);
            var priceTab = 0;
            if (parseInt(tabqty) > 0 && sellingprice > 0) {
              priceTab = sellingprice / parseInt(tabqty);
            }
            setData({
              ...data,
              tab_quantity: tabqty,
              price_per_tab: priceTab.toString(),
            });
          }}
        />
        <Text>Registered Date:</Text>
        <Text style={styles.datebox} onPress={showRegDate} isVisible={true}>
          {Moment(data.regdate).format('yyyy/MM/DD').toString()}
        </Text>
        <DateTimePickerModal
          isVisible={RegdateShow}
          mode="date"
          minimumDate={new Date('1/1/1900')}
          onConfirm={handleRegConfirm}
          onCancel={hideRegDatePicker}
        />

        <Text>Expire Date:</Text>
        <Text style={styles.datebox} onPress={showExpDate} isVisible={true}>
          {Moment(data.expdate).format('yyyy/MM/DD').toString()}
        </Text>
        <DateTimePickerModal
          isVisible={ExpdateShow}
          mode="date"
          minimumDate={new Date('1/1/1900')}
          onConfirm={handleExpConfirm}
          onCancel={hideExpDatePicker}
        />
        <View style={{flexDirection: 'row'}}>
          <Text>Actual Price:</Text>
          <Text style={styles.valText}>{val.actualPriceReq} </Text>
        </View>
        <TextInput
          style={styles.inputBox}
          returnKeyType="next"
          blurOnSubmit={false}
          keyboardType="numeric"
          onChangeText={(actualPrice) => {
            var selling_price = data.selling_price;
            var pro_price = parseInt(selling_price) - parseInt(actualPrice);
            var percentage = Math.round(
              (parseInt(pro_price) / parseInt(actualPrice)) * 100,
            );
            var output =
              pro_price.toString().concat('(') +
              percentage.toString().concat('%)');
            setData({...data, actual_price: actualPrice, profit: output});
            setVal({...val, actualPriceReq: ''});
          }}
        />
        <View style={{flexDirection: 'row'}}>
          <Text>Selling Price:</Text>
          <Text style={styles.valText}>{val.sellingPriceReq} </Text>
        </View>
        <TextInput
          style={styles.inputBox}
          returnKeyType="next"
          blurOnSubmit={false}
          keyboardType="number-pad"
          onChangeText={(sellingPrice) => {
            var act_price = data.actual_price;
            var tab_per_qty = parseInt(data.tab_quantity);
            var pro_price = parseInt(sellingPrice) - parseInt(act_price);
            var percentage = Math.round(
              (parseInt(pro_price) / parseInt(act_price)) * 100,
            );
            var output =
              pro_price.toString().concat('(') +
              percentage.toString().concat('%)');
            var priceTab = 0;
            if (parseInt(sellingPrice) > 0 && tab_per_qty > 0) {
              priceTab = parseInt(sellingPrice) / tab_per_qty;
            }
            setData({
              ...data,
              selling_price: sellingPrice,
              profit: output,
              price_per_tab: priceTab.toString(),
            });
            setVal({
              ...val,
              sellingPriceReq: '',
            });
          }}
        />
        <Text>Profit:</Text>
        <TextInput
          style={styles.inputBox}
          editable={false}
          returnKeyType="next"
          blurOnSubmit={false}
          keyboardType="numeric"
          value={data.profit}
        />
        <Text>Price per tab:</Text>
        <TextInput
          style={styles.inputBox}
          editable={false}
          returnKeyType="next"
          blurOnSubmit={false}
          keyboardType="numeric"
          value={data.price_per_tab}
        />
        <Text>Status:</Text>
        <View style={styles.selectBox}>
          <RNPickerSelect
            onValueChange={(status) => setData({...data, status: status})}
            items={[
              {label: 'Active', value: 1},
              {label: 'Inactive', value: 0},
            ]}
            value={data.status}
            placeholder={{}}
          />
        </View>

        <Text>Description:</Text>
        <TextInput
          multiline={true}
          style={styles.descriptionBox}
          returnKeyType="next"
          blurOnSubmit={false}
          onChangeText={(description) =>
            setData({...data, description: description})
          }
        />
        <Button
          mode="contained"
          contentStyle={{height: 48}}
          style={styles.button}
          onPress={register}>
          Register
        </Button>
      </ScrollView>
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
    marginBottom: 10,
    marginVertical: 2,
    paddingLeft: 15,
    borderColor: '#808080',
    borderWidth: 1,
  },
  descriptionBox: {
    width: '100%',
    height: 100,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    color: '#000000',
    marginVertical: 2,
    borderColor: '#808080',
    borderWidth: 1,
    flexWrap: 'wrap',
  },
  datebox: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 10,
    color: '#000000',
    marginVertical: 6,
    borderColor: '#808080',
    borderWidth: 1,
    textAlign: 'left',
    textAlignVertical: 'top',
    flexWrap: 'nowrap',
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
    width: '100%',
    paddingHorizontal: 5,
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
export default PatientsRegisterScreen;
