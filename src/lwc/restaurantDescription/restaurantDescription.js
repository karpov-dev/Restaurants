import {LightningElement, api} from 'lwc';
import {helper} from "./helper";
import {RestaurantsService} from "c/restaurantsService";

const fields = [
    'Id', 'Name', 'Address__c', 'Description__c',
    'Phone__c', 'Views__c', 'Geolocation__Latitude__s',
    'Geolocation__Longitude__s'
];

export default class RestaurantDescription extends LightningElement {
    @api restaurantId;
    restaurant = {};

    constructor() {
        super();
        helper.parent = this;
    }

    @api
    setRestaurantId(newId) {
        if (!newId) {
            console.log('Can not set restaurant Id = ' + newId);
            return false;
        }

        this.restaurantId = newId;
    }

    @api
    show() {
        helper.changeVisibility(true);
        if (this.restaurantId)
        RestaurantsService.getRestaurantById(this.restaurantId, fields, this);
    }

    @api
    hide() {
        helper.changeVisibility(false);
    }

    setRestaurant(result) {
        this.restaurant = result;
    }
}
