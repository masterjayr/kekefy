import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx'

import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class ImghandlerService {
  firestore = firebase.storage();
  nativePath: any;

  constructor(private file: File, private fileChooser: FileChooser) {

  }

  uploadImage(){
    return new Promise((resolve, reject)=>{
      this.fileChooser.open().then((url)=>{
        (<any>window).FilePath.resolveNativePath(url, (result)=>{
          this.nativePath = result;
          (<any>window).resolveLocalFileSystemURL(this.nativePath, (res)=>{
            res.file((resFile)=>{
              var reader = new FileReader();
              reader.readAsArrayBuffer(resFile);
              reader.onloadend = (evt: any)=>{
                var imgBlob = new Blob([evt.target.result], {type: 'image/jpeg'});
                var imageStore =  this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid);
                imageStore.put(imgBlob).then((res)=>{
                  this.firestore.ref('/profileimages').child(firebase.auth().currentUser.uid).getDownloadURL().then((url)=>{
                    resolve(url);
                  }).catch((err)=>{
                    reject(err);
                  })
                }).catch(err=>{
                  reject(err);
                })
              }
            })
          })
        })
      }).catch((err)=>{
        reject(err);
      })
    })
  }


  uploadScreen(){
    return new Promise((resolve, reject)=>{
      this.fileChooser.open().then((url)=>{
        (<any>window).FilePath.resolveNativePath(url, (result)=>{
          this.nativePath = result;
          (<any>window).resolveLocalFileSystemURL(this.nativePath, (res)=>{
            res.file((resFile)=>{
              var reader = new FileReader();
              reader.readAsArrayBuffer(resFile);
              reader.onloadend = (evt: any)=>{
                var imgBlob = new Blob([evt.target.result], {type: 'image/jpeg'});
                var imageStore =  this.firestore.ref('/support').child(firebase.auth().currentUser.uid);
                imageStore.put(imgBlob).then((res)=>{
                  this.firestore.ref('/support').child(firebase.auth().currentUser.uid).getDownloadURL().then((url)=>{
                    resolve(url);
                  }).catch((err)=>{
                    reject(err);
                  })
                }).catch(err=>{
                  reject(err);
                })
              }
            })
          })
        })
      }).catch((err)=>{
        reject(err);
      })
    })
  }
}
