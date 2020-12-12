import {EventService} from "c/eventService";

class ErrorService {
    static logError(error, cmp) {
        if (!error) {
            console.error('Empty error');
        } else {
            console.error(error);
        }

        if (cmp) {
            EventService.serverErrorEvt(cmp);
        }
    }
}

export {ErrorService}