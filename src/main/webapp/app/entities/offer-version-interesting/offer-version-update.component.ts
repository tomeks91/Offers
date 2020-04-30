import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IOfferVersion, OfferVersion } from 'app/shared/model/offer-version.model';
import { OfferVersionService } from './offer-version.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IOffer } from 'app/shared/model/offer.model';
import { OfferService } from 'app/entities/offer/offer.service';

@Component({
  selector: 'jhi-offer-version-update',
  templateUrl: './offer-version-update.component.html'
})
export class OfferVersionUpdateComponent implements OnInit {
  isSaving = false;
  offers: IOffer[] = [];

  editForm = this.fb.group({
    id: [],
    read: [],
    favorite: [],
    available: [],
    link: [],
    detailsHtml: [],
    description: [],
    offer: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected offerVersionService: OfferVersionService,
    protected offerService: OfferService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ offerVersion }) => {
      this.updateForm(offerVersion);

      this.offerService.query().subscribe((res: HttpResponse<IOffer[]>) => (this.offers = res.body || []));
    });
  }

  updateForm(offerVersion: IOfferVersion): void {
    this.editForm.patchValue({
      id: offerVersion.id,
      read: offerVersion.read,
      favorite: offerVersion.favorite,
      available: offerVersion.available,
      link: offerVersion.link,
      detailsHtml: offerVersion.detailsHtml,
      description: offerVersion.description,
      offer: offerVersion.offer
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('firstJhippsterApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const offerVersion = this.createFromForm();
    if (offerVersion.id !== undefined) {
      this.subscribeToSaveResponse(this.offerVersionService.update(offerVersion));
    } else {
      this.subscribeToSaveResponse(this.offerVersionService.create(offerVersion));
    }
  }

  private createFromForm(): IOfferVersion {
    return {
      ...new OfferVersion(),
      id: this.editForm.get(['id'])!.value,
      read: this.editForm.get(['read'])!.value,
      favorite: this.editForm.get(['favorite'])!.value,
      available: this.editForm.get(['available'])!.value,
      link: this.editForm.get(['link'])!.value,
      detailsHtml: this.editForm.get(['detailsHtml'])!.value,
      description: this.editForm.get(['description'])!.value,
      offer: this.editForm.get(['offer'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOfferVersion>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IOffer): any {
    return item.id;
  }
}
