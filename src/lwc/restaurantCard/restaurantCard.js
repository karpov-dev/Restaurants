import {LightningElement, api, track} from 'lwc';
import {EventService} from "c/eventService";
import addViewApex from '@salesforce/apex/SC_RestaurantsService.addRestaurantView';
import getRestaurantImg from '@salesforce/apex/SC_AttachmentService.getImageIds';
import {DomService} from "c/domService";

const IMG_PATH = 'https://grsu2-dev-ed.lightning.force.com/servlet/servlet.FileDownload?file=';
const PLUG_URL = 'https://argest-stone.com.ua/upload/medialibrary/59d/59d96e2269a71a9f346c757e6438328f.png';

export default class RestaurantCard extends LightningElement {
    @api
    get restaurant() {return this.restaurantInfo};
    set restaurant(value) {
        this.restaurantInfo = JSON.parse(JSON.stringify(value));
        if (value) this.getRestaurantImg();
    };

    @track restaurantInfo;
    @track restaurantImg;

    restaurantOnClick() {
        EventService.showOnMap(
            this.restaurant.Geolocation__Latitude__s,
            this.restaurant.Geolocation__Longitude__s,
            this.restaurant.Name,
            this.restaurant.Description__c,
            this
        );
    }

    showMoreInfo() {
        this.addView();
        EventService.moreRestaurantInfoEvt(this.restaurant.Id, this);
    }

    addView() {
        this.restaurantInfo.Views__c++;
        addViewApex({restaurantId: this.restaurantInfo.Id});
    }

    getRestaurantImg() {
        getRestaurantImg({ownerId: this.restaurantInfo.Id})
            .then(result => {
                if (!result || result.length === 0) {
                    this.restaurantImg = PLUG_URL;
                } else {
                    this.restaurantImg = IMG_PATH + result[0];
                }
            })
    }
}