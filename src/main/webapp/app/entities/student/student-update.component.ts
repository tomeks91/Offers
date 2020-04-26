import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IStudent, Student } from 'app/shared/model/student.model';
import { StudentService } from './student.service';
import { IBackpack } from 'app/shared/model/backpack.model';
import { BackpackService } from 'app/entities/backpack/backpack.service';

@Component({
  selector: 'jhi-student-update',
  templateUrl: './student-update.component.html'
})
export class StudentUpdateComponent implements OnInit {
  isSaving = false;
  backpacks: IBackpack[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    surname: [],
    backpack: []
  });

  constructor(
    protected studentService: StudentService,
    protected backpackService: BackpackService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ student }) => {
      this.updateForm(student);

      this.backpackService
        .query({ filter: 'student-is-null' })
        .pipe(
          map((res: HttpResponse<IBackpack[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IBackpack[]) => {
          if (!student.backpack || !student.backpack.id) {
            this.backpacks = resBody;
          } else {
            this.backpackService
              .find(student.backpack.id)
              .pipe(
                map((subRes: HttpResponse<IBackpack>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IBackpack[]) => (this.backpacks = concatRes));
          }
        });
    });
  }

  updateForm(student: IStudent): void {
    this.editForm.patchValue({
      id: student.id,
      name: student.name,
      surname: student.surname,
      backpack: student.backpack
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const student = this.createFromForm();
    if (student.id !== undefined) {
      this.subscribeToSaveResponse(this.studentService.update(student));
    } else {
      this.subscribeToSaveResponse(this.studentService.create(student));
    }
  }

  private createFromForm(): IStudent {
    return {
      ...new Student(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      surname: this.editForm.get(['surname'])!.value,
      backpack: this.editForm.get(['backpack'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStudent>>): void {
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

  trackById(index: number, item: IBackpack): any {
    return item.id;
  }
}
