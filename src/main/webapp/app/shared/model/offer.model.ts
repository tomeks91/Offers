import { IOfferVersion } from 'app/shared/model/offer-version.model';

export interface IOffer {
  id?: number;
  name?: string;
  uniqueId?: string;
  versions?: IOfferVersion[];
}

export class Offer implements IOffer {
  constructor(public id?: number, public name?: string, public uniqueId?: string, public versions?: IOfferVersion[]) {}
}
