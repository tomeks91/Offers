import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { IOfferVersion } from 'app/shared/model/offer-version.model';
import { OfferVersionService } from './offer-version.service';
import { OfferVersionDeleteDialogComponent } from './offer-version-delete-dialog.component';

@Component({
  selector: 'jhi-offer-version',
  templateUrl: './offer-version.component.html'
})
export class OfferVersionComponent implements OnInit, OnDestroy {
  offerVersions?: IOfferVersion[];
  eventSubscriber?: Subscription;

  constructor(
    protected offerVersionService: OfferVersionService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.offerVersionService.query().subscribe((res: HttpResponse<IOfferVersion[]>) => (this.offerVersions = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInOfferVersions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IOfferVersion): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInOfferVersions(): void {
    this.eventSubscriber = this.eventManager.subscribe('offerVersionListModification', () => this.loadAll());
  }

  delete(offerVersion: IOfferVersion): void {
    const modalRef = this.modalService.open(OfferVersionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.offerVersion = offerVersion;
  }

   saveRead(offerVersion: IOfferVersion, read: any): void {
     offerVersion.read = read;
     this.save(offerVersion);
   }

  saveFavorite(offerVersion: IOfferVersion, favorite: any): void {
      offerVersion.favorite = favorite;
      this.save(offerVersion);
  }

   saveAvailable(offerVersion: IOfferVersion, available: any): void {
     offerVersion.available = available;
     this.save(offerVersion);
   }

  save(offerVersion: IOfferVersion): void {
        if (offerVersion.id !== undefined) {
          this.subscribeToSaveResponse(this.offerVersionService.update(offerVersion));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IOfferVersion>>): void {
        result.subscribe(
          () => this.onSaveSuccess(),
          () => this.onSaveError()
        );
      }

    protected onSaveSuccess(): void {
        this.ngOnDestroy();
        this.ngOnInit();
    }

    protected onSaveError(): void {
    }
}
