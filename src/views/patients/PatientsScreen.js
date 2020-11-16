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
import patientsAsync from '../../api/PatientsAsync';
import {Button, Card, Title, Divider, Paragraph} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

const PatientsScreen = ({navigation}) => {
  const [data, setData] = useState({
    patients: [],
  });
  const [visible, setVisiable] = React.useState(false);
  const [items, setItems] = React.useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  function fetchData() {
    patientsAsync.Patients().then(async (resp) => {
      const result = resp;
      if (result.messageCode == '1') {
        setData({
          ...data,
          patients: result.data,
        });
      }
    });
  }
  const renderItem = ({item}) => (
    <Card style={{marginBottom: 10}}>
      <TouchableOpacity
        style={{margin: 5}}
        onPress={() => {
          setVisiable(true);
          setItems(item);
        }}>
        <Card.Content style={{paddingBottom: 5}}>
          <Paragraph>{'Id  \t\t\t\t\t\t\t:   ' + item.id}</Paragraph>
        </Card.Content>
        <Divider />
        <Card.Content style={{paddingBottom: 5}}>
          <Paragraph>{'Name  \t\t\t:   ' + item.name}</Paragraph>
        </Card.Content>
        <Divider />
        <Card.Content style={{paddingBottom: 5}}>
          <Paragraph>
            {'Age  \t\t\t\t\t:   '}
            {item.year != '0' ? item.year + ' yr' : ''}
            {item.month != '0' ? item.month + ' mon' : ''}
            {item.day != '0' ? item.day + ' d' : ''}
          </Paragraph>
        </Card.Content>
        <Divider />
        <Card.Content style={{paddingBottom: 5}}>
          <Paragraph>
            {'Gender  \t\t:   '} {item.gender == '1' ? 'Male' : 'Female'}
          </Paragraph>
        </Card.Content>
        <Divider />
        <Card.Content style={{paddingBottom: 5}}>
          <Paragraph>{'Address  \t:   ' + item.address} </Paragraph>
        </Card.Content>
      </TouchableOpacity>
      <Divider />
      <Card.Actions style={{alignSelf: 'flex-end'}}>
        <TouchableOpacity
          style={{flexDirection: 'row', marginHorizontal: 5}}
          mode="contained">
          <Icon name="brush" size={20} color="black" />
          <Text style={{marginHorizontal: 5}}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{flexDirection: 'row', marginHorizontal: 5}}
          mode="contained"
          onPress={() =>
            Alert.alert(
              'Delete',
              "Do you really want to delete?\nPatient's data will also be deleted.",
              [
                {
                  text: 'Yes',
                  onPress: () => {},
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
        marginBottom: 5,
      }}>
      <FlatList
        style={{padding: 10}}
        data={data.patients}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default PatientsScreen;
