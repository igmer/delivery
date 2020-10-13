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
import { Router } from '@angular/router';
import { faStore } from "@fortawesome/free-solid-svg-icons";
@Component({
  selector: 'app-store-categorys',
  templateUrl: './store-categorys.page.html',
  styleUrls: ['./store-categorys.page.scss'],
})
export class StoreCategorysPage implements OnInit {
  user = {} as User;
  uid: any;
  cart = [];
  products = [];
  faStore = faStore;

  categorys;
  newMessage: BehaviorSubject<number>;

  result = '';  
  category: any;
  cartItemCount: BehaviorSubject<number>;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoplay: {
      delay: 2500
    }

  };
 
  yudsegment;

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
    this.yudsegment = 'category';

  }


  ionViewDidEnter() {  
    this.getBadge(this.uid);
    this.getCategorys();
    this.products = this.cartService.getProducts();
    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItemCount();
    
  }

  doRefresh(event){
    setTimeout(()=>{
    this.ionViewDidEnter();
    event.target.complete();
    }, 500)
      }

  goToProducts(category){
    this.router.navigate(['store-products', category])
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

  getTotal() {
    return this.cartService.getTotal();
  }

  addToCart(product) {
    this.cartService.addProduct(product)
  }

  searchCategory(event) {
    const texto: string = event.target.value;
    this.result = texto;
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
              img: e.payload.doc.data()['img'],
              name: e.payload.doc.data()['name'],
              description: e.payload.doc.data()['description']             
            };
          });
          loader.dismiss();
        });

    } catch (e) {
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
      message: message,
      duration: 3000
    }).then(toastData => toastData.present());
  }

}