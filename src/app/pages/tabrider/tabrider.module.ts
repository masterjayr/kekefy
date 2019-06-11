import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { TabriderRoutingModule } from './tabrider-routing.module'
import { ScheduledPickupsPageModule } from '../scheduled-pickups/scheduled-pickups.module';
import { PickupPageModule } from '../pickup/pickup.module';
import { ChatPageModule } from '../chat/chat.module';
import { TabriderPage } from './tabrider.page';

// const routes: Routes = [
//   {
//     path: '',
//     component: TabriderPage
//   }
// ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScheduledPickupsPageModule,
    PickupPageModule,
    ChatPageModule,
    TabriderRoutingModule
  ],
  declarations: [TabriderPage]
})
export class TabriderPageModule {}
