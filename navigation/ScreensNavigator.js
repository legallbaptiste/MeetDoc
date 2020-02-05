import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import LoginForm from '../screens/LoginForm';

import Campings from '../screens/Campings';
import Settings from '../screens/Settings';
import Formulaire from '../screens/Formulaire';
import Index from '../screens/';
import Profil from '../screens/Profil'

export default createStackNavigator(
  {
    // Index: Index,
    // LoginForm: LoginForm,
    Campings: Campings,
    Settings: Settings,
    Formulaire: Formulaire,
    Profil: Profil,
  }
);
