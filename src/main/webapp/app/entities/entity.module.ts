import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'offer-version',
        loadChildren: () => import('./offer-version/offer-version.module').then(m => m.FirstJhippsterOfferVersionModule)
      }
    ])
  ]
})
export class FirstJhippsterEntityModule {}
