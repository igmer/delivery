import { Product } from '../../models/models.model'; 
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController, ActionSheetController, ModalController} from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { NotificationsService } from 'src/app/services/notifications.service';
import { AuthService } from 'src/app/services/auth.service';
import { ClientDataModalPage } from "../client-data-modal/client-data-modal.page";

@Component({
  selector: 'app-user-sale-detail',
  templateUrl: './user-sale-detail.page.html',
  styleUrls: ['./user-sale-detail.page.scss'],
})
export class UserSaleDetailPage implements OnInit {
  
  cart: Product[] = [];
  idDate: any;  
  sales: any;
  date: any;
  hour: any;
  total: any;
  content: any;
  client: any;
  dolarTotal: any;
  img: any;
  uid: any;
  role: any;
  roleAdmin = 'admin';
  token: any;
  status:any;
  delivered: any;
  done = 'Si';

  deliveryId;
  deliveryToken;
  constructor(private actRoute: ActivatedRoute,       
    private alertCtrl: AlertController,
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private iab: InAppBrowser,
    private authService: AuthService,
    private notifications: NotificationsService,
    private actionSheetCtrl: ActionSheetController,
    private router: Router,
    private modalCtrl: ModalController) { 

      this.idDate = this.actRoute.snapshot.paramMap.get('idDate');

    }

  ngOnInit() {
  
    this.authService.getUserAuth().subscribe(u =>{
      this.uid = u.uid
    })  
       
  }

  ionViewDidEnter(){  
  this.getSaleById();  
   this.getUserRole(this.uid); 
   this.getDeliveryToken(this.deliveryId);
  }

  doRefresh(event){
    setTimeout(()=>{
    this.ionViewDidEnter();
    event.target.complete();
    }, 500)
      }

  payment(url) {
    this.iab.create(url);
  }

  

  async saleOptionsNoDelivered(id) {
    const actionSheet = await this.actionSheetCtrl.create({ 
      header: 'Opciones', 
      cssClass: 'my-custom-class',
      buttons: [      
        {      
          text: 'Pedido Recibido',
          icon: 'checkmark-circle-outline',
          cssClass: 'blue',    
          handler: () => {
            this.confirmDelivered(id);
          }       
        },          
        {
        text: 'Delivery',
        icon: 'person-circle-outline' ,
        cssClass: 'blue',    
        handler: () => {        
            this.deliveryProfile()         
        }
      }]
    });
    await actionSheet.present();
  }

  async saleOptionsDelivered() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      cssClass: 'my-custom-class',
      buttons: [                
        {
        text: 'Delivery',
        icon: 'person-circle-outline' ,
        cssClass: 'blue',    
        handler: () => {        
            this.deliveryProfile()         
        }
      }]
    });
    await actionSheet.present();
  }
  

  saleDelivered(id) {
    this.firestore.collection('sales').doc(id).update({
      delivered: 'Si'
    })
  
    this.showToast('Gracias por comprar'); 
  }

  async confirmDelivered(id) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: '¿Ya recibiste tu pedido?',
      message: 'Confirma si ya recibiste tu pedido.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'         
        }, {
          text: 'Recibido',
          handler: () => {
            this.saleDelivered(id);
          }
        }
      ]
    });

    await alert.present();
  }
  
  getUserRole(uid: string) {
    this.firestore.doc('roles/' + uid)
      .valueChanges()
      .subscribe(data => {
        this.role = data['role']
      });
  }

  getDeliveryToken(uid: string) {
    this.firestore.doc('users/' + uid)
      .valueChanges()
      .subscribe(data => {
        this.deliveryToken = data['token']
      });
  }

  async getSaleById(){
   
   this.firestore.collection('sales').doc(this.idDate)  
   .valueChanges()
   .subscribe(data => {
    this.date = data['date'];
    this.client = data['client'];
    this.cart = data['products'];
    this.total = data['total'];
    this.token  = data['token'];
    this.img = data['img'];
    this.status = data['status'];
    this.delivered = data['delivered'];
    this.deliveryId = data['delivery']
    this.content = data; 
   });
  
  }

  async deliveryProfile() {
    if(this.deliveryId !== 'No Asignado'){
 const modal = await this.modalCtrl.create({
      component: ClientDataModalPage,
      cssClass: 'profile-modal',
      componentProps: {
        'id': this.deliveryId,       
      }
    })
    return await modal.present();
    }else{
      this.showToast('No hay un delivery asignado para este pedido todavía.')
    }
   

  }

  showToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 1500
    }).then(toastData => toastData.present());
  }


}