import {LightningElement, track} from 'lwc';

import {EventService} from "c/eventService";
import {Filters} from "c/filters";
import {DomService} from "c/domService";
import {helper} from "./helper";

const FIELDS_TO_LOAD = ['Id', 'Name', 'Address__c', 'Description__c', 'Phone__c', 'Views__c', 'Geolocation__Latitude__s', 'Geolocation__Longitude__s'];
const PIXELS_TO_LOAD_RECORDS = 100;
const LOAD_LIMIT = 9;

export default class RestaurantsTable extends LightningElement {
    @track restaurants = [];
    filtersHelper = new Filters();
    messageCmp;

    isLoadData = false;
    isEndOfData = false;
    isUpdateData = false;
    loadOffset = 0;

    constructor() {
        super();
        EventService.addEventListner(window, 'scroll', this.documentOnscroll(this, FIELDS_TO_LOAD));
        EventService.addEventListner(this, EventService.EVENT_NAMES.filterElement, this.setFilter)

        const limitFilter = Filters.createSpecifyFilter(Filters.OPERATORS.LIMIT, LOAD_LIMIT);
        const offsetFilter = Filters.createSpecifyFilter(Filters.OPERATORS.OFFSET, this.loadOffset);
        this.filtersHelper.insert(limitFilter);
        this.filtersHelper.insert(offsetFilter);

        helper.loadData(this.filtersHelper.getFilters, FIELDS_TO_LOAD, this);
    }

    renderedCallback() {
        this.messageCmp = DomService.getElementByTag('c-message-card', this);
    }

    documentOnscroll = (parent, fields) => (event) => {
        const docElement = document.documentElement;

        if (docElement.scrollHeight - docElement.clientHeight <= docElement.scrollTop + PIXELS_TO_LOAD_RECORDS) {
            helper.loadData(parent.filtersHelper.getFilters, fields, parent, false);
        }
    }

    setFilter(event) {
        const filter = event.detail;
        this.filtersHelper.upsert(filter);

        if (filter.subtype === Filters.SUBTYPE.EXPRESSION) {
            helper.refreshLoader(this);
        }

        helper.loadData(this.filtersHelper.getFilters, FIELDS_TO_LOAD, this, true);
    }
}