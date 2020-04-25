import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FirstJhippsterSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [FirstJhippsterSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent]
})
export class FirstJhippsterHomeModule {}
