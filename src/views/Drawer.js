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
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export default ({navigation}) => {
  return (
    <Drawer.Navigator drawerPosition="" edgeWidth={0}>
      <Drawer.Screen name="MainStack" component={MainStack} />
    </Drawer.Navigator>
  );
};
