import { Component } from '@angular/core';

import { Platform, ToastController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from '../../src/app/services/auth/auth';
import { FcmService } from './services/fcm/fcm.service'
import { tap } from 'rxjs/operators';
import { FCM } from '@ionic-native/fcm/ngx';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [  
    {
      title: 'Home',
      url: '/request',
      icon: 'home',
      type: 2
    },
    {
      title: 'Home',
      url: '/tabrider',
      icon: 'home',
      type: 1
    },
    {
      title: 'Free-rides',
      url: '/free-rides',
      icon: 'car',
      type:2
    },
    {
      title: 'Support',
      url: '/support',
      icon: 'home'
    },

    {
      title: 'Scheduled-pickups',
      url: '/scheduled-pickups',
      icon: 'clock',
      type: 2
    },

    {
      title: 'Pickups',
      url: '/pickup',
      icon: 'clock',
      type: 1
    },

    {
      title: 'Settings',
      url: '/settings',
      icon: 'settings'
    },

    {
      title: 'Profile',
      url: '/profile',
      icon: 'contact'
    },  
  ];
  whoIsLoggedIn: number;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public authservice: AuthService,
    public fcm: FCM,
    public fcmNative: FcmService,
    public toastCtrl: ToastController, 
    private router: Router,
    private menuCtrl: MenuController
  ) {
    this.initializeApp();
    // this.whoIsLoggedIn = this.authservice.type;
    // console.log(this.authservice.type);
  }

  ngOnInit(){
    // this.router.events.subscribe((event: RouterEvent)=>{
    //   if(event instanceof NavigationEnd && event.url === '/login'){
    //     this.menuCtrl.enable(false);
    //   }
    // })
    this.whoIsLoggedIn = this.authservice.type;
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // this.fcm.getToken().then(token=>{
      //   console.log(token);
      // });

      // this.fcm.onTokenRefresh().subscribe(token=>{
      //   console.log("Refreshed " + token);
      // })

      // this.fcm.onNotification().subscribe(data=>{
      //   console.log(data);
      //   if(data.wasTapped){
      //     console.log("Received in Background");
      //   }else{
      //     this.showToaster(data);
      //   }
      // })

      this.fcmNative.getToken();

      this.fcmNative.listenToNotifications().pipe(
        tap(msg=>{
          console.log("Notification Message.body from root>>> ", msg);
          console.log("Whole Notification>>> ", msg);
          this.showToaster(msg);
        })
      )
      .subscribe();
    });
  }

  async showToaster(msg){
    const toast = await this.toastCtrl.create({
      message:msg.body,
      duration: 3000
    });
    toast.present();
  }
}
