'use strict';
import React, {Component} from 'react'
import {
    AppRegistry, Navigator,
    StyleSheet,
    Text, TextInput,
    View
} from 'react-native'

import Root from './src/tutor_login/Root'
import Login from "./src/tutor_login/Login"
import Register from './src/tutor_login/Register'
import Home from './src/tutor_login/Home'
import Update from './src/tutor_login/Update'

export default class AwesomePrujects extends Component {

    renderScene(route, navigator) {
        if (route.name == 'Root') {
            return <Root navigator={navigator}/>
        }
        if (route.name == 'Login') {
            return <Login navigator={navigator}/>
        }
        if (route.name == 'Register') {
            return <Register navigator={navigator}/>
        }
        if (route.name == 'Home') {
            return <Home navigator={navigator} {...route.passProps}/>
        }
        if (route.name == 'Update') {
            return <Update navigator={navigator} {...route.passProps}/>
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Navigator
                initialRoute={{name: 'Root'}}
                renderScene={this.renderScene.bind(this)}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
});

AppRegistry.registerComponent('AwesomePrujects', () => AwesomePrujects);