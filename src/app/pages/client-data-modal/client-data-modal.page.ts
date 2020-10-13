import { Component, OnInit, Input} from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from "../../models/models.model";
import { Router } from '@angular/router';
@Component({
  selector: 'app-client-data-modal',
  templateUrl: './client-data-modal.page.html',
  styleUrls: ['./client-data-modal.page.scss'],
})
export class ClientDataModalPage implements OnInit {

  @Input() id: string
  user = {} as User;
  
  constructor(private firestore: AngularFirestore,   
    private loadingCtrl: LoadingController,
    private router: Router,
    private modalCtrl: ModalController) { }

  ngOnInit() {
 this.getUserById(this.id)
  }

  async getUserById(id: string) {    
    let loader = this.loadingCtrl.create({
      message: "Por favor espere...",

    });
    (await loader).present();

    this.firestore.doc('users/' + id)
      .valueChanges()
      .subscribe(data => {
        this.user.name = data['name'];
        this.user.email = data['email'];
        this.user.address = data['address'];
        this.user.photo = data['photo'];
        this.user.phonenumber = data['phonenumber'];
        this.user.token = data['token'];

      });
    (await loader).dismiss()
    
  }

  chat(){
  this.router.navigate(['/chat-admin/',this.id]);
  this.modalCtrl.dismiss();
  }

}
