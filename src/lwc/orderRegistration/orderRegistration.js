import {LightningElement, api, track} from 'lwc';

import getProductInfoApex from '@salesforce/apex/SC_ProductService.getProductById';
import getUserInfoApex from '@salesforce/apex/SC_UserService.getUserById'
import getRestaurantApex from '@salesforce/apex/SC_RestaurantsService.getRestaurantById';

import {ErrorService} from "c/errorService";

const FIELDS_FOR_USER = ['Id', 'FirstName', 'LastName', 'Email', 'Username__c', 'Phone'];
const FIELDS_FOR_PRODUCT = ['Id', 'Name', 'Price__c', 'Restaurant__c'];
const FIELDS_FOR_RESTAURANT = ['Id', 'Name', 'Address__c', 'Phone__c'];


export default class OrderRegistration extends LightningElement {
    @api
    get userId() {return this.user.Id;}
    set userId(value) {this.loadUser(value);}

    @api
    get productId() {return this.product.Id;}
    set productId(value) {this.loadProduct(value)}

    @track user = {Id:'', FirstName:'', LastName:'', Email:'', Username__c:'', Phone:''};
    @track product = {Id:'', Name:'', Conveniences__c:'', Price__c:'', Restaurant__c:''};
    @track restaurant = {Id:'', Name:'', Address__c:'', Phone__c:''}

    loadProduct(productId) {
        getProductInfoApex({productId: productId, fieldsToRetrieve: FIELDS_FOR_PRODUCT})
            .then(result => {
                this.product = result;
                this.loadRestaurant(result.Restaurant__c);
            })
            .catch(error => ErrorService.logError(error));
    }

    loadUser(userId) {
        getUserInfoApex({userId: userId, fieldsToRetrieve: FIELDS_FOR_USER})
            .then(result => {
                this.user = result
            })
            .catch(error => ErrorService.logError(error));
    }

    loadRestaurant(restaurantId) {
        getRestaurantApex({restaurantId: restaurantId, fields: FIELDS_FOR_RESTAURANT})
            .then(result => {
                console.log(result);
                this.restaurant = result;
            })
            .catch(error => ErrorService.logError(error));
    }
}