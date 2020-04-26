import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IBackpack, Backpack } from 'app/shared/model/backpack.model';
import { BackpackService } from './backpack.service';
import { BackpackComponent } from './backpack.component';
import { BackpackDetailComponent } from './backpack-detail.component';
import { BackpackUpdateComponent } from './backpack-update.component';

@Injectable({ providedIn: 'root' })
export class BackpackResolve implements Resolve<IBackpack> {
  constructor(private service: BackpackService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBackpack> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((backpack: HttpResponse<Backpack>) => {
          if (backpack.body) {
            return of(backpack.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Backpack());
  }
}

export const backpackRoute: Routes = [
  {
    path: '',
    component: BackpackComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'firstJhippsterApp.backpack.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: BackpackDetailComponent,
    resolve: {
      backpack: BackpackResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'firstJhippsterApp.backpack.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: BackpackUpdateComponent,
    resolve: {
      backpack: BackpackResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'firstJhippsterApp.backpack.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: BackpackUpdateComponent,
    resolve: {
      backpack: BackpackResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'firstJhippsterApp.backpack.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
