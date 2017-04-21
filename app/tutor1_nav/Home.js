import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Navigator, Text, View, TouchableHighlight} from 'react-native';

import WelcomePage from './WelcomePage';
import SampleMenu from './SampleMenu';
import DummyPage from './DummyPage';

class Home extends Component {
    renderScene(route, navigator) {
        console.log(route);
        if (route.name == 'root') {
            route.title = 'Welcome'
            route.index = 0;
            return <WelcomePage navigator={navigator}/>
        }

        if (route.name == 'samplemenu') {
            route.title = 'Exampleu Navigator';
            route.index = 1;
            return <SampleMenu navigator={navigator}/>
        }

        if (route.name == 'dummypage') {
            route.title = 'Dummye';
            route.index = 2;
            return <DummyPage navigator={navigator}/>
        }
    }

    render() {
        return (
            <Navigator
                initialRoute={{name: 'root'}}
                renderScene={this.renderScene.bind(this)}
                navigationBar={
                    <Navigator.NavigationBar
                        style={{paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight}}
                        routeMapper={{
                            LeftButton: (route, navigator, index, navState) => {
                                if (route.index === 0) {
                                    return null;
                                } else {
                                    return (
                                        <TouchableHighlight onPress={() => navigator.pop()}>
                                            <Text style={styles.navbar}>Back</Text>
                                        </TouchableHighlight>
                                    );
                                }
                            },
                            RightButton: (route, navigator, index, navState) => {
                                return (<Text></Text>);
                            },
                            Title: (route, navigator, index, navState) => {
                                return (
                                    <Text style={styles.titlebar}>{route.title}</Text>
                                );
                            },
                        }}
                        configureScene={(route, routeStack) =>
                            Navigator.SceneConfigs.FloatFromBottom}
                    />
                }
            />
        )
    }
}

const styles = StyleSheet.create({
    titlebar: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    navbar: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: 'blue',
    },
});