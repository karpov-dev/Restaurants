import signInApex from '@salesforce/apex/SC_AuthenticationService.authorization'
import createUser from '@salesforce/apex/SC_AuthenticationService.createContact';
import emailIsAvailable from '@salesforce/apex/SC_AuthenticationService.emailIsAvailable';

import {EventService} from "c/eventService";

class AuthorizationService {
    static signIn(email, password, owner) {
        if (!email || !password || !owner) {
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
            .catch(error => this.sendServerErrorEvt(error, owner));
    }

    static signUp(user, owner) {
        if (!user) {
            console.error('Invalid user');
            return null;
        }

        return createUser({jsonData: JSON.stringify(user)})
            .then(result => {
                return result;
            })
            .catch(error => this.sendServerErrorEvt(error, owner));
    }

    static isAvailableEmail(email, owner) {
        if (!email || !owner) {
            console.error('Invalid email or owner(==null)');
            return null;
        }

        return emailIsAvailable({contactEmail: email})
            .then(result => {
                return result;
            })
            .catch(error => this.sendServerErrorEvt(error, owner));
    }

    static sendServerErrorEvt(error, owner) {
        console.log(error);
        EventService.serverErrorEvt(owner)
    }
}

export {AuthorizationService}