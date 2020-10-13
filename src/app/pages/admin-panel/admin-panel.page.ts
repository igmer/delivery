import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { faMoneyCheckAlt, faBalanceScale, faStore, faUsers, faTruck, faCartArrowDown, faPercent } from "@fortawesome/free-solid-svg-icons";
import { User } from "../../models/models.model";
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.page.html',
  styleUrls: ['./admin-panel.page.scss'],
})
export class AdminPanelPage implements OnInit {
  
  user = {} as User
  users;
  products;
  categorys;

  admins;
  active;
  inactive;
  
  process;
  delivered;
  noDelivered;
  uid;
  news;


  faPercent = faPercent;
  faTruck = faTruck;
  faMoneyCheckAlt = faMoneyCheckAlt;
  faBalanceScale = faBalanceScale;
  faStore = faStore;
  faCartArrowDown = faCartArrowDown;
  faUsers = faUsers;
  constructor(private alertCtrl: AlertController,
    private db: AngularFirestore,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService) { }

  ngOnInit() {    
    
    this.authService.getUserAuth().subscribe(u =>{
      this.uid = u.uid         
    })  
  }

  ionViewDidEnter(){
 this.getBadge(this.uid);
 this.getAppData();
  }

  doRefresh(event){
    setTimeout(()=>{
    this.ionViewDidEnter();
    event.target.complete();
    }, 500)
      }
   
  async getBadge(uid: string) {
    let loader = this.loadingCtrl.create({
      message: "Por favor espere...",

    });
    (await loader).present();
    this.db.doc('users/' + uid)
      .valueChanges()
      .subscribe(data => {      
        this.user.notifications = data['notifications']
      });
      (await loader).dismiss();
  }

 async getAppData() {
  let loader = await this.loadingCtrl.create({
    message: "Por favor espere...",
  });

  loader.present();
 try{
    this.db.collection('products')
    .snapshotChanges()
    .subscribe(data => {
      this.products = data.map(e => {
        return {           
          name: e.payload.doc.data()['name']
        }
      })
    });

    this.db.collection('news')
    .snapshotChanges()
    .subscribe(data => {
      this.news = data.map(e => {
        return {           
          name: e.payload.doc.data()['name']
        }
      })
    });

    this.db.collection('categorys')
    .snapshotChanges()
    .subscribe(data => {
      this.categorys = data.map(e => {
        return {           
          name: e.payload.doc.data()['name']
        }
      })
    });

    this.db.collection('roles', ref => ref.where('role','==','user'))
    .snapshotChanges()
    .subscribe(data => {
      this.users = data.map(e => {
        return {           
          name: e.payload.doc.data()['name']
        }
      })
    });

    this.db.collection('roles', ref => ref.where('role','==','admin'))
    .snapshotChanges()
    .subscribe(data => {
      this.admins = data.map(e => {
        return {           
          name: e.payload.doc.data()['name']
        }
      })
    });

    this.db.collection('users', ref => ref.where('onWait','==',true))
    .snapshotChanges()
    .subscribe(data => {
      this.active = data.map(e => {
        return {           
          name: e.payload.doc.data()['name']
        }
      })
    });

    this.db.collection('users', ref => ref.where('onWait','==',false))
    .snapshotChanges()
    .subscribe(data => {
      this.inactive = data.map(e => {
        return {           
          name: e.payload.doc.data()['name']
        }
      })
    });

    this.db.collection('sales', ref => ref
    .where('delivered', '==', 'Si'))
    .snapshotChanges()
    .subscribe(data => {
      this.delivered = data.map(e => {
        return {           
          delivered: e.payload.doc.data()['delivered']
        }
      })
    });

    this.db.collection('sales', ref => ref
    .where('delivered', '==', 'En Proceso'))
    .snapshotChanges()
    .subscribe(data => {
      this.process = data.map(e => {
        return {           
          delivered: e.payload.doc.data()['delivered']
        }
      })
    });

    this.db.collection('sales', ref => ref
      .where('delivered', '==', 'No'))
      .snapshotChanges()
      .subscribe(data => {
        this.noDelivered = data.map(e => {
          return {           
            delivered: e.payload.doc.data()['delivered']
          }
        }) 
        loader.dismiss();      
      });
}catch(e){
  console.log(e)
}
  }

  showToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 2000
    }).then(toastData => toastData.present());
  }

}
