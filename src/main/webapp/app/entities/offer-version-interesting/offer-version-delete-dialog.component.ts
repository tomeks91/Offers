import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOfferVersion } from 'app/shared/model/offer-version.model';
import { OfferVersionService } from './offer-version.service';

@Component({
  templateUrl: './offer-version-delete-dialog.component.html'
})
export class OfferVersionDeleteDialogComponent {
  offerVersion?: IOfferVersion;

  constructor(
    protected offerVersionService: OfferVersionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.offerVersionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('offerVersionListModification');
      this.activeModal.close();
    });
  }
}
