'use strict';
import React, {Component} from 'react'
import {
    StyleSheet,
    TextInput,
    TouchableHighlight,
    ActivityIndicator,
    AsyncStorage,
    Text,
    View
} from 'react-native';

const ACCESS_TOKEN = 'access_token';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accessToken: this.props.accessToken
        }
    }

    componentWillMount() {
        this.getToken();
    }

    async getToken() {
        try {
            let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
            if (!accessToken) {
                this.redirect('Login');
                console.log('Token not set');
            } else {
                this.setState({accessToken: accessToken});
            }
        } catch (error) {
            console.log('Something went wrong');
            this.redirect('Login');
        }
    }

    onLogout() {
        this.deleteToken()
    }

    async deleteToken() {
        try {
            await AsyncStorage.removeItem(ACCESS_TOKEN);
            this.redirect('Root');
        } catch (error) {
            console.log('Something went wrong' + error);
        }
    }

    redirect(routeName) {
        this.props.navigator.push({
            name: routeName,

        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}> Welcome User !</Text>
                <Text style={styles.text}>Your new token is {this.state.accessToken} </Text>
                <TouchableHighlight style={styles.button} onPress={this.onLogout.bind(this)}>
                    <Text style={styles.buttonText}>
                        Logout
                    </Text>
                </TouchableHighlight>


            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 10,
    },
    title: {
        fontSize: 25,
        marginTop: 15,
        marginBottom: 15
    },
    text: {
        marginBottom: 30
    },
    button: {
        height: 50,
        backgroundColor: 'red',
        alignSelf: 'stretch',
        marginTop: 10,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 22,
        color: '#FFF',
        alignSelf: 'center'
    },
    flash: {
        height: 40,
        backgroundColor: '#00ff00',
        padding: 10,
        alignSelf: 'center',
    },
    loader: {
        marginTop: 20
    }
});

export default Home