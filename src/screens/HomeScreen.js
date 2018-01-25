import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Switch,
  TouchableOpacity,
  Button
} from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import Header from '../components/Header';
import HeaderSection from '../components/HeaderSection';
import MenuBar from '../components/MenuBar';
import MenuItem from '../components/MenuItem';
import Card from '../components/Card';
import CardSection from '../components/CardSection';
import Filter from '../api/Filter';

const options = [{label:'BUY',value:'buy'},
                 {label:'RENT',value:'rent'}];
let f = new Filter('buy',[1,2],0,10);
                 
export default class HomeScreen extends Component {
    static navigationOptions = {
        header:null,
    }
  constructor(props) {
    super(props);
    this.state = {filter:f};
  }
  render() {
      const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Header>
          <HeaderSection style={styles.iconBar}>
              <Image source={require('../../images/makaan.png')} style={styles.icon} />
          </HeaderSection>
          <HeaderSection style={styles.searchBar}>
              <TextInput
              style={{flex:1}}
              placeholder="search here" 
              />
          </HeaderSection>
        </Header>
        <MenuBar>
          <MenuItem>
            <SwitchSelector 
            options={options} 
            initial={0} 
            onPress={
                value =>{
                    console.log(value);
                    //f.type=value;
                    this.setState({...this.state,
                        filter:{...this.state.filter,type:value}
                    })  
                } }
            />
          </MenuItem>
          <MenuItem>
            <TouchableOpacity onPress={() => navigate('Filter',{filter:this.state.filter})}>
            <Text>FILTER</Text>
            </TouchableOpacity>
            <Text>Not Applied</Text>
          </MenuItem>
        </MenuBar>
        <Card>
            <Image source={require('../../images/home.png')} style={styles.image} />
        </Card>
        <Button
        title="test"
        onPress={() => console.log(this.state)}
        />
      </View>
    );
  }
  componentDidMount() {
    const {params} = this.props.navigation.state;
    if(params) {
      this.setState({...this.state,filter:params.filter});
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:22,
  },
  icon: {
    width: 32,
    height: 32
  },
  iconBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    position: 'relative'
},
  searchBar: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    position: 'relative'
},
image: {
    width: null,
    height: 180,
    resizeMode: 'stretch',
}
});
