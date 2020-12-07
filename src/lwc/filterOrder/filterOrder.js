import {api, track, LightningElement} from 'lwc';

export default class FilterOrder extends LightningElement {
    @api fieldsForOrder;

    @track fieldOptions = [];
    @track selectedFieldOption;

    @track upOrDown = [
        {label: 'Up', value: 'ASC'},
        {label: 'Down', value: 'DESC'}
    ];
    @track selectedDirection;

    connectedCallback() {
        if (!this.fieldsForOrder) {
            console.error('Can not order. Fields for order: %s', this.fieldsForOrder);
            return false;
        }

        const fields = this.fieldsForOrder.split(' ');
        console.log(fields);

        for (let i = 0; i < fields.length; i++) {
            const option = {label: fields[i], value: fields[i]}
            this.fieldOptions.push(option);
        }
    }
}