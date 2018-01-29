import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet
} from 'react-native';
import Card from './Card';
import CardSection from './CardSection';


export default class PersonDetail extends Component {
    render() {
        return (
            <Card>
                <Image source={{uri:this.props.data.imgURL}} style={styles.image} />
                <Text>Rs. {this.props.data.price}</Text>
                <Text>{this.props.data.bedrooms}BHK Apartment {this.props.data.size} {this.props.data.measure} </Text>
                <Text>{this.props.data.name}| {this.props.data.label1} {this.props.data.label2}</Text>
                <Text>Possession by {this.props.data.pdate}|{this.props.data.floor}th of {this.props.data.tfloor} floor</Text>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        width: null,
        height: 180,
        resizeMode: 'stretch',
    },
});
