import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator,
} from "react-navigation";

import HomePage from "../screens/HomePage";
import Formulaire from "../screens/Formulaire";
import Profil from "../screens/Profil";
import Opening from "../screens/Opening";
import Inscription from "../screens/Inscription";
import Connexion from "../screens/Connexion";
import SignInScreen from "../screens/SignInScreen";
import Admin from "../screens/Admin.js";

export default createStackNavigator({
  // ImagePickerExample: ImagePickerExample,
  //Register: Register,
  SignInScreen: SignInScreen,
  Opening: Opening,
  Connexion: Connexion,
  HomePage: HomePage,
  Inscription: Inscription,
  Admin: Admin,
  Formulaire: Formulaire,
  Profil: Profil,
});
