import { Component, OnInit } from '@angular/core';
import { User } from '../../models/models.model';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController, Platform } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { Base64 } from '@ionic-native/base64/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from 'src/app/services/auth.service';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-complete-user-data',
  templateUrl: './complete-user-data.page.html',
  styleUrls: ['./complete-user-data.page.scss'],
})
export class CompleteUserDataPage implements OnInit {

  user = {} as User;  
  uid: any;
 
  cloudFiles = [];
  croppedImage: string;
  percent;
  isUploadStart = false;

  constructor(private actRoute: ActivatedRoute,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private firestore: AngularFirestore,
              private navCtrl: NavController,
              private auth: AngularFireAuth,
              private camera: Camera,
              private base64: Base64,
              private crop: Crop,        
              private storage: AngularFireStorage,
              private authService: AuthService,
              private notifications: NotificationsService) {

  
     }
  
    ngOnInit() {

      this.authService.getUserAuth().subscribe(u => {
        this.uid = u.uid
        this.user.name = u.displayName
        this.user.email = u.email
      })

    }



  
    async loadCloudFiles(id) {
      let loader = await this.loadingCtrl.create({
        message: "Por favor espere...",
      });
  
      loader.present();
  
      try{
      const storageRef = firebase.storage().ref(id)
      storageRef.listAll().then(result => {
        result.items.forEach(async ref => {
          this.cloudFiles.push({
            name: ref.name,
            full: ref.fullPath,
            url: await ref.getDownloadURL(),
            ref: ref
          });
          this.user.photo = await ref.getDownloadURL();
        });
        loader.dismiss(); 
      });
    }
    catch(e){
      loader.dismiss();
      this.showToast(e);
    }
    }
  

    chooseImage(){
      let options: CameraOptions = {
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        destinationType: this.camera.DestinationType.FILE_URI
      };
      this.camera.getPicture(options).then(filePath => {
        this.crop.crop(filePath).then((croppedPath) => {
          this.base64.encodeFile(croppedPath).then(base64Data => {
  
            let temp = base64Data.substring(34);
            this.croppedImage = 'data:image/jpeg;base64,' + temp;
  
            setTimeout(() => {
              document.getElementById("image").setAttribute("src", this.croppedImage);
            }, 250); 
                          
            this.uploadImage();
          })
        })
      })
    }
  
    uploadImage(){
      this.isUploadStart = true;
      let task = this.storage.ref(this.uid+"/"+this.uid).putString(this.croppedImage, "data_url");
  
      task.snapshotChanges().subscribe(snap =>{
        this.percent = ((snap.bytesTransferred/snap.totalBytes)*100).toString().split(".")[0];     
        task.then(async () => {                   
          this.isUploadStart = false;        
          this.loadCloudFiles(this.uid);
          this.showToast('Imagen cargada con éxito');  
     })  
   })
    }
  
  
    async createUser(){ 
      if(this.formValidation()){
        let loader =  this.loadingCtrl.create({
          message: "Por favor espere...",
    
        });
       (await loader).present();
  
  
       try{
         if(!this.user.photo){
        await this.firestore.doc('users/' + this.uid).set({
          name: this.user.name,
          email: this.user.email,      
          address: this.user.address,
          phonenumber: this.user.phonenumber, 
          notifications: 0,
          purchases: 0,     
          token: '',
          photo: '' 
        });
      }

      if(this.user.photo){
        await this.firestore.doc('users/' + this.uid).set({
          name: this.user.name,
          email: this.user.email,         
          address: this.user.address,
          phonenumber: this.user.phonenumber,
          notifications: 0,   
          purchases: 0,      
          token: '',
          photo: this.user.photo 
        });
      }

      await this.firestore.doc('roles/' + this.uid).set({
         role: 'user'
      });

        await this.auth.auth.currentUser.updateProfile({
          displayName: this.user.name
        })

      }catch(e){
       this.showToast(e);
      }  
      (await loader).dismiss();   

      this.navCtrl.navigateRoot('store-home');
      this.showToast('Bienvenido,' + ' ' + this.user.name);
      this.notifications.NewUser(this.uid, this.user.name);

      }
  
  
    }
  
    formValidation(){
      if(!this.user.name){
        this.showToast('Introduzca un nombre');
        return false;
      }
 
    
      if (!this.user.phonenumber) {
        this.showToast('Introduzca un número de teléfono');
        return false;
      }
  
      
      if(!this.user.address){
        this.showToast('Introduzca una dirección');
        return false;
      } 
      return true;
      
    }
  
  
    showToast(message: string) {
      this.toastCtrl.create({
        cssClass: 'toast',
        message: message,
        duration: 800
      }).then(toastData => toastData.present());
    }

}