import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  LogBox,
  FlatList,
  RefreshControl,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, Card, Paragraph} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import patientAsync from '../../api/PatientsAsync';
const PatientPanel1 = ({route, navigation}) => {
  const [data, setData] = useState({
    patientdata: [],
  });
  const [complaints, setComplaints] = useState([]);
  const [history, setHistory] = useState([]);
  const [invest, setInvest] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  useEffect(() => {
    LogBox.ignoreAllLogs(true);
    const {params} = route;
    setData({patientdata: params.item});
    fetchData(params.item.id);
  }, []);
  function fetchData(id) {
    patientAsync.Panel({id: id}).then(async (resp) => {
      const result = resp;
      if (result.messageCode == '1') {
        setComplaints(result.data.complaint);
        setHistory(result.data.history);
        setInvest(result.data.investigation);
        setRefreshing(false);
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
  }
  const renderCompainItem = ({item}) => (
    <Card
      style={{
        marginBottom: 10,
        backgroundColor: '#f5F5F5',
      }}>
      <Card.Title
        title={item.complaint}
        subtitle={item.created_date}
        titleStyle={{
          fontSize: 16,
        }}
      />
      <Icon
        name="trash-sharp"
        size={20}
        style={{
          marginRight: 10,
          color: '#e30f00',
          position: 'absolute',
          right: 0,
          top: 25,
        }}
      />
    </Card>
  );
  const renderHistoryItem = ({item}) => (
    <Card
      style={{
        marginBottom: 10,
        backgroundColor: '#f5F5F5',
      }}>
      <Card.Title
        title={item.history}
        subtitle={item.created_date}
        titleStyle={{
          fontSize: 16,
        }}
      />
      <Icon
        name="trash-sharp"
        size={20}
        style={{
          marginRight: 10,
          color: '#e30f00',
          position: 'absolute',
          right: 0,
          top: 25,
        }}
      />
    </Card>
  );
  const renderInsvestItem = ({item}) => (
    <Card
      style={{
        marginBottom: 10,
        backgroundColor: '#f5F5F5',
      }}>
      <Card.Title
        title={item.investigation}
        subtitle={item.created_date}
        titleStyle={{
          fontSize: 16,
        }}
      />
      <Icon
        name="trash-sharp"
        size={20}
        style={{
          marginRight: 10,
          color: '#e30f00',
          position: 'absolute',
          right: 0,
          top: 25,
        }}
      />
    </Card>
  );
  const next = () => {
    const patientData = data.patientdata;
    navigation.navigate('PatientPanel2', {patientData});
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
        bounces={false}
        nestedScrollEnabled={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => {}} />
        }
        style={{flex: 1, marginHorizontal: 20, marginVertical: 10}}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Complaints:</Text>
        <TextInput
          multiline={true}
          style={styles.detailBox}
          returnKeyType="next"
          blurOnSubmit={false}
          onChangeText={(address) => {}}
        />
        <FlatList
          data={complaints}
          renderItem={renderCompainItem}
          keyExtractor={(item, index) => index.toString()}
        />
        <Text style={styles.header}>History:</Text>
        <TextInput
          multiline={true}
          style={styles.detailBox}
          returnKeyType="next"
          blurOnSubmit={false}
          onChangeText={(address) => {}}
        />
        <FlatList
          data={history}
          renderItem={renderHistoryItem}
          keyExtractor={(item, index) => index.toString()}
        />
        <Text style={styles.header}>Investigation:</Text>
        <TextInput
          multiline={true}
          style={styles.detailBox}
          returnKeyType="next"
          blurOnSubmit={false}
          onChangeText={(address) => {}}
        />
        <FlatList
          data={invest}
          renderItem={renderInsvestItem}
          keyExtractor={(item, index) => index.toString()}
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
    marginBottom: 10,
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
export default PatientPanel1;
