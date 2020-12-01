import {LightningElement, api} from 'lwc';
import {DomService} from "c/domService";

export default class Spinner extends LightningElement {
    @api showSpinner(spinnerState) {
        if(!spinnerState) DomService.changeElementClass('spinner', 'hide', this);
        else DomService.changeElementClass('spinner', 'show', this);
    }
}