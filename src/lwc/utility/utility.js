class Utility {
    static toOptions(stringList) {
        if (!stringList) {
            console.error('Can not convert to options: String List: %s', stringList);
            return null;
        }

        const options = [];
        for (let i = 0; i < stringList.length; i++) {
            options.push({label: stringList[i].replace('__c', ''), value: stringList[i]});
        }

        return options;
    }

    static toNumberMsDate(dateValue) {
        if (!dateValue) {
            console.error("Can not convert date to ms; Date: %s", dateValue);
            return null;
        }

        const dateTime = new Date(dateValue);
        return +dateTime;
    }

    static toStringDateTime(dateTime) {
        if (!dateTime) {
            console.error("Datetime is empty to convert to string");
            return null;
        }

        return dateTime.toDateString() + ' ' + dateTime.toTimeString().split(' ')[0];
    }

    static addCookie(name, value) {
        document.cookie = name + '=' + value;
    }

    static getCookie(name) {
        return document.cookie.replace(/(?:(?:^|.*;\s*)userId\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    }
}

export {Utility}