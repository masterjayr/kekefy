import { Component, OnInit, NgZone } from '@angular/core';
import { ImghandlerService } from '../../services/imghandler/imghandler.service';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from 'src/app/services/auth/auth';
import { NavController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-profilepic',
  templateUrl: './profilepic.page.html',
  styleUrls: ['./profilepic.page.scss'],
})
export class ProfilepicPage implements OnInit {
  imgurl = 'https://firebasestorage.googleapis.com/v0/b/kekefy-24691.appspot.com/o/blank-profile-picture-973460_960_720.png?alt=media&token=c7e7da95-f369-4bae-863a-49130c61e247'
  moveon :boolean= true;
  whoIsLoggedIn: number;
  constructor(private imgService: ImghandlerService, private zone: NgZone, private userService: UserService,
              private authService: AuthService, private nav: NavController, private loadingCtrl: LoadingController) {
                this.whoIsLoggedIn = this.userService.type;
                console.log(this.userService.type);
              }

  ngOnInit() {
  }

  async chooseImg(){
    let loader = await this.loadingCtrl.create({
      message: 'Please wait...',
    })
    loader.present();
    this.imgService.uploadImage().then((uploadedurl: any)=>{
      loader.dismiss();
      this.zone.run(()=>{
        this.imgurl = uploadedurl;
        this.moveon = false;
      })
    })
  }

  async updateProceed(){
    let loader = await this.loadingCtrl.create({
      message: 'Please wait...',
    })
    loader.present();
    this.userService.updateimage(this.imgurl).then((res:any)=>{
      loader.dismiss();
      if(res.success){
        if(this.whoIsLoggedIn === 1){
          this.nav.navigateForward('/pickup');
        }else if(this.whoIsLoggedIn === 2){
          this.nav.navigateForward('menu/request');
        }
      }else{
        alert("Couldn't Upload image " + res)
      }
    })
  }

  proceed(){
    console.log(this.whoIsLoggedIn);
    if(this.whoIsLoggedIn === 1){
      this.nav.navigateForward('menu/tabrider/tabrider/pickup');
    }else if(this.whoIsLoggedIn === 2){
      console.log(this.whoIsLoggedIn);
      this.nav.navigateForward('menu/request');
    }
  }
}
