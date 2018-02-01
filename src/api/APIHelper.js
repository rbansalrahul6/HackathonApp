import {PAGE_SIZE} from '../utils/Constants';


export function getFilterJSON(filter) {
    var filterObj = {};
    //list of filter conditions to be anded
    var filterList = [];
    //add various filter conditions from filter object
    if(filter.type) {
        var typeFilter = {};
        typeFilter.equal = {listingCategory:filter.type};
        filterList.push(typeFilter);
    }
    if(filter.cityID) {
        var cityFilter = {};
        cityFilter.equal = {cityId:filter.cityID}
        filterList.push(cityFilter);
    }
    if(filter.rooms) {
        var roomFilter = {};
        roomFilter.equal = {bedrooms:filter.rooms}
        filterList.push(roomFilter);
    }
    if(filter.minBudget!==null && filter.maxBudget!==null) {
        var budgetFilter = {};
        budgetFilter.range = {price:{
            from:filter.minBudget,
            to:filter.maxBudget
        }};
        filterList.push(budgetFilter);
    }

    filterObj.and = filterList;
    return filterObj;
}

function setPaging(start) {
    var paging = {};
    paging.start = start;
    paging.rows = PAGE_SIZE;
    return paging;
}

export function getSelector(fieldList,filter,pageStart) {
    var selector = {};
    selector.fields = fieldList;
    selector.filters = getFilterJSON(filter);
    selector.paging = setPaging(pageStart);
    return selector;
}

export function buildURL(base_url,query) {
    var queryParams = Object.entries(query);
    var url = `${base_url}?${queryParams.map((item, i) => 
    `${item[0]}=${JSON.stringify(item[1])}`
  ).join('&')}&sourceDomain=Makaan`;
return url;
}


