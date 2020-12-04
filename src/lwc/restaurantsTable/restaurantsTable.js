import {LightningElement, api, track} from 'lwc';
import {RestaurantsService} from "c/restaurantsService";
import {EventService} from "c/eventService";
import {FiltersService} from "c/filtersService";

const fields = [
    'Id', 'Name', 'Address__c', 'Description__c',
    'Phone__c', 'Views__c', 'Geolocation__Latitude__s',
    'Geolocation__Longitude__s'
];

export default class RestaurantsTable extends LightningElement {
    @api filters = [];
    @track restaurants = [];
    loadData = false;

    constructor() {
        super();
        RestaurantsService.getRestaurants(null, fields, this);
        EventService.addEventListner(window, 'scroll', this.documentOnscroll);
    }

    setRestaurants(result) {
        this.restaurants = result;
    }

    documentOnscroll(event) {
        const PIXELS_TO_LOAD_RECORDS = 50;
        const docElement = document.documentElement;

        if (docElement.scrollHeight - docElement.clientHeight <= docElement.scrollTop + PIXELS_TO_LOAD_RECORDS) {
            if (!this.loadData) {
                this.loadData = true;
                setTimeout(() => {
                    const offsetFilter = FiltersService.createFilter('string_type', 'OFFSET', '10', '');
                    console.log(offsetFilter);
                    this.loadData = false;
                }, 1000);
            }
        }
    }
}