import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';


export default class CardSection extends Component {
    render() {
        return (
            <View style={styles.container}>
                {this.props.children}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderColor: '#ddd',
        position: 'relative'
    },
});
