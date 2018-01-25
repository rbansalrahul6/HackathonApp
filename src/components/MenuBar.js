import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

export default class MenuBar extends Component {
    render() {
        return (
            <View style={styles.menu}>
                {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    menu: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'gray',
        height: 50,
        marginTop: 4
    },
});