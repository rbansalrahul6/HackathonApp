import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import {SolidButton,TouchButton} from '../components/Buttons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Filter from '../api/Filter';
import {convert} from '../utils/CurrencyUtils';
import {MIN_BUDGET,MAX_BUDGET,STEP_SIZE} from '../utils/Constants';

const {width,height} = Dimensions.get('window');

const bedroomOptions = [
    {value:1,label:'1BHK'},
    {value:2,label:'2BHK'},
    {value:3,label:'3BHK'},
    {value:4,label:'4BHK'},
    {value:5,label:'5BHK'},
];
//const DEFAULT_ROOM_BTNS = [0,0,0,0];
let filter_count = 0;

export default class FilterScreen extends Component {
    static navigationOptions = {
        title: 'Filter',
    }

    constructor(props) {
        super(props);
        this.state = {
            filter:null,
            btnList: null
        };
    }

    multiSliderValuesChange = (values) => {
        this.setState({
         filter:{...this.state.filter,minBudget:values[0],maxBudget:values[1]}
        });
      }

      _onPress(id) {
        const btns = this.state.btnList;
        btns[id] = 1 - btns[id];
        this.setState({
            ...this.state,
            btnList:btns
        });
    }

    render() {
        console.log(this.state);
        const {goBack} = this.props.navigation;
        const {params} = this.props.navigation.state;
        const minPrice = convert(this.state.filter.minBudget);
        const maxPrice = convert(this.state.filter.maxBudget);
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.filterName}>Bedrooms</Text>
                    <View style={styles.btnPlate}>
                        <TouchButton
                        id={0}
                        data={bedroomOptions[0]}
                        initialColor={this.state.btnList[0]}
                        onPress={(id) => this._onPress(id)}
                        />
                        <TouchButton
                        id={1}
                        data={bedroomOptions[1]}
                        initialColor={this.state.btnList[1]}
                        onPress={(id) => this._onPress(id)}
                        />
                        <TouchButton
                        id={2}
                        data={bedroomOptions[2]}
                        initialColor={this.state.btnList[2]}
                        onPress={(id) => this._onPress(id)}
                        />
                        <TouchButton
                        id={3}
                        data={bedroomOptions[3]}
                        initialColor={this.state.btnList[3]}
                        onPress={(id) => this._onPress(id)}
                        />
                        <TouchButton
                        id={4}
                        data={bedroomOptions[4]}
                        initialColor={this.state.btnList[4]}
                        onPress={(id) => this._onPress(id)}
                        />
                    </View>
                    <Text style={[styles.filterName,{paddingTop:50}]}>Budget</Text>
                    <View style={{paddingTop:30,alignItems:'center'}}>
                        <MultiSlider
                            values={[this.state.filter.minBudget, this.state.filter.maxBudget]}
                            sliderLength={280}
                            onValuesChange={this.multiSliderValuesChange}
                            min={MIN_BUDGET}
                            max={MAX_BUDGET}
                            step={STEP_SIZE}
                            snapped
                            trackStyle={{backgroundColor:'red'}}
                        />
                    </View>
                    <View style={styles.sliderOne}>
                        <Text style={styles.priceText}>{minPrice.value}{minPrice.suffix} </Text>
                        <Text style={styles.priceText}>{maxPrice.value}{maxPrice.suffix}</Text>
                    </View>
                </View>
                <SolidButton 
                title="APPLY FILTER" 
                onPress={() => {
                    goBack();
                    params.test(this.state.filter,this.state.btnList);
                }}
                />
            </View>
        );
    }
    componentWillMount() {
        const {params} = this.props.navigation.state;
        filter_count = params.filterCount;
        //console.log(filter_count);
        let tempFilter = params.filter;
        if(tempFilter.minBudget===null && tempFilter.maxBudget===null) {
            tempFilter.minBudget = MIN_BUDGET;
            tempFilter.maxBudget = MAX_BUDGET;
        }
        this.setState({...this.state,filter:tempFilter,btnList:params.btnList});
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'white',
        paddingTop: 20,
        justifyContent: 'space-between'
    },
    btnPlate: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 15,
        paddingHorizontal: 15
    },
    sliderOne: {
        flexDirection: 'row',
        justifyContent: 'space-around'
      },
    filterBtn: {
        justifyContent: 'flex-end',
        backgroundColor: 'red'
    },
    filterName: {
        marginLeft: 15,
        color: 'grey',
        fontWeight: 'bold'
    },
    priceText: {
        color: 'grey'
    }
});