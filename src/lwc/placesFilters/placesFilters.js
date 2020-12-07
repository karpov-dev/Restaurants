import {LightningElement, api} from 'lwc';
import {CssVisibilityService} from "c/cssVisibilityService";
import {DomService} from "c/domService";

const SHOW_CLASS = 'show';
const HIDE_CLASS = 'hide';

export default class PlacesFilters extends LightningElement {
    cssVisibilityHelper;

    constructor() {
        super();
        this.cssVisibilityHelper = new CssVisibilityService(this, SHOW_CLASS, HIDE_CLASS);
    }

    @api show() {
        this.cssVisibilityHelper.show('filters');
    }

    @api hide() {
        this.cssVisibilityHelper.hide('filters');
    }

    clearFilters(event) {
        const filterCmps = DomService.getAllElementsByTag('c-filter', this);
        if (!filterCmps) return false;

        for (let i = 0; i < filterCmps.length; i++) {
            filterCmps[i].clear();
        }
    }
}