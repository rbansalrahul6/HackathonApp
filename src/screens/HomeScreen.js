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
  Button,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import Header from '../components/Header';
import HeaderSection from '../components/HeaderSection';
import MenuBar from '../components/MenuBar';
import MenuItem from '../components/MenuItem';
import Filter from '../api/Filter';
import {getSelector,buildURL} from '../api/APIHelper';
import Property from '../data/Property';
import PropertyDetail from '../components/PropertyDetail';

const options = [{label:'BUY',value:["Primary","Resale"]},
                 {label:'RENT',value:'Rental'}];
let filter = new Filter(["Primary","Resale"],[1,2,3,4,5],0,100000000);
let page = 0;
let bedroomBtns = [1,1,1,1];
const bedroomOptions = [2,3,4,5];
                 
export default class HomeScreen extends Component {
    static navigationOptions = {
        header:null,
    }
  constructor(props) {
    super(props);
    this.state = {
        properties:[],
        isLoading:false,
        isRefreshing:false
    };
  }
  
 geturl() {
    var flist = ["mainImageURL","price","bedrooms","size","measure","unitType","name","label","possessionDate","floor","totalFloors"];
    var sel = getSelector(flist,filter,page);
    var query = {
        selector:sel,
        includeNearbyResults:false,
        includeSponsoredResults:false
    };
    const BASE_URL = 'https://www.makaan.com/petra/app/v4/listing';
     var url = buildURL(BASE_URL,query);
     console.log(url);
     return url;
  }
  
  load = () => {
    const {properties} = this.state;
      this.setState({
          isLoading:true
      });
      fetch(this.geturl())
      .then(res => res.json())
      .then(res => {
          var items = res.data[0].facetedResponse.items;
          var res = [];
          items.forEach((item) => {
              let id = item.listing.id;
              let imgURL = item.listing.mainImageURL;
              let price = item.listing.currentListingPrice.price;
              let bedrooms = item.listing.property.bedrooms;
              let size = item.listing.property.size;
              let measure = item.listing.property.measure;
              let unitType = item.listing.property.unitType;
              let label1 = item.listing.property.project.locality.label;
              let label2 = item.listing.property.project.locality.suburb.label;
              let floor = item.listing.floor;
              let tf = item.listing.totalFloors;
              let pdate = item.listing.property.project.possessionDate;
              let name = unitType;
              if(unitType==='Apartment') {
                   name = item.listing.property.project.name;
               }
               if(pdate===undefined)
                pdate = item.listing.possessionDate;

               pdate = new Date(pdate);
               let p = new Property(id,imgURL,price,bedrooms,size,measure,unitType,name,label1,label2,pdate,floor,tf);
               res.push(p);
          })
          this.setState({
              ...this.state,
              properties:page===0 ? res : [...properties,...res],
              isRefreshing:false
          });
      })
      .catch(err => console.log(err));
  }
  handleLoadMore = () => {
    page+=20;
    this.load();
  };
  renderFooter () {
    return this.state.isLoading ? <View style={{ flex: 1, padding: 10 }}>
    <ActivityIndicator size="small" />
  </View> : null
}
setFilter = (Filter,btnList) => {
    filter = Filter;
    bedroomBtns = btnList;
    let tempBedrooms = [1];
    bedroomBtns.forEach((element,index) => {
        if(element===1)
            tempBedrooms.push(bedroomOptions[index]);
    });
    filter.rooms = tempBedrooms;
    page = 0;
    this.setState({
        ...this.state,
        properties:[]
    });
    this.load();
}
changeType = (type) => {
    filter.type = type;
    page = 0;
    this.setState({
        ...this.state,
        properties:[]
    });
    this.load();
}
  render() {
      const {navigate} = this.props.navigation;
      const {properties,isRefreshing} = this.state;
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
            buttonColor={'red'} 
            backgroundColor={'#BDBDBD'}
            options={options} 
            initial={0} 
            onPress={
                value =>{
                    this.changeType(value);
                } }
            />
          </MenuItem>
          <MenuItem>
            <TouchableOpacity onPress={() => navigate('Filter',{filter:filter,btnList:bedroomBtns,test:this.setFilter })}>
            <Text style={styles.filterText}>FILTER</Text>
            </TouchableOpacity>
            <Text style={styles.filterStatus}>Not Applied</Text>
          </MenuItem>
        </MenuBar>
        <FlatList 
        data={properties}
        renderItem={({item}) => (
            <PropertyDetail data={item}/>
          )}
          keyExtractor={i=>i.id}
          refreshing={isRefreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0}
          ListFooterComponent={this.renderFooter.bind(this)}
        />
      </View>
    );
  }
  componentDidMount() {
    this.load();
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
},
filterText: {
    color: 'grey',
    fontWeight: 'bold'
},
filterStatus: {
    color: 'grey',
    fontSize: 12,
    marginLeft: 20
}
});
