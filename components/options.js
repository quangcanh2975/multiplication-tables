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
        }
    }

    componentWillUnmount() {
        this.props.navigation.navigate('Home', { timer: this.state.checked });
    }
    render() {
        return (
            <View>
                <Text style={{
                    color: 'white', fontWeight: 'bold', fontSize: 50, width: 350, borderRadius: 5, height: 100, alignSelf: 'center', textAlign: 'center', justifyContent: 'center', fontWeight: 'bold'
                }}>Options</Text>
                <CheckBox title='Timer' checked={this.state.checked} size={40} onPress={() => {
                    this.setState({ checked: !this.state.checked })
                }
                } />
            </View>
        )
    }
}