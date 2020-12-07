import {LightningElement, api} from 'lwc';

export default class PlaceCard extends LightningElement {
    @api place = [];

    constructor() {
        super();
        this.place = [];
    }
}