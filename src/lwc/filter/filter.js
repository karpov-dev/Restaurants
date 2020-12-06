import {LightningElement, api, track} from 'lwc';
import {Filters} from "c/filters";
import {EventService} from "c/eventService";

export default class Filter extends LightningElement {
    @api name;
    @api type;
    @api field;
    @api value;
    @api variant;
    operator;

    @track options = []
    @track selectedOption;

    connectedCallback() {
        Filters.getAvailableOperators(this.type)
            .then(result => {
                this.options = this.listToOptions(result)
            });
    }

    @api clear() {
        this.value = null;
        this.operator = null;
        this.selectedOption = null;

        this.fireFilter();
    }

    valueHandler(event) {
        this.parsingInput(event);
        if (!(this.type && this.field && this.operator)) return false;

        this.fireFilter();
    }

    fireFilter() {
        const filter = Filters.create(this.type, this.field, this.value, this.operator, Filters.SUBTYPE.EXPRESSION);
        EventService.filterElement(filter, this);
    }

    listToOptions(stringList) {
        if (!stringList) {
            console.error('Can not create options from list. List: %s', stringList);
        }

        const options = []
        for (let i = 0; i < stringList.length; i++) {
            options.push({label: stringList[i], value: stringList[i]});
        }

        return options;
    }

    parsingInput(event) {
        const name = event.target.name;
        const value = event.target.value;

        if (name === 'operatorInput') this.operator = value;
        if (name === 'valueInput') this.value = value;
    }
}