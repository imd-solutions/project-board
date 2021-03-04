export interface Business {
    id: number;
    name: string;
    email: string;
    url: string;
    prospect_link: string;
    permalink: string;
    uid: string;
    company: Company;
    address: Address;
    siteInfo: SiteInfo;
    form: Form;
}

interface Company {
    name: string;
    email: string;
    url: string;
}

interface Address {
    id: number;
    permalink: string;
    address_1: string;
    address_2: string;
    city: string;
    county: string;
    postcode: string;
}

interface SiteInfo {
    id: number;
    permalink: string;
    logo: string;
    colour: string;
}

interface Form {
    title: string;
    intro: string;
    redirect_link: string;
}
