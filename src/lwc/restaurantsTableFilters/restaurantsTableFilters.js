import {LightningElement, api} from 'lwc';
import {CssVisibilityService} from "c/cssVisibilityService";
import {DomService} from "c/domService";

const SHOW_CLASS = 'show';
const HIDE_CLASS = 'hide';

export default class RestaurantsTableFilters extends LightningElement {
    cssVisibilityHelper;
    isVisibleMoreFilters = false;

    get getDirection() {
        return this.direction;
    }

    constructor() {
        super();
        this.cssVisibilityHelper = new CssVisibilityService(this, SHOW_CLASS, HIDE_CLASS);
    }

    showHideMoreFilters(event) {
        if (this.isVisibleMoreFilters) this.cssVisibilityHelper.hide('moreFilters');
        else this.cssVisibilityHelper.show('moreFilters');

        this.isVisibleMoreFilters = !this.isVisibleMoreFilters;
    }
}