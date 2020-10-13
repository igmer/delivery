import { Component, OnInit } from '@angular/core';
import { User } from '../../models/models.model';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { Base64 } from '@ionic-native/base64/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { NotificationsService } from "../../services/notifications.service";
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-admin-user-edit',
  templateUrl: './admin-user-edit.page.html',
  styleUrls: ['./admin-user-edit.page.scss'],
})
export class AdminUserEditPage implements OnInit {
  user = {} as User;
  id: any;

  cloudFiles = [];
  croppedImage: string;
  percent;
  isUploadStart = false
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
    private notifications: NotificationsService) {

    this.id = this.actRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getUserById(this.id);
    this.getRoleById(this.id);
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


  chooseImage() {
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

  uploadImage() {
    this.isUploadStart = true;
    let task = this.storage.ref(this.id + "/" + this.id).putString(this.croppedImage, "data_url");

    task.snapshotChanges().subscribe(snap => {
      this.percent = ((snap.bytesTransferred / snap.totalBytes) * 100).toString().split(".")[0];
      task.then(async () => {
        this.isUploadStart = false;        
          this.loadCloudFiles(this.id);
          this.showToast('Imagen cargada con éxito');  
     })  
   })
  }


  async getUserById(id: string) {
    let loader = this.loadingCtrl.create({
      message: "Por favor espere...",
    });
    (await loader).present();
    this.firestore.doc('users/' + id)
      .valueChanges()
      .subscribe(data => {
        this.user.name = data['name'];     
        this.user.address = data['address'];
        this.user.phonenumber = data['phonenumber'];  
        this.user.photo = data['photo'];     
      });
    (await loader).dismiss();
  }


  async getRoleById(id: string) {
    let loader = this.loadingCtrl.create({
      message: "Por favor espere...",
    });
    (await loader).present();
    this.firestore.doc('roles/' + id)
      .valueChanges()
      .subscribe(data => {
        this.user.role = data['role'];     
            
      });
    (await loader).dismiss();
  }


  async updateUser(user: User) {
    if (this.formValidation()) {
      let loader = this.loadingCtrl.create({
        message: "Por favor espere...",

      });
      (await loader).present();


      try {

        if(!this.user.photo){
          await this.firestore.doc('users/' + this.id).update({
          name: this.user.name,
          address: this.user.address,
          phonenumber: this.user.phonenumber          
        });
        }else{
          await this.firestore.doc('users/' + this.id).update({
            name: this.user.name,
            address: this.user.address,
            phonenumber: this.user.phonenumber,
            photo: this.user.photo          
          });
        }   

        await this.firestore.doc('roles/' + this.id).update({
          role: this.user.role
        });

        if(this.user.role == 'delivery'){
          var users = this.firestore.collection('users').doc(this.id);

      var removePurchases = users.update({
       purchases: firebase.firestore.FieldValue.delete(),
       onWait: false,
       orders: 0,
       admin: firebase.firestore.FieldValue.delete()
      });
        }

        if(this.user.role == 'user'){
          var users = this.firestore.collection('users').doc(this.id);

      var removePurchases = users.update({
       purchases: 0,
       onWait: firebase.firestore.FieldValue.delete(),
       orders: firebase.firestore.FieldValue.delete(),
       admin: firebase.firestore.FieldValue.delete()
      });
        }


        if(this.user.role == 'admin'){

          await this.firestore.doc('users/' + this.id).update({
            admin: true               
          });

          var users = this.firestore.collection('users').doc(this.id);

      var removePurchases = users.update({
       purchases: firebase.firestore.FieldValue.delete()      
      });
        }

      } catch (e) {
        this.showToast(e);
      }

      (await loader).dismiss();


      this.navCtrl.navigateRoot('admin-user-profile/' + this.id);


    }


  }

  formValidation() {
    if (!this.user.name) {
      this.showToast('Introduzca un nombre');
      return false;
    }

    if (!this.user.phonenumber) {
      this.showToast('Introduzca un número de teléfono');
      return false;
    } 

    if (!this.user.address) {
      this.showToast('Introduzca una dirección');
      return false;
    }
    return true;

  }


  showToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 1500
    }).then(toastData => toastData.present());
  }

}
