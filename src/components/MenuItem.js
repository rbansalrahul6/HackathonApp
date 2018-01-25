import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

export default class MenuItem extends Component {
    render() {
        return (
            <View style={styles.item}>
                {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: 'lightgrey',
    },
});