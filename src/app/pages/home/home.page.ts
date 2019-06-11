import { Component, OnInit } from '@angular/core';
import { } from '@ionic-native/geolocation';
import { NavController, LoadingController, ToastController, AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth/auth';
import { UserCreds } from '../../../models/usercreds';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  User = {} as UserCreds;
  isLoggedIn: boolean;
  type: any;

  customerUser = {
    email: '',
    password: '',
  }
  constructor(private navCtrl: NavController, public authService: AuthService, public router: Router,
    public loadingCtrl: LoadingController, private toastCtrl: ToastController,
    private authservice: AuthService, private alertCtrl: AlertController) {
    this.isLoggedIn = this.authService.isLogin;
    // this.type = this.authService.type;
    console.log("From constructor>>>",this.authService.type);
  }

  signUp() {
    this.navCtrl.navigateForward('/reg');
  }


  async login() {
    this.type = this.authservice.type;
    const loader = await this.loadingCtrl.create({
      message: "Please wait"
    })
    const toaster = await this.toastCtrl.create({
      message: "Log in successful",
      duration: 3000
    })
    const logintoaster = await this.toastCtrl.create({
      message: "All fields are required!",
      duration: 3000
    })
    if (this.customerUser.email == '' || this.customerUser.password == '') {
      logintoaster.present();
    } else {
      loader.present();
      this.authservice.login(this.customerUser).then((res) => {
        if (res) {
          loader.dismiss();
          if (this.type === 1) {
            this.navCtrl.navigateForward('menu/tabrider/tabrider/pickup');
            console.log("type from login>>>", this.type);
            this.customerUser.email = '';
            this.customerUser.password = '';
            toaster.present();
          } else if(this.type === 2){
            this.navCtrl.navigateForward('menu/request');
            console.log("type from login>>>",this.type);
            this.customerUser.email =  '';
            this.customerUser.password = '';
            toaster.present();
          }
        }else{
          loader.dismiss();
          this.showAlert('An error Occured, Try Again!');
        }
      }).catch(err => {
        console.log(err);
        loader.dismiss();
        this.showAlert(`An error occured ${err} Try Again!`)
      })
    }
  }

    passwordReset(){
      this.navCtrl.navigateForward('passreset');
    }

    async showAlert(msg){
      let alert = await this.alertCtrl.create({
        header: "Error",
        message: msg,
        buttons: ['OK']
      })
      alert.present();
    }
    async showToast(msg){
      const toaster = await this.toastCtrl.create({
        message: msg,
        duration: 2000,
        position: 'top'
      })
    toaster.present();
    }
}
