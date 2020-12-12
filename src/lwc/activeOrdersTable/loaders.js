import getOrdersByFiltersApex from '@salesforce/apex/SC_OpportunityService.getOpportunitiesByFilters';
import {ErrorService} from "c/errorService";

const FIELDS_TO_RETRIEVE = [
    'Id', 'Name', 'Contact__c', 'End_Rent__c', 'Description', 'Price__c', 'Product__c', 'Start_Rent__c', 'StageName'
];

export class loaders {
    static loadActiveOrders(filters, cmp) {
        getOrdersByFiltersApex({JSONFilters: JSON.stringify(filters), fieldsToRetrieve: FIELDS_TO_RETRIEVE})
            .then(result => cmp.orderIsLoaded(result))
            .catch(error => ErrorService.logError(error, cmp));
    }
}