/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View} from 'react-native';

import Button from 'react-native-button';

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '',text2:'Awesome' };
  }

  render() {
    let judul='React Native';
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to {judul} {this.state.text2}!
        </Text>
        <TextInput
          style={{height: 40, margin: 15, padding: 10,
            borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
        />

        <Button
         style={{fontSize: 20, color: 'green'}}
         styleDisabled={{color: 'red'}}
         onPress={() => {
           this.props.navigator.push({name:'listmenu'});
         }}>
         Go To Main Menu!
       </Button>

       <Button
        style={{fontSize: 15, color: 'blue', paddingTop:15}}
        styleDisabled={{color: 'red'}}
        onPress={() => {
          this.props.navigator.push({name:'samplemenu'});
        }}>
        See ListView and Navigator Sample
      </Button>
        <CountOfCharacter text={this.state.text} />
      </View>

    );
  }
}

//class ini akan menampilkan jumlah huruf yang ada pada
//suatu karakter
class CountOfCharacter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
          //akan menampilkan jumlah huruf dari variabel props.text
        <Text style={styles.welcome}>
          Count of character : {this.props.text.length}
        </Text>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
