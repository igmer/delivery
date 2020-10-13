import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/models.model';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { Base64 } from '@ionic-native/base64/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-news-edit',
  templateUrl: './admin-news-edit.page.html',
  styleUrls: ['./admin-news-edit.page.scss'],
})
export class AdminNewsEditPage implements OnInit {

 
  name;
  img;
  id: any;

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
    private authService: AuthService) {

      this.id = this.actRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
  this.getNewsById(this.id)
  }


  ionViewDidEnter() {

  }

  async getNewsById(id: string) {
    let loader = this.loadingCtrl.create({
      message: "Por favor espere...",
    });
    (await loader).present();

    this.firestore.doc('news/' + id)
      .valueChanges()
      .subscribe(data => {
        this.name = data['name'];
        this.img = data['img']      

      });
    (await loader).dismiss();

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
        this.img = await ref.getDownloadURL();
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
    let task = this.storage.ref(this.id+ "/" +this.id).putString(this.croppedImage, "data_url");

    task.snapshotChanges().subscribe(snap => {
      this.percent = ((snap.bytesTransferred / snap.totalBytes) * 100).toString().split(".")[0];
      task.then(async () => {
        this.isUploadStart = false;        
        this.loadCloudFiles(this.id);
        this.showToast('Imagen cargada con éxito');  
   })  
 })
  }

  
  async updateNews() {

    if (this.formValidation()) {
      let loader = this.loadingCtrl.create({
        message: "Por favor espere...",

      });
      (await loader).present();


      try {
        await this.firestore.doc('news/' + this.id).update({
          name: this.name,      
          img: this.img
        
        });       

      } catch (e) {
        this.showToast(e);
      }

      (await loader).dismiss();
      this.navCtrl.navigateRoot('admin-news-list');
      this.showToast('Anuncio actualizado con éxito.');

    }
  }

  formValidation() {
    if (!this.name) {
      this.showToast('Introduzca el título del anuncio');
      return false;
    }

    if (!this.img) {
      this.showToast('Seleccione la imagen del anuncio');
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
