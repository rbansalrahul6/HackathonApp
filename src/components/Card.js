import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';


export default class Card extends Component {
    render() {
        return (
            <View style={styles.cardContainer}>
                {this.props.children}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    cardContainer: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        padding: 5,
        backgroundColor: 'white'
    },
});
