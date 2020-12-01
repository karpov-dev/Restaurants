class ErrorService {
    static logError(error) {
        if (!error) {
            console.error('Empty error');
        } else {
            console.error(error);
        }
    }
}

export {ErrorService}