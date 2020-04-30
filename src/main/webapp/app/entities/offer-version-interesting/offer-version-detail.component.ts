import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IOfferVersion } from 'app/shared/model/offer-version.model';

@Component({
  selector: 'jhi-offer-version-detail',
  templateUrl: './offer-version-detail.component.html'
})
export class OfferVersionDetailComponent implements OnInit {
  offerVersion: IOfferVersion | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ offerVersion }) => (this.offerVersion = offerVersion));
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
