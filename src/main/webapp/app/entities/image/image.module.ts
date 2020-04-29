import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FirstJhippsterSharedModule } from 'app/shared/shared.module';
import { ImageComponent } from './image.component';
import { ImageDetailComponent } from './image-detail.component';
import { ImageUpdateComponent } from './image-update.component';
import { ImageDeleteDialogComponent } from './image-delete-dialog.component';
import { imageRoute } from './image.route';

@NgModule({
  imports: [FirstJhippsterSharedModule, RouterModule.forChild(imageRoute)],
  declarations: [ImageComponent, ImageDetailComponent, ImageUpdateComponent, ImageDeleteDialogComponent],
  entryComponents: [ImageDeleteDialogComponent]
})
export class FirstJhippsterImageModule {}
