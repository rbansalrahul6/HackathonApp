import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button
} from 'react-native';
import {MyButton,SolidButton} from '../components/Buttons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Filter from '../api/Filter';

//let filter = new Filter(1,0,10);

export default class FilterScreen extends Component {
    static navigationOptions = {
        value: 'Filter',
    }

    constructor(props) {
        super(props);
        this.state = {
           // multiSliderValue:[3,7],
            filter:null
        };
    }

    multiSliderValuesChange = (values) => {
        console.log(values);
        this.setState({
         // multiSliderValue: values,
         filter:{...this.state.filter,minBudget:values[0],maxBudget:values[1]}
        });
        //console.log([this.state.multiSliderValue[0], this.state.multiSliderValue[1]]);
      }

      _onPress(val) {
        console.log(val);
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View>
                <Text>Bedrooms</Text>
                <View style={styles.btnPlate}>
                    <MyButton value={2} onPress={(value) => {
                        console.log(value);
                        //this.state.filter.rooms = value;  //wrong
                        }}/>
                    <MyButton value={3} onPress={(value) => {
                        console.log(value);
                        //this.state.filter.rooms = value;
                        }}/>
                    <MyButton value={4} onPress={(value) => {
                        console.log(value);
                        //this.state.filter.rooms = value;
                        }}/>
                </View>
                <Text>Budget</Text>
                <View style={styles.sliderOne}>
                <Text style={styles.text}>{this.state.filter.minBudget} </Text>
                <Text style={styles.text}>{this.state.filter.maxBudget}</Text>
                </View>
                <View style={{paddingTop:20,marginLeft:20}}>
                <MultiSlider
                    values={[this.state.filter.minBudget, this.state.filter.maxBudget]}
                    sliderLength={280}
                    onValuesChange={this.multiSliderValuesChange}
                    min={0}
                    max={10}
                    step={1}
                    snapped
                />
                </View>
                <SolidButton 
                title="APPLY FILTER" 
                onPress={() => navigate('Home',{filter:this.state.filter})}
                />
            </View>
        );
    }
    componentWillMount() {
        const {params} = this.props.navigation.state;
        this.setState({...this.state,filter:params.filter});
    }
}

const styles = StyleSheet.create({
    btnPlate: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    sliderOne: {
        flexDirection: 'row',
        justifyContent: 'space-around'
      },
    filterBtn: {
        justifyContent: 'flex-end',
        backgroundColor: 'red'
    },
});