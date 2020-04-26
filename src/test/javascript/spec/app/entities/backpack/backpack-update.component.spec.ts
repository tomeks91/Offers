import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { FirstJhippsterTestModule } from '../../../test.module';
import { BackpackUpdateComponent } from 'app/entities/backpack/backpack-update.component';
import { BackpackService } from 'app/entities/backpack/backpack.service';
import { Backpack } from 'app/shared/model/backpack.model';

describe('Component Tests', () => {
  describe('Backpack Management Update Component', () => {
    let comp: BackpackUpdateComponent;
    let fixture: ComponentFixture<BackpackUpdateComponent>;
    let service: BackpackService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FirstJhippsterTestModule],
        declarations: [BackpackUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(BackpackUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BackpackUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BackpackService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Backpack(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Backpack();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
