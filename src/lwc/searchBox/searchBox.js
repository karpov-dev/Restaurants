import {api, LightningElement} from 'lwc';
import {Filters} from "c/filters";
import {EventService} from "c/eventService";

export default class SearchBox extends LightningElement {
    @api name;
    @api type;
    @api field;
    @api operator;
    @api value;

    fireFilter(event) {
        if (!(this.type && this.field && this.operator)) {
            console.error('Can not fire filter. Type: %s, Field: %s, Operator: %s', this.type, this.field, this.operator);
            return false;
        }

        this.value = event.target.value;
        const filter = Filters.create(this.type, this.field, this.value, this.operator, Filters.SUBTYPE.EXPRESSION);
        EventService.filterElement(filter, this);
    }
}