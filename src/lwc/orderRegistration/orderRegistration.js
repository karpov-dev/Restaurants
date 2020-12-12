import {LightningElement, api, track} from 'lwc';

import {ErrorService} from "c/errorService";
import {Utility} from "c/utility";
import {ValidationService} from "c/validationService";
import {EventService} from "c/eventService";

import {helper} from "./helper";
import {loaders} from "./loaders";

export default class OrderRegistration extends LightningElement {
    @track user = {Id:'', FirstName:'', LastName:'', Email:'', Username__c:'', Phone:''};
    @track product = {Id:'', Name:'', Conveniences__c:'', Price__c:'', Restaurant__c:''};
    @track restaurant = {Id:'', Name:'', Address__c:'', Phone__c:''}

    @track startRentDate;
    @track endRentDate;
    nextButtonIsDisabled = true;

    @api
    get userId() {return this.user.Id;}
    set userId(value) {
        if (value) loaders.loadUser(value, this);
    }

    @api
    get productId() {return this.product.Id;}
    set productId(value) {
        if (value) loaders.loadProduct(value, this);
    }

    dateTimeInputHandler(event) {
        helper.parsingInput(event, this);
        this.nextButtonIsDisabled = !this.dateValidation();
    }

    registrationOrder(event) {
        EventService.spinnerEvt(true, this);
        loaders.loadAvailability(this.product.Id, this);
    }

    productIsLoaded(loadedProduct) {
        this.product = loadedProduct;
        loaders.loadRestaurant(loadedProduct.Restaurant__c, this);
    }

    userIsLoaded(loadedUser) {
        this.user = loadedUser;
    }

    restaurantIsLoaded(loadedRestaurant) {
        this.restaurant = loadedRestaurant;
    }

    availabilityIsLoaded(isAvailableDateTime) {
        if (isAvailableDateTime) this.createOrder();
        else helper.showToastMessage('warning', 'The place is already booked for this period of time', this);
    }

    orderIsCreated(createdOrder) {
        helper.showToastMessage('success', 'Success. Order Was Created!', this);
        EventService.orderWasCreatedEvt(createdOrder.Id, this);
    }

    dateValidation() {
        if (!this.startRentDate || !this.endRentDate) return false;

        const startDateMs = Utility.toNumberMsDate(this.startRentDate);
        const endDateMs = Utility.toNumberMsDate(this.endRentDate);
        const todayMs = Utility.toNumberMsDate(new Date());
        const msInDay = 86400000;

        const isEndLessOrEqualStart = ValidationService.oneMoreOrEqualThenTwo(startDateMs, endDateMs);
        const isStartLessOrEqualToday = ValidationService.oneMoreOrEqualThenTwo(todayMs, startDateMs);
        const isEndLessOrEqualToday = ValidationService.oneMoreOrEqualThenTwo(todayMs, endDateMs);
        const moreThanDay = (endDateMs - startDateMs) > msInDay;

        if (isEndLessOrEqualStart) helper.showToastMessage('error', 'End Date less or equal start Date', this);
        if (isStartLessOrEqualToday) helper.showToastMessage('error', 'Start date less or equal now', this);
        if (isEndLessOrEqualToday) helper.showToastMessage('error', 'End date less or equal now', this);
        if (moreThanDay) helper.showToastMessage('error', 'Maximum period is one day', this);

        return !isEndLessOrEqualStart && !isStartLessOrEqualToday && !isEndLessOrEqualToday && !moreThanDay
    }

    createOrder() {
        const orderName = this.restaurant.Name + '. Table: ' + this.product.Name + '. ';

        const order = {
            Name: orderName,
            Description: 'Rent By Site',
            Start_Rent__c: this.startRentDate,
            End_Rent__c: this.endRentDate,
            CloseDate: this.endRentDate,
            Price__c: this.product.Price__c,
            Product__c: this.product.Id,
            Restaurant__c: this.restaurant.Id,
            Contact__c: this.user.Id,
            StageName: 'Open Rent'
        }

        loaders.createOrderOnServer(order, this);
    }
}