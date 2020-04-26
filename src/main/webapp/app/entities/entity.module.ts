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
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class FirstJhippsterEntityModule {}
