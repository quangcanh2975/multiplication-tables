import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from 'react-native-button';

export default class Options extends Component {
    render() {

        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={{
                    justifyContent: "center", fontSize: 50, alignSelf: 'center', color: 'green',
                    fontWeight: 'bold', textAlign: 'center'
                }}>Options</Text>
            </View>
        )
    }
}