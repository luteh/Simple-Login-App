import React, {Component} from 'react';
import {
  AppRegistry,
  AsyncStorage,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet
} from 'react-native';

export default class TutorialAsyncStorage extends Component{
  constructor(){
    super();
    this.state = {
      name:'',
      hobby:'',
      textName:'',
      textHobi:'',
    };
    {/*AsyncStorage.getItem('name', (error, result) => {
        if (result) {
            this.setState({
                name: result
            });
        }
    });
    AsyncStorage.getItem('hobby', (error, result) => {
        if (result) {
            this.setState({
                hobby: result
            });
        }
    });*/}
    AsyncStorage.getItem('user', (error, result)=>{
      if (result) {
           let resultParsed = JSON.parse(result)
           this.setState({
                name: resultParsed.name,
                hobby: resultParsed.hobby
            });
        }
    })
  }
  saveData(){
    let name = this.state.textName;
    let hobby = this.state.textHobi;
    let data = {
            name: name,
            hobby: hobby
        }
    AsyncStorage.setItem('user', JSON.stringify(data));
    {/*AsyncStorage.setItem('name', name);
    AsyncStorage.setItem('hobby', hobby);*/}
    this.setState({
     name: name,
     hobby: hobby
});
alert('Data tersimpan');
  }
  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Halo kenalan yuk!
        </Text>
        <Text style={styles.instructions}>
          Name : {this.state.name}{'\n'}
          Hobi : {this.state.hobby}
        </Text>
        <TextInput style={styles.TextInput}
          onChangeText={(textName) => this.setState({textName})}
          placeholder="Nama"
        />
      <TextInput style={styles.TextInput}
        onChangeText={(textHobi) => this.setState({textHobi})}
        placeholder="Hobi"
      />
        <Button
          title='Simpan'
          onPress={this.saveData.bind(this)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#F5FCFF',
    padding: 16,
    paddingTop: 32
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
  textInput: {
    height: 35,
    backgroundColor: 'white',
    marginTop: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'grey',
    padding: 8
  }
});
