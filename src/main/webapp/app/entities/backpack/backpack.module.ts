import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FirstJhippsterSharedModule } from 'app/shared/shared.module';
import { BackpackComponent } from './backpack.component';
import { BackpackDetailComponent } from './backpack-detail.component';
import { BackpackUpdateComponent } from './backpack-update.component';
import { BackpackDeleteDialogComponent } from './backpack-delete-dialog.component';
import { backpackRoute } from './backpack.route';

@NgModule({
  imports: [FirstJhippsterSharedModule, RouterModule.forChild(backpackRoute)],
  declarations: [BackpackComponent, BackpackDetailComponent, BackpackUpdateComponent, BackpackDeleteDialogComponent],
  entryComponents: [BackpackDeleteDialogComponent]
})
export class FirstJhippsterBackpackModule {}
