import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IBackpack } from 'app/shared/model/backpack.model';
import { BackpackService } from './backpack.service';
import { BackpackDeleteDialogComponent } from './backpack-delete-dialog.component';

@Component({
  selector: 'jhi-backpack',
  templateUrl: './backpack.component.html'
})
export class BackpackComponent implements OnInit, OnDestroy {
  backpacks?: IBackpack[];
  eventSubscriber?: Subscription;

  constructor(protected backpackService: BackpackService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.backpackService.query().subscribe((res: HttpResponse<IBackpack[]>) => (this.backpacks = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInBackpacks();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IBackpack): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInBackpacks(): void {
    this.eventSubscriber = this.eventManager.subscribe('backpackListModification', () => this.loadAll());
  }

  delete(backpack: IBackpack): void {
    const modalRef = this.modalService.open(BackpackDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.backpack = backpack;
  }
}
