import {LightningElement, api, track} from 'lwc';
import {Filters} from "c/filters";
import {EventService} from "c/eventService";
import {Utility} from "c/utility";

const DEFAULT_OPERATOR = Filters.OPERATORS.NONE;

export default class Filter extends LightningElement {
    @api filterName;
    @api name;
    @api type;
    @api field;
    @api value;
    @api variant;
    operator;

    @track options = []
    @track selectedOption = DEFAULT_OPERATOR;

    connectedCallback() {
        Filters.getAvailableOperators(this.type).then(result => {this.options = this.listToOptions(result)});
    }

    valueHandler(event) {
        this.parsingInput(event);
        this.fireFilter();
    }

    fireFilter() {
        const filter = Filters.create(this.filterName, this.type, this.field, this.value, this.operator, Filters.SUBTYPE.EXPRESSION);
        EventService.filterElement(filter, this);
    }

    listToOptions(stringList) {
        if (!stringList) {
            console.error('Can not create options from list. List: %s', stringList);
            return null;
        }

        return Utility.toOptions(stringList);
    }

    parsingInput(event) {
        const name = event.target.name;
        const value = event.target.value;

        if (name === 'operatorInput') this.operator = value;
        if (name === 'valueInput') this.value = value;
    }
}