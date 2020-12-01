import {LightningElement, api} from 'lwc';
import {EventService} from "c/eventService";
import {DomService} from "c/domService";

export default class PageRestaurants extends LightningElement {
    @api userId;
    googleMap;

    constructor() {
        super();
        EventService.addEventListner(this, EventService.EVENT_NAMES.showOnMap, this.setGeolocation);
    }

    renderedCallback() {
        this.googleMap = DomService.getElementByTag('c-google-map', this);
        this.scrollDiv = DomService.getElementByDataId('scrollDiv', this);
    }

    setGeolocation(event) {
        const detail = event.detail;
        this.googleMap.setMarker(detail.latitude, detail.longitude, detail.title, detail.description);
    }

    get getUserId() {
        return this.userId;
    }
}