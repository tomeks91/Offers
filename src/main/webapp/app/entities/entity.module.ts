import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'offer-version-interesting',
        loadChildren: () => import('./offer-version-interesting/offer-version.module').then(m => m.FirstJhippsterOfferVersionInterestingModule)
      },
      {
        path: 'offer',
        loadChildren: () => import('./offer/offer.module').then(m => m.FirstJhippsterOfferModule)
      }
    ])
  ]
})
export class FirstJhippsterEntityModule {}
