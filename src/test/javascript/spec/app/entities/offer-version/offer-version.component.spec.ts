import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FirstJhippsterTestModule } from '../../../test.module';
import { OfferVersionComponent } from 'app/entities/offer-version/offer-version.component';
import { OfferVersionService } from 'app/entities/offer-version/offer-version.service';
import { OfferVersion } from 'app/shared/model/offer-version.model';

describe('Component Tests', () => {
  describe('OfferVersion Management Component', () => {
    let comp: OfferVersionComponent;
    let fixture: ComponentFixture<OfferVersionComponent>;
    let service: OfferVersionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FirstJhippsterTestModule],
        declarations: [OfferVersionComponent]
      })
        .overrideTemplate(OfferVersionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OfferVersionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OfferVersionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new OfferVersion(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.offerVersions && comp.offerVersions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
