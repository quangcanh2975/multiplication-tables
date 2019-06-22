import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Button from 'react-native-button';
import styles from './styles.js';
import { CheckBox } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { ScrollView } from 'react-native';

export default class Options extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.navigation.getParam('timer', false),
      seconds: this.props.navigation.getParam('waitingTime', 3),
      selectedTables: this.props.navigation.getParam(
        'selectedTables',
        new Array(9).fill(true)
      ),
    };
  }

  componentWillUnmount() {
    this.props.navigation.navigate('Home', {
      timer: this.state.checked,
      waitingTime: this.state.seconds,
      selectedTables: this.state.selectedTables,
    });
  }
  _changeTime(option) {
    var secondsInState = this.state.seconds;
    this.setState({
      seconds:
        option === 0
          ? secondsInState > 1
            ? --secondsInState
            : 1
          : secondsInState < 5
          ? ++secondsInState
          : 5,
    });
  }
  render() {
    return (
      <ScrollView>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <CheckBox
              title="Timer"
              checked={this.state.checked}
              size={40}
              onPress={() => {
                this.setState({ checked: !this.state.checked });
              }}
            />
            <View
              style={[
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  margin: 5,
                  marginLeft: 10,
                  marginRight: 10,
                  padding: 10,
                  fontWeight: 'bold',
                  justifyContent: 'space-between',
                },
                this.state.checked ? { display: 'flex' } : { display: 'none' },
              ]}>
              <Icon
                onPress={e => this._changeTime(0)}
                name="caret-down"
                type="font-awesome"
                color="#df1c3c"
                size={50}
              />
              <Text style={[styles.rightAnswer, { fontSize: 20, margin: 0 }]}>
                {this.state.seconds} seconds
              </Text>
              <Icon
                onPress={e => this._changeTime(1)}
                name="caret-up"
                type="font-awesome"
                color="#1dd065"
                size={50}
              />
            </View>
            <View>
              <Text style={styles.text}>Select tables question</Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                }}>
                {this.state.selectedTables.map((value, index) => {
                  return (
                    <CheckBox
                      style={{ width: 10 }}
                      key={index}
                      title={(index + 1).toString(10)}
                      checked={this.state.selectedTables[index]}
                      onPress={() => {
                        var oldTables = this.state.selectedTables;
                        oldTables[index] = !oldTables[index];
                        this.setState({ selectedTables: oldTables });
                      }}
                    />
                  );
                })}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
