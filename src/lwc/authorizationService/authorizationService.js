import signInApex from '@salesforce/apex/SC_AuthenticationService.authorization'
import createUser from '@salesforce/apex/SC_AuthenticationService.createContact';
import emailIsAvailable from '@salesforce/apex/SC_AuthenticationService.emailIsAvailable';

import {EventService} from "c/eventService";
import {ErrorService} from "c/errorService";

class AuthorizationService {
    static signIn(email, password, owner) {
        if (!(email && password && owner)) {
            console.error('Invalid email, password or owner(==null)');
            return null;
        }

        const user = {
            email: email,
            password: password
        }

        return signInApex({jsonData: JSON.stringify(user)})
            .then(result => {
                return result;
            })
            .catch(error => ErrorService.logError(error));
    }

    static signUp(user, owner) {
        if (!(user && owner)) {
            console.error('Invalid user');
            return null;
        }

        return createUser({jsonData: JSON.stringify(user)})
            .then(result => {
                return result;
            })
            .catch(error => ErrorService.logError(error));
    }

    static isAvailableEmail(email, owner) {
        if (!(email && owner)) {
            console.error('Invalid email or owner(==null)');
            return null;
        }

        return emailIsAvailable({contactEmail: email})
            .then(result => {
                return result;
            })
            .catch(error => ErrorService.logError(error));
    }
}

export {AuthorizationService}