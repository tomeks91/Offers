import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FirstJhippsterSharedModule } from 'app/shared/shared.module';
import { OfferVersionComponent } from './offer-version.component';
import { OfferVersionDetailComponent } from './offer-version-detail.component';
import { OfferVersionUpdateComponent } from './offer-version-update.component';
import { OfferVersionDeleteDialogComponent } from './offer-version-delete-dialog.component';
import { offerVersionRoute } from './offer-version.route';

@NgModule({
  imports: [FirstJhippsterSharedModule, RouterModule.forChild(offerVersionRoute)],
  declarations: [OfferVersionComponent, OfferVersionDetailComponent, OfferVersionUpdateComponent, OfferVersionDeleteDialogComponent],
  entryComponents: [OfferVersionDeleteDialogComponent]
})
export class FirstJhippsterOfferVersionInterestingNotActiveModule {}
