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
import {compArrays} from '../utils/NumberUtils';
import {DEFAULT_ROOM_BTNS,MIN_BUDGET,MAX_BUDGET,BUY,RENT,PAGE_SIZE} from '../utils/Constants';

const options = [{label:'BUY',value:BUY},
                 {label:'RENT',value:RENT}];

let filter = new Filter(11,BUY,null,null,null);
let page = 0;
let bedroomBtns = [0,0,0,0,0];
const bedroomOptions = [1,2,3,4,5];
let filterCount = 0;
let isLoadingComplete = false;
let resultsAvailable = true;
                 
export default class HomeScreen extends Component {
    static navigationOptions = {
        header:null,
    }
  constructor(props) {
    super(props);
    this.state = {
        properties:[],
        isLoading:false,
        isRefreshing:false,
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
    resultsAvailable = true;
      this.setState({
          isLoading:true
      });
      fetch(this.geturl())
      .then(res => res.json())
      .then(res => {
          var items = res.data[0].facetedResponse.items;
          var totalResults = res.data[0].totalCount;
          if(totalResults === 0)
          {
              resultsAvailable = false;
          }
          var loadStatus = true;
          if(items.length === 0)
          {
            loadStatus = false;
            isLoadingComplete = true;
          }
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
              isRefreshing:false,
              isLoading:loadStatus
          });
      })
      .catch(err => console.log(err));
  }
  handleLoadMore = () => {
      if(!isLoadingComplete) {
        page+=PAGE_SIZE;
        this.load();
      }
      else {
          this.setState({isLoading:false});
      }
  };
  renderFooter () {
      if(!resultsAvailable) {
          return noResultsView;
      }
    return this.state.isLoading ? <View style={{ flex: 1, padding: 10 }}>
    <ActivityIndicator size="small" />
  </View> : null
}
setFilter = (Filter,btnList) => {
    filter = Filter;
    bedroomBtns = btnList;

    filter.rooms = null;
    filterCount=0;
    if(!compArrays(bedroomBtns,DEFAULT_ROOM_BTNS)) {
        filterCount+=1;
        let filterCountBedrooms = [];
        bedroomBtns.forEach((element,index) => {
            if(element===1)
                filterCountBedrooms.push(bedroomOptions[index]);
        });
        filter.rooms = filterCountBedrooms;    
    }
    if(filter.minBudget===MIN_BUDGET && filter.maxBudget===MAX_BUDGET)
    {
        filter.minBudget = null;
        filter.maxBudget = null;
    }
    else
    {
        filterCount+=1;
    }
    page = 0;
    this.setState({
        ...this.state,
        properties:[]
    });
    this.load();
}
clearFilter() {
    filter.type = null;
    filter.rooms = null;
    filter.minBudget = null;
    filter.maxBudget = null;
    bedroomBtns = [0,0,0,0,0];
    filterCount = 0;
    this.setFilterStatus();
}
setFilterStatus() {
    let res = '';
    if(filterCount===0)
        res = 'Not';
    else
        res = filterCount + ' Filter';
    return res + ' Applied';
}
changeType = (type) => {
    this.clearFilter();
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
      //console.log(filter);
    return (
      <View style={styles.container}>
        <Header>
          <HeaderSection style={styles.iconBar}>
              <Image source={require('../../images/makaan.png')} style={styles.icon} />
          </HeaderSection>
          <HeaderSection style={styles.searchBar}>
              <TextInput
              editable={false}
              style={{flex:1}}
              placeholder="Gurgaon" 
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
            <TouchableOpacity onPress={() => navigate('Filter',{filter:filter,btnList:bedroomBtns,test:this.setFilter,filterCount:this.state.filterCount })}>
            <Text style={styles.filterText}>FILTER</Text>
            </TouchableOpacity>
            <Text style={styles.filterStatus}>{this.setFilterStatus()}</Text>
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
},
noResultText: {
    color: 'grey',
},
noResult: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20
}
});

const noResultsView = (
    <View style={styles.noResult}>
        <Text style={styles.noResultText}>
        Sorry, no results found !
        </Text>
    </View>
);
