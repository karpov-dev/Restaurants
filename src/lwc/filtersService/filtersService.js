import availableOperators from '@salesforce/apex/QS_SearchService.getAvailableFilters';
import {ErrorService} from "c/errorService";

class FiltersService {
    static async createFilter(type, field, value, operator) {
        if (!(type && field)) {
            console.error('Empty type or field: ' + type + ' ' + field);
        }

        return {
            type: type,
            field: field,
            value: value,
            operator: operator
        }
    }

    static getAvailableOperators(type) {
        if (!type) {
            console.error('Empty type: ' + type);
        }

        return availableOperators({type})
            .then(result => {
                return result
            })
            .catch(error => {
                ErrorService.logError(error)
            });
    }
}

export {FiltersService}