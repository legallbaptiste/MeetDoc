import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';


import Campings from '../screens/HomeScreen/Campings';
import Settings from '../screens/HomeScreen/Settings';
import Formulaire from '../screens/HomeScreen/Formulaire';
import Profil from '../screens/HomeScreen/Profil';


export default createStackNavigator(
  {
    Campings: Campings,
    Settings: Settings,
    Formulaire: Formulaire,
    Profil: Profil,
  }
);
