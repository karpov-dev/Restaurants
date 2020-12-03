import {DomService} from "c/domService";

export class helper {
    static parent;

    static changeDescriptionVisibility(restaurantId) {
        const restaurantDescriptionCmp = DomService.getElementByTag('c-restaurant-description', this.parent);

        if (restaurantId) restaurantDescriptionCmp.show();
        else restaurantDescriptionCmp.hide();
    }

    static setGoogleMapMarker(mapMarker) {
        if (!(mapMarker && mapMarker.latitude && mapMarker.longitude)) {
            console.error('Can not set map marker. The marker contains empty required fields or null: ' + mapMarker);
            return false;
        }

        const googleMapCmp = DomService.getElementByTag('c-google-map', this.parent);
        googleMapCmp.setMapMarker(mapMarker);
    }

    static setMainRestaurantId(newId) {
        if (!newId) {
            console.log('Can not set empty restaurant ID: ' + newId);
        }

        const restaurantDescriptionCmp = DomService.getElementByTag('c-restaurant-description', this.parent);
        restaurantDescriptionCmp.setRestaurantId(newId);
    }
}