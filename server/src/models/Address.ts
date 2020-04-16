// Class Definition for an Address

// Placeholder for eventual ORM to Postgres

export class Address {
    constructor(
        id?: string,
        street_number: number,
        road_name: string,
        floor?: string,
        city: string,
        company?: string,
        region: string,
        postal_code: number,
        country: string,
        places_id?: string,
        lat?: number,
        lng?: number,
    ) {
        this.id = id;
        this.street_number = street_number;
        this.road_name = road_name;
        this.floor = floor;
        this.city = city;
        this.company = company;
        this.region = region;
        this.postal_code = postal_code;
        this.country = country;
        this.places_id = places_id;
        this.lat = lat;
        this.lng = lng;
    }
}
