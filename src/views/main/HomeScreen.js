import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Animated,
  Image,
  View,
  Alert,
  TouchableOpacity,
  RefreshControl,
  Keyboard,
  Text,
  TextInput,
} from 'react-native';
import homeAsync from '../../api/HomeAsync';
import {Button, Card, Title} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native-gesture-handler';
import {AuthContext} from '../../components/Context';
const HomeScreen = ({navigation}) => {
  const [data, setData] = useState({
    total_users: 0,
    total_medicines: 0,
    total_todaypatients: 0,
    total_diagnosis: [],
    patient: [],
    chart_data: [],
    refreshing: false,
  });
  const {signOut} = React.useContext(AuthContext);
  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    homeAsync.Home().then(async (resp) => {
      const result = resp;

      if (result.messageCode == '1') {
        setData({
          ...data,
          total_users: result.data.total_users,
          total_medicines: result.data.total_medicines,
          total_todaypatients: result.data.total_todaypatients,
          total_diagnosis: result.data.total_diagnosis,
          patient: result.data.patient,
          chart_data: result.data.chart_data,
        });
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

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#EEEEEE',
      }}>
      <ScrollView
        style={{flex: 1, padding: 10}}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={data.refreshing}
            onRefresh={() => {
              fetchData();
            }}
          />
        }>
        <View style={{paddingBottom: 10}}>
          <Card>
            <Card.Content>
              <View style={{marginLeft: 5}}>
                <Icon
                  name="medkit-outline"
                  size={90}
                  style={{
                    marginRight: 10,
                    color: 'gray',
                    position: 'absolute',
                    right: 0,
                  }}
                />
                <Text style={{fontSize: 20, color: '#000'}}>
                  Total Medicines
                </Text>
                <Text style={{fontSize: 30}}>{data.total_medicines}</Text>
                <TouchableOpacity
                  mode="contained"
                  onPress={() => {
                    navigation.navigate('Pharmacy');
                  }}>
                  <View
                    style={{
                      marginTop: 40,
                      flexDirection: 'row',
                      alignSelf: 'center',
                    }}>
                    <Text style={{fontSize: 15}}>More Info</Text>
                    <Icon
                      name="arrow-forward-outline"
                      size={15}
                      style={{color: 'black', alignSelf: 'flex-end'}}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </Card.Content>
          </Card>
        </View>
        <View style={{paddingBottom: 10}}>
          <Card>
            <Card.Content>
              <View style={{marginLeft: 5}}>
                <Icon
                  name="bar-chart-outline"
                  size={90}
                  style={{
                    marginRight: 10,
                    color: 'gray',
                    position: 'absolute',
                    right: 0,
                  }}
                />
                <Text style={{fontSize: 20, color: '#000'}}>
                  Total Visits Today
                </Text>
                <Text style={{fontSize: 30}}>{data.total_todaypatients}</Text>
                <View
                  style={{
                    marginTop: 40,
                    flexDirection: 'row',
                    alignSelf: 'center',
                  }}>
                  <Text style={{fontSize: 15}}>More Info</Text>
                  <Icon
                    name="arrow-forward-outline"
                    size={15}
                    style={{color: 'black', alignSelf: 'flex-end'}}
                  />
                </View>
              </View>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
