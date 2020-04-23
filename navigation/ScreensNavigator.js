import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';


import HomePage from '../screens/HomePage';
import Settings from '../screens/Settings';
import Formulaire from '../screens/Formulaire';
import Profil from '../screens/Profil';
import Opening from '../screens/Opening';
import Connexion from '../screens/Connexion';
import SignInScreen from '../screens/SignInScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import Register from '../screens/Register'


export default createStackNavigator(
  {
    // Register : Register,
    SignInScreen: SignInScreen,
    Opening : Opening,
    HomePage: HomePage,
    Connexion: Connexion,
    Settings: Settings,
    Formulaire: Formulaire,
    Profil: Profil,
  }
);
