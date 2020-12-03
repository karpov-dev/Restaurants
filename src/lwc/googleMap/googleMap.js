import {LightningElement, track, api} from 'lwc';

export default class GoogleMap extends LightningElement {
    @track
    mapMarkers = [
        {
            location: {
                Street: '1600 Pennsylvania Ave NW',
                City: 'Washington',
                State: 'DC',
            },

            title: 'The White House',
            description:
                'Landmark, historic home & office of the United States president, with tours for visitors.',
        },
    ];

    @api
    setMapMarker(marker) {
        if (marker && marker.latitude && marker.longitude) {
            this.mapMarkers = [
                {
                    location: {
                        Latitude: marker.latitude,
                        Longitude: marker.longitude
                    },
                    title: marker.title,
                    description: marker.description
                }
            ];
        } else {
            console.error('Can not set marker on map: ' + marker);
        }
    }
}