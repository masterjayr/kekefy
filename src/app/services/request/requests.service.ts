import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../../services/auth/auth';
import * as firebase from 'firebase';



@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  fireuser = firebase.database().ref('/users');
  firereq = firebase.database().ref('/requests');
  firechat = firebase.database().ref('/chat');
  firetoken = firebase.database().ref('/tokens');
  firetextingWho = firebase.database().ref('/text');
  allrequests: Array<any>;
  photoURL: any;
  name: string;
  phoneNumber: any;
  temp;
  customer: any;
  token: string; 
  riderInfo:any;
  constructor(public afAuth: AngularFireAuth, public authService: AuthService, public events: Events) {

  }

  sendRequest(park){
    let newRequest
    return new Promise((resolve, reject)=>{
      this.fireuser.child(firebase.auth().currentUser.uid).once('value', snapshot=>{
        this.name = snapshot.val().name;
        this.photoURL = snapshot.val().photoURL;
      }).then(()=>{
        this.firetoken.child(firebase.auth().currentUser.uid).once('value', (snapshot)=>{
          this.token = snapshot.val().token;
      }).then(()=>{
          this.firereq.child(firebase.auth().currentUser.uid).push({
          name: this.name,
          uid: firebase.auth().currentUser.uid,
          photoURL: this.photoURL,
          location: park.location,
          destination: park.destination,
          attendedTo: false,
          park: park.closestPark,
          pushid: '' ,
          attendedToBy: '', 
          token: this.token
        }).then((res)=>{
          this.firereq.child(firebase.auth().currentUser.uid).child(res.key).update({
            pushid: res.key
          }).then(()=>{
            resolve({success: true});
          }).catch((err)=>{
            reject(err);
          })     
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
    
  getAllRequests(){
    let park;
    this.fireuser.child(firebase.auth().currentUser.uid).once('value', snapshot=>{
      park = snapshot.val().park;
      console.log(park);
    })
    this.firereq.on('value', snapshot=>{
      this.allrequests = [];
     snapshot.forEach((child)=>{
       child.forEach((snap)=>{
         if(snap.val().park === park){
           if(snap.val().attendedTo === false){
            this.allrequests.push(snap.val());
            console.log(this.allrequests); 
           }
         }
       })
     })
     this.events.publish('requests');
     console.log(this.allrequests);
    })
}


acceptRequest(request){
  return new Promise((resolve, reject)=>{
    this.customer = request;
    this.firereq.child(request.uid).child(request.pushid).update({
      attendedTo: true,
      attendedToBy: firebase.auth().currentUser.uid
    }).then(()=>{
      this.fireuser.child(firebase.auth().currentUser.uid).once('value', snapshot=>{
        this.riderInfo = snapshot.val();
        console.log("Rider Information from accepting Request snap>>> ", snapshot.val());
        console.log("Rider Information from accepting Request this.riderInfo>>> ", this.riderInfo);
      }).then(()=>{
        this.firetextingWho.child(request.uid).set(this.riderInfo).then(()=>{
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





}
