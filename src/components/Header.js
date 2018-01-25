import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';


export default class Header extends Component {
    render() {
        return (
            <View style={styles.header}>
                {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 50,
        padding: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative'
    },
});