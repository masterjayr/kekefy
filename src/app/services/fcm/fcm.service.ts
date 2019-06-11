import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Platform } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class FcmService {
  firetokens = firebase.database().ref('/tokens');
  token;
  constructor(public firebaseNative: Firebase,
              public afs: AngularFirestore,
              public platform: Platform) { 
                
              }

              //Get permission from user
              async getToken(){
                let token;
                if(this.platform.is('android')){
                  token = await this.firebaseNative.getToken();
                  console.log(token);
                  this.token = token;
                }

                if(this.platform.is('ios')){
                  token = this.firebaseNative.getToken();
                  await this.firebaseNative.grantPermission();
                  console.log(token);
                  this.token = token;
                }
              }

              // private saveTokenToFirebase(token){
              //   if(!token) return;

                // const devicesRef = this.afs.collection('devices');

                // const docData = {
                //   token,
                //   userId: 'testUser'
                // }

                // return devicesRef.doc(token).set(docData);

              //   return this.firetokens.child('devices').set({
              //     token: token,
              //     uid: ''
              //   }).then(()=>{
              //     console.log("Token set");
              //   })
              // }


              listenToNotifications(){
                return this.firebaseNative.onNotificationOpen()
              }
}
