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
        getProductInfoApex({productId: productId, fieldsToRetrieve: FIELDS_FOR_PRODUCT})
            .then(result => {
                cmp.product = result;
                this.loadRestaurant(result.Restaurant__c, cmp);
            })
            .catch(error => ErrorService.logError(error));
    }

    static loadUser(userId, cmp) {
        getUserInfoApex({userId: userId, fieldsToRetrieve: FIELDS_FOR_USER})
            .then(result => {
                cmp.user = result
            })
            .catch(error => ErrorService.logError(error));
    }

    static loadRestaurant(restaurantId, cmp) {
        getRestaurantApex({restaurantId: restaurantId, fields: FIELDS_FOR_RESTAURANT})
            .then(result => {
                cmp.restaurant = result;
            })
            .catch(error => ErrorService.logError(error));
    }

    static loadAvailability(productId, cmp) {
        dateTimeIsAvailableApex({productId: cmp.product.Id ,startDateTime: cmp.startRentDate, endDateTime: cmp.endRentDate })
            .then(result => {
                if (result) cmp.productIsAvailable();
                else cmp.productIsNotAvailable();
            })
            .catch(error => ErrorService.logError(error));
    }

    static createOrderOnServer(order, cmp) {
        createOrderApex({opportunity: order})
            .then(result => {
                cmp.productWasCreated(result);
            })
            .catch(error => ErrorService.logError(error));
    }
}