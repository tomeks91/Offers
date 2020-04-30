import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'offer-version',
        loadChildren: () => import('./offer-version/offer-version.module').then(m => m.FirstJhippsterOfferVersionModule)
      },
      {
        path: 'offer',
        loadChildren: () => import('./offer/offer.module').then(m => m.FirstJhippsterOfferModule)
      }
    ])
  ]
})
export class FirstJhippsterEntityModule {}
