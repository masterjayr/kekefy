import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';

import { RegPage } from './reg.page';

const routes: Routes = [
  {
    path: 'reg',
    component: RegPage,
    children: [
      {
        path: '',
        redirectTo: '/reg/(cus-reg:cus-reg)',
        pathMatch: 'full'
      },

      {
        path: 'cus-reg',
        children: [
          {
            path: '',
            loadChildren: '../cus-reg/cus-reg.module#CusRegPageModule'
          }
        ]
      },

      {
        path: 'reg',
        children: [
          {
            path: '',
            loadChildren: '../reg/reg.module#RegPageModule'
          }
        ]
      },
      
      {
        path: 'rider-reg',
        children: [
          {
            path: '',
            loadChildren: '../rider-reg/rider-reg.module#RiderRegPageModule'
          }
        ]
      },
    ]
  },

  {
    path: '',
    redirectTo: '/reg/reg/cus-reg',
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
export class RegRoutingModule { }
