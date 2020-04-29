import { IImage } from 'app/shared/model/image.model';
import { IOffer } from 'app/shared/model/offer.model';

export interface IOfferVersion {
  id?: number;
  read?: boolean;
  favorite?: boolean;
  available?: boolean;
  link?: string;
  detailsHtml?: any;
  description?: any;
  images?: IImage[];
  offer?: IOffer;
}

export class OfferVersion implements IOfferVersion {
  constructor(
    public id?: number,
    public read?: boolean,
    public favorite?: boolean,
    public available?: boolean,
    public link?: string,
    public detailsHtml?: any,
    public description?: any,
    public images?: IImage[],
    public offer?: IOffer
  ) {
    this.read = this.read || false;
    this.favorite = this.favorite || false;
    this.available = this.available || false;
  }
}
