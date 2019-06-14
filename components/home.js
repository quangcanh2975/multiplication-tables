import React, { Component } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import Button from 'react-native-button';
import styles from './styles.js';

export default class Home extends Component {
    render() {
        return (
            <ImageBackground  source={{uri: 'https://wallpaperstock.net/wallpapers/thumbs1/53462wide.jpg'}} style={{width: '100%', height: '100%'}} >
                <View style={styles.flexOfView}>
                    <View style={{flex: 3, justifyContent: "center",}}>
                        <Text style={{ color: 'red', fontWeight: 'bold', textAlign: 'center', fontSize: 50}}>Multiplication Tables Game</Text>
                    </View>
                    <View style={{ flex: 1, }}>
                        <Button style={{padding: 10, height: 50, width: 200, overflow: 'hidden', borderRadius: 4, backgroundColor: '#1dd065', color: 'white'}} onPress={() => this.props.navigation.navigate('Game')}>Start</Button>
                    </View>
                
                </View>
            </ImageBackground>
            
        )
    }
}