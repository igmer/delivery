import {CartService} from '../../services/cart.service';
import {Product} from '../../models/models.model';
import {Component, OnInit} from '@angular/core';
import {ModalController, AlertController, LoadingController, ToastController} from '@ionic/angular';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from '../../models/models.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationsService} from "../../services/notifications.service";
import {CurrencyPipe} from "@angular/common";
import {Base64} from '@ionic-native/base64/ngx';
import {Camera, CameraOptions} from "@ionic-native/camera/ngx";
import {Crop} from '@ionic-native/crop/ngx';
import {AngularFireStorage} from '@angular/fire/storage';
import * as firebase from 'firebase/app';
import {PayPal, PayPalPayment, PayPalConfiguration, PayPalPaymentDetails} from '@ionic-native/paypal/ngx';
import Swal from 'sweetalert2'
import {AuthService} from 'src/app/services/auth.service';

@Component({
    selector: 'app-store-cart-modal',
    templateUrl: './store-cart-modal.page.html',
    styleUrls: ['./store-cart-modal.page.scss'],
})
export class StoreCartModalPage implements OnInit {

    cart: Product[] = [];
    user = {} as User;
    uid: any;

    total: any;

    cloudFiles = [];
    img: any;
    croppedImage: string;
    percent;
    isUploadStart = false;
    upLoadFinish = false;

    mobilePayment = false;
    showCart = true;
    payMethods = false;
    purchases;

    constructor(private actRoute: ActivatedRoute,
                private cartService: CartService,
                private modalCtrl: ModalController,
                private alertCtrl: AlertController,
                private auth: AngularFireAuth,
                private firestore: AngularFirestore,
                private loadingCtrl: LoadingController,
                private toastCtrl: ToastController,
                private notifications: NotificationsService,
                private router: Router,
                private authService: AuthService,
                private payPal: PayPal
    ) {

    }

    ngOnInit() {
        this.cart = this.cartService.getCart();
        this.authService.getUserAuth().subscribe(u => {
            this.uid = u.uid
        })
    }

    ionViewDidEnter() {
        this.getUserData(this.uid)
    }

    async getUserData(uid: string) {
        let loader = this.loadingCtrl.create({
            message: "Por favor espere...",

        });
        (await loader).present();
        this.firestore.doc('users/' + uid)
            .valueChanges()
            .subscribe(data => {
                this.user.token = data['token'];
                this.purchases = data['purchases'];
            });

        this.firestore.doc('roles/' + uid)
            .valueChanges()
            .subscribe(data => {
                this.user.role = data['role'];
            });
        (await loader).dismiss();
    }

    savePayPalSale() {
        const fulldate = Date.now().toString();

        this.firestore.collection('users').doc(this.uid).update({
            purchases: this.purchases + 1
        })

        this.firestore.collection('sales').doc(fulldate)
            .set({
                clientToken: this.user.token,
                delivery: 'No Asignado',
                delivered: 'No',
                products: this.cart,
                client: this.uid,
                total: this.getTotal(),
                date: fulldate
            });
        this.notifications.PayPalSale(fulldate, this.user.name);
        this.removeAll();
        this.modalCtrl.dismiss();

        Swal.fire({
            confirmButtonText: 'Ver Compra',
            title: 'Gracias por comprar',
            text: 'Tu pedido será atendido en breves momentos',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            }
        }).then(() => {
            this.router.navigate(['user-sale-detail', fulldate])
        })

    }


    PayPalPayment() {
        this.payPal.init({
            PayPalEnvironmentProduction: '',
            PayPalEnvironmentSandbox: 'AZ-lSE4o7bw_Bw5QJ7QrveFFNHZBEztcgvSjgZE_fgGQieTEgLI5hshV6oMRVrOqfkj9A9hLIUP7fwod'
        }).then(() => {
            // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
            this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({

                acceptCreditCards: false,
                languageOrLocale: 'es-VE',
                merchantName: 'Ecommerce',
                merchantPrivacyPolicyURL: '',
                merchantUserAgreementURL: '',

            })).then(() => {
                let detail = new PayPalPaymentDetails(this.getTotal(), '0.00', '0.00')
                let payment = new PayPalPayment(this.getTotal(), 'USD', 'Compra Ecommerce', 'sale', detail);
                this.payPal.renderSinglePaymentUI(payment).then(async () => {

                    let loader = this.loadingCtrl.create({
                        message: "Por favor espere...",
                    });
                    (await loader).present();
                    this.savePayPalSale();
                    (await loader).dismiss();


                }, () => {
                    alert('Error: La compra no fue realizada');
                });
            }, () => {
                // Error in configuration
            });
        }, () => {
            // Error in initialization, maybe PayPal isn't supported or something else
        });
    }


    paymentMethods() {
        if (this.cart.length == 0) {
            this.showToast('No has agregado nada al carrito de compras')
        } else {

            this.showCart = false;
            this.payMethods = true;

        }
    }

    backToCart() {
        this.showCart = true;
        this.mobilePayment = false;
        this.payMethods = false;
    }


    decreaseCartItem(product) {
        this.cartService.decreaseProduct(product);
        this.ngOnInit();
    }

    increaseCartItem(product) {

        this.cartService.addProduct(product);
        this.ngOnInit();

    }

    removeCartItem(product) {
        this.cartService.removeProduct(product);
        this.ngOnInit();
    }

    removeAll() {
        this.cartService.removeAll();
    }

    getTotal() {
        return this.cartService.getTotal();
    }


    close() {
        this.modalCtrl.dismiss();
    }


    showToast(message: string) {
        this.toastCtrl.create({
            cssClass: 'toast',
            message: message,
            duration: 800
        }).then(toastData => toastData.present());
    }


}
