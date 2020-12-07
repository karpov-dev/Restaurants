import {LightningElement, api, track} from 'lwc';
import getImagesApex from '@salesforce/apex/SC_AttachmentService.getImageIds';
import {ErrorService} from "c/errorService";
import {CssVisibilityService} from "c/cssVisibilityService";
import {DomService} from "c/domService";

const IMG_PATH = 'https://grsu2-dev-ed.lightning.force.com/servlet/servlet.FileDownload?file=';
const PLUG_URL = 'https://argest-stone.com.ua/upload/medialibrary/59d/59d96e2269a71a9f346c757e6438328f.png';
const SHOW_CLASS = 'slds-show';
const HIDE_CLASS = 'slds-hide';

export default class Gallery extends LightningElement {
    @track imageUrls = [];
    @track currentImg;
    currentImgIndex = 0;
    cssVisibilityHelper;

    constructor() {
        super();
        this.cssVisibilityHelper = new CssVisibilityService(this, SHOW_CLASS, HIDE_CLASS);
    }

    @api show(ownerId) {
        this.hideDataLoadSpinner();
        this.cssVisibilityHelper.show('gallery');
        this.getImages(ownerId);
    }

    @api hide() {
        this.cssVisibilityHelper.hide('gallery');
    }

    getImages(ownerId) {
        getImagesApex({ownerId: ownerId})
            .then(result => {this.handleUrsImages(result)})
            .catch(error => {
                ErrorService.logError(error);
                this.handleUrsImages(null);
            });
    }

    nextImg(event) {
        if (this.currentImgIndex + 1 < this.imageUrls.length) {
            this.currentImgIndex++;
        } else {
            this.currentImgIndex = 0;
        }

        this.setCurrentImg(this.imageUrls[this.currentImgIndex]);
    }

    previousImg(event) {
        if (this.currentImgIndex - 1 >= 0) {
            this.currentImgIndex--;
        } else {
            this.currentImgIndex = this.imageUrls.length - 1;
        }

        this.setCurrentImg(this.imageUrls[this.currentImgIndex]);
    }

    handleUrsImages(images) {
        this.imageUrls = [];

        if (!images) {
            this.setEmptyImage();
            return false;
        }

        if (images.length === 0) {
            this.setEmptyImage();
            this.cssVisibilityHelper.hide('arrow');
        } else if (images.length < 2) {
            this.cssVisibilityHelper.hide('arrow');
        } else {
            this.cssVisibilityHelper.show('arrow');
        }

        for (let i = 0; i < images.length; i++) {
            if (!images[i]) continue;
            this.imageUrls.push(IMG_PATH + images[i]);
        }

        this.setCurrentImg(this.imageUrls[0]);
    }

    setEmptyImage() {
        this.setCurrentImg(PLUG_URL)
        this.cssVisibilityHelper.hide('arrow');
    }

    setCurrentImg(newImg) {
        if (!newImg) {
            this.hideDataLoadSpinner();
            return false;
        }

        this.showDataLoadSpinner();
        this.currentImg = newImg;
    }

    showDataLoadSpinner() {
        const spinner = DomService.getElementByTag('c-spinner-v-2', this);
        spinner.show();
    }

    hideDataLoadSpinner() {
        const spinner = DomService.getElementByTag('c-spinner-v-2', this);
        spinner.hide();
    }
}