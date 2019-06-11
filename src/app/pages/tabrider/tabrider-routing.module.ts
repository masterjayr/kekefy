import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';

import { TabriderPage } from './tabrider.page';

const routes: Routes = [
  {
    path: 'tabrider',
    component: TabriderPage,
    children: [
      {
        path: '',
        redirectTo: '/tabrider/tabrider/pickup',
        pathMatch: 'full' 
      },

      {
        path: 'pickup',
        children: [
          {
            path: '',
            loadChildren: '../pickup/pickup.module#PickupPageModule'
          }
        ]
      },

      {
        path: 'chats',
        children: [
          {
            path: '',
            loadChildren: '../chat/chat.module#ChatPageModule'
          }
        ]
      },

      {
        path: 'scheduled-pickups',
        children: [
          {
            path: '',
            loadChildren: '../scheduled-pickups/scheduled-pickups.module#ScheduledPickupsPageModule',
          }
        ]
      }
    ]
  },

  {
    path: '',
    redirectTo: '/tabrider/tabrider/pickup',
    pathMatch: 'full'
  }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabriderRoutingModule { }
