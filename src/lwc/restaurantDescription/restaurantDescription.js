import {LightningElement, api} from 'lwc';

import {RestaurantsService} from "c/restaurantsService";
import {DomService} from "c/domService";
import {CssVisibilityService} from "c/cssVisibilityService";

const FIELDS = [
    'Id', 'Name', 'Address__c', 'Description__c',
    'Phone__c', 'Views__c', 'Geolocation__Latitude__s',
    'Geolocation__Longitude__s'
];
const SHOW_CLASS = 'show-scale';
const HIDE_CLASS = 'hide';

export default class RestaurantDescription extends LightningElement {
    @api restaurantId;
    restaurant = {};
    cssVisibilityHelper;

    constructor() {
        super();
        this.cssVisibilityHelper = new CssVisibilityService(this, SHOW_CLASS, HIDE_CLASS);
    }

    @api setRestaurantId(newId) {
        if (!newId) {
            console.log('Can not set restaurant Id = ' + newId);
            return false;
        }

        this.restaurantId = newId;
        RestaurantsService.getRestaurantById(this.restaurantId, FIELDS, this);

        const placesTable = DomService.getElementByTag('c-places-table', this);
        placesTable.show(this.restaurantId);
    }

    @api show() {
        this.cssVisibilityHelper.show('visibility');
        const gallery = DomService.getElementByTag('c-gallery', this);
        gallery.show(this.restaurantId);
    }

    @api hide() {
        this.cssVisibilityHelper.hide('visibility');
        const gallery = DomService.getElementByTag('c-gallery', this);
        gallery.hide();
    }

    setRestaurant(result) {
        this.restaurant = result;
    }

    get getRestaurantId() {
        return this.restaurantId;
    }
}
