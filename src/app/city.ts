import { Place } from './Place';

export class City implements Place{
    id: string
    url: string;
    name: string;
    province: string;
    _links: any;

    static dummy() {
        let city: City = {
            id: '-1',
            url:  '../../assets/images/image1.jpeg',
            province: '',
            name: 'City',
            _links: {}
        }
        return city
    }
}
