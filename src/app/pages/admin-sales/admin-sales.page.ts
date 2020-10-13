import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController, ModalController, LoadingController, AlertController, ActionSheetController } from '@ionic/angular';
import { ClientDataModalPage } from "../client-data-modal/client-data-modal.page";
import { User } from "../../models/models.model";
import { NotificationsService } from 'src/app/services/notifications.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-sales',
  templateUrl: './admin-sales.page.html',
  styleUrls: ['./admin-sales.page.scss'],
})
export class AdminSalesPage implements OnInit {


  user = {} as User;
  noDelivered;
  delivered;
  inProcess;
  yudsegment: any;
  constructor(private firestore: AngularFirestore,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
    private notifications: NotificationsService,
    private actionSheetCtrl: ActionSheetController,
    private router: Router) { }

  ngOnInit() { 
    this.yudsegment = 'delivered';
  }

  ionViewDidEnter(){
    this.getSales();
  }

  doRefresh(event){
    setTimeout(()=>{
    this.ionViewDidEnter();
    event.target.complete();
    }, 500)
      }

 async getSales() {

  let loader = await this.loadingCtrl.create({
    message: "Por favor espere...",
  });

  loader.present();
 try{       
    this.firestore.collection('sales', ref => ref.where('delivered', '==', 'Si')
      .orderBy('date', 'desc'))
      .snapshotChanges()
      .subscribe(data => {
        this.delivered = data.map(e => {
          return {          
            delivered: e.payload.doc.data()['delivered'], 
            delivery: e.payload.doc.data()['delivery'],       
            client: e.payload.doc.data()['client'],
            date: e.payload.doc.data()['date'],  
          }
        })       
      });

      this.firestore.collection('sales', ref => ref.where('delivered', '==', 'No')
      .orderBy('date', 'desc'))
      .snapshotChanges()
      .subscribe(data => {
        this.noDelivered = data.map(e => {
          return {          
            delivered: e.payload.doc.data()['delivered'], 
            delivery: e.payload.doc.data()['delivery'],          
            client: e.payload.doc.data()['client'],
            date: e.payload.doc.data()['date'],  
          }
        })
      });

      this.firestore.collection('sales', ref => ref.where('delivered', '==', 'En Proceso')
      .orderBy('date', 'desc'))
      .snapshotChanges()
      .subscribe(data => {
        this.inProcess = data.map(e => {
          return {          
            delivered: e.payload.doc.data()['delivered'], 
            delivery: e.payload.doc.data()['delivery'],          
            client: e.payload.doc.data()['client'],
            date: e.payload.doc.data()['date'],  
          }
        })
        loader.dismiss(); 
      });
   
    }catch(e){
      console.log(e);
      loader.dismiss(); 
    }
         
  }
 
  
  async OptionsProcessAndDeliver(id, userId, deliveryId) {
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
      }, {
        text: 'Delivery',
        icon: 'person-circle-outline',
        cssClass: 'blue',    
        handler: () => {
          this.userProfile(deliveryId)
        }
      } 
    ]
    });
    await actionSheet.present();
  }


  async OptionsNoDeliver(id, userId) {
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

  showToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 4000
    }).then(toastData => toastData.present());
  }


}
