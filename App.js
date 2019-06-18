import { createStackNavigator, createAppContainer } from 'react-navigation';

import GameScreen from './components/game';
import HomeScreen from './components/home';
import ResultScreen from './components/result';
import OptionScreen from './components/options';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: `Home`,
        headerBackTitle: null,
      },
    },
    Game: {
      screen: GameScreen,
      navigationOptions: {
        title: `Game`,
        headerBackTitle: null,
      },
    },
    Options: {
      screen: OptionScreen,
      navigationOptions: {
        title: `Options`,
        headerBackTitle: null,
      },
    },
    Result: {
      screen: ResultScreen,
      navigationOptions: {
        title: `Result`,
        headerLeft: null,
      },
    },
  },
  {
    initialRouteName: "Home"
  }
)
const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
