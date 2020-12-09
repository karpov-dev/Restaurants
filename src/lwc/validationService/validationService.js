class ValidationService {
    static isValidEmail(email) {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return  emailRegex.test(email);
    }

    static isValidPhone(phone) {
        const phoneRegex = /^((8|\+375)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

        return phoneRegex.test(phone);
    }

    static oneMoreThenTwo(one, two) {
        return one > two;
    }

    static oneMoreOrEqualThenTwo(one, two) {
        return one >= two;
    }
}

export {ValidationService}