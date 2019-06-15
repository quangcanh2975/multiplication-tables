import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from 'react-native-button';
import styles from './styles.js';
import { CheckBox } from 'react-native-elements'


export default class Options extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.navigation.getParam('timer'),
            waitingTime: 3,
        }
    }

    componentWillUnmount() {
        this.props.navigation.navigate('Home', { timer: this.state.checked, waitingTime: this.state.waitingTime });
    }
    _changeTime(option) {
        this.setState({
            waitingTime: option === 0 ? --this.state.waitingTime : ++this.state.waitingTime,
        })
    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <CheckBox title='Timer' checked={this.state.checked} size={40} onPress={() => {
                        this.setState({ checked: !this.state.checked })
                    }} />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={[{ backgroundColor: '#4282c2' }, styles.panel]}>{this.state.waitingTime}</Text>
                    <Button style={styles.rightBtn} onPress={(e) =>this. _changeTime(1)}>Increase</Button>
                    <Button style={styles.wrongBtn} onPress={(e) => this._changeTime(0)}>Decrease</Button>
                </View>

            </View>

        )
    }
}