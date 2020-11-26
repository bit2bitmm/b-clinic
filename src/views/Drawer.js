import React, {useEffect} from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {View} from 'react-native';
import {AuthContext} from '../components/Context';
import MainStack from './main/index';
import Icon from 'react-native-vector-icons/Ionicons';
import {Divider} from 'react-native-paper';
const Drawer = createDrawerNavigator();

export default ({navigation}) => {
  return (
    <Drawer.Navigator
      drawerPosition=""
      edgeWidth={0}
      drawerContent={(props) => <CustomDrawerComp {...props} />}>
      <Drawer.Screen name="MainStack" component={MainStack} />
    </Drawer.Navigator>
  );
};

export const CustomDrawerComp = (props) => {
  const {navigation} = props;
  const {signOut} = React.useContext(AuthContext);

  return (
    <DrawerContentScrollView {...props}>
      <View style={{flexGrow: 1}}>
        <Icon
          name="close"
          size={25}
          style={{margin: 10, color: 'black', alignSelf: 'flex-end'}}
          onPress={() => {
            props.navigation.closeDrawer();
          }}
        />
        <Divider />

        <View style={{flexDirection: 'row'}}>
          <Icon
            name="home"
            size={25}
            color="#000000"
            style={{marginVertical: 17, marginLeft: 10, marginRight: -10}}
          />
          <DrawerItem
            label={'Dashboard'}
            labelStyle={{color: '#000', fontSize: 18}}
            style={{width: 500}}
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{name: 'Home'}],
              });
              props.navigation.closeDrawer();
            }}
          />
        </View>

        <Divider />
        <View style={{flexDirection: 'row'}}>
          <Icon
            name="medkit"
            size={25}
            color="#000000"
            style={{marginVertical: 17, marginLeft: 10, marginRight: -10}}
          />
          <DrawerItem
            label={'Pharmacy'}
            labelStyle={{color: '#000', fontSize: 18}}
            style={{width: 500}}
            onPress={() => navigation.navigate('Pharmacy')}
          />
        </View>
        <Divider />
        <View style={{flexDirection: 'row'}}>
          <Icon
            name="person-add"
            size={25}
            color="#000000"
            style={{marginVertical: 17, marginLeft: 10, marginRight: -10}}
          />
          <DrawerItem
            label={'Patients'}
            labelStyle={{color: '#000', fontSize: 18}}
            style={{width: 500}}
            onPress={() => navigation.navigate('Patients')}
          />
        </View>
        <Divider />
        <View style={{flexDirection: 'row'}}>
          <Icon
            name="settings-sharp"
            size={25}
            color="#000000"
            style={{marginVertical: 17, marginLeft: 10, marginRight: -10}}
          />
          <DrawerItem
            label={'Setting'}
            labelStyle={{color: '#000', fontSize: 18}}
            style={{width: 500}}
            onPress={() => navigation.navigate('Setting')}
          />
        </View>
        <Divider />
        <View style={{flexDirection: 'row'}} onPress={() => signOut()}>
          <Icon
            name="log-out"
            size={25}
            color="#000000"
            style={{marginVertical: 17, marginLeft: 10, marginRight: -10}}
          />
          <DrawerItem
            label={'Logout'}
            labelStyle={{color: '#000', fontSize: 18}}
            style={{width: 500}}
            onPress={() => signOut()}
          />
        </View>
        <Divider />
      </View>
    </DrawerContentScrollView>
  );
};
