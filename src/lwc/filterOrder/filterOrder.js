import {api, track, LightningElement} from 'lwc';

import {Filters} from "c/filters";
import {EventService} from "c/eventService";
import {Utility} from "c/utility";

const DEFAULT_DIRECTION = Filters.ADDITIONAL_OPERATOR.ASC;

export default class FilterOrder extends LightningElement {
    @api fieldsForOrder;
    @api setupDirection;

    direction;
    field;
    @track fieldOptions = [];
    @track selectedFieldOption = {label: '', value: ''};

    @track upOrDown = [
        {label: 'Up', value: Filters.ADDITIONAL_OPERATOR.ASC},
        {label: 'Down', value: Filters.ADDITIONAL_OPERATOR.DESC}
    ];
    @track selectedDirection = {label: '', value: ''};

    connectedCallback() {
        if (!this.fieldsForOrder) {
            console.error('Can not display order filters. Fields for order: %s', this.fieldsForOrder);
            return null;
        }

        this.fieldOptions = Utility.toOptions(this.fieldsForOrder.split(' '));
        this.setupFilters();
    }

    valueHandler(event) {
        this.parsingInput(event);

        if (!this.field) return false;

        this.fireFilter();
    }

    fireFilter() {
        const filter = Filters.createSpecifyFilter(Filters.OPERATORS.ORDER_BY, this.field, this.direction);
        EventService.filterElement(filter, this);
    }

    parsingInput(event) {
        const name = event.target.name;
        const value = event.target.value;

        if (name === 'orderFieldInput') this.field = value;
        if (name === 'orderDirection') this.direction = value;
    }

    setupFilters() {
        this.selectedFieldOption = this.fieldOptions[0].label;
        this.field = this.fieldOptions[0].value;

        this.selectedDirection = DEFAULT_DIRECTION;
        this.direction = DEFAULT_DIRECTION;
    }
}