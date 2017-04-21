import React, { Component } from 'react'
import {
    View
} from 'react-native'
import PresentationalComponent from './PresentationalComponent'

export default class ContainerComponent extends Component {
    constructor(){
        super()
        this.state = {
            data: ''
        }
    }
    getData = () => {
        fetch('https://jsonplaceholder.typicode.com/posts/1', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    data: responseJson
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }
    render() {
        return (
            <View>
                <PresentationalComponent
                    dataFromFetch = {this.state.data}
                    getData = {this.getData}
                />
            </View>
        )
    }
}