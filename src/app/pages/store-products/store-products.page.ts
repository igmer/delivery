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
import { ActivatedRoute } from '@angular/router';
import { faStore } from "@fortawesome/free-solid-svg-icons";
@Component({
  selector: 'app-store-products',
  templateUrl: './store-products.page.html',
  styleUrls: ['./store-products.page.scss'],
})
export class StoreProductsPage implements OnInit {
  user = {} as User;
  uid: any;
  cart = [];
  products = [];


  faStore = faStore;

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

  name;

  constructor(private cartService: CartService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    private notifications: NotificationsService,
    private platform: Platform,
    private onesignal: OneSignal,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private actRoute: ActivatedRoute

  ) {
    this.category = this.actRoute.snapshot.paramMap.get('category');
  }

  ngOnInit() {
    this.authService.getUserAuth().subscribe(u => {
      this.uid = u.uid
    })
  }


  ionViewDidEnter() {
    this.getCategory(this.category);
    this.getProducts();
    this.products = this.cartService.getProducts();
    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItemCount();

  }

  doRefresh(event) {
    setTimeout(() => {
      this.ionViewDidEnter();
      event.target.complete();
    }, 500)
  }

  async getCategory(id) {

    try {

      this.firestore.doc('categorys/' + id)
        .valueChanges()
        .subscribe(data => {
          this.name = data['name'];
        });

    } catch (e) {
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

  searchProduct(event) {
    const texto: string = event.target.value;
    this.result = texto;
  }

  async getProducts() {

    try {

      this.firestore.collection('products', ref => ref.where('category', '==', this.category))
        .snapshotChanges()
        .subscribe(data => {
          this.products = data.map(e => {
            return {
              id: e.payload.doc.id,
              img: e.payload.doc.data()['img'],
              name: e.payload.doc.data()['name'],
              category: e.payload.doc.data()['category'],
              categoryName: e.payload.doc.data()['categoryName'],
              price: e.payload.doc.data()['price']
            };
          });

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
      cssClass: 'toast',
      message: message,
      duration: 500
    }).then(toastData => toastData.present());
  }

}