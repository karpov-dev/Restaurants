import {ErrorService} from "c/errorService";

import getProductInfoApex from '@salesforce/apex/SC_ProductService.getProductById';
import getUserInfoApex from '@salesforce/apex/SC_UserService.getUserById';
import getRestaurantApex from '@salesforce/apex/SC_RestaurantsService.getRestaurantById';
import dateTimeIsAvailableApex from '@salesforce/apex/SC_ProductService.timeToRentIsAvailable';
import createOrderApex from '@salesforce/apex/SC_OpportunityService.createOrder';
import {helper} from "./helper";
import {EventService} from "c/eventService";

const FIELDS_FOR_USER = ['Id', 'FirstName', 'LastName', 'Email', 'Username__c', 'Phone'];
const FIELDS_FOR_PRODUCT = ['Id', 'Name', 'Price__c', 'Restaurant__c'];
const FIELDS_FOR_RESTAURANT = ['Id', 'Name', 'Address__c', 'Phone__c'];

export class loaders {
    static loadProduct(productId, cmp) {
        helper.showSpinner(cmp);
        getProductInfoApex({productId: productId, fieldsToRetrieve: FIELDS_FOR_PRODUCT})
            .then(result => cmp.productIsLoaded(result))
            .catch(error => ErrorService.logError(error))
            .finally(() => helper.hideSpinner(cmp));
    }

    static loadUser(userId, cmp) {
        helper.showSpinner(cmp);
        getUserInfoApex({"userId": userId, "fieldsToRetrieve": FIELDS_FOR_USER})
            .then(result => cmp.userIsLoaded(result))
            .catch(error => ErrorService.logError(error))
            .finally(() => helper.hideSpinner(cmp));
    }

    static loadRestaurant(restaurantId, cmp) {
        helper.showSpinner(cmp);
        getRestaurantApex({restaurantId: restaurantId, fields: FIELDS_FOR_RESTAURANT})
            .then(result => cmp.restaurantIsLoaded(result))
            .catch(error => ErrorService.logError(error))
            .finally(() => helper.hideSpinner(cmp));
    }

    static loadAvailability(productId, cmp) {
        helper.showSpinner(cmp);
        dateTimeIsAvailableApex({productId: cmp.product.Id ,startDateTime: cmp.startRentDate, endDateTime: cmp.endRentDate })
            .then(result => cmp.availabilityIsLoaded(result))
            .catch(error => ErrorService.logError(error))
            .finally(() => helper.hideSpinner(cmp));
    }

    static createOrderOnServer(order, cmp) {
        helper.showSpinner(cmp);
        createOrderApex({opportunity: order})
            .then(result => cmp.orderIsCreated(result))
            .catch(error => ErrorService.logError(error))
            .finally(() => helper.hideSpinner(cmp));
    }
}