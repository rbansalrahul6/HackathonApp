import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Switch,
  TouchableOpacity
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';
import FilterScreen from './src/screens/FilterScreen';                       

const MyApp = StackNavigator({
  Home: {screen: HomeScreen},
  Filter: {screen: FilterScreen},
});


export default class App extends Component {
  render() {
    return (
      <MyApp />
    );
  }
}
