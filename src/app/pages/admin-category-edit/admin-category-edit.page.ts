import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController, AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { Base64 } from '@ionic-native/base64/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase/app';
import { Category } from '../../models/models.model';

@Component({
  selector: 'app-admin-category-edit',
  templateUrl: './admin-category-edit.page.html',
  styleUrls: ['./admin-category-edit.page.scss'],
})
export class AdminCategoryEditPage implements OnInit {

  category = {} as Category;
  
  croppedImage: string;
  percent;
  isUploadStart = false;
  cloudFiles = [];

  constructor(private actRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private firestore: AngularFirestore,
    private navCtrl: NavController,
    private camera: Camera,
    private base64: Base64,
    private crop: Crop,
    private storage: AngularFireStorage,
    private alertCtrl: AlertController) {

    this.category.id = this.actRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getCategoryById(this.category.id); 
  }

  
  async getCategoryById(id: string) {
    let loader = this.loadingCtrl.create({
      message: "Por favor espere...",
    });
    (await loader).present();

    this.firestore.doc('categorys/' + id)
      .valueChanges()
      .subscribe(data => {
        this.category.name = data['name'];
        this.category.description = data['description'];
        this.category.img = data['img']      

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
        this.category.img = await ref.getDownloadURL();
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
    let task = this.storage.ref(this.category.id+ "/" +this.category.id).putString(this.croppedImage, "data_url");

    task.snapshotChanges().subscribe(snap => {
      this.percent = ((snap.bytesTransferred / snap.totalBytes) * 100).toString().split(".")[0];
      task.then(async () => {
        this.isUploadStart = false;        
        this.loadCloudFiles(this.category.id);
        this.showToast('Imagen cargada con éxito');  
   })  
 })
  }

  

  async updateCategory(category: Category) {
  const id = this.category.id
  const name = this.category.name
    if (this.formValidation()) {
      let loader = this.loadingCtrl.create({
        message: "Por favor espere...",
      });
      (await loader).present();
      try {
        await this.firestore.doc('categorys/' + this.category.id).update(category);

        this.firestore.firestore.collection('products').get().then(function(querySnapshot) {
          querySnapshot.query.where('category', '==', id).get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
              doc.ref.update({
                categoryName: name
              })
            })
          })
      });
    
      } catch (e) {
        this.showToast(e);
      }

      (await loader).dismiss();

      this.navCtrl.navigateRoot('/admin-category-list');
      this.showToast('Categoría actualizada con éxito');
    }
  }

  formValidation() {
    if (!this.category.name) {
      this.showToast('Introduzca el nombre de la categoría');
      return false;
    }

    if (!this.category.img) {
      this.showToast('Seleccione una imagen para la categoría');
      return false;
    }

    if (!this.category.description) {
      this.showToast('Ingrese una descripción para la categoría');
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