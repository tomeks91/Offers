import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IOfferVersion } from 'app/shared/model/offer-version.model';

type EntityResponseType = HttpResponse<IOfferVersion>;
type EntityArrayResponseType = HttpResponse<IOfferVersion[]>;

@Injectable({ providedIn: 'root' })
export class OfferVersionService {
  public resourceUrl = SERVER_API_URL + 'api/offer-versions';

  constructor(protected http: HttpClient) {}

  create(offerVersion: IOfferVersion): Observable<EntityResponseType> {
    return this.http.post<IOfferVersion>(this.resourceUrl, offerVersion, { observe: 'response' });
  }

  update(offerVersion: IOfferVersion): Observable<EntityResponseType> {
    return this.http.put<IOfferVersion>(this.resourceUrl, offerVersion, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IOfferVersion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOfferVersion[]>('api/offer-versions-not-read-not-active', { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
