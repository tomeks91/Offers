import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FirstJhippsterTestModule } from '../../../test.module';
import { BackpackComponent } from 'app/entities/backpack/backpack.component';
import { BackpackService } from 'app/entities/backpack/backpack.service';
import { Backpack } from 'app/shared/model/backpack.model';

describe('Component Tests', () => {
  describe('Backpack Management Component', () => {
    let comp: BackpackComponent;
    let fixture: ComponentFixture<BackpackComponent>;
    let service: BackpackService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FirstJhippsterTestModule],
        declarations: [BackpackComponent]
      })
        .overrideTemplate(BackpackComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BackpackComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BackpackService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Backpack(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.backpacks && comp.backpacks[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
