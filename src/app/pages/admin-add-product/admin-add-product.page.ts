import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/models.model';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-admin-add-product',
  templateUrl: './admin-add-product.page.html',
  styleUrls: ['./admin-add-product.page.scss'],
})
export class AdminAddProductPage implements OnInit {

  product = {} as Product;
  uid: any;

  cloudFiles = [];
  croppedImage: string;
  percent;
  isUploadStart = false;
  categorys: any;
  categoryName;
  constructor(private actRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private firestore: AngularFirestore,
    private router: Router,
    private auth: AngularFireAuth,
    private camera: Camera,
    private base64: Base64,
    private crop: Crop,
    private storage: AngularFireStorage,
    private authService: AuthService) {

  }

  ngOnInit() {
    this.authService.getUserAuth().subscribe(u => {
      this.uid = u.uid
    })

  }


  ionViewDidEnter() {
    this.getCategorys()
  }

  doRefresh(event){
    setTimeout(()=>{
    this.ionViewDidEnter();
    event.target.complete();
    }, 500)
      }

  async getCategorys() {
    let loader = await this.loadingCtrl.create({
      message: "Por favor espere...",
    });

    loader.present();

    try {
      this.firestore.collection('categorys')
        .snapshotChanges()
        .subscribe(data => {
          this.categorys = data.map(e => {
            return {
              id: e.payload.doc.id,           
              name: e.payload.doc.data()['name']         
            };
          });
          loader.dismiss();
        });

    } catch (e) {
      this.showToast(e);
    }
  }


  async getCategoryById(id) {
    let loader = this.loadingCtrl.create({
      message: "Por favor espere...",

    });
    (await loader).present();

    this.firestore.doc('categorys/' + id)
      .valueChanges()
      .subscribe(data => {
        this.categoryName = data['name'];       
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
        this.product.img = await ref.getDownloadURL();
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
    this.product.id = Date.now().toString();
    this.isUploadStart = true;
    let task = this.storage.ref(this.product.id + "/" + this.product.id).putString(this.croppedImage, "data_url");

    task.snapshotChanges().subscribe(snap => {
      this.percent = ((snap.bytesTransferred / snap.totalBytes) * 100).toString().split(".")[0];
      task.then(async () => {
        this.isUploadStart = false;        
        this.loadCloudFiles(this.product.id);
        this.showToast('Imagen cargada con éxito');  
   })  
 })
  }


  async addProduct() {

    if (this.formValidation()) {
      let loader = this.loadingCtrl.create({
        message: "Por favor espere...",

      });
      (await loader).present();


      try {
        await this.firestore.doc('products/' + this.product.id).set({
          name: this.product.name,
          category: this.product.category,
          categoryName: this.categoryName,      
          price: this.product.price,
          img: this.product.img

        });

      } catch (e) {
        this.showToast(e);
      }

      (await loader).dismiss();
      this.router.navigate(['admin-product-list',this.product.category]);
      this.showToast('Producto creado con éxito')

    }
  }

  formValidation() {
    if (!this.product.name) {
      this.showToast('Introduzca el nombre del producto');
      return false;
    }

    if (!this.product.img) {
      this.showToast('Seleccione la imagen del productos');
      return false;
    }

    if (!this.product.price) {
      this.showToast('Introduzca el precio del producto');
      return false;
    }

    if (!this.product.category) {
      this.showToast('Seleccione la categoría del producto');
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