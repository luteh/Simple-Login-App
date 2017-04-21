/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Navigator,
  ListView,
  TouchableHighlight,
} from 'react-native';

export default class ListMenu extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const data_array=[
      {'name':'Activity Indicator','page_id':'act_indicator'}
    ];
    this.state = {
      dataSource: ds.cloneWithRows(data_array)
    };
  }
  render() {
    return (
      <View style={{flex: 1, paddingTop: 22,marginTop:45}}>
        <ListView style={styles.listview_style}
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>(
            <TouchableHighlight onPress={() => {
                this.props.navigator.push({name:rowData.page_id});
            }}>
              <View style={styles.row}>
                <Text style={styles.row_style}>{rowData.name}</Text>
              </View>
            </TouchableHighlight>
          )}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator_style} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listview_style: {
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  row_style: {
    flex: 1,
    fontSize: 15,
    textAlign: 'left',
    margin: 10,
  },
  separator_style: {
   flex: 1,
   height: StyleSheet.hairlineWidth,
   backgroundColor: '#8E8E8E',
  },
});
