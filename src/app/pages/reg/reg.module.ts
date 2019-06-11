import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { RegRoutingModule } from '../reg/reg-routing.module';

import { RegPage } from './reg.page';
import { RiderRegPageModule } from '../rider-reg/rider-reg.module';
import { CusRegPageModule } from '../cus-reg/cus-reg.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegRoutingModule,
    RiderRegPageModule,
    CusRegPageModule
  ],
  declarations: [RegPage]
})
export class RegPageModule {}
