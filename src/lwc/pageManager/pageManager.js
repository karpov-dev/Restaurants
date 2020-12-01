import {LightningElement, api, track} from 'lwc';

import {DomService} from "c/domService";
import {EventService} from "c/eventService";

export default class PageManager extends LightningElement {
    @api changePage(pageName, pageManagerBody) {
        const divs = pageManagerBody.querySelectorAll('div');

        for (let i = 0; i < divs.length; i++) {
            if (divs[i].getAttribute('data-id') === pageName) {
                divs[i].className = 'slds-show';
            } else {
                divs[i].className = 'slds-hide';
            }
        }
    }
}