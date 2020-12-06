import {LightningElement} from 'lwc';
import {CssVisibilityService} from "c/cssVisibilityService";
import {DomService} from "c/domService";

const SHOW_CLASS = 'show';
const HIDE_CLASS = 'hide';

export default class RestaurantsTableFilters extends LightningElement {
    cssVisibilityHelper;
    isVisibleMoreFilters = false;

    constructor() {
        super();
        this.cssVisibilityHelper = new CssVisibilityService(this, SHOW_CLASS, HIDE_CLASS);
    }

    showHideMoreFilters(event) {
        if (this.isVisibleMoreFilters) this.cssVisibilityHelper.hide('moreFilters');
        else this.cssVisibilityHelper.show('moreFilters');

        this.isVisibleMoreFilters = !this.isVisibleMoreFilters;
    }

    clearFilters(event) {
        const filterCmps = DomService.getAllElementsByTag('c-filter', this);
        if (!filterCmps) return false;

        for (let i = 0; i < filterCmps.length; i++) {
            filterCmps[i].clear();
        }
    }
}