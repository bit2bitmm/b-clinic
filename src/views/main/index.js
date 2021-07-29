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
import PharmacyUpdateScreen from '../pharmacy/PharmacyUpdateScreen';
import PatientsUpdateScreen from '../patients/PatientsUpdateScreen';
import PatientPanel1 from '../patients/PatientPanel1';
import PatientPanel2 from '../patients/PatientPanel2';
import PatientPanel3 from '../patients/PatientPanel3';
import {CurrentRenderContext} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
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
const forFade = ({current}) => ({
  cardStyle: {
    opacity: CurrentRenderContext.displayName,
  },
});
function App({navigation}) {
  return (
    <Tab.Navigator initialRouteName="Home" swipeEnabled={true}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => <Icon name="home" color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name="Pharmacy"
        component={PharmacyStack}
        options={{
          tabBarLabel: 'Pharmacy',
          tabBarIcon: ({color}) => (
            <Icon name="medkit" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Patients"
        component={PatientStack}
        options={{
          tabBarLabel: 'Patients',
          tabBarIcon: ({color}) => (
            <Icon name="person-add" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingStack}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color}) => (
            <Icon name="settings-sharp" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitleAlign: 'center',
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}
function PatientStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Patient"
        component={PatientsScreen}
        options={{
          headerTitleAlign: 'center',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="UpdatePatient"
        component={PatientsUpdateScreen}
        options={{
          headerTitleAlign: 'center',
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}

function PharmacyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Pharmacy"
        component={PharmacyScreen}
        options={{
          headerTitleAlign: 'center',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="UpdatePharmacy"
        component={PharmacyUpdateScreen}
        options={{
          headerTitleAlign: 'center',
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}
function SettingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          headerTitleAlign: 'center',
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}
export default App;
