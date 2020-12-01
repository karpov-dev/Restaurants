import {LightningElement, api} from 'lwc';
import {EventService} from "c/eventService";

export default class RestaurantCard extends LightningElement {
    @api restaurant;

    restaurantOnClick() {
        EventService.showOnMap(
            this.restaurant.Geolocation__Latitude__s,
            this.restaurant.Geolocation__Longitude__s,
            this.restaurant.Name,
            this.restaurant.Description__c,
            this
        );
    }

    showMoreInfo() {
        EventService.moreRestaurantInfoEvt(this.restaurant.Id, this);
    }
}