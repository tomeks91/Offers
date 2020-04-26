import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FirstJhippsterTestModule } from '../../../test.module';
import { BackpackDetailComponent } from 'app/entities/backpack/backpack-detail.component';
import { Backpack } from 'app/shared/model/backpack.model';

describe('Component Tests', () => {
  describe('Backpack Management Detail Component', () => {
    let comp: BackpackDetailComponent;
    let fixture: ComponentFixture<BackpackDetailComponent>;
    const route = ({ data: of({ backpack: new Backpack(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FirstJhippsterTestModule],
        declarations: [BackpackDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(BackpackDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BackpackDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load backpack on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.backpack).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
