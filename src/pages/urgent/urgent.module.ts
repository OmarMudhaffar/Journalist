import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UrgentPage } from './urgent';

@NgModule({
  declarations: [
    UrgentPage,
  ],
  imports: [
    IonicPageModule.forChild(UrgentPage),
  ],
})
export class UrgentPageModule {}
