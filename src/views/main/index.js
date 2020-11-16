import React from 'react';
import {TouchableOpacity, Text, View, Platform} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import SettingScreen from './SettingScreen';
import PharmacyScreen from '../pharmacy/PharmacyScreen';
import PatientsScreen from '../patients/PatientsScreen';
import PatientsRegisterScreen from '../patients/PatientsRegisterScreen';
import PharmacyRegisterScreen from '../pharmacy/PharmacyRegistrationScreen';
const Stack = createStackNavigator();
const NavigationDrawerStructure = (props) => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity
        onPress={() => toggleDrawer()}
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          marginLeft: 15,
          borderWidth: 1,
          borderColor: 'gray',
          borderRadius: 5,
        }}>
        <Icon name="menu" size={20} style={{margin: 3, color: 'gray'}} />
      </TouchableOpacity>
    </View>
  );
};

function App({navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerRight: () => (
          <View style={{flexDirection: 'row'}}>
            <Icon
              style={{marginHorizontal: 7}}
              name="person-add"
              size={30}
              color="black"
              onPress={() => navigation.navigate('AddPatients')}
            />
            <Icon
              style={{marginHorizontal: 10}}
              name="medkit"
              size={30}
              color="black"
              onPress={() => navigation.navigate('AddPharmacy')}
            />
          </View>
        ),
        headerStyle: {
          backgroundColor: '#fff', //Set Header color
        },
        headerTintColor: '#000', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: 'Dashboard',
          headerTitleAlign: 'center',
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          headerTitleAlign: 'center',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Pharmacy"
        component={PharmacyScreen}
        options={{
          headerTitleAlign: 'center',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Patients"
        component={PatientsScreen}
        options={{
          headerTitleAlign: 'center',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="AddPatients"
        component={PatientsRegisterScreen}
        options={{
          headerTitle: 'New Patient',
          headerTitleAlign: 'center',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="AddPharmacy"
        component={PharmacyRegisterScreen}
        options={{
          headerTitle: 'New Medicine',
          headerTitleAlign: 'center',
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}

export default App;
