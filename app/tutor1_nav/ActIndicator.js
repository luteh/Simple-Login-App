import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native'

export default class ActIndicator extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          animating={true}
          size={'large'}
          color={'black'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});