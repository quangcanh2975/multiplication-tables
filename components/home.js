import React, { Component } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import Button from 'react-native-button';
import styles from './styles.js';
import { NavigationEvents } from 'react-navigation';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: false,
      waitingTime: 3,
      selectedTables: new Array(9).fill(true),
    };
  }
  // static navigationOptions = ({ navigation }) => {
  //     return {
  //         headerLeft: <HeaderBackButton onPress={() => {
  //             requestAnimationFrame(() => {
  //                 navigation.navigate('Home');
  //             });
  //         }} />
  //     };
  // };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ImageBackground
        source={{
          uri: 'https://wallpaperstock.net/wallpapers/thumbs1/53462wide.jpg',
        }}
        style={{ width: '100%', height: '100%' }}>
        <NavigationEvents
          onDidFocus={() => {
            if (this.props.navigation.getParam('waitingTime')) {
              this.setState({
                timer: this.props.navigation.getParam('timer'),
                waitingTime: this.props.navigation.getParam('waitingTime'),
                selectedTables: this.props.navigation.getParam(
                  'selectedTables'
                ),
              });
            }
          }}
        />
        <View style={styles.flexOfView}>
          <View style={{ flex: 2, justifyContent: 'center' }}>
            <Text
              style={{
                color: 'red',
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: 50,
              }}>
              Multiplication Tables Game
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Button
              style={styles.greenBtn}
              onPress={() => {
                navigate('Game', {
                  timer: this.state.timer,
                  waitingTime: this.state.waitingTime,
                  selectedTables: this.state.selectedTables,
                });
              }}>
              Start
            </Button>
            <Button
              style={styles.greenBtn}
              onPress={() =>
                navigate('Options', {
                  timer: this.state.timer,
                  waitingTime: this.state.waitingTime,
                  selectedTables: this.state.selectedTables,
                })
              }>
              Options
            </Button>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
