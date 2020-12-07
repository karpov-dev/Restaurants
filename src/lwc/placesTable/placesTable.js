import {LightningElement, api} from 'lwc';
import getPlacesApex from '@salesforce/apex/SC_ProductService.getProductsByFilters';
import {ErrorService} from "c/errorService";
import {Filters} from "c/filters";
import {DomService} from "c/domService";
import {EventService} from "c/eventService";

const FIELDS = ['Id', 'Name', 'Conveniences__c', 'Price__c', 'Restaurant__c'];

export default class PlacesTable extends LightningElement {
    @api restaurantId;
    places = [];
    filtersHelper = new Filters();
    isVisibleFilters = false;

    constructor() {
        super();
        EventService.addEventListner(this, EventService.EVENT_NAMES.filterElement, this.setFilter);
    }

    @api show(restaurantId) {
        if (!restaurantId) {
            console.error('Can not show places. Restaurant ID: %s', restaurantId);
            return false;
        }
        this.restaurantId = restaurantId;

        this.filtersSetup()
        this.loadData();
    }

    loadData() {
        getPlacesApex({JSONData: JSON.stringify(this.filtersHelper.getFilters), fields: FIELDS})
            .then(result => {this.places = this.parsingConveniences(result);})
            .catch(error => ErrorService.logError(error));
    }

    filtersSetup() {
        const restaurantFilter = Filters.create(Filters.TYPES.STRING_TYPE, 'Restaurant__c', this.restaurantId, Filters.OPERATORS.EQUAL, Filters.SUBTYPE.EXPRESSION);
        this.filtersHelper.upsert(restaurantFilter);
    }

    showHideMoreFilters(event) {
        const filtersCmp = DomService.getElementByTag('c-places-filters', this);

        if (this.isVisibleFilters) filtersCmp.hide();
        else filtersCmp.show();

        this.isVisibleFilters = !this.isVisibleFilters;
    }

    parsingConveniences(places) {
        if (!places) {
            console.error('Can not parsing Conveniences. Places %s', places);
            return null;
        }

        for (let i = 0; i < places.length; i++) {
            if (!places[i].Conveniences__c) {
                places[i].Conveniences__c = 'Standard';
            }
            places[i].Conveniences__c = places[i].Conveniences__c.split(';');
        }

        return places;
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