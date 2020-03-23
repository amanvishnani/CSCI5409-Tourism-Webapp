import { Place } from './Place'

export class Attraction implements Place {
    locationId: number
    cityId: number
    name: string
    type: string
    url: string
    features: string
    _links: any

    static dummy(): Attraction {
        return {
            cityId: -1,
            features: '',
            locationId: -1,
            url: '../../assets/images/image1.jpeg',
            type: '',
            name: 'Attraction',
            _links: {}
        }
    }
}
