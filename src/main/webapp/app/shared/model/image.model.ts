import { IOfferVersion } from 'app/shared/model/offer-version.model';

export interface IImage {
  id?: number;
  imageContentType?: string;
  image?: any;
  offerVersion?: IOfferVersion;
}

export class Image implements IImage {
  constructor(public id?: number, public imageContentType?: string, public image?: any, public offerVersion?: IOfferVersion) {}
}
