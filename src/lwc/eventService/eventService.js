export {EventService}

class EventService {
    static EVENT_NAMES = {
        showToastEvt: 'showToast',
        serverErrorEvt: 'serverError',
        loginEvt: 'login',
        invalidLoginEvt: 'invalidLogin',
        logout: 'logout',
        spinnerEvt: 'spinner',
        changePageEvt: 'changePage',
        moreRestaurant: 'moreRestaurantInfo',
        showOnMap: 'showOnMap',
        filterElement: 'filterElement',
        lazyBoxEvt: 'lazyBoxEvt',
        rentPlaceEvt: 'rentPlace',
        openLoginModal: 'openLoginModal',
        nextQueueEvt: 'nextQueue',
        manualCloseModal: 'manualCloseModal',
        orderWasCreated: 'orderWasCreated',
        openUserBox: 'openUserBox',
        orderWasDeleted: 'orderWasDeleted'
    }

    static showToastEvt(title, message, variant, sender) {
        sender.dispatchEvent(this.getEvent(this.EVENT_NAMES.showToastEvt, {
            title: title,
            message: message,
            variant: variant
        }));
    }

    static serverErrorEvt(sender) {
        sender.dispatchEvent(this.getEvent(this.EVENT_NAMES.serverErrorEvt));
    }

    static loginEvt(userId, sender) {
        sender.dispatchEvent(this.getEvent(this.EVENT_NAMES.loginEvt, userId));
    }

    static invalidLoginEvt(sender) {
        sender.dispatchEvent(this.getEvent(this.EVENT_NAMES.invalidLoginEvt));
    }

    static logoutEvt(sender) {
        sender.dispatchEvent(this.getEvent(this.EVENT_NAMES.logout));
    }

    static spinnerEvt(spinnerState, sender) {
        sender.dispatchEvent(this.getEvent(this.EVENT_NAMES.spinnerEvt, spinnerState));
    }

    static changePageEvt(pageId, sender) {
        sender.dispatchEvent(this.getEvent(this.EVENT_NAMES.changePageEvt, pageId));
    }

    static moreRestaurantInfoEvt(restaurantId, sender) {
        sender.dispatchEvent(this.getEvent(this.EVENT_NAMES.moreRestaurant, restaurantId));
    }

    static showOnMap(latitude, longitude, title, description, sender) {
        sender.dispatchEvent(this.getEvent(this.EVENT_NAMES.showOnMap, {
            latitude: latitude,
            longitude: longitude,
            title: title,
            description: description
        }));
    }

    static filterElement(filter, sender) {
        sender.dispatchEvent(this.getEvent(this.EVENT_NAMES.filterElement, filter));
    }

    static lazyBoxEvt(sender) {
        sender.dispatchEvent(this.getEvent(this.EVENT_NAMES.lazyBoxEvt));
    }

    static rentPlaceEvt(placeId, sender) {
        sender.dispatchEvent(this.getEvent(this.EVENT_NAMES.rentPlaceEvt, placeId));
    }

    static openLoginModal(sender) {
        sender.dispatchEvent(this.getEvent(this.EVENT_NAMES.openLoginModal));
    }

    static closeModal(sender) {
        sender.dispatchEvent(this.getEvent(this.EVENT_NAMES.manualCloseModal));
    }

    static nextQueueEvt(sender) {
        sender.dispatchEvent(this.getEvent(this.EVENT_NAMES.nextQueueEvt));
    }

    static openUserBoxEvt(sender) {
        sender.dispatchEvent(this.getEvent(this.EVENT_NAMES.openUserBox));
    }

    static orderWasDeleted(orderId, sender) {
        sender.dispatchEvent(this.getEvent(this.EVENT_NAMES.orderWasDeleted, orderId));
    }

    static orderWasCreatedEvt(orderId, sender) {
        sender.dispatchEvent(this.getEvent(this.EVENT_NAMES.orderWasCreated), orderId);
    }

    static getEvent(name, detail = null, bubbles = true, composed = true) {
        return new CustomEvent(name, {bubbles: bubbles, composed: composed, detail: detail, cancelable:true});
    }

    static addEventListner(owner, eventName, eventHandler) {
        owner.addEventListener(eventName, eventHandler);
    }
}