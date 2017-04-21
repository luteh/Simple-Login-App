'use strict';
import React, {Component} from 'react'
import {
    StyleSheet,
    AppRegistry, Navigator,
    Text, TouchableHighlight,
    AsyncStorage,
    View
} from 'react-native'

const ACCESS_TOKEN = 'access_token';

class Root extends Component {

    componentWillMount() {
        this.getToken();
    }

    navigate(routeName) {
        this.props.navigator.push({
            name: routeName
        })
    }


    async getToken() {
        try {
            let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
            if (!accessToken) {
                console.log('Token not set');
            } else {
                this.verifyToken(accessToken);
            }
        } catch (error) {
            console.log('Something went wrong');
        }
    }

    async verifyToken(token) {
        let accessToken = token;

        try {
            let response = await fetch('https://afternoon-beyond-22141.herokuapp.com/api/verify?session%5Baccess_token%5D=' + accessToken);
            let res = await response.text();
            if (response.status >= 200 && response.status < 300) {
                this.navigate('Home');
                console.log('response is : ' +res);
            } else {
                let error = res;
                throw error;
            }
        } catch (error) {
            console.log("error response: " + error);
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight style={styles.button} onPress={this.navigate.bind(this, 'Login')}>
                    <Text style={styles.buttonText}>
                        Login
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.button} onPress={this.navigate.bind(this, 'Register')}>
                    <Text style={styles.buttonText}>
                        Register
                    </Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 10,
        paddingTop: 180
    },
    button: {
        height: 50,
        backgroundColor: '#48BBEC',
        alignSelf: 'stretch',
        alignItems: 'center',
        marginTop: 10,
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 22,
        color: '#FFF',
        alignSelf: 'center'
    },
    title: {
        fontSize: 25,
        marginBottom: 15
    }
});

export default Root