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
        path: 'offer-version-interesting-not-active',
        loadChildren: () => import('./offer-version-interesting-not-active/offer-version.module').then(m => m.FirstJhippsterOfferVersionInterestingNotActiveModule)
      },
      {
        path: 'offer-version-not-read',
        loadChildren: () => import('./offer-version-not-read/offer-version.module').then(m => m.FirstJhippsterOfferVersionNotReadModule)
      },
      {
        path: 'offer-version-not-read-not-active',
        loadChildren: () => import('./offer-version-not-read-not-active/offer-version.module').then(m => m.FirstJhippsterOfferVersionNotReadNotActiveModule)
      },
      {
        path: 'offer-version-not-interesting',
        loadChildren: () => import('./offer-version-not-interesting/offer-version.module').then(m => m.FirstJhippsterOfferVersionNotInterestingModule)
      },
      {
        path: 'offer-version-not-interesting-not-active',
        loadChildren: () => import('./offer-version-not-interesting-not-active/offer-version.module').then(m => m.FirstJhippsterOfferVersionNotInterestingNotActiveModule)
      },
      {
        path: 'offer',
        loadChildren: () => import('./offer/offer.module').then(m => m.FirstJhippsterOfferModule)
      }
    ])
  ]
})
export class FirstJhippsterEntityModule {}
