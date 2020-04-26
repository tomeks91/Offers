import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBackpack } from 'app/shared/model/backpack.model';

@Component({
  selector: 'jhi-backpack-detail',
  templateUrl: './backpack-detail.component.html'
})
export class BackpackDetailComponent implements OnInit {
  backpack: IBackpack | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ backpack }) => (this.backpack = backpack));
  }

  previousState(): void {
    window.history.back();
  }
}
