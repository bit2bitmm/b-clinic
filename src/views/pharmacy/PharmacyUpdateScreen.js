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
const PatientsUpdateScreen = ({navigation, route}) => {
  const [data, setData] = useState({
    id: '',
    medicine_name: '',
    quantity: '',
    org_quantity: '',
    sell_type: '',
    tab_quantity: '',
    register_date: new Date(),
    expire_date: new Date(),
    actual_price: '',
    selling_price: '',
    profit_price: '',
    tab_price: '',
    status: 1,
    description: '',
    used_quantity: '',
    remain_quantity: '',
    remain_tab_quantity: '',
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
    fetchData();
    LogBox.ignoreAllLogs(true);
  }, []);
  const fetchData = () => {
    const {params} = route;
    setData({
      ...data,
      id: params.item.id,
      medicine_name: params.item.medicine_name,
      quantity: params.item.quantity,
      org_quantity: params.item.quantity,
      sell_type: params.item.sell_type,
      tab_quantity: params.item.tab_quantity,
      register_date: params.item.register_date,
      expire_date: params.item.expire_date,
      actual_price: params.item.actual_price,
      selling_price: params.item.selling_price,
      profit_price: params.item.profit_price,
      tab_price: params.item.tab_price,
      status: params.item.status,
      description: params.item.description,
      used_quantity: params.item.used_quantity,
      remain_quantity: params.item.remain_quantity,
      org_reman_qty: params.item.remain_quantity,
      remain_tab_quantity: params.item.remain_tab_quantity,
    });
  };

  const handleRegConfirm = (selectedDate) => {
    const currentDate = selectedDate || data.register_date;
    setData({...data, register_date: currentDate});
    setRegDateShow(false);
  };
  const hideRegDatePicker = () => {
    setRegDateShow(false);
  };
  const showRegDate = () => {
    setRegDateShow(true);
  };

  const handleExpConfirm = (selectedDate) => {
    const currentDate = selectedDate || data.register_date;
    setData({...data, expire_date: currentDate});
    setExpDateShow(false);
  };
  const hideExpDatePicker = () => {
    setExpDateShow(false);
  };
  const showExpDate = () => {
    setExpDateShow(true);
  };
  const update = () => {
    var namereq = '';
    var qtyreq = '';
    var actreq = '';
    var sellreq = '';
    var namestatus = true;
    var qtystatus = true;
    var actualpricestatus = true;
    var sellingpricestatus = true;

    if (data.medicine_name == '') {
      namereq = 'Medicine Name is required.';
      namestatus = false;
    }
    if (data.quantity == '') {
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
      var register_date = Moment(data.register_date).format('yyyy-MM-DD');
      var expire_date = Moment(data.expire_date).format('yyyy-MM-DD');

      pharmacyAsync
        .UpdateMed({
          id: data.id,
          medicine_name: data.medicine_name,
          quantity: data.quantity,
          tab_quantity: data.tab_quantity,
          remain_quantity: data.remain_quantity,
          register_date: register_date,
          expire_date: expire_date,
          description: data.description,
          sell_type: data.sell_type,
          actual_price: data.actual_price,
          selling_price: data.selling_price,
          profit_price: data.profit_price,
          status: data.status,
          is_deleted: 0,
        })
        .then(async (resp) => {
          const result = resp;
          if (result.messageCode == '1') {
            Alert.alert('', 'Update Successfully!', [
              {
                text: 'Ok',
                onPress: async () => {
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'Pharmacy'}],
                  });
                },
              },
            ]);
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
            setData({...data, medicine_name: name});
            setVal({...val, nameReq: ''});
          }}
          value={data.medicine_name}
        />
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Text>Quantity:</Text>
            <TextInput
              style={styles.inputBox}
              editable={false}
              backgroundColor={'#BEBEBE'}
              returnKeyType="next"
              blurOnSubmit={false}
              keyboardType="numeric"
              value={data.quantity}
            />
          </View>
          <View style={{flex: 1, marginLeft: 10}}>
            <Text>Load/Unload:</Text>
            <TextInput
              style={styles.inputBox}
              returnKeyType="next"
              blurOnSubmit={false}
              keyboardType="numeric"
              onChangeText={(qty) => {
                var quantity = parseInt(data.org_quantity);
                var load_qty = parseInt(qty != '' ? qty : '0');
                var reload_qty = quantity + (isNaN(load_qty) ? 0 : load_qty);

                var remain_qty = parseInt(data.org_reman_qty);
                var reload_remian_qty =
                  remain_qty + (isNaN(load_qty) ? 0 : load_qty);

                setData({
                  ...data,
                  quantity: reload_qty.toString(),
                  remain_quantity: reload_remian_qty.toString(),
                });
              }}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Text>Type:</Text>
            <View style={styles.selectBox}>
              <RNPickerSelect
                onValueChange={(type) => setData({...data, sell_type: type})}
                items={[
                  {label: 'Bot', value: 'Bot'},
                  {label: 'Stp', value: 'Stp'},
                  {label: 'Box', value: 'Box'},
                  {label: 'Tube', value: 'Tube'},
                  {label: 'Inj', value: 'Inj'},
                  {label: 'Unit', value: 'Unit'},
                  {label: 'Sachet', value: 'Sachet'},
                ]}
                value={data.sell_type}
                placeholder={{}}
              />
            </View>
          </View>

          <View style={{flex: 1, marginLeft: 10}}>
            <Text> Used Quantity:</Text>
            <TextInput
              style={styles.inputBox}
              editable={false}
              backgroundColor={'#BEBEBE'}
              returnKeyType="next"
              blurOnSubmit={false}
              keyboardType="numeric"
              value={data.used_quantity}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Text>Tabs per Type Quantity:</Text>
            <TextInput
              style={styles.inputBox}
              editable={false}
              backgroundColor={'#BEBEBE'}
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
                  tab_price: priceTab.toString(),
                });
              }}
              value={data.tab_quantity}
            />
          </View>
          <View style={{flex: 1, marginLeft: 10}}>
            <Text> Remain Quantity:</Text>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <TextInput
                  style={styles.inputBox}
                  editable={false}
                  backgroundColor={'#BEBEBE'}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  keyboardType="numeric"
                  value={data.remain_quantity}
                />
                <Text>{data.sell_type}</Text>
              </View>
              <View style={{flex: 1, marginLeft: 5}}>
                <TextInput
                  style={styles.inputBox}
                  editable={false}
                  backgroundColor={'#BEBEBE'}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  keyboardType="numeric"
                  value={data.remain_tab_quantity}
                />
                <Text>Tabs</Text>
              </View>
            </View>
          </View>
        </View>
        <Text>Registered Date:</Text>
        <Text style={styles.datebox} onPress={showRegDate} isVisible={true}>
          {Moment(data.register_date).format('yyyy/MM/DD').toString()}
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
          {Moment(data.expire_date).format('yyyy/MM/DD').toString()}
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
            setData({...data, actual_price: actualPrice, profit_price: output});
            setVal({...val, actualPriceReq: ''});
          }}
          value={data.actual_price}
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
              profit_price: output,
              tab_price: priceTab.toString(),
            });
            setVal({
              ...val,
              sellingPriceReq: '',
            });
          }}
          value={data.selling_price}
        />
        <Text>Profit:</Text>
        <TextInput
          style={styles.inputBox}
          editable={false}
          returnKeyType="next"
          blurOnSubmit={false}
          keyboardType="numeric"
          value={data.profit_price}
        />
        <Text>Price per tab:</Text>
        <TextInput
          style={styles.inputBox}
          editable={false}
          returnKeyType="next"
          blurOnSubmit={false}
          keyboardType="numeric"
          value={data.tab_price}
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
          value={data.description}
        />
        <Button
          mode="contained"
          contentStyle={{height: 48}}
          style={styles.button}
          onPress={update}>
          Update
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
  selectBox: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    width: '100%',
    paddingHorizontal: 5,
    justifyContent: 'center',
    height: 38,
    color: '#000000',
    marginVertical: 2,
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
    textAlignVertical: 'top',
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

  valText: {
    color: '#FF0000',
    position: 'absolute',
    right: 0,
  },
});
export default PatientsUpdateScreen;
