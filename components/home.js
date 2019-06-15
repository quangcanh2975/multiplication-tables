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
        }
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
        return (
            <ImageBackground source={{ uri: 'https://wallpaperstock.net/wallpapers/thumbs1/53462wide.jpg' }} style={{ width: '100%', height: '100%' }} >
                <NavigationEvents
                    onDidFocus={() => {
                        this.setState({
                            timer: this.props.navigation.getParam('timer'),
                        })
                    }}
                />
                <View style={styles.flexOfView}>
                    <View style={{ flex: 3, justifyContent: "center", }}>
                        <Text style={{ color: 'red', fontWeight: 'bold', textAlign: 'center', fontSize: 50 }}>Multiplication Tables Game</Text>
                    </View>
                    <View style={{ flex: 1, }}>
                        <Button style={styles.greenBtn} onPress={() => this.props.navigation.navigate('Game', { timer: this.state.timer })}>Start</Button>
                        <Button style={styles.greenBtn} onPress={() => this.props.navigation.navigate('Options', { timer: this.state.timer })}>Options</Button>
                    </View>

                </View>
            </ImageBackground>

        )
    }
}