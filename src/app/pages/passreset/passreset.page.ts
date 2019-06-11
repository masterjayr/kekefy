import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-passreset',
  templateUrl: './passreset.page.html',
  styleUrls: ['./passreset.page.scss'],
})
export class PassresetPage implements OnInit {
  email: string = ""
  constructor(private nav: NavController, private alertCtrl: AlertController, private userService: UserService,
              private toastCtrl: ToastController) { }

  ngOnInit() {
  }

  
  async showToast(msg){
    let toaster = await this.toastCtrl.create({
      message: msg,
      duration: 3000
    })
    toaster.present();
  }

  reset(){
    if(this.email == ""){
      this.showToast("Email field cannot be empty!");
    }else{
      this.userService.passwordReset(this.email).then((res:any)=>{
        if(res.success){
          console.log(res.success);
          this.setAlert("Email Sent", "Please follow the instructions in the email to reset your password");
        }
      }).catch(err=>{
        this.setAlert("Failed!", `Error message${err}`);
      })
    }
  }

  async setAlert(header: string, subheader: string){
    let alert  = await this.alertCtrl.create({
      buttons: ['OK'],
      header: header,
      subHeader: subheader
    })
    alert.present();
  }
  
  goBack(){
    this.nav.navigateRoot('/login');
  }
}
