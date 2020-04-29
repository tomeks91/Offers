import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { FirstJhippsterTestModule } from '../../../test.module';
import { OfferVersionUpdateComponent } from 'app/entities/offer-version/offer-version-update.component';
import { OfferVersionService } from 'app/entities/offer-version/offer-version.service';
import { OfferVersion } from 'app/shared/model/offer-version.model';

describe('Component Tests', () => {
  describe('OfferVersion Management Update Component', () => {
    let comp: OfferVersionUpdateComponent;
    let fixture: ComponentFixture<OfferVersionUpdateComponent>;
    let service: OfferVersionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FirstJhippsterTestModule],
        declarations: [OfferVersionUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(OfferVersionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OfferVersionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OfferVersionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new OfferVersion(123);
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
        const entity = new OfferVersion();
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
