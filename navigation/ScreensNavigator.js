import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';


import Campings from '../screens/Campings';
import Settings from '../screens/Settings';
import Formulaire from '../screens/Formulaire';
import Profil from '../screens/Profil'


import SignInScreen from '../screens/SignInScreen'
import AuthLoadingScreen from '../screens/AuthLoadingScreen';



export default createStackNavigator(
  {
    SignInScreen: SignInScreen,
    // Index: Index,
    // LoginForm: LoginForm,
    Campings: Campings,
    Settings: Settings,
    Formulaire: Formulaire,
    Profil: Profil,
  }
);
