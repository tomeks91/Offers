import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IStudent } from 'app/shared/model/student.model';
import { StudentService } from './student.service';
import { StudentDeleteDialogComponent } from './student-delete-dialog.component';

@Component({
  selector: 'jhi-student',
  templateUrl: './student.component.html'
})
export class StudentComponent implements OnInit, OnDestroy {
  students?: IStudent[];
  eventSubscriber?: Subscription;

  constructor(protected studentService: StudentService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.studentService.query().subscribe((res: HttpResponse<IStudent[]>) => (this.students = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInStudents();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IStudent): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInStudents(): void {
    this.eventSubscriber = this.eventManager.subscribe('studentListModification', () => this.loadAll());
  }

  delete(student: IStudent): void {
    const modalRef = this.modalService.open(StudentDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.student = student;
  }
}
