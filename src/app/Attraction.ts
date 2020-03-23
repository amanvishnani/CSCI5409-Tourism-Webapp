import { Place } from './Place'

export class Attraction implements Place {
    cityId: number
    name: string
    type: string
    url: string
    features: string
    _links: any
}
