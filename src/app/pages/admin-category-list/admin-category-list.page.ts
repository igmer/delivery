import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-category-list',
  templateUrl: './admin-category-list.page.html',
  styleUrls: ['./admin-category-list.page.scss'],
})
export class AdminCategoryListPage implements OnInit {

  categorys:any;
  products: any;
  result = '';
  id: any;
  constructor(private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private db: AngularFirestore,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private router: Router) { }

  ngOnInit() {
    this.getCategorys()
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
   try{   
    this.db.collection('categorys')
      .snapshotChanges()
      .subscribe(data => {
        this.categorys = data.map(e => {
          return {
            id: e.payload.doc.id,
            name: e.payload.doc.data()['name'],
            description: e.payload.doc.data()['description'],
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

productList(name){
  this.router.navigate(['/admin-product-list',name]);
}

  async categoryOptions(id) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      cssClass: 'my-custom-class',
      buttons: [ 
        {
          text: 'Ver Productos',
          icon: 'cart-outline',
          cssClass: 'blue',    
          handler: () => {
            this.router.navigate(['/admin-product-list',id]);
          }
        },        
        {
        text: 'Editar Categoría',
        icon: 'create-outline',
        cssClass: 'blue',    
        handler: () => {
          this.router.navigate(['/admin-category-edit',id]);
        }
      }, {
        text: 'Eliminar Categoría',
        icon: 'trash-outline',
        cssClass: 'danger',   
        handler: () => {
          this.confirmDelete(id);
        }
      }]
    });
    await actionSheet.present();
  }

  async storeOptions() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      cssClass: 'my-custom-class',
      buttons: [ 
        {
          text: 'Nueva Categoría',
          icon: 'copy-outline',
          cssClass: 'blue',    
          handler: () => {
            this.router.navigate(['/admin-add-category']);
          }
        },        
        {
        text: 'Nuevo Producto',
        icon: 'cart-outline',
        cssClass: 'blue',    
        handler: () => {
          this.router.navigate(['/admin-add-product']);
        }
      }]
    });
    await actionSheet.present();
  }

  async confirmDelete(id) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: '¿Está seguro de querer eliminar esta categoría?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Aceptar',
          handler: () => {
            this.deleteCategory(id);            
          }
        }
      ]
    });

    await alert.present();
  }


 async deleteCategory(id){ 
      let loader = this.loadingCtrl.create({
        message: "Por favor espere...",

      });
      (await loader).present();

      try {

    this.db.collection('categorys').doc(id).delete()

    this.db.firestore.collection('products').get().then(function(querySnapshot) {
      querySnapshot.query.where('category', '==',id).get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
          doc.ref.delete()
        })
      })
  });
  

} catch (e) {
  this.showToast(e);
}

(await loader).dismiss();
this.showToast('Categoría eliminada con éxito');

}


showToast(message: string) {
  this.toastCtrl.create({
    message: message,
    duration: 1500
  }).then(toastData => toastData.present());
}
}
