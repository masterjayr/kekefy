import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'home',
  //   loadChildren: './pages/home/home.module#HomePageModule'
  // },
  // { path: 'support', loadChildren: './pages/support/support.module#SupportPageModule' },
  // { path: 'scheduled-pickups', loadChildren: './pages/scheduled-pickups/scheduled-pickups.module#ScheduledPickupsPageModule' },
  // { path: 'free-rides', loadChildren: './pages/free-rides/free-rides.module#FreeRidesPageModule' },
  // { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  // { path: 'reg', loadChildren: './pages/reg/reg.module#RegPageModule' },
  // { path: 'pickup', loadChildren: './pages/pickup/pickup.module#PickupPageModule' },
  // { path: 'rider-reg', loadChildren: './pages/rider-reg/rider-reg.module#RiderRegPageModule' },
  // { path: 'notifications', loadChildren: './pages/notifications/notifications.module#NotificationsPageModule' },
  // { path: 'request', loadChildren: './pages/request/request.module#RequestPageModule' },
  // { path: 'profilepic', loadChildren: './pages/profilepic/profilepic.module#ProfilepicPageModule' },
  // { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  // { path: 'tabrider', loadChildren: './pages/tabrider/tabrider.module#TabriderPageModule' },
  { 
    path: 'menu',
    loadChildren: './pages/menu/menu.module#MenuPageModule'
  },

  {
      path: 'home',
      loadChildren: './pages/home/home.module#HomePageModule'
  },

  {
    path: 'reg',
   loadChildren: './pages/reg/reg.module#RegPageModule'
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'passreset', loadChildren: './pages/passreset/passreset.module#PassresetPageModule' },
  // { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
  // { path: 'cuschat', loadChildren: './pages/cuschat/cuschat.module#CuschatPageModule' }
  // { path: 'chat', loadChildren: './pages/chat/chat.module#ChatPageModule' },
  // { path: 'cus-reg', loadChildren: './pages/cus-reg/cus-reg.module#CusRegPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[
  
  ]
})
export class AppRoutingModule {}
