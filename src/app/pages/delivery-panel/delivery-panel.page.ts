import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {
    LoadingController,
    AlertController,
    ModalController,
    ToastController,
    MenuController,
    Platform
} from '@ionic/angular';
import {AngularFireAuth} from '@angular/fire/auth';
import {ClientDataModalPage} from "../client-data-modal/client-data-modal.page";
import {faTruck} from "@fortawesome/free-solid-svg-icons";
import {BehaviorSubject} from 'rxjs';
import {NotificationsService} from 'src/app/services/notifications.service';
import {AuthService} from "src/app/services/auth.service";
import Swal from 'sweetalert2'
import {OneSignal} from '@ionic-native/onesignal/ngx';
import {User} from "../../models/models.model";

@Component({
    selector: 'app-delivery-panel',
    templateUrl: './delivery-panel.page.html',
    styleUrls: ['./delivery-panel.page.scss'],
})
export class DeliveryPanelPage implements OnInit {

    user = {} as User

    faTruck = faTruck;
    uid: any;
    sales: any;
    isLogged = this.auth.auth.currentUser;
    yudsegment: any;
    myDelivery: any;
    orders: any;
    monthOrders: any;
    token: any;
    onWait: any;
    name;

    constructor(private firestore: AngularFirestore,
                private modalCtrl: ModalController,
                private loadingCtrl: LoadingController,
                private alertCtrl: AlertController,
                private auth: AngularFireAuth,
                private notifications: NotificationsService,
                private authService: AuthService,
                private toastCtrl: ToastController,
                private menuCtrl: MenuController,
                private platform: Platform,
                private onesignal: OneSignal
    ) {

    }


    ngOnInit() {
        if (this.platform.is('cordova')) {
            this.getToken();
        } else {
            this.token = '';
        }

        this.authService.getUserAuth().subscribe(u => {
            this.uid = u.uid
        })
        this.yudsegment = 'nodeliver';
        this.menuCtrl.enable(true);
    }


    ionViewDidEnter() {
        this.getSales(this.uid);
        this.getCounter(this.uid);
        if (this.platform.is('cordova')) {
            this.updateToken(this.token)
        } else {
            console.log('No es cordova')
        }

    }


    doRefresh(event) {
        setTimeout(() => {
            this.ionViewDidEnter();
            event.target.complete();
        }, 1500)
    }

    getToken() {
        this.onesignal.getIds().then(res => {
            this.token = res.userId;
        })
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

        } catch (e) {
            console.log(e);
        }
        (await loader).dismiss();

    }


    async updateCounter() {

        let loader = this.loadingCtrl.create({
            message: "Por favor espere...",

        });
        (await loader).present();
        try {
            this.firestore.collection('users').doc(this.uid).update({
                orders: this.orders + 1,
                onWait: true
            });
        } catch (e) {
            alert(e);
        }
        (await loader).dismiss();

    }

    getCounter(uid) {
        this.firestore.doc('users/' + uid)
            .valueChanges()
            .subscribe(data => {
                this.user.name = data['name'];
                this.orders = data['orders'];
                this.onWait = data['onWait']
            });

    }

    async getSales(uid) {
        let loader = await this.loadingCtrl.create({
            message: "Por favor espere...",
        });

        loader.present();
        try {
            this.firestore.collection('sales', ref => ref
                .where('delivery', '==', 'No Asignado')
                .orderBy('date', 'desc'))
                .snapshotChanges()
                .subscribe(data => {
                    this.sales = data.map(e => {
                        return {
                            total: e.payload.doc.data()['total'],
                            client: e.payload.doc.data()['client'],
                            date: e.payload.doc.data()['date'],
                            delivered: e.payload.doc.data()['delivered'],
                            status: e.payload.doc.data()['status'],
                            delivery: e.payload.doc.data()['delivery'],
                            clientToken: e.payload.doc.data()['clientToken']
                        }
                    })
                });
            this.firestore.collection('sales', ref => ref
                .where('delivery', '==', uid)
                .orderBy('date', 'desc'))
                .snapshotChanges()
                .subscribe(data => {
                    this.myDelivery = data.map(e => {
                        return {
                            total: e.payload.doc.data()['total'],
                            client: e.payload.doc.data()['client'],
                            date: e.payload.doc.data()['date'],
                            delivered: e.payload.doc.data()['delivered'],
                            status: e.payload.doc.data()['status'],
                            delivery: e.payload.doc.data()['delivery']
                        }
                    })
                    loader.dismiss();
                });
        } catch (e) {
            console.log(e);
            loader.dismiss();
        }
    }


    async takeSale(saleId, userId, nameDelivery, clientToken) {
        let loader = this.loadingCtrl.create({
            message: "Por favor espere...",
        });
        (await loader).present();
        this.firestore.collection('sales').doc(saleId).update({
            delivery: this.uid,
            delivered: 'En Proceso'
        });
        this.updateCounter();
        (await loader).dismiss();
        this.yudsegment = 'mydeliver';
        this.notifications.orderTakenU(saleId, nameDelivery, clientToken);
        this.notifications.orderTakenA(saleId, nameDelivery);

        let alert = await this.alertCtrl.create({
            header: 'Ya tienes asignado este pedido',
            message: '<div class="ion-text-justify"> ⠀Busca el pedido en el centro principal y entregalo al cliente registrado en esta venta.</div>',
            buttons: [{
                text: 'Ver Cliente',
                handler: () => {
                    this.userProfile(userId)
                }
            }]
        });
        alert.present()
    }

    async confirmTakeSale(saleId, userId, nameDelivery, clientToken) {
        // if (this.orders >= 5) {
        //     this.sweetAlert();
        // }
        //
        // if (this.onWait == true) {
        //     this.showToast('No puedes tomar otro pedido, tienes un pedido pendiente')
        // }


      console.log(this.orders + '--' + this.onWait);
      if (this.orders <= 4 && this.onWait == false) {

          const alert = await this.alertCtrl.create({
                cssClass: 'my-custom-class',
                header: '¿Quieres tomar este pedido para realizar su entrega?',
                buttons: [
                    {
                        text: 'Cancelar',
                        role: 'cancel',
                        cssClass: 'secondary'
                    }, {
                        text: 'Tomar Pedido',
                        handler: () => {
                            this.takeSale(saleId, userId, nameDelivery, clientToken);
                        }
                    }
                ]
            });

            await alert.present();
        }
    }

    async countAlert() {

        const alert = await this.alertCtrl.create({
            cssClass: 'my-custom-class',
            message: '<div class="ion-text-center">Este es tu contador de entregas, puedes realizar hasta <br><strong>5 entregas</strong> por día</div>',
            buttons: [
                {
                    text: 'Cerrar',
                }]
        });

        await alert.present();

    }

    sweetAlert() {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Buen trabajo',
            text: 'Alcanzaste el límite de entregas diarias',
            showConfirmButton: false,
            timer: 2000
        })
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


    async alertLimit(message) {
        const alert = await this.alertCtrl.create({
            cssClass: 'my-custom-class',
            header: message,
            buttons: [{text: 'Aceptar',}]
        });

        await alert.present();
    }


    showToast(message: string) {
        this.toastCtrl.create({
            message: message,
            duration: 1500
        }).then(toastData => toastData.present());
    }
}
