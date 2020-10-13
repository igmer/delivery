import { Component, OnInit } from '@angular/core';
import { User } from '../../models/models.model';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController, ToastController, ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { ClientDataModalPage } from "../client-data-modal/client-data-modal.page";

@Component({
  selector: 'app-admin-user-profile',
  templateUrl: './admin-user-profile.page.html',
  styleUrls: ['./admin-user-profile.page.scss'],
})
export class AdminUserProfilePage implements OnInit {

 
  user = {} as User;
  id: any;
  sales: any;
  orders; 
  croppedImage: string;
  percent;
  isUploadStart = false;
  cloudFiles = [];
  imgProfile: any;
  faTruck = faTruck;
  imgRef: firebase.storage.Reference;

  isClient = 'user'
  isDelivery = 'delivery'
  delivers;
  constructor(private actRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private firestore: AngularFirestore,
    private navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    public alertController: AlertController,
    private modalCtrl: ModalController,
    private router: Router
    ) {

    this.id = this.actRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() { 
  }


  ionViewDidEnter(){
    this.getUserById(this.id);    
    this.getSales();
    this.loadCloudFiles();
    this.getRoleById(this.id); 
    this.getDelivers();
  }

doRefresh(event){
    setTimeout(()=>{
    this.ionViewDidEnter();
    event.target.complete();
    }, 500)
      }
  userList(){
    this.router.navigate(['admin-user-list']);
  }

  deliveryList(){
    this.router.navigate(['admin-delivery-list']);
  }

  loadCloudFiles() {
    this.cloudFiles = [];

    const storageRef = firebase.storage().ref(this.id);
    storageRef.listAll().then(result => {
      result.items.forEach(async ref => {
        this.cloudFiles.push({
          name: ref.name,
          full: ref.fullPath,
          url: await ref.getDownloadURL(),
          ref: ref
        });       
        this.imgRef = ref;
      });
    });
  }


  async getRoleById(id: string) { 
 
    this.firestore.collection('roles').doc(id)
    .valueChanges()
    .subscribe(data => {  
      this.user.role = data['role'];  
    });


  }

  async getUserById(id: string) {
    let loader = this.loadingCtrl.create({
      message: "Por favor espere...",

    });
    (await loader).present();

    this.firestore.doc('users/' + id)
      .valueChanges()
      .subscribe(data => {
        this.user.id = this.id;
        this.user.name = data['name'];
        this.orders = data['orders'];
        this.user.email = data['email'];
        this.user.address = data['address'];
        this.user.photo = data['photo'];
        this.user.phonenumber = data['phonenumber'];
        this.user.token = data['token'];

      });
    (await loader).dismiss();

  }


  getSales() {
    this.firestore.collection('sales', ref => ref.where('client', '==', this.id)
      .orderBy('date', 'desc'))
      .snapshotChanges()
      .subscribe(data => {
        this.sales = data.map(e => {
          return {           
            products: e.payload.doc.data()['products'],
            total: e.payload.doc.data()['total'],
            client: e.payload.doc.data()['client'],
            date: e.payload.doc.data()['date'],
            delivered: e.payload.doc.data()['delivered'], 
            status: e.payload.doc.data()['status']            
          }
        })
      })    
  }

  getDelivers() {
    this.firestore.collection('sales', ref => ref.where('delivery', '==', this.id)
      .orderBy('date', 'desc'))
      .snapshotChanges()
      .subscribe(data => {
        this.delivers = data.map(e => {
          return {          
            date: e.payload.doc.data()['date'],
            delivered: e.payload.doc.data()['delivered'],
            client: e.payload.doc.data()['client']                   
          }
        })
      })    
  }

  async OptionsProcessAndDeliver(id, userId) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      cssClass: 'my-custom-class',
      buttons: [          
        {
        text: 'Detalles de la venta',
        icon: 'document-text-outline',
        cssClass: 'blue',    
        handler: () => {
          this.router.navigate(['/user-sale-detail',id]);
        }
      },  {
        text: 'Cliente',
        icon: 'person-outline',
        cssClass: 'blue',    
        handler: () => {
          this.userProfile(userId)
        }
      }      
    ]
    });
    await actionSheet.present();
  }

  async userProfile(id) {
    
    const modal = await this.modalCtrl.create({
      component: ClientDataModalPage,
      cssClass: 'profile-modal',
      componentProps: {
        'id': id,       
      }
    })
    return await modal.present();
  }

  async confirmUserDelete() {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '¿Está seguro de querer eliminar este usuario?',
      message: 'Se eliminaran todos los datos de este usuario, incluyendo las compras que haya realizado',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Aceptar',
          handler: () => {
            this.deleteUser(this.id)
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteUser(id: string) {
    let loader = this.loadingCtrl.create({
      message: "Eliminando Usuario...",

    });
    (await loader).present();

   this.firestore.doc('users/' + id).delete();
   this.firestore.doc('roles/' + id).delete();
      if (this.imgRef) {
        this.imgRef.delete();
      }

      this.firestore.firestore.collection('sales').get().then(function(querySnapshot) {
        querySnapshot.query.where('client', '==',id).get().then(function(querySnapshot){
          querySnapshot.forEach(function(doc){
            doc.ref.delete()
          })
        })
    });
  
      (await loader).dismiss();
 
    this.navCtrl.navigateRoot('admin-user-list');
  }

  showToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 3000
    }).then(toastData => toastData.present());
  }



}