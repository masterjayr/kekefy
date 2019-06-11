import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../../services/request/requests.service';
import { Events, NavController } from '@ionic/angular';

@Component({
  selector: 'app-pickup',
  templateUrl: './pickup.page.html',
  styleUrls: ['./pickup.page.scss'],
})
export class PickupPage implements OnInit {
  allrequests;
  constructor(public requestService: RequestsService, public events: Events, private nav:NavController) {
    this.events.subscribe('requests', ()=>{
      this.allrequests = [];
      this.allrequests = this.requestService.allrequests;
      console.log(this.requestService.allrequests);
    })
    console.log("Global>>>", this.allrequests)
   }

  ngOnInit() {
   
  }

  ionViewWillEnter(){
    this.requestService.getAllRequests();
  }

  ionViewDidLeave(){
    this.events.unsubscribe('requests');
  }

  acceptRequest(request){
    console.log("This is the request>>>", request);
    this.requestService.acceptRequest(request).then(()=>{
        this.nav.navigateForward('menu/tabrider/tabrider/chats');
    }).catch(err=>{
      console.log("This is the acceptance error",err);
    })
  }

}
