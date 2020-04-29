import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'student',
        loadChildren: () => import('./student/student.module').then(m => m.FirstJhippsterStudentModule)
      },
      {
        path: 'backpack',
        loadChildren: () => import('./backpack/backpack.module').then(m => m.FirstJhippsterBackpackModule)
      },
      {
        path: 'offer',
        loadChildren: () => import('./offer/offer.module').then(m => m.FirstJhippsterOfferModule)
      },
      {
        path: 'offer-version',
        loadChildren: () => import('./offer-version/offer-version.module').then(m => m.FirstJhippsterOfferVersionModule)
      },
      {
        path: 'image',
        loadChildren: () => import('./image/image.module').then(m => m.FirstJhippsterImageModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class FirstJhippsterEntityModule {}
