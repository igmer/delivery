import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-delivery-list',
  templateUrl: './admin-delivery-list.page.html',
  styleUrls: ['./admin-delivery-list.page.scss'],
})
export class AdminDeliveryListPage implements OnInit {

  users: any;
  result = '';
  yudsegment;
  active;
  inactive;
  constructor(private loadingCtrl: LoadingController,   
    private db: AngularFirestore,
    private router: Router,
    private actionSheetCtrl: ActionSheetController,
    private toastCtrl: ToastController) { }

  ngOnInit() { 
   
    this.yudsegment = 'active';
  }


  ionViewDidEnter(){
     this.getUsers();
  }

  doRefresh(event){
    setTimeout(()=>{
    this.ionViewDidEnter();
    event.target.complete();
    }, 500)
      }

  adminPanel(){
    this.router.navigate(['admin-panel']);
  }

  searchUser(event) {
    const texto: string = event.target.value;
    this.result = texto;
  }

  async getUsers() {
    let loader = await this.loadingCtrl.create({
      message: "Por favor espere...",
    });

    loader.present();
    try {
        this.db.collection('users', ref => ref.where('onWait','==', true))
        .snapshotChanges()
        .subscribe(data => {
          this.active = data.map(e => {
            return {
              id: e.payload.doc.id,
              name: e.payload.doc.data()['name'],   
              onWait: e.payload.doc.data()['onWait'],         
              address: e.payload.doc.data()['address'],
              photo: e.payload.doc.data()['photo'],
              orders: e.payload.doc.data()['orders'],
            }
          });  
          loader.dismiss();
        });

        this.db.collection('users', ref => ref.where('onWait','==', false))
        .snapshotChanges()
        .subscribe(data => {
          this.inactive = data.map(e => {
            return {
              id: e.payload.doc.id,
              name: e.payload.doc.data()['name'],   
              onWait: e.payload.doc.data()['onWait'],         
              address: e.payload.doc.data()['address'],
              photo: e.payload.doc.data()['photo'],
              orders: e.payload.doc.data()['orders'],
            }
          });  
          loader.dismiss();
        });


    } catch (e) { 
      loader.dismiss();
      this.showToast(e);
    }

  }

 
  showToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 1500
    }).then(toastData => toastData.present());
  }

}
