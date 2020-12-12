import getUserApex from "@salesforce/apex/SC_UserService.getUserById";
import {ErrorService} from "c/errorService";

const FIELDS_FOR_USER = ['Id', 'FirstName', 'LastName', 'Email', 'Username__c', 'Phone'];

export class loaders {
    static loadUser(userId, cmp) {
        getUserApex({userId:userId, fieldsToRetrieve: FIELDS_FOR_USER})
            .then(result => {cmp.userIsLoaded(result)})
            .catch(error => ErrorService.logError(error));
    }
}