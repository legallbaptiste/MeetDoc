import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';


import Campings from '../screens/HomeScreen/Campings';
import Settings from '../screens/HomeScreen/Settings';
import Formulaire from '../screens/HomeScreen/Formulaire';


export default createStackNavigator(
  {
    Campings: Campings,
    Settings: Settings,
    Formulaire: Formulaire,
  }
);
