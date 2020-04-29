import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IImage, Image } from 'app/shared/model/image.model';
import { ImageService } from './image.service';
import { ImageComponent } from './image.component';
import { ImageDetailComponent } from './image-detail.component';
import { ImageUpdateComponent } from './image-update.component';

@Injectable({ providedIn: 'root' })
export class ImageResolve implements Resolve<IImage> {
  constructor(private service: ImageService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IImage> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((image: HttpResponse<Image>) => {
          if (image.body) {
            return of(image.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Image());
  }
}

export const imageRoute: Routes = [
  {
    path: '',
    component: ImageComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'firstJhippsterApp.image.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ImageDetailComponent,
    resolve: {
      image: ImageResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'firstJhippsterApp.image.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ImageUpdateComponent,
    resolve: {
      image: ImageResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'firstJhippsterApp.image.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ImageUpdateComponent,
    resolve: {
      image: ImageResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'firstJhippsterApp.image.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
