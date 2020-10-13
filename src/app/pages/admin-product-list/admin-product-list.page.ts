import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActionSheetController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-product-list',
  templateUrl: './admin-product-list.page.html',
  styleUrls: ['./admin-product-list.page.scss'],
})
export class AdminProductListPage implements OnInit {
  category: any;
  products: any;
  result = '';
  id: any;
  name;
  constructor(private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private db: AngularFirestore,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private router: Router,
    private actRoute: ActivatedRoute) {
    this.category = this.actRoute.snapshot.paramMap.get('category');
  }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.getProducts();
    this.getCategory(this.category);
  }

  addProduct() {
    this.router.navigate(['/admin-add-product']);
  }


  doRefresh(event) {
    setTimeout(() => {
      this.ionViewDidEnter();
      event.target.complete();
    }, 500)
  }


  async getCategory(id) {

    try {

      this.db.doc('categorys/' + id)
      .valueChanges()
      .subscribe(data => {
        this.name = data['name'];           
      });

    } catch (e) {
      console.log(e);
    }
  }

  searchProducts(event) {
    const texto: string = event.target.value;
    this.result = texto;
  }

  async getProducts() {
    let loader = await this.loadingCtrl.create({
      message: "Por favor espere...",
    });

    loader.present();
    try {
      this.db.collection('products', ref => ref.where('category', '==', this.category))
        .snapshotChanges()
        .subscribe(data => {
          this.products = data.map(e => {
            return {
              id: e.payload.doc.id,
              name: e.payload.doc.data()['name'],
              categoryName: e.payload.doc.data()['categoryName'],
              price: e.payload.doc.data()['price'],
              img: e.payload.doc.data()['img']
            }
          })
          loader.dismiss();
        });
    } catch (e) {
      console.log(e);
      loader.dismiss();
    }
  }

  newProduct() {
    this.router.navigate(['admin-add-product']);
  }


  backButton() {
    this.router.navigate(['admin-category-list']);
  }

  async Options(id) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Editar Producto',
          icon: 'create-outline',
          cssClass: 'blue',
          handler: () => {
            this.router.navigate(['/admin-product-edit', id]);
          }
        }, {
          text: 'Eliminar Producto',
          icon: 'trash-outline',
          cssClass: 'danger',
          handler: () => {
            this.confirmDelete(id);
          }
        }]
    });
    await actionSheet.present();
  }


  async confirmDelete(id) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: '¿Está seguro de querer eliminar este producto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Aceptar',
          handler: () => {
            this.deleteProduct(id);
          }
        }
      ]
    });

    await alert.present();
  }


  async deleteProduct(id) {
    let loader = this.loadingCtrl.create({
      message: "Por favor espere...",

    });
    (await loader).present();

    try {
      this.db.collection('products').doc(id).delete()

    } catch (e) {
      this.showToast(e);
    }

    (await loader).dismiss();
    this.showToast('Producto eliminado con éxito');

  }


  showToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 1500
    }).then(toastData => toastData.present());
  }
}
