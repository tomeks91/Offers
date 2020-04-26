import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IBackpack, Backpack } from 'app/shared/model/backpack.model';
import { BackpackService } from './backpack.service';

@Component({
  selector: 'jhi-backpack-update',
  templateUrl: './backpack-update.component.html'
})
export class BackpackUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    mark: []
  });

  constructor(protected backpackService: BackpackService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ backpack }) => {
      this.updateForm(backpack);
    });
  }

  updateForm(backpack: IBackpack): void {
    this.editForm.patchValue({
      id: backpack.id,
      mark: backpack.mark
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const backpack = this.createFromForm();
    if (backpack.id !== undefined) {
      this.subscribeToSaveResponse(this.backpackService.update(backpack));
    } else {
      this.subscribeToSaveResponse(this.backpackService.create(backpack));
    }
  }

  private createFromForm(): IBackpack {
    return {
      ...new Backpack(),
      id: this.editForm.get(['id'])!.value,
      mark: this.editForm.get(['mark'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBackpack>>): void {
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
}
