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

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            error: ''
        }
    }

    redirect(routeName, token) {
        this.props.navigator.push({
            name: routeName,
            passProps:{
                accessToken: token
            }
        })
    }

    async storeToken(accessToken) {
        try {
            await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
            this.getToken();
        } catch (error) {
            console.log('Something went wrong');
        }
    }

    async getToken() {
        try {
            let token = await AsyncStorage.getItem(ACCESS_TOKEN);
            console.log('Token is : ' + token);
        } catch (error) {
            console.log('Something went wrong');
        }
    }

    async removeToken() {
        try {
            let token = await AsyncStorage.removeItem(ACCESS_TOKEN);
            this.getToken();
        } catch (error) {
            console.log('Something went wrong');
        }
    }

    async onLoginPressed() {
        try {
            let response = await fetch('https://afternoon-beyond-22141.herokuapp.com/api/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    session: {
                        email: this.state.email,
                        password: this.state.password
                    }
                })
            });

            let res = await response.text();

            if (response.status >= 200 && response.status < 300) {
                this.setState({error: ''});
                let accessToken = res;
                this.storeToken(accessToken);
                console.log('res token : ' + accessToken);
                this.redirect('Home', accessToken);
            } else {
                let error = res;
                throw error;
            }
        } catch (error) {
            this.removeToken();
            this.setState({error: error});
            console.log('error : ' + error)
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    onChangeText={(val) => this.setState({email: val})}
                    placeholder='Email'
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(val) => this.setState({password: val})}
                    placeholder='Password'
                    secureTextEntry={true}
                />
                <TouchableHighlight style={styles.button} onPress={this.onLoginPressed.bind(this)}>
                    <Text style={styles.buttonText}>
                        Login
                    </Text>
                </TouchableHighlight>
                <Text style={styles.error}>{this.state.error}</Text>
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
        paddingTop: 80
    },
    input: {
        height: 50,
        marginTop: 10,
        alignSelf: 'stretch',
        justifyContent: 'center',
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48bbec'
    },
    button: {
        height: 50,
        backgroundColor: '#48BBEC',
        alignSelf: 'stretch',
        marginTop: 10,
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 22,
        color: '#FFF',
        alignSelf: 'center'
    },
    heading: {
        fontSize: 30,
    },
    error: {
        color: 'red',
        paddingTop: 10
    },
    success: {
        color: 'green',
        paddingTop: 10
    },
    loader: {
        marginTop: 20
    }
});

export default Login