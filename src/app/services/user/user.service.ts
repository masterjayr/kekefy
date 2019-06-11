import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase'
import { FcmService } from '../../services/fcm/fcm.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  firedata = firebase.database().ref('/users');
  type: number;
  firetokens = firebase.database().ref('/tokens');
  constructor(public afAuth: AngularFireAuth, private fcm: FcmService) {

  }

  AddRiderUser(newuser){
    return new Promise((resolve, reject)=>{
      this.afAuth.auth.createUserWithEmailAndPassword(newuser.email, newuser.password).then(()=>{
        this.afAuth.auth.currentUser.updateProfile({
          displayName: newuser.displayName,
          photoURL: 'https://firebasestorage.googleapis.com/v0/b/kekefy-24691.appspot.com/o/blank-profile-picture-973460_960_720.png?alt=media&token=c7e7da95-f369-4bae-863a-49130c61e247'
        }).then(()=>{
          this.firetokens.child(this.afAuth.auth.currentUser.uid).set({
            token: this.fcm.token || '',
            uid: firebase.auth().currentUser.uid
          }).then(()=>{
            this.firedata.child(this.afAuth.auth.currentUser.uid).set({
              displayName: newuser.displayName,
              photoURL: 'https://firebasestorage.googleapis.com/v0/b/kekefy-24691.appspot.com/o/blank-profile-picture-973460_960_720.png?alt=media&token=c7e7da95-f369-4bae-863a-49130c61e247',
              uid: this.afAuth.auth.currentUser.uid,
              name: newuser.name,
              address: newuser.address,
              phoneNumber: newuser.phoneNumber,
              park: newuser.park,
              plateNumber: newuser.plateNumber,
              type: newuser.type
          }).then(()=>{
            this.type = newuser.type
            let firepark = firebase.database().ref(newuser.park);
            firepark.child(firebase.auth().currentUser.uid).set({
              displayName: newuser.displayName,
              photoURL: 'https://firebasestorage.googleapis.com/v0/b/kekefy-24691.appspot.com/o/blank-profile-picture-973460_960_720.png?alt=media&token=c7e7da95-f369-4bae-863a-49130c61e247',
              uid: this.afAuth.auth.currentUser.uid,
              name: newuser.name,
              address: newuser.address,
              phoneNumber: newuser.phoneNumber
            }).then(()=>{
              resolve({success: true});
            }).catch((err)=>{
              reject(err);
            })
          }).catch((err)=>{
            reject(err);
          })
          }).catch(err=>{
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

  AddCustomerUser(newuser){
    return new Promise((resolve, reject)=>{
      this.afAuth.auth.createUserWithEmailAndPassword(newuser.email, newuser.password).then(()=>{
        this.afAuth.auth.currentUser.updateProfile({
          displayName: newuser.displayName,
          photoURL: 'https://firebasestorage.googleapis.com/v0/b/kekefy-24691.appspot.com/o/blank-profile-picture-973460_960_720.png?alt=media&token=c7e7da95-f369-4bae-863a-49130c61e247'
        }).then(()=>{
          this.firetokens.child(this.afAuth.auth.currentUser.uid).set({
            token: this.fcm.token || '',
            uid: firebase.auth().currentUser.uid
          }).then(()=>{
          this.firedata.child(this.afAuth.auth.currentUser.uid).set({
            photoURL: 'https://firebasestorage.googleapis.com/v0/b/kekefy-24691.appspot.com/o/blank-profile-picture-973460_960_720.png?alt=media&token=c7e7da95-f369-4bae-863a-49130c61e247',
            displayName: newuser.displayName,
            uid: this.afAuth.auth.currentUser.uid,
            name: newuser.name,
            email: newuser.email,
            phoneNumber: newuser.phoneNumber,
            type: newuser.type
        }).then(()=>{
          this.type = newuser.type;
          console.log("From Clicking customer reg>>>> ", this.type)
          resolve({success: true});
        }).catch((err)=>{
          reject(err);
        })
        }).catch((err)=>{
          reject(err);
        })
      }).catch(err=>{
        reject(err);
      })
    }).catch(err=>{
      reject(err);
    })
  })
}

  updateimage(imgurl){
    return new Promise((resolve, reject)=>{
      this.afAuth.auth.currentUser.updateProfile({
        displayName: this.afAuth.auth.currentUser.displayName,
        photoURL: imgurl,
      }).then(()=>{
        firebase.database().ref('/users/' + firebase.auth().currentUser.uid).update({
          displayName: this.afAuth.auth.currentUser.displayName,
          photoURL: imgurl,
          uid: firebase.auth().currentUser.uid
        }).then(()=>{
          resolve({success: true});
        }).catch(err=>{
          reject(err);
        })
      }).catch(err=>{
        reject(err);
      })
    })
  }

  getUserDetails(){
    return new Promise((resolve, reject)=>{
      this.firedata.child(firebase.auth().currentUser.uid).once('value', (snapshot)=>{
        resolve(snapshot.val());
      }).catch(err=>{
        reject(err);
      })
    })
  }

  passwordReset(email){
    return new Promise((resolve, reject)=>{
      firebase.auth().sendPasswordResetEmail(email).then(()=>{
        resolve({success: true});
      }).catch((err)=>{
        reject(err);
      })
    })
  }
}
