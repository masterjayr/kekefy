import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [

      // {
      //     path: 'home',
      //     loadChildren: './pages/home/home.module#HomePageModule'
      // },

      { 
        path: 'support',
         loadChildren: '../support/support.module#SupportPageModule'
      },
      { 
        path: 'scheduled-pickups',
        loadChildren: '../scheduled-pickups/scheduled-pickups.module#ScheduledPickupsPageModule'
      },
      { 
        path: 'free-rides',
        loadChildren: '../free-rides/free-rides.module#FreeRidesPageModule'
      },
      { 
        path: 'settings',
        loadChildren: '../settings/settings.module#SettingsPageModule'
      },
      {
         path: 'pickup',
        loadChildren: '../pickup/pickup.module#PickupPageModule'
      },
      {
         path: 'rider-reg',
        loadChildren: '../rider-reg/rider-reg.module#RiderRegPageModule'
      },
      { 
        path: 'notifications',
        loadChildren: '../notifications/notifications.module#NotificationsPageModule'
      },
      {
         path: 'request',
        loadChildren: '../request/request.module#RequestPageModule'
      },
      {
        path: 'profilepic',
        loadChildren: '../profilepic/profilepic.module#ProfilepicPageModule'
      },
      {
        path: 'profile',
        loadChildren: '../profile/profile.module#ProfilePageModule'
      },
      {
        path: 'tabrider',
        loadChildren: '../tabrider/tabrider.module#TabriderPageModule'
       },
       {
          path: 'chat',
          loadChildren: '../chat/chat.module#ChatPageModule'
       },

        {
          path: 'cus-reg',
          loadChildren: '../cus-reg/cus-reg.module#CusRegPageModule'
        },

      {
         path: 'cuschat',
        loadChildren: '../cuschat/cuschat.module#CuschatPageModule'
      }, 

      { 
        path: 'about',
        loadChildren: '../about/about.module#AboutPageModule'
      }
    ]
  },

  {
    path: '',
    redirectTo: '/menu/home'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
