import {EventService} from "c/eventService";

export class helper {
    static showToastMessage(type, message, cmp) {
        EventService.showToastEvt('Order', message, type, cmp);
    }

    static parsingInput(event, cmp) {
        const name = event.target.name;
        const value = event.target.value;

        if (name === 'StartDateTime') cmp.startRentDate = value;
        if (name === 'EndDateTime') cmp.endRentDate = value;
    }

    static showSpinner(cmp) {
        EventService.spinnerEvt(true, cmp);
    }

    static hideSpinner(cmp) {
        EventService.spinnerEvt(false, cmp);
    }
}