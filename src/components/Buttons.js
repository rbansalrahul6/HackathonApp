import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

export class MyButton extends Component {
    constructor(props) {
        super(props);
        //this._onPress = this._onPress.bind(this);
    }
    
    render() {
        return (
            <TouchableOpacity style={styles.button} onPress={()=>this.props.onPress(this.props.value)}>
                <Text>{this.props.value}</Text>
            </TouchableOpacity>
        );
    }
}

export class SolidButton extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.solidBtn} onPress={this.props.onPress}>
                <Text>{this.props.title}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#ddd',
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        padding: 5
    },
    solidBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        padding: 10
    },
});