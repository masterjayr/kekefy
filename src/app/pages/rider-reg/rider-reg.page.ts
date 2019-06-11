import { Component, OnInit } from '@angular/core';
import { NavComponent } from '@ionic/core';
import { NavController, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { UserService } from '../../services/user/user.service';
@Component({
  selector: 'app-rider-reg',
  templateUrl: './rider-reg.page.html',
  styleUrls: ['./rider-reg.page.scss'],
})
export class RiderRegPage implements OnInit {
  riderUser = {
    name: '',
    displayName: '',
    email: '',
    password: '',
    phoneNumber: '',
    park: '',
    plateNumber: '',
    type: 1
  }

  carbrand;
  constructor(private navCtrl: NavController, public userservice: UserService, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, public toastCtrl: ToastController) { }

  ngOnInit() {

  }

  onChange(selectedValue) {
    console.log("Selected park", selectedValue);
    console.log(this.riderUser.park);
  }

  async riderReg() {
    const loader = await this.loadingCtrl.create({
      message: "Please Wait"
    })
    const alert = await this.alertCtrl.create({
      header: "Alert",
      subHeader: "Registration Status",
      message: "You have been successfully registered",
      buttons: ['OK']
    })
    if(this.riderUser.name == '' || this.riderUser.email == ''|| this.riderUser.password == ''|| this.riderUser.phoneNumber == '')  {
      this.showToast("Please enter all fields");
    }else if(this.riderUser.phoneNumber.length < 11 ){
      this.showToast("Enter a valid Phone Number");
    }else{
      loader.present();
    this.userservice.AddRiderUser(this.riderUser).then((res: any)=>{
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

  backToLogin() {
    this.navCtrl.navigateBack('/home');
  }

  async showAlert(msg) {
    let alert = await this.alertCtrl.create({
      header: "Alert",
      message: msg,
      buttons: ['OK']
    })
    alert.present();
  }


  async showToast(msg) {
    const toaster = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: "top",
    })
    toaster.present();
  }
}
