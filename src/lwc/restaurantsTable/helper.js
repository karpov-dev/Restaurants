import {RestaurantsService} from "c/restaurantsService";

const DATA_LOADING_MESSAGE = 'Loading data';
const DATA_LOADING_ICON = 'standard:loop';
const ALL_DATA_WAS_LOADED_MESSAGE = 'All data was loaded';
const ALL_DATA_WAS_LOADED_ICON = 'standard:task';

export class helper {
    static lastRequest = null;

    static loadData(filters, fields, parent, enableQueue) {
        if (parent.isEndOfData) return null;
        if (parent.isLoadData && enableQueue) return this.saveLastRequest(filters, fields, parent);
        if (parent.isLoadData && !enableQueue) return null;

        parent.isLoadData = true;
        this.showTableMessage(DATA_LOADING_MESSAGE, DATA_LOADING_ICON, parent);

        RestaurantsService.getRestaurants(filters, fields)
            .then(result => {
                if (result.length === 0) parent.isEndOfData = true;

                Array.prototype.push.apply(parent.restaurants, result);
                parent.loadOffset += result.length;
                parent.filtersHelper.updateValueByName('OFFSET', parent.loadOffset);

                parent.isLoadData = false;
                if (this.lastRequest) {
                    this.refreshLoader(parent);
                    this.loadData(this.lastRequest.filters, this.lastRequest.fields, this.lastRequest.parent, true);
                    this.lastRequest = null;
                } else {
                    this.showTableMessage(ALL_DATA_WAS_LOADED_MESSAGE, ALL_DATA_WAS_LOADED_ICON, parent);
                    console.info('Data was loaded. Restaurants: %s, offset: %s', result, parent.loadOffset);
                }
            });
    }

    static showTableMessage(message, icon, parent) {
        if (parent.messageCmp) {
            parent.messageCmp.show(message, icon);
        }
    }

    static refreshLoader(parent) {
        parent.filtersHelper.updateValueByName('OFFSET', 0);
        parent.isEndOfData = false;
        parent.restaurants = [];
        parent.loadOffset = 0;
    }

    static saveLastRequest(filters, fields, parent) {
        return this.lastRequest = {filters: filters, fields: fields, parent: parent};
    }
}