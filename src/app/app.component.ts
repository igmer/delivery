import { Component, OnInit } from '@angular/core';
import { Platform, AlertController, LoadingController, MenuController, ToastController, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OneSignal } from "@ionic-native/onesignal/ngx";
import { NotificationsService } from "./services/notifications.service";
import { AuthService } from "./services/auth.service";
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from "./models/models.model";
import { faTruck, faStore, faUserShield, faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2'
import { CartService } from './services/cart.service';
import { StoreCartModalPage } from './pages/store-cart-modal/store-cart-modal.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  user = {} as User
  cartItemCount: BehaviorSubject<number>;
  isLogged;
  uid;
  faTruck = faTruck;
  faStore = faStore;
  faUserShield = faUserShield;
  faMapMarkedAlt = faMapMarkedAlt;
  orders;
  reload: boolean;
  notificationsCounter;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private onesignal: OneSignal,
    private alertController: AlertController,
    private notifications: NotificationsService,
    private router: Router,
    private authService: AuthService,
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private menuCtrl: MenuController,
    private toastCtrl: ToastController,
    private cartService: CartService,
    private modalCtrl: ModalController,

  ) {

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.show();
      this.splashScreen.hide();

      this.authService.getUserAuth().subscribe(u => {
        this.uid = u.uid
      })

      this.cartItemCount = this.cartService.getCartItemCount();

      setTimeout(() => {
        this.getUserProfile(this.uid)
      }, 2000);

      

      if (this.platform.is('cordova')) {
        this.setupPush();
      }

    })
  }



  refresh() {
    this.reload = true;
    try {
      this.initializeApp();
    } catch (e) {
      this.showToast('No tienes conexión a internet en este momento.')
    }


    setTimeout(() => {
      this.reload = false;
    }, 3000);
  }

  async getUserProfile(uid: string) {
    let loader = this.loadingCtrl.create({
      message: "Por favor espere...",

    });
    (await loader).present();
    this.firestore.doc('users/' + uid)
      .valueChanges()
      .subscribe(data => {
        this.user.name = data['name']
        this.user.photo = data['photo']
        this.orders = data['orders']
        this.user.notifications = data['notifications'],
          this.user.token = data['token']
      });

    this.firestore.doc('roles/' + uid)
      .valueChanges()
      .subscribe(data => {
        this.user.role = data['role'];
      });
    (await loader).dismiss();
  }


  async confirmLogOut() {

    const alert = await this.alertController.create({
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
    this.RemoveTopics();
  }

  NewUserNotification(id, title) {

    Swal.fire({
      confirmButtonText: 'Ver Perfil',
      title: title,     
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      }
    }).then(() => {
      this.router.navigate(['admin-user-profile', id])
    })
  }

  NewSaleNotification(id, title, msg) {

    Swal.fire({
      confirmButtonText: 'Ver Compra',
      title: title,
      text: msg,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      }
    }).then(() => {
      this.router.navigate(['user-sale-detail', id])
    })
  }

  NewTakenNotification(id, title) {

    Swal.fire({
      confirmButtonText: 'Ver Pedido',
      title: title,      
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      }
    }).then(() => {
      this.router.navigate(['user-sale-detail', id])
    })
  }

  setupPush() {

    this.onesignal.startInit('ed9fa51a-e3b7-46ec-9173-d228b686527e', '1084280859692');
    this.onesignal.inFocusDisplaying(this.onesignal.OSInFocusDisplayOption.None);

    this.onesignal.handleNotificationReceived().subscribe(data => {
      let msg = data.payload.body;
      let title = data.payload.title;
      let additionalData = data.payload.additionalData;

      if (additionalData.userid) {
        this.NewUserNotification(additionalData.userid, title);
      }

      if (additionalData.saleid) {
        this.NewSaleNotification(additionalData.saleid, title, msg);
      }

      if (additionalData.takenid) {
        this.NewTakenNotification(additionalData.takenid, title);
      }

    });

    this.onesignal.handleNotificationOpened().subscribe(data => {
      let msg = data.notification.payload.body;
      let title = data.notification.payload.title;
      let additionalData = data.notification.payload.additionalData;

      if (additionalData.saleid) {
        this.NewSaleNotification(additionalData.saleid, title, msg);
      }

      if (additionalData.userid) {
        this.NewUserNotification(additionalData.userid, title);
      }

      if (additionalData.takenid) {
        this.NewTakenNotification(additionalData.takenid, title);
      }
    })

    this.onesignal.endInit();
  }

  adminTopics() {
    this.onesignal.sendTags({
      admin: 'si',
    });
  }

  RemoveTopics(){
    this.onesignal.getTags().then(tags=>{     
      if(tags.admin === "si")
      this.onesignal.sendTag("admin","no");
    })
  }

  async resetNotifications() {

    let loader = this.loadingCtrl.create({
      message: "Por favor espere...",

    });
    (await loader).present();
    try {
      this.firestore.collection('users').doc(this.uid).update({
        notifications: 0
      });
    } catch (e) {
      alert(e);
    }
    (await loader).dismiss();

  }

  async openCart() {
    this.menuCtrl.close();
    let modal = await this.modalCtrl.create({
      component: StoreCartModalPage,
      cssClass: 'cart-modal'
    });
    modal.present();
  }

  showToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 1200
    }).then(toastData => toastData.present());
  }

}
