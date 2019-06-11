import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { ChatService } from 'src/app/services/chat/chat.service';
import { RequestsService } from 'src/app/services/request/requests.service';
import * as firebase from 'firebase';
import { Events, IonContent } from '@ionic/angular';

@Component({
  selector: 'app-cuschat',
  templateUrl: './cuschat.page.html',
  styleUrls: ['./cuschat.page.scss'],
})
export class CuschatPage implements OnInit {
  @ViewChild('content') content: IonContent;
  firetext = firebase.database().ref('/text');
  rider: any;
  photoURL: string;
  allmessages;
  newmessage;
  constructor(private chatservice: ChatService, private requestservice: RequestsService, private events: Events,
    private zone: NgZone) {
    this.firetext.child(firebase.auth().currentUser.uid).once('value', snapshot => {
      console.log("Fire texts >>> ", snapshot.val());
      console.log("Called");
      this.rider = snapshot.val();
        console.log("Riders Info sending message to>>>> ", this.rider)
        if (this.rider !== undefined) {
          console.log("Fetched Customer>>>", this.rider);
          console.log("The customer>>>", this.rider.uid);
          this.photoURL = firebase.auth().currentUser.photoURL;
          this.scrollto();
          console.log("Photo URL >>>", this.photoURL)
          this.events.subscribe('newmessage', () => {
            this.allmessages = [];
            this.zone.run(() => {
              this.allmessages = this.chatservice.riderMessages;
            })
          })
        } else {
          console.log("No new messages");
        }
    })

  }


  ionViewWillEnter(){
    this.chatservice.getMyMessagesAsCustomer();
  }

  ngOnInit() {
    
  }

  scrollto(){
    setTimeout(()=>{
      this.content.scrollToBottom();
    },1000);
  }

  addmessage(){
    console.log("Add message method called>>> ", this.newmessage)
    console.log(this.newmessage);
    this.chatservice.addNewCusMessage(this.newmessage).then(() => {
      this.content.scrollToBottom;
      this.newmessage = '';
    }).catch(err => {
      console.log("Error>>>", err);
    })
  }
}
