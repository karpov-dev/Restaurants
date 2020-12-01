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

    @api setMarker(latitude, longitude, title, description) {
        this.mapMarkers = [
            {
                location: {
                    Latitude: latitude,
                    Longitude: longitude
                },
                title: title,
                description: description
            }
        ];
    }
}