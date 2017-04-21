'use strict';
import React, {Component} from 'react'
import {
    StyleSheet,
    TextInput,
    TouchableHighlight,
    AsyncStorage,
    ActivityIndicator,
    Text,
    View
} from 'react-native';

const ACCESS_TOKEN = 'access_token';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            errors: []
        }
    }

    redirect(routeName, token) {
        this.props.navigator.push({
            name: routeName,
            passProps: {
                accessToken: token
            }
        })
    }

    async onRegisterPressed() {
        try {
            let response = await fetch('https://afternoon-beyond-22141.herokuapp.com/api/users', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: {
                        name: this.state.name,
                        email: this.state.email,
                        password: this.state.password,
                        password_confirmation: this.state.password_confirmation,
                    }
                })
            });

            let res = await response.text();


            if (response.status >= 200 && response.status < 300) {
                console.log('res success is : ' + res);
                let accessToken = res;
                this.redirect('Home', accessToken);
            } else {
                let errors = res;
                throw errors;
            }
        } catch (errors) {
            console.log('The error is : ' + errors);
            let formErrors = JSON.parse(errors);
            let errorsArray = [];
            for (var key in formErrors) {
                if (formErrors[key].length > 1) {
                    formErrors[key].map(error => errorsArray.push(`${key} ${error}`));
                } else {
                    errorsArray.push(`${key} ${formErrors[key]}`);
                }
            }
            this.setState({errors: errorsArray});
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
                    onChangeText={(val) => this.setState({name: val})}
                    placeholder='Name'
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(val) => this.setState({password: val})}
                    placeholder='Password'
                    secureTextEntry={true}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(val) => this.setState({password_confirmation: val})}
                    placeholder='Password Confirmation'
                    secureTextEntry={true}
                />
                <TouchableHighlight style={styles.button} onPress={this.onRegisterPressed.bind(this)}>
                    <Text style={styles.buttonText}>
                        Register
                    </Text>
                </TouchableHighlight>

                <Errors errors={this.state.errors}/>
            </View>
        )
    }
}

const Errors = (props) => {
    return (
        <View>
            {props.errors.map((error, i) => <Text key={i} style={styles.error}> {error} </Text>)}
        </View>
    );
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
        padding: 4,
        alignSelf: 'stretch',
        justifyContent: 'center',
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
    loader: {
        marginTop: 20
    }
});

export default Register