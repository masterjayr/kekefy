import { Component, OnInit } from '@angular/core';
import { FcmService } from 'src/app/services/fcm/fcm.service';
import { ToastController } from '@ionic/angular';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  notification: any;
  constructor(private fcm: FcmService, private toastCtrl: ToastController) {
      this.fcm.getToken();
      this.fcm.listenToNotifications().pipe(
        tap(msg=>{
          console.log("Notification Message>>> ", msg);
          this.notification = msg;
          this.showToaster(msg);
        })
      )
      .subscribe();
   }

  ngOnInit() {
  }

  async showToaster(msg){
  const toast = await this.toastCtrl.create({
    message:msg.body,
    duration: 3000
  });
  toast.present();
}

}
