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
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({
        title: `Home`,
        headerBackTitle: null
      }),
    },
    Game: {
      screen: GameScreen,
      navigationOptions: () => ({
        title: `Game`,

      }),
    },
    Options: {
      screen: OptionScreen,
      navigationOptions: () => ({
        title: `Options`,
        headerBackTitle: null
      }),
    },
    Result: {
      screen: ResultScreen,
      navigationOptions: () => ({
        title: `Result`,
        headerBackTitle: null
      }),
    },
  },
  {
    initialRouteName: "Home"
  }
)
const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
