import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IImage, Image } from 'app/shared/model/image.model';
import { ImageService } from './image.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IOfferVersion } from 'app/shared/model/offer-version.model';
import { OfferVersionService } from 'app/entities/offer-version-interesting/offer-version.service';

@Component({
  selector: 'jhi-image-update',
  templateUrl: './image-update.component.html'
})
export class ImageUpdateComponent implements OnInit {
  isSaving = false;
  offerversions: IOfferVersion[] = [];

  editForm = this.fb.group({
    id: [],
    image: [],
    imageContentType: [],
    offerVersion: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected imageService: ImageService,
    protected offerVersionService: OfferVersionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ image }) => {
      this.updateForm(image);

      this.offerVersionService.query().subscribe((res: HttpResponse<IOfferVersion[]>) => (this.offerversions = res.body || []));
    });
  }

  updateForm(image: IImage): void {
    this.editForm.patchValue({
      id: image.id,
      image: image.image,
      imageContentType: image.imageContentType,
      offerVersion: image.offerVersion
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
    const image = this.createFromForm();
    if (image.id !== undefined) {
      this.subscribeToSaveResponse(this.imageService.update(image));
    } else {
      this.subscribeToSaveResponse(this.imageService.create(image));
    }
  }

  private createFromForm(): IImage {
    return {
      ...new Image(),
      id: this.editForm.get(['id'])!.value,
      imageContentType: this.editForm.get(['imageContentType'])!.value,
      image: this.editForm.get(['image'])!.value,
      offerVersion: this.editForm.get(['offerVersion'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IImage>>): void {
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

  trackById(index: number, item: IOfferVersion): any {
    return item.id;
  }
}
