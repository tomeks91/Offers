import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBackpack } from 'app/shared/model/backpack.model';
import { BackpackService } from './backpack.service';

@Component({
  templateUrl: './backpack-delete-dialog.component.html'
})
export class BackpackDeleteDialogComponent {
  backpack?: IBackpack;

  constructor(protected backpackService: BackpackService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.backpackService.delete(id).subscribe(() => {
      this.eventManager.broadcast('backpackListModification');
      this.activeModal.close();
    });
  }
}
