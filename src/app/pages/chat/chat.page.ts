import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { ChatService } from '../../services/chat/chat.service';
import { IonContent, Events } from '@ionic/angular'
import { RequestsService } from '../../services/request/requests.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild('content') content: IonContent;
  newmessage;
  customer;
  photoURL;
  allmessages = [];
  constructor(public chatservice: ChatService, public requestservice: RequestsService, public events: Events,
    public zone: NgZone) {
    
      this.customer = this.requestservice.customer;
      if (this.customer !== undefined) {
      console.log("Fetched Customer>>>", this.customer);
      console.log("The customer>>>", this.customer.uid);

      this.photoURL = firebase.auth().currentUser.photoURL;
      this.scrollto();
      this.events.subscribe('newmessage', () => {
        this.allmessages = [];
        this.zone.run(() => {
          this.allmessages = this.chatservice.customerMessages;
          this.scrollto();
        })
      })
    }else{
      console.log("No new messages");
    }

  }

  ionViewWillEnter(){
    this.chatservice.getCustomerMessages();    
  }

  ngOnInit() {
  }

  scrollto(){
    setTimeout(()=>{
      this.content.scrollToBottom();
    },1000);
  }

  addmessage() {
    this.chatservice.addNewMessage(this.newmessage).then(() => {
      this.content.scrollToBottom();
      this.newmessage = '';
    }).catch(err => {
      console.log("Error>>>", err);
    })
  }
}
