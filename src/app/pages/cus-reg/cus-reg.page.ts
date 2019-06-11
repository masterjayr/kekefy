import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-cus-reg',
  templateUrl: './cus-reg.page.html',
  styleUrls: ['./cus-reg.page.scss'],
})
export class CusRegPage implements OnInit {
  customerUser = {
    name: '',
    displayName: '',
    email: '',
    password: '',
    phoneNumber: '',
    type: 2
  }

  constructor(private navCtrl: NavController, private router: Router, public userservice: UserService, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, public toastCtrl: ToastController) { }

  ngOnInit() {
  }

  async customerReg() {
    console.log('i was called');
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
      this.showToast("Please enter all fields");
    }else if(this.customerUser.phoneNumber.length < 11 ){
      this.showToast("Enter a valid Phone Number");
    }else{
      loader.present();
    this.userservice.AddCustomerUser(this.customerUser).then((res: any)=>{
      if(res.success){
        loader.dismiss();
        this.navCtrl.navigateForward('/menu/profilepic');
        alert.present();
      }
    }).catch(err=>{
      loader.dismiss();
      console.error(err);
      this.showAlert(`Error occured ${err} Try Again`);
    })
    } 
  }

  async showAlert(msg){
    let alert = await this.alertCtrl.create({
      header: "Alert",
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
  backToLogin(){
    this.navCtrl.navigateBack('home');
  }

}
