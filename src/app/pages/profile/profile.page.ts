import { Component, OnInit, NgZone } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../services/auth/auth';
import { ImghandlerService } from '../../services/imghandler/imghandler.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  avatar: string;
  displayName: string;
  constructor(public userservice: UserService, public authservice: AuthService, private zone: NgZone,
              public nav: NavController, private imghandler: ImghandlerService) { }

  ngOnInit() {
    this.loadUserdetails();
  }

  editImage(){
    this.imghandler.uploadImage().then((url:any)=>{
      this.userservice.updateimage(url).then((res:any)=>{
        if(res.success){
          this.zone.run(()=>{
            this.avatar = url;
          })
        }
      })
    })
  }

  loadUserdetails(){
    this.userservice.getUserDetails().then((res:any)=>{
      this.displayName = res.displayName;
      this.zone.run(()=>{
        this.avatar = res.photoURL;
      })
    })
  }

  logout(){
    this.authservice.logout().then((res: any)=>{
      if(res){
        this.nav.navigateBack('/home');
      }
    })
  }

  
}
