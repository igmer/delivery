import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-news-list',
  templateUrl: './admin-news-list.page.html',
  styleUrls: ['./admin-news-list.page.scss'],
})
export class AdminNewsListPage implements OnInit {

  news;
  result = '';
  id: any;
  constructor(private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private db: AngularFirestore,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private router: Router) { }

  ngOnInit() {
    this.getNews();
  }
  ionViewDidEnter(){
    this.getNews();
  }

  doRefresh(event){
    setTimeout(()=>{
    this.ionViewDidEnter();
    event.target.complete();
    }, 500)
      }

  async getNews() {
    let loader = await this.loadingCtrl.create({
      message: "Por favor espere...",
    });

    loader.present();
   try{   
    this.db.collection('news')
      .snapshotChanges()
      .subscribe(data => {
        this.news = data.map(e => {
          return {
            id: e.payload.doc.id,
            name: e.payload.doc.data()['name'],      
            img: e.payload.doc.data()['img']          
          }          
        }) 
        loader.dismiss();             
      });    
    }catch(e){
      console.log(e);
      loader.dismiss(); 
    }
  }


adminPanel(){
  this.router.navigate(['admin-panel']);
}

new(){
  this.router.navigate(['admin-news-add']);
}

  async Options(id) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      cssClass: 'my-custom-class',
      buttons: [                
        {
        text: 'Editar Anuncio',
        icon: 'create-outline',
        cssClass: 'blue',    
        handler: () => {
          this.router.navigate(['/admin-news-edit',id]);
        }
      }, {
        text: 'Eliminar Anuncio',
        icon: 'trash-outline',
        cssClass: 'danger',   
        handler: () => {
          this.confirmDelete(id, name);
        }
      }]
    });
    await actionSheet.present();
  }


  async confirmDelete(id, name) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: '¿Está seguro de querer eliminar este anuncio?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Aceptar',
          handler: () => {
            this.deleteNews(id);            
          }
        }
      ]
    });

    await alert.present();
  }


 async deleteNews(id){ 
      let loader = this.loadingCtrl.create({
        message: "Por favor espere...",

      });
      (await loader).present();

      try {

    this.db.collection('news').doc(id).delete()

  

} catch (e) {
  this.showToast(e);
}

(await loader).dismiss();
this.showToast('Anuncio eliminado con éxito');

}


showToast(message: string) {
  this.toastCtrl.create({
    message: message,
    duration: 1500
  }).then(toastData => toastData.present());
}
}
