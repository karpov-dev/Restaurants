import getRestaurants from '@salesforce/apex/SC_RestaurantsService.getRestaurantsByFilters';
import {ErrorService} from "c/errorService";

class RestaurantsService {
    static getRestaurants(filters, fields, owner) {
        return getRestaurants({JSONData: JSON.stringify(filters), fields: fields})
            .then(result => owner.setRestaurants(result))
            .catch(error => ErrorService.logError(error));
    }
}

export {RestaurantsService}