import {LightningElement, api, track} from 'lwc';
import {RestaurantsService} from "c/restaurantsService";
import {DomService} from "c/domService";

const fields = [
    'Id', 'Name', 'Address__c', 'Description__c',
    'Phone__c', 'Views__c', 'Geolocation__Latitude__s',
    'Geolocation__Longitude__s'
];

export default class RestaurantsTable extends LightningElement {
    @api filters;
    @track restaurants = [];
    scrollDiv;

    constructor() {
        super();
        RestaurantsService.getRestaurants(null, fields, this);
    }

    renderedCallback() {
        this.scrollDiv = DomService.getElementByDataId('scrollDiv', this);
    }

    setRestaurants(result) {
        this.restaurants = result;
    }

    tableOnScroll(event) {
        const PIXELS_TO_START_DATA_LOAD = 5;
        const div = this.scrollDiv;

        if ((div.scrollHeight - div.clientHeight) - PIXELS_TO_START_DATA_LOAD >= div.scrollTop) {
            setTimeout(() => {
                //alert('DATA LOAD')
            }, 500);
        }

        console.log(div.scrollHeight);
        console.log(div.clientHeight);
        console.log(div.scrollTop);
    }
}