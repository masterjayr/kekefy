import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { RequestsService } from '../request/requests.service';
import { Events } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  customer; 
  firechats = firebase.database().ref('/chats');
  firetext = firebase.database().ref('/text');
  riderUid: any;
  customerMessages = [];
  riderMessages = [];
  constructor(public afAuth: AngularFireAuth, public request: RequestsService, public events: Events) {
      this.customer = this.request.customer;
  }

  addNewMessage(msg){
    return new Promise((resolve, reject)=>{
      this.firechats.child(firebase.auth().currentUser.uid).child(this.customer.uid).push({
        sentby: firebase.auth().currentUser.uid,
        message: msg,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      }).then(()=>{
        this.firechats.child(this.customer.uid).child(firebase.auth().currentUser.uid).push({
          sentby: firebase.auth().currentUser.uid,
          message: msg,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        }).then(()=>{
          resolve(true);
        }).catch((err)=>{
          reject(err);
        })
      }).catch((err)=>{
        reject(err);
      })
    })
  }


  addNewCusMessage(msg){
    let riderUid;
    return new Promise((resolve, reject)=>{
      this.firetext.child(firebase.auth().currentUser.uid).once('value', snap=>{
        riderUid =snap.val().uid
        console.log("riderUid>> ", riderUid);
      }).then(()=>{
        this.firechats.child(firebase.auth().currentUser.uid).child(riderUid).push({
          sentby: firebase.auth().currentUser.uid,
          message: msg,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        }).then(()=>{
          this.firechats.child(riderUid).child(firebase.auth().currentUser.uid).push({
            sentby: firebase.auth().currentUser.uid,
            message: msg,
            timestamp: firebase.database.ServerValue.TIMESTAMP
          }).then(()=>{
            resolve(true);
          }).catch((err)=>{
            reject(err);
          })
        }).catch((err)=>{
          reject(err);
        })
      }).catch((err)=>{
        reject(err);
      })
      })
  
  }

  getCustomerMessages(){
    let temp;
    this.firechats.child(firebase.auth().currentUser.uid).child(this.customer.uid).on('value', snapshot=>{
      this.customerMessages = [];
      temp = snapshot.val();
      for(var tempkey in temp){
        this.customerMessages.push(temp[tempkey]);
      }
      this.events.publish('newmessage');
    })
  }

  getMyMessagesAsCustomer(){
    this.firetext.child(firebase.auth().currentUser.uid).once('value', snapshot=>{
      this.riderUid = snapshot.val().uid;
      console.log("From get My Messages As Customer>>",snapshot.val().uid);
      console.log("Rider UID>>>", this.riderUid);
      this.firechats.child(snapshot.val().uid).child(firebase.auth().currentUser.uid).on('value', snap=>{
        console.log("My uid sending the message>>> ", firebase.auth().currentUser.uid);
        console.log("Snap.val() from GetmymessagesAsCustomer>>> ", snap.val());
        this.riderMessages = [];
        for(var tempkey in snap.val()){
          this.riderMessages.push(snap.val()[tempkey]);
        }
        console.log("Rider Messages>>> ", this.riderMessages)
        this.events.publish('newmessage');
      })
    }).catch(err=>{
      console.log("Error>>> ", err);
    });
   
  }

}


