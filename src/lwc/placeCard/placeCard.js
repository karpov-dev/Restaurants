import {LightningElement, api} from 'lwc';
import {EventService} from "c/eventService";

export default class PlaceCard extends LightningElement {
    @api place;

    fireRentPlaceEvent(event) {
        EventService.rentPlaceEvt(this.place.Id, this);
    }
}