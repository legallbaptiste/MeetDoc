import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';


import Campings from '../screens/Campings';
import Settings from '../screens/Settings';
import Formulaire from '../screens/Formulaire';


export default createStackNavigator(
  {
    Campings: Campings,
    Settings: Settings,
    Formulaire: Formulaire,
  }
);
