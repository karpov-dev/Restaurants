import getAvailableOperatorsApex from '@salesforce/apex/QS_SearchService.getAvailableOperators';
import {ErrorService} from "c/errorService";

class Filters {
    filters = [];

    getByName(name) {
        if (!name) return null;

        for (let i = 0; i < this.filters.length; i++) {
            if (this.filters[i].name === name) {
                return this.filters[i];
            }
        }

        return null;
    }

    insert(filter) {
        if (!(filter && filter.name)) {
            console.error('Can not push filter. Filter = %s. Name = %s', filter, filter.name);
            return null;
        }

        if (this.getByName(filter.name)) {
            console.error('Can not insert filter. Found equal name = %s', filter.name);
            return null;
        }

        this.filters.push(filter);

        return filter;
    }

    upsert(filter) {
        if (!(filter && filter.name)) {
            console.error('Can not upsert filter. Filter = %s, Filter.Name = %s', filter, filter.name);
            return null;
        }

        const filterToUpdate = this.getByName(filter.name);
        const filterToUpdateByPreviousName = this.getByName(filter.previousName);

        if (filterToUpdate || filterToUpdateByPreviousName) {
            filterToUpdate.field = filter.field;
            filterToUpdate.value = filter.value;
            filterToUpdate.operator = filter.operator;
            filterToUpdate.additionalOperator = filter.additionalOperator;
            return filterToUpdate;
        }

        this.insert(filter);
        return null;
    }

    updateValueByName(name, newValue) {
        if (!name) {
            console.error('Can not update filter. Name: %s', name);
            return null;
        }

        const filterToUpdate = this.getByName(name);
        if (filterToUpdate) {
            return filterToUpdate.value = newValue;
        } else {
            console.error('Filter to update value was not found');
            return null;
        }
    }

    insertList(filters) {
        if (!filters) {
            console.error('Can not insert list of filters: %s', filters);
            return null;
        }

        for (let i = 0; i < this.filters.length; i++) {
            this.insert(filters[i]);
        }
    }

    remove(filter) {
        if (!filter) {
            console.error('Can not remove filter. Filter = %s', filter);
            return null;
        }

        return this.removeByIndex(this.filters.indexOf(filter))[0];
    }

    removeByIndex(index) {
        if (!index) {
            console.error('Can not remove filter by index = %s', index);
            return null;
        }

        return this.filters.splice(index, 1)[0];
    }

    removeByName(name) {
        if (!name) {
            console.error('Can not remove filter by name. Name = %s', name);
            return null;
        }

        for (let i = 0; i < this.filters.length; i++) {
            if (this.filters[i].name === name) {
                return this.removeByIndex(i);
            }
        }

        return null;
    }

    clearAll() {
        this.filters = [];
    }

    get getFilters() {
        if (this.filters.length === 0) return null;
        else return this.filters;
    }

    static create(name, type, field, value, operator, subtype, additionalOperator=null) {
        return {
            name: name,
            subtype: subtype,
            type: type,
            field: field,
            value: value,
            operator: operator,
            additionalOperator: additionalOperator
        };
    }

    static createSpecifyFilter(operator, value, additionalOperator=null) {
        if (!(operator)) {
            console.error('Can not create specify. Operator = %s, Value = %s', operator, value);
            return null;
        }

        let subtype;
        if (additionalOperator) subtype = this.SUBTYPE.EXPRESSION;
        else subtype = this.SUBTYPE.SPECIAL;

        return {
            name: operator,
            subtype: subtype,
            type: null,
            field: null,
            value: value,
            operator: operator,
            additionalOperator: additionalOperator
        }
    }

    static getAvailableOperators(type, cmp) {
        if (!type) {
            console.error('Can not return available operators to current type. Type: %s', type);
            return null;
        }

        return getAvailableOperatorsApex({type: type})
            .then(result => {return result})
            .catch(error => ErrorService.logError(error, cmp));
    }

    static TYPES = {
        STRING_TYPE: 'string',
        DATA_TYPE: 'data',
        DATE_TYPE: 'date'
    }

    static SUBTYPE = {
        EXPRESSION: 'expression',
        SPECIAL: 'special'
    }

    static OPERATORS = {
        EQUAL: 'equal',
        NOT_EQUAL_TO: 'not equal to',
        CONTAINS: 'contains',
        LESS_THAN: 'less than',
        GREATER_THAN: 'greater than',
        LESS_OR_EQUAL: 'less or equal',
        GREATER_OR_EQUAL: 'greater or equal',
        EXIST: 'exist',
        NOT_EXIST: 'not exist',
        LIMIT: 'LIMIT',
        OFFSET: 'OFFSET',
        ORDER_BY: 'ORDER BY',
        NONE: 'none'
    }

    static ADDITIONAL_OPERATOR = {
        ASC: 'ASC',
        DESC: 'DESC'
    }
}

export {Filters}