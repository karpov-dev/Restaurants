import {LightningElement, api} from 'lwc';
import {DomService} from "c/domService";

export default class ModalWindow extends LightningElement {
    @api show() {
        DomService.changeElementClass('modal', 'slds-show', this);
    }

    @api hide() {
        DomService.changeElementClass('modal', 'slds-hide', this);
    }
}