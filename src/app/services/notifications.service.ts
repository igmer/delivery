import { Injectable } from '@angular/core';
import { OneSignal } from "@ionic-native/onesignal/ngx";
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { Badge } from '@ionic-native/badge/ngx';
import { DatePipe } from '@angular/common';



@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private newMessage = new BehaviorSubject(0);

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private platform: Platform,
    private toastCtrl: ToastController,
    private badge: Badge,
    private onesignal: OneSignal,
    private date: DatePipe,
) { }

 newBadgeMessage() {
    return this.newMessage;   
  }

  adminTopics(){
    this.onesignal.sendTags({
      admin: 'si',     
    });
  }

  
  PayPalSale(saleid, name){
        
    fetch("https://onesignal.com/api/v1/notifications", {
      method: 'POST',
      body: JSON.stringify({
        "app_id": "ed9fa51a-e3b7-46ec-9173-d228b686527e",
        "included_segments": ["Admin"],
        "large_icon": "https://img.onesignal.com/t/9505b535-81b8-47f8-a9b7-6a25153e074e.jpg",
        "headings": {"en": "Nueva compra de: "+name},
        "contents": {"en": "Compra realizada desde PayPal"},
        "data": {"saleid": saleid}        
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "Basic YmViMGRmNTEtZjFmOS00YzAwLTg4YTEtODVjMDc0NmRiZDhi"
      }
    }).then(res =>{
      res.json();
      console.log('Success:', res);
    })
      .catch(error => console.error('Error:', error));   
  }

  NewUser(id, name){
        
    fetch("https://onesignal.com/api/v1/notifications", {
      method: 'POST',
      body: JSON.stringify({
        "app_id": "ed9fa51a-e3b7-46ec-9173-d228b686527e",
        "included_segments": ["Admin"],
        "large_icon": "https://img.onesignal.com/t/b5881740-2b1f-44c8-8dba-ff1ad982c560.jpg",
        "headings": {"en": "¡Nuevo usuario: "+name+"!"},
        "contents": {"en": "Toca para ver su perfíl"},
        "data": {"userid":id}        
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "Basic YmViMGRmNTEtZjFmOS00YzAwLTg4YTEtODVjMDc0NmRiZDhi"
      }
    }).then(res =>{
      res.json();
      console.log('Success:', res);
    })
      .catch(error => console.error('Error:', error));   
  }


  News(title, img){
        
    fetch("https://onesignal.com/api/v1/notifications", {
      method: 'POST',
      body: JSON.stringify({
        "app_id": "ed9fa51a-e3b7-46ec-9173-d228b686527e",
        "included_segments": ["Users"],
        "large_icon": img,
        "headings": {"en": title},
        "contents": {"en": "⠀"},
        "data": {"news":"1"}                
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "Basic YmViMGRmNTEtZjFmOS00YzAwLTg4YTEtODVjMDc0NmRiZDhi"
      }
    }).then(res =>{
      res.json();
      console.log('Success:', res);
    })
      .catch(error => console.error('Error:', error));   
  }


  orderTakenU(id, name, token){
        
    fetch("https://onesignal.com/api/v1/notifications", {
      method: 'POST',
      body: JSON.stringify({
        "app_id": "ed9fa51a-e3b7-46ec-9173-d228b686527e",      
        "include_player_ids": [token], 
        "large_icon": "https://img.onesignal.com/t/86494b81-ca65-4af3-8bb5-768b22c893f8.jpg",      
        "headings": {"en": name+" ha tomado tu pedido"},
        "contents": {"en": "Toca para verlo"},
        "data": {"takenidu": id}            
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "Basic YmViMGRmNTEtZjFmOS00YzAwLTg4YTEtODVjMDc0NmRiZDhi"
      }
    }).then(res =>{
      res.json();
      console.log('Success:', res);
    })
      .catch(error => console.error('Error:', error));   
  }

  orderTakenA(id, name){
        
    fetch("https://onesignal.com/api/v1/notifications", {
      method: 'POST',
      body: JSON.stringify({
        "app_id": "ed9fa51a-e3b7-46ec-9173-d228b686527e",      
        "included_segments": ["Admin"],
        "large_icon": "https://img.onesignal.com/t/86494b81-ca65-4af3-8bb5-768b22c893f8.jpg",      
        "headings": {"en": name+" ha tomado un pedido"},
        "contents": {"en": "Toca para verlo"},
        "data": {"takenid": id}            
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "Basic YmViMGRmNTEtZjFmOS00YzAwLTg4YTEtODVjMDc0NmRiZDhi"
      }
    }).then(res =>{
      res.json();
      console.log('Success:', res);
    })
      .catch(error => console.error('Error:', error));   
  }


  

  showToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 1500
    }).then(toastData => toastData.present());
  }

  

}






