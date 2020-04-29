import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { FirstJhippsterTestModule } from '../../../test.module';
import { ImageDetailComponent } from 'app/entities/image/image-detail.component';
import { Image } from 'app/shared/model/image.model';

describe('Component Tests', () => {
  describe('Image Management Detail Component', () => {
    let comp: ImageDetailComponent;
    let fixture: ComponentFixture<ImageDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ image: new Image(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FirstJhippsterTestModule],
        declarations: [ImageDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ImageDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ImageDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load image on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.image).toEqual(jasmine.objectContaining({ id: 123 }));
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
