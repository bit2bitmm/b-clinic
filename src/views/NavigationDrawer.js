import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Drawer from './Drawer';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Drawer"
        component={Drawer}
      />
    </Stack.Navigator>
  );
};
