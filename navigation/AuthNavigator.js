import React from 'react';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';

import SignInScreen from '../screens/SignInScreen';

export const AppStack = createStackNavigator(
  {
    SignInScreen: SignInScreen,
  }
);
