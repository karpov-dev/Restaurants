import getPlacesApex from '@salesforce/apex/SC_ProductService.getProductsByFilters';
import {DomService} from "c/domService";

const DATA_LOADING_MESSAGE = 'Loading data';
const DATA_LOADING_ICON = 'standard:loop';
const ALL_DATA_WAS_LOADED_MESSAGE = 'All data was loaded';
const ALL_DATA_WAS_LOADED_ICON = 'standard:task';
const DATA_NOT_FOUND = 'Data not found';
const DATA_NOT_FOUND_ICON = 'standard:first_non_empty';

export class helper {
    static lastRequest = null;

    static loadData(filters, fields, parent, enableQueue) {
        if (parent.isEndOfData) return null;
        if (parent.isLoadData && enableQueue) return this.saveLastRequest(filters, fields, parent);
        if (parent.isLoadData && !enableQueue) return null;

        parent.isLoadData = true;
        this.showTableMessage(DATA_LOADING_MESSAGE, DATA_LOADING_ICON, parent);

        getPlacesApex({JSONData: JSON.stringify(filters), fields: fields})
            .then(result => {
                if (result.length === 0) parent.isEndOfData = true;
                Array.prototype.push.apply(parent.places, result);

                parent.isLoadData = false;
                if (this.lastRequest) {
                    this.refreshLoader(parent);
                    this.loadData(this.lastRequest.filters, this.lastRequest.fields, this.lastRequest.parent, true);
                    this.lastRequest = null;
                } else {
                    if (result.length === 0) {
                        this.showTableMessage(DATA_NOT_FOUND, DATA_NOT_FOUND_ICON, parent);
                    } else {
                        this.showTableMessage(ALL_DATA_WAS_LOADED_MESSAGE, ALL_DATA_WAS_LOADED_ICON, parent);
                    }
                    console.info('Data was loaded. Places: %s', result);
                }
            });
    }

    static saveLastRequest(filters, fields, parent) {
        return this.lastRequest = {filters: filters, fields: fields, parent: parent};
    }

    static refreshLoader(parent) {
        parent.isEndOfData = false;
        parent.places = [];
    }

    static showTableMessage(message, icon, parent) {
        if (parent && parent.messageCmp) {
            parent.messageCmp.show(message, icon);
        }
    }
}