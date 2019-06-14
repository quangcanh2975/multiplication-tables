import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from 'react-native-button';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import GameScreen from './components/game';
import HomeScreen from './components/home';
import ResultScreen from './components/result';
import OptionScreen from './components/options';

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Game: GameScreen, 
    Options: OptionScreen,
    Result: ResultScreen,
  },
  {
    initialRouteName: "Home"
  }
)
const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
