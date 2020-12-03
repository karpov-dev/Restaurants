import getRestaurants from '@salesforce/apex/SC_RestaurantsService.getRestaurantsByFilters';
import getRestaurant from '@salesforce/apex/SC_RestaurantsService.getRestaurantById';
import {ErrorService} from "c/errorService";

class RestaurantsService {
    static getRestaurants(filters, fields, owner) {
        if (!(fields && owner)) {
            console.log('Fields or owner is empty');
            return null;
        }

        return getRestaurants({JSONData: JSON.stringify(filters), fields: fields})
            .then(result => owner.setRestaurants(result))
            .catch(error => ErrorService.logError(error));
    }

    static getRestaurantById(restaurantId, fields, owner) {
        if (!(fields && owner && restaurantId)) {
            console.log('Fields, owner or id is empty: ' + fields + ' ' + owner + ' ' + restaurantId);
            return null;
        }

        return getRestaurant({restaurantId: restaurantId, fields: fields})
            .then(result => owner.setRestaurant(result))
            .catch(error => ErrorService.logError(error));
    }

}

export {RestaurantsService}