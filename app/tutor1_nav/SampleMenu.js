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
  TextInput,
  View,
  ListView,
  TouchableHighlight,
} from 'react-native';

/*
  //use this data for simple listview
  const data_array=[
              'Movie',
              'Sport',
              'Entertainment',
              'Politics',
              'News & Info',
              'Food',
              'IT & Technology',
              'Sains',
              'Travel',
              'Lifestyle',
              'Music',
              'Art',
              'Fashion',
              'Health',
              'Regional'
            ];
*/

  // use this data for listview with sectionHeader
  const data_array=[];
  data_array['Sport']=['Soccer','Moto GP','Others'];
  data_array['IT & Technology']=['IT','Technology','Science'];
  data_array['Entertainment']=['Music','Movie','Art'];
  data_array['Interest']=['Travel','Style','Fashion','Business'];
  data_array['News & Info']=['Politics','World','Phenomenon'];
  data_array['Health']=['Health','Food','Lifestyle'];

  const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2
  });

export default class SampleMenu extends Component {
  constructor(props) {
    super(props);
    //definition of listview datasource
    this.state = {
      //this code use for simple list view
      //dataSource: ds.cloneWithRows(data_array),
      //this code use for listview with sectionHeader
      dataSource: ds.cloneWithRowsAndSections(data_array),
      filter_string:'',
    };
  }
  render() {
    return (
      <View style={{flex: 1, paddingTop: 22,marginTop:45}}>
        <ListView style={styles.listview_style}
          dataSource={this.state.dataSource}
          renderRow={(rowData,sectionId,rowId) =>(
            <TouchableHighlight onPress={() => {
                this.props.navigator.push({name:'dummypage'});
                /* this is sample to show alert when you click on item
                Alert.alert(
                  'Enter title here..',
                  'You click on '+rowData,
                );
                */
            }}>
              <View style={styles.row}>
                <Text style={styles.row_style}>{rowData}</Text>
              </View>
            </TouchableHighlight>
          )}
          enableEmptySections={true}
          renderSeparator={(sectionId, rowId) => <View key={sectionId+rowId} style={styles.separator_style} />}
          renderHeader={() =>
            <View style={styles.listview_header}>
              <TextInput style={styles.input} placeholder="Search..."
                onChangeText={(text) =>{
                  var rows = [];

                  /*
                  //this code use for simple list view
                  for (var i=0; i < data_array.length; i++) {
                     var stateName = data_array[i].toLowerCase();
                     if(stateName.search(text.toLowerCase()) !== -1){
                       rows.push(data_array[i]);
                     }
                   }
                   */

                   //this code use for listview with sectionHeader
                   for (var key in data_array) {
                     if (!rows[key]) {
                       rows[key] = [];
                     }

                     for (var i=0; i < data_array[key].length; i++) {
                        var stateName = data_array[key][i].toLowerCase();
                        if(stateName.search(text.toLowerCase()) !== -1){
                          rows[key].push(data_array[key][i]);
                        }
                      }

                      if(rows[key].length==0)
                        delete rows[key];
                   }

                   //this code use for simple list view
                   //this.setState({dataSource:ds.cloneWithRows(rows)});
                   //this code use for listview with sectionHeader
                   this.setState({dataSource:ds.cloneWithRowsAndSections(rows)});
                }}
              />
            </View>
          }
          //
          renderSectionHeader={(rowData,sectionId)=>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>{sectionId}</Text>
            </View>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sectionHeader: {
    backgroundColor: '#48D1CC'
  },
  sectionHeaderText: {
    fontFamily: 'AvenirNext-Medium',
    fontSize: 16,
    color: 'white',
    paddingLeft: 10
  },
  listview_header: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C1C1C1',
  },
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
  input: {
    height: 30,
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
});
