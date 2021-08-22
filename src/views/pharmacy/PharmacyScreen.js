import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  FlatList,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import pharmacyAsync from '../../api/PharmacyAsync';
import {Button, Card, Title, Divider, Paragraph} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../../components/Context';
const PharmacyScreen = ({navigation}) => {
  const [productList, setProductList] = useState([]);
  const [visible, setVisiable] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);
  const {signOut} = React.useContext(AuthContext);
  function fetchData() {
    pharmacyAsync.Pharmacy().then(async (resp) => {
      const result = resp;
      if (result.messageCode == '1') {
        setProductList(result.data.allproduct);
      } else if (result.messageCode == '0') {
        Alert.alert('', result.message, [
          {
            text: 'OK',
            onPress: () => {
              signOut();
            },
          },
        ]);
      }
    });
    setRefreshing(false);
  }
  const deletePharmacy = (id) => {
    pharmacyAsync.DeleteMed({product_id: id}).then(async (resp) => {
      const result = resp;
      if (result.messageCode == '1') {
        setProductList(null);
        fetchData();
      } else if (result.messageCode == '0') {
        Alert.alert('', result.message, [
          {
            text: 'OK',
            onPress: () => {
              signOut();
            },
          },
        ]);
      }
    });
  };
  const renderItem = ({item}) => (
    <Card style={{marginBottom: 10}}>
      <TouchableOpacity
        style={{margin: 5}}
        onPress={() => {
          setVisiable(true);
          setItems(item);
        }}>
        <Card.Content style={{paddingBottom: 5}}>
          <Paragraph>
            {'Name \t\t\t\t\t\t\t:   ' + item.medicine_name}
          </Paragraph>
        </Card.Content>
        <Divider />
        <Card.Content style={{paddingBottom: 5}}>
          <Paragraph>{'Remain Qty \t:   ' + item.remain_quantity}</Paragraph>
        </Card.Content>
        <Divider />
        <Card.Content style={{paddingBottom: 5}}>
          <Paragraph>{'Expire Date \t\t:   ' + item.expire_date}</Paragraph>
        </Card.Content>
        <Divider />
        <Card.Content style={{paddingBottom: 5}}>
          <Paragraph>
            {'Price  \t\t\t\t\t\t\t:   ' + item.selling_price}
          </Paragraph>
        </Card.Content>
      </TouchableOpacity>
      <Divider />
      <Card.Actions style={{alignSelf: 'flex-end'}}>
        <TouchableOpacity
          style={{flexDirection: 'row', marginHorizontal: 5}}
          mode="contained"
          onPress={() => navigation.navigate('UpdatePharmacy', {item})}>
          <Icon name="brush" size={20} color="black" />
          <Text style={{marginHorizontal: 5}}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{flexDirection: 'row', marginHorizontal: 5}}
          mode="contained"
          onPress={() =>
            Alert.alert(
              'Delete',
              'Do you really want to delete [' + item.medicine_name + '] ?',
              [
                {
                  text: 'Yes',
                  onPress: () => {
                    deletePharmacy(item.id);
                  },
                },
                {
                  text: 'No',
                },
              ],
            )
          }>
          <Icon name="trash" size={20} color="black" />
          <Text style={{marginHorizontal: 5}}>Delete</Text>
        </TouchableOpacity>
      </Card.Actions>
    </Card>
  );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#EEEEEE',
      }}>
      <Modal
        animationType="fade"
        animationInTiming={1000}
        visible={visible}
        transparent={true}
        onRequestClose={() => {
          setVisiable(false);
        }}>
        <View transparent={true} style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Icon
              name="close"
              size={20}
              style={{margin: 5, color: 'black', alignSelf: 'flex-end'}}
              onPress={() => {
                setVisiable(false);
              }}
            />
            <Card style={{marginBottom: 7, width: '100%'}}>
              <Card.Content style={styles.cardContent}>
                <Paragraph style={styles.para_title}>
                  {'Name  \t\t\t\t\t\t\t\t\t\t\t: '}
                </Paragraph>
                <Paragraph>{items.medicine_name}</Paragraph>
              </Card.Content>
              <Divider />
              <Card.Content style={styles.cardContent}>
                <Paragraph style={styles.para_title}>
                  {'Registered Qty \t\t: '}
                </Paragraph>
                <Paragraph>{items.quantity}</Paragraph>
              </Card.Content>
              <Divider />
              <Card.Content style={styles.cardContent}>
                <Paragraph style={styles.para_title}>
                  {'Used Qty \t\t\t\t\t\t\t\t: '}
                </Paragraph>
                <Paragraph>{items.used_quantity}</Paragraph>
              </Card.Content>
              <Divider />
              <Card.Content style={styles.cardContent}>
                <Paragraph style={styles.para_title}>
                  {'Remain Qty \t\t\t\t\t: '}
                </Paragraph>
                <Paragraph>
                  {items.remain_quantity} {items.sell_type}{' '}
                  {items.tab_quantity != '0'
                    ? items.remain_tab_quantity % items.tab_quantity != 0
                      ? (items.remain_tab_quantity % items.tab_quantity) +
                        ' Tabs'
                      : ''
                    : ''}
                </Paragraph>
              </Card.Content>
              <Divider />
              <Card.Content style={styles.cardContent}>
                <Paragraph style={styles.para_title}>
                  {'Registered date : '}
                </Paragraph>
                <Paragraph>{items.register_date}</Paragraph>
              </Card.Content>
              <Divider />
              <Card.Content style={styles.cardContent}>
                <Paragraph style={styles.para_title}>
                  {'Expired date \t\t\t\t: '}
                </Paragraph>
                <Paragraph>{items.expire_date}</Paragraph>
              </Card.Content>
              <Divider />
              <Card.Content style={styles.cardContent}>
                <Paragraph style={styles.para_title}>
                  {'Unit \t\t\t\t\t\t\t\t\t\t\t\t\t: '}
                </Paragraph>
                <Paragraph>{items.sell_type}</Paragraph>
              </Card.Content>
              <Divider />
              <Card.Content style={styles.cardContent}>
                <Paragraph style={styles.para_title}>
                  {'Actual Price \t\t\t\t: '}
                </Paragraph>
                <Paragraph>{items.actual_price}</Paragraph>
              </Card.Content>
              <Divider />
              <Card.Content style={styles.cardContent}>
                <Paragraph style={styles.para_title}>
                  {'Selling Price \t\t\t\t: '}
                </Paragraph>
                <Paragraph>{items.selling_price}</Paragraph>
              </Card.Content>
              <Divider />
              <Card.Content style={styles.cardContent}>
                <Paragraph style={styles.para_title}>
                  {'Profit \t\t\t\t\t\t\t\t\t\t\t\t: '}
                </Paragraph>
                <Paragraph>{items.profit_price}</Paragraph>
              </Card.Content>
              <Divider />
              <Card.Content style={styles.cardContent}>
                <Paragraph style={styles.para_title}>
                  {'Description \t\t\t\t\t: '}
                </Paragraph>
                <Paragraph>{items.description}</Paragraph>
              </Card.Content>
              <Divider />
              <Card.Content style={styles.cardContent}>
                <Paragraph style={styles.para_title}>
                  {'Status \t\t\t\t\t\t\t\t\t\t\t: '}
                </Paragraph>
                <Paragraph>
                  {items.status == '1' ? 'Active' : 'Inactive'}
                </Paragraph>
              </Card.Content>
              <Divider />
            </Card>
            <Button
              mode="contained"
              onPress={() => {
                setVisiable(false);
              }}
              contentStyle={{height: 30}}
              style={styles.button}>
              Close
            </Button>
          </View>
        </View>
      </Modal>
      <FlatList
        style={{padding: 10, marginBottom: 10}}
        data={productList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        refreshing={refreshing}
        onRefresh={async () => {
          setRefreshing(true);
          await fetchData();
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    marginTop: 55,
  },
  modalContent: {
    borderRadius: 5,
    marginVertical: 40,
    width: '90%',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  cardContent: {
    flexDirection: 'row',
    marginVertical: 10,
    flexWrap: 'wrap',
  },
  para_title: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  button: {
    width: '30%',
    height: 30,
    backgroundColor: 'gray',
    position: 'absolute',
    bottom: 7,
    borderRadius: 5,
    justifyContent: 'center',
  },
});

export default PharmacyScreen;
