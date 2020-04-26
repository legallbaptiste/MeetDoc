import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';


import HomePage from '../screens/HomePage';
import Settings from '../screens/Settings';
import Formulaire from '../screens/Formulaire';
import Profil from '../screens/Profil';
import Opening from '../screens/Opening';
import Inscription from '../screens/Inscription';
import Connexion from '../screens/Connexion';
import SignInScreen from '../screens/SignInScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import Register from '../screens/Register';

export default createStackNavigator(
  {
    // Register : Register,
    HomePage: HomePage,
    SignInScreen: SignInScreen,
    Opening : Opening,
    Connexion: Connexion,
    Inscription: Inscription,
    Settings: Settings,
    Formulaire: Formulaire,
    Profil: Profil,
  }
);
