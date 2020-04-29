import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IImage } from 'app/shared/model/image.model';
import { ImageService } from './image.service';

@Component({
  templateUrl: './image-delete-dialog.component.html'
})
export class ImageDeleteDialogComponent {
  image?: IImage;

  constructor(protected imageService: ImageService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.imageService.delete(id).subscribe(() => {
      this.eventManager.broadcast('imageListModification');
      this.activeModal.close();
    });
  }
}
