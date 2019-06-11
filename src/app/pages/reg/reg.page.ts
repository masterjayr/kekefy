import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';


@Component({
  selector: 'app-reg',
  templateUrl: './reg.page.html',
  styleUrls: ['./reg.page.scss'],
})
export class RegPage implements OnInit {

  customerUser = {
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    type: 2
  }
  constructor(private navCtrl: NavController, private router: Router, public userservice: UserService, public loadingCtrl: LoadingController,
              public alertCtrl: AlertController) { }

  ngOnInit() {
  }

  async customerReg() {
    const loader =  await this.loadingCtrl.create({
      message: "Please wait",
    })

    const alert = await this.alertCtrl.create({
      header: "Alert",
      subHeader: "Registration Status",
      message: "You have been successfully registered",
      buttons: ['OK']
    })
    if(this.customerUser.name == '' || this.customerUser.email == ''|| this.customerUser.password == ''|| this.customerUser.phoneNumber == '')  {
      this.showAlert("Please enter all fields");
    }else if(this.customerUser.phoneNumber.length < 11 ){
      this.showAlert("Enter a valid Phone Number");
    }
    loader.present();
    this.userservice.AddCustomerUser(this.customerUser).then((res: any)=>{
      if(res.success){
        loader.dismiss();
        alert.present();
        this.navCtrl.navigateForward('/request');
      }
    }).catch(err=>{
      console.error(err);
    })
  }

  riderReg(){
    this.navCtrl.navigateForward('/rider-reg');
  }

  async showAlert(msg){
    let alert = await this.alertCtrl.create({
      header: "Alert",
      message: msg,
      buttons: ['OK']
    })
    alert.present();
  }

  backToLogin(){
    this.navCtrl.navigateBack('/login');
  }

}
