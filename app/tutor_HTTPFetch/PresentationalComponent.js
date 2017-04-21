import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native'

const PresentationalComponent = (props) => {
    return (
        <View style = {styles.container}>
            <TouchableOpacity
                style = {styles.button}
                onPress = {props.getData}>
                <Text>
                    GET DATA
                </Text>
            </TouchableOpacity>
            <View>
                <Text>
                    {props.dataFromFetch.body}
                </Text>
            </View>
        </View>
    )
}

export default PresentationalComponent

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 600
    },
    button: {
        backgroundColor: 'silver',
    }
})