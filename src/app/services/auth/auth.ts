import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserCreds } from '../../../models/usercreds';
import { FcmService } from '../../services/fcm/fcm.service';
import * as firebase from 'firebase'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  type : any;
  phoneNumber: any;
  name: any; 

  isLogin: boolean = false;
  firedata = firebase.database().ref('/users');
  firetokens = firebase.database().ref('/tokens');
  constructor(private afAuth: AngularFireAuth) { }


  login(user: UserCreds){
    return new Promise((resolve, reject)=>{
      this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password).then(()=>{
        this.firedata.child(firebase.auth().currentUser.uid).once('value', (snapshot)=>{
          this.type = snapshot.val().type;
          console.log("this.type>>>", this.type);
          console.log("snapshot>> ", snapshot.val().type);
          this.phoneNumber = snapshot.val().phoneNumber;
          this.name = snapshot.val().name;
        }).then(()=>{
          this.isLogin = true;
          resolve(true);
        }).catch(err=>{
          reject(err);
        })
      }).catch(err=>{
        reject(err);
      })
    })
  }


  logout(){
    return new Promise((resolve, reject)=>{
      this.afAuth.auth.signOut().then(()=>{
        this.isLogin = false;
        resolve(true);
      })
    })
  }
}
