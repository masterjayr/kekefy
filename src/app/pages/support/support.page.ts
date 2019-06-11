import { Component, OnInit, NgZone } from '@angular/core';
import { ImghandlerService } from 'src/app/services/imghandler/imghandler.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {
  complain = {
    title: '',
    description: '',
    imgUrl: ''
  }
  constructor(private imgHandler: ImghandlerService, private zone: NgZone, private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  async chooseScreenshot(){
    const loader = await this.loadingCtrl.create({
      message: "fetching",
      spinner: "dots"
    })
    loader.present();
    this.imgHandler.uploadScreen().then((res: any)=>{
      loader.dismiss();
      this.zone.run(()=>{
        this.complain.imgUrl = res;
      })
    })
  }

}
