import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { FirstJhippsterTestModule } from '../../../test.module';
import { OfferVersionDetailComponent } from 'app/entities/offer-version/offer-version-detail.component';
import { OfferVersion } from 'app/shared/model/offer-version.model';

describe('Component Tests', () => {
  describe('OfferVersion Management Detail Component', () => {
    let comp: OfferVersionDetailComponent;
    let fixture: ComponentFixture<OfferVersionDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ offerVersion: new OfferVersion(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FirstJhippsterTestModule],
        declarations: [OfferVersionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(OfferVersionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OfferVersionDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load offerVersion on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.offerVersion).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
