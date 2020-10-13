import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CartService } from '../../services/cart.service'
import { ModalController, LoadingController, ToastController, MenuController, Platform, AlertController } from '@ionic/angular';
import { StoreCartModalPage } from '../store-cart-modal/store-cart-modal.page';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../../models/models.model';
import { NotificationsService } from "../../services/notifications.service";
import { BehaviorSubject } from 'rxjs';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import * as firebase from 'firebase/app';
import { AuthService } from "../../services/auth.service";
import { faStore, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-home',
  templateUrl: './store-home.page.html',
  styleUrls: ['./store-home.page.scss'],
})
export class StoreHomePage implements OnInit {
  user = {} as User;
  uid: any;
  cart = [];
  products = [];


  faStore = faStore;
  faCartPlus = faCartPlus;
  news;
  result = '';  
  categorys: any;
  cartItemCount: BehaviorSubject<number>;
  slideOpts = { 
    slidesPerView: 1,  
    initialSlide: 0,
    speed: 400,
    autoplay: {
      delay: 2500
    }

  };

  slideProducts = { 
    slidesPerView: 2, 
    initialSlide: 0,
    speed: 400,
    autoplay: {
      delay: 2500
    }

  };
  token;

  constructor(private cartService: CartService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    private notifications: NotificationsService,
    private platform: Platform,
    private onesignal: OneSignal,
    private authService:AuthService,
    private alertCtrl: AlertController,
    private router: Router

  ) {
    
  }

  ngOnInit() {   
    if (this.platform.is('cordova')) {
      this.getToken();
    } else {
      this.token = '';
    }
    this.authService.getUserAuth().subscribe(u =>{
      this.uid = u.uid
    })  
  }

  
  ionViewDidEnter() {  
    this.getNews();
    this.getBadge(this.uid)
    this.getCategorys();
    this.getProducts();
    this.products = this.cartService.getProducts();
    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItemCount();
    if (this.platform.is('cordova')) {
      this.updateToken(this.token)
    } else {
      console.log('No es cordova')
    }
  }


  async updateToken(token) {
 
    let loader = this.loadingCtrl.create({
      message: "Por favor espere...",

    });
    (await loader).present();

    try {
      await this.firestore.doc('users/' + this.uid).update({
        token: token        
      });

      }catch (e) {
      console.log(e);
    }
    (await loader).dismiss();
 
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
    this.firestore.doc('users/' + uid)
      .valueChanges()
      .subscribe(data => {      
        this.user.notifications = data['notifications']
      });
      (await loader).dismiss();
  }

  getToken() {
    this.onesignal.getIds().then(res => {
      this.token = res.userId;
    })
  }

  goToStore(){
    this.router.navigate(['store-categorys']);
  }

  goToCategory(category){
    this.router.navigate(['store-products',category]);
  }

  async getNews() { 
   try{   
    this.firestore.collection('news')
      .snapshotChanges()
      .subscribe(data => {
        this.news = data.map(e => {
          return {
            id: e.payload.doc.id,
            name: e.payload.doc.data()['name'],      
            img: e.payload.doc.data()['img']          
          }          
        }) 
              
      });    
    }catch(e){
      console.log(e); 
    }
  }


  async getProducts() {
  
    try {

      this.firestore.collection('products', ref => ref.limit(6).orderBy('name'))
        .snapshotChanges()
        .subscribe(data => {
          this.products = data.map(e => {
            return {
              id: e.payload.doc.id,
              img: e.payload.doc.data()['img'],
              name: e.payload.doc.data()['name'],
              category: e.payload.doc.data()['category'],
              price: e.payload.doc.data()['price']
            };
          });

        });

      }catch(e){
      console.log(e);
    }
  }
  
  getTotal() {
    return this.cartService.getTotal();
  }

  addToCart(product) {
    this.cartService.addProduct(product);
    this.showToast('Agregado al carrito de compras')
  }

  async getCategorys() {
    let loader = await this.loadingCtrl.create({
      message: "Por favor espere...",
    });

    loader.present();
    try {
      this.firestore.collection('categorys', ref => ref.orderBy('id', 'desc')
      .limit(6))        
        .snapshotChanges()
        .subscribe(data => {
          this.categorys = data.map(e => {
            return {   
              id: e.payload.doc.id,
              name: e.payload.doc.data()['name'],       
              img: e.payload.doc.data()['img']         
            };
          });
          loader.dismiss(); 
        });

    } catch (e) {
      loader.dismiss(); 
      this.showToast(e);
    }
  }

  async openCart() {
    let modal = await this.modalCtrl.create({
      component: StoreCartModalPage,
      cssClass: 'cart-modal'
    });
    modal.present();
  }


  showToast(message: string) {
    this.toastCtrl.create({
      cssClass: 'toast',
      message: message,
      duration: 500
    }).then(toastData => toastData.present());
  }

}
