import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from 'react-native-button';
import styles from './styles.js';

export default class Result extends Component {
    render() {
        const { navigation } = this.props;
        const rightAnswers = navigation.getParam('rightAnswers', 0);
        const wrongAnswers = navigation.getParam('wrongAnswers', 0);
        return (
            <View style={styles.flexOfView}>
                <Text style={[styles.panel, {backgroundColor: '#4282c2', }]} >Your result</Text>
                <Text style={ {color: '#1dd065', fontSize: 30, fontWeight: 'bold' }} >Right answers: {JSON.stringify(rightAnswers)}</Text>
                <Text style={{color: '#df1c3c', fontSize: 30, fontWeight: 'bold'}} >Wrong answers: {JSON.stringify(wrongAnswers)}</Text>
                <Button style={styles.containerBtn} onPress={() => this.props.navigation.navigate('Game')}>Play again</Button>
            </View>
        )
    }
}