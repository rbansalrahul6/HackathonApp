import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native';

const {width,height} = Dimensions.get('window');


export class SolidButton extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.solidBtn} onPress={this.props.onPress}>
                <Text style={styles.btnTitle}>{this.props.title}</Text>
            </TouchableOpacity>
        );
    }
}

export class TouchButton extends Component {
    colors = ['white','green'];
    constructor(props) {
        super(props);
        this.state={
            color: this.props.initialColor
          }
    }
    handlePress = () => {
        this.setState({
            color: 1 - this.state.color
        });
    }
    render() {
        return (
            <TouchableOpacity 
            style={[styles.touchBtn,{backgroundColor:this.colors[this.state.color]}]} 
            onPress={() => {
                this.handlePress();
                this.props.onPress(this.props.id);
            }}>
                <Text>{this.props.data.label}</Text>
            </TouchableOpacity>
        );
    }
  }

const styles = StyleSheet.create({
    solidBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        paddingHorizontal: 10,
        paddingVertical: 15
    },
    touchBtn: {
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ddd',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        paddingVertical: 5,
        paddingHorizontal: 15
    },
    btnTitle: {
        color: 'white',
        fontWeight: 'bold'
    }
});