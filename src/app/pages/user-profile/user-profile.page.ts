import { Component, OnInit } from '@angular/core';
import { User } from '../../models/models.model';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController, ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationsService } from "../../services/notifications.service";
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  user = {} as User;

 
  uid: any;
  name = '';
  email = '';
  profileimg = this.user.photo;
  address = this.user.address;
  newMessage: BehaviorSubject<number>;
  sales;

  constructor(private actRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private firestore: AngularFirestore,   
    private auth: AngularFireAuth,
    public actionSheetCtrl: ActionSheetController,   
    private alertCtrl: AlertController,
    private authService: AuthService,
    private router: Router,
    private modalCtrl: ModalController,
    private notifications: NotificationsService) {

  }

  ngOnInit() {
    this.authService.getUserAuth().subscribe(u =>{
      this.uid = u.uid
    }) 
   
    }

  ionViewDidEnter(){
    this.getSales();
    this.getProfile(this.uid);
  }

  doRefresh(event){
    setTimeout(()=>{
    this.ionViewDidEnter();
    event.target.complete();
    }, 500)
      }

  storeHome(){
    this.router.navigate(['store-home']);
  }

  async getSales() {
    let loader = await this.loadingCtrl.create({
      message: "Por favor espere...",
    });

    loader.present();
    try{
   this.firestore.collection('sales', ref => ref.where('client', '==', this.uid)
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
        loader.dismiss();
      });  
    }catch(e){
      console.log(e);
    }
   
  }

  async getProfile(uid: string) {
    let loader = this.loadingCtrl.create({
      message: "Por favor espere...",

    });
    (await loader).present();

    this.firestore.doc('users/' + uid)
      .valueChanges()
      .subscribe(data => {
        this.user.name = data['name'];
        this.user.email = data['email']
        this.user.address = data['address'];
        this.user.photo = data['photo']
        this.user.phonenumber = data['phonenumber'];
        this.user.notifications = data['notifications'];
      });

    (await loader).dismiss();

  }



  async Options() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Preguntas Frecuentes',
        icon: 'help-circle-outline',
        cssClass: 'blue',
        handler: () => {

        }
      }, {
        text: 'Cerrar Sesión',
        icon: 'log-out-outline',
        cssClass: 'blue',
        handler: () => {
          this.confirmLogOut();
        }
      }]
    });
    await actionSheet.present();
  }


  async confirmLogOut() {

    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: '¿Estás seguro que quieres cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Aceptar',
          handler: () => {
            this.logout();
          }
        }
      ]
    });

    await alert.present();
  }

  logout() {
    this.authService.logout();
  }



  showToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 1500
    }).then(toastData => toastData.present());
  }

}

