import {LightningElement, api, track} from 'lwc';
import getPlacesApex from '@salesforce/apex/SC_ProductService.getProductsByFilters';
import {ErrorService} from "c/errorService";
import {Filters} from "c/filters";
import {DomService} from "c/domService";
import {EventService} from "c/eventService";
import {helper} from "./helper";

const FIELDS = ['Id', 'Name', 'Conveniences__c', 'Price__c', 'Restaurant__c'];
const PIXELS_TO_LOAD = 20;
const LOAD_LIMIT = 10;

export default class PlacesTable extends LightningElement {
    @api restaurantId;
    @track places = [];
    filtersHelper = new Filters();
    messageCmp

    isVisibleFilters = false;
    isLoadData = false;
    isEndOfData = false;
    isUpdateData = false;

    constructor() {
        super();
        EventService.addEventListner(this, EventService.EVENT_NAMES.filterElement, this.setFilter);
        this.setupFilters();
    }

    renderedCallback() {
        this.messageCmp = DomService.getElementByTag('c-message-card', this);
    }

    @api show(restaurantId) {
        if (!restaurantId) {
            console.error('Can not show places. Restaurant ID: %s', restaurantId);
            return false;
        }
        this.restaurantId = restaurantId;

        helper.refreshLoader(this);
        this.setupFilters();
        helper.loadData(this.filtersHelper.getFilters, FIELDS, this, true);
    }

    showHideMoreFilters(event) {
        const filtersCmp = DomService.getElementByTag('c-places-filters', this);

        if (this.isVisibleFilters) filtersCmp.hide();
        else filtersCmp.show();

        this.isVisibleFilters = !this.isVisibleFilters;
    }

    setFilter(event) {
        const filter = event.detail;
        this.filtersHelper.upsert(filter);

        if (filter.subtype === Filters.SUBTYPE.EXPRESSION) {
            helper.refreshLoader(this);
        }

        helper.loadData(this.filtersHelper.getFilters, FIELDS, this, true);
        event.preventDefault();
    }

    setupFilters() {
        const restaurantFilter = Filters.create('Restaurant_Id', Filters.TYPES.STRING_TYPE, 'Restaurant__c', this.restaurantId, Filters.OPERATORS.EQUAL,
            Filters.SUBTYPE.EXPRESSION);
        this.filtersHelper.upsert(restaurantFilter);
    }
}