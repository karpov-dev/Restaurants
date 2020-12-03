import {LightningElement, api} from 'lwc';
import {EventService} from "c/eventService";
import {helper} from "./helper";

export default class PageRestaurants extends LightningElement {
    @api userId;
    @api currentRestaurant;
    restaurantDescriptionDiv;

    constructor() {
        super();
        helper.parent = this;
        EventService.addEventListner(this, EventService.EVENT_NAMES.showOnMap, this.showOnMapHandler);
        EventService.addEventListner(this, EventService.EVENT_NAMES.moreRestaurant, this.moreRestaurantHandler);
    }

    showOnMapHandler(event) {
        helper.setGoogleMapMarker(event.detail);
    }

    moreRestaurantHandler(event) {
        helper.setMainRestaurantId(event.detail);
        helper.changeDescriptionVisibility(event.detail);
    }

    get getUserId() {
        return this.userId;
    }
}