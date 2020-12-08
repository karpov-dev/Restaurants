import {LightningElement, api} from 'lwc';
import {EventService} from "c/eventService";
import {helper} from "./helper";
import {DomService} from "c/domService";
import {QueueFunctions} from "c/queueFunctions";

export default class PageRestaurants extends LightningElement {
    @api userId;
    @api currentRestaurant;
    restaurantDescriptionDiv;
    placeId;
    queueFunctions = new QueueFunctions();

    constructor() {
        super();
        helper.parent = this;

        EventService.addEventListner(this, EventService.EVENT_NAMES.showOnMap, this.showOnMapHandler);
        EventService.addEventListner(this, EventService.EVENT_NAMES.moreRestaurant, this.moreRestaurantHandler);
        EventService.addEventListner(this, EventService.EVENT_NAMES.rentPlaceEvt, this.rentPlaceHandler);
        EventService.addEventListner(this, EventService.EVENT_NAMES.openLoginModal, this.openModalWithElement(this, 'authWithReg'));
        EventService.addEventListner(this, EventService.EVENT_NAMES.manualCloseModal, this.onManualCloseModal);
    }

    showOnMapHandler(event) {
        helper.setGoogleMapMarker(event.detail);
    }

    moreRestaurantHandler(event) {
        helper.setMainRestaurantId(event.detail);
        helper.changeDescriptionVisibility(event.detail);
    }

    rentPlaceHandler(event) {
        if (!event.detail) {
            console.error('Can not open order Registration component. Place Id: %s', event.detail);
            return null;
        }
        this.placeId = event.detail;

        if (!this.userId) {
            this.queueFunctions.pushElement(this.openModalWithElement(this, 'authWithReg'));
        }
        this.queueFunctions.pushElement(this.openModalWithElement(this, 'orderRegistration'));
        this.nextQueueElement();
    }

    nextQueueElement() {
        this.queueFunctions.shiftElement();
    }

    openModalWithElement = (parent, elementName) => () => {
        if (!elementName || !parent) {
            console.error('Can not set component to the modal. Element Name: %s. Parent: %s', elementName, parent);
            return null;
        }

        const modal = DomService.getElementByTag('c-modal-window', parent);
        const elementsManager = DomService.getElementByTag('c-page-manager', parent);

        elementsManager.changePage(elementName, elementsManager);
        modal.show();
    }

    onLoginSuccess() {
        this.closeModal();
        this.nextQueueElement();
    }

    onManualCloseModal() {
        this.queueFunctions.clear();
    }

    closeModal() {
        const modal = DomService.getElementByDataId('loginModal', this);
        modal.hide();
    }

    get getUserId() {
        return this.userId;
    }

    get getPlaceId() {
        return this.placeId;
    }
}