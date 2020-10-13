import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.page.html',
  styleUrls: ['./admin-user-list.page.scss'],
})
export class AdminUserListPage implements OnInit {

  users: any;
  result = '';
 admin: any;
  constructor(private loadingCtrl: LoadingController,   
    private db: AngularFirestore,
    private router: Router,
    private actionSheetCtrl: ActionSheetController,
    private toastCtrl: ToastController) { }

  ngOnInit() { 
    
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
      this.db.collection('users', ref => ref.where('purchases','>=', 0))
        .snapshotChanges()
        .subscribe(data => {
          this.users = data.map(e => {
            return {
              id: e.payload.doc.id,
              name: e.payload.doc.data()['name'],          
              address: e.payload.doc.data()['address'],
              photo: e.payload.doc.data()['photo'],
              purchases: e.payload.doc.data()['purchases']
            }
          });
          loader.dismiss();
        });

        this.db.collection('users', ref => ref.where('admin','==', true))
        .snapshotChanges()
        .subscribe(data => {
          this.admin = data.map(e => {
            return {
              id: e.payload.doc.id,
              name: e.payload.doc.data()['name'],          
              address: e.payload.doc.data()['address'],
              photo: e.payload.doc.data()['photo'],
              purchases: e.payload.doc.data()['purchases']
            }
          });
          loader.dismiss();
        });
    } catch (e) { 
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
