import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet
} from 'react-native';
import Card from './Card';
import {getMonthName} from '../utils/DateUtils';
import {convert} from '../utils/CurrencyUtils';
import {getOrdinalSuffix} from '../utils/NumberUtils';

export default class PropertyDetail extends Component {
    render() {
        const property = this.props.data;
        const Price = convert(property.price);
        return (
            <Card>
                <Image source={{uri:property.imgURL}} style={styles.image} />
                <View style={styles.price}>
                    <Text style={styles.currSymbol}>₹ </Text>
                    <Text style={styles.priceText}>{Price.value}</Text>
                    <Text style={styles.suffixText}> {Price.suffix}</Text>
                </View>
                <Text style={styles.descText}>{property.bedrooms} BHK Apartment  {property.size} {property.measure} </Text>
                <Text style={styles.greyText}>{property.name} | {property.label1} {property.label2}</Text>
                <Text style={styles.greyText}>Possession by {getMonthName(property.pdate)} {property.pdate.getFullYear()} | {getOrdinalSuffix(property.floor)} of {property.tfloor} floor</Text>
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
    price: {
        flexDirection: 'row',
        paddingTop: 5
    },
    descText: {
        paddingTop: 5,
        color: 'gray',
        fontWeight: 'bold'
    },
    greyText: {
        paddingTop: 5,
        color: 'grey',
        fontSize: 13
    },
    priceText: {
        color: 'black',
        fontWeight: 'bold'
    },
    suffixText: {
        color: 'grey',
        fontSize: 12,
        fontWeight: 'bold',
        paddingTop:2
    },
    currSymbol: {
        fontSize: 12,
        color: 'grey'
    }
});




