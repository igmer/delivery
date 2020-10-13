import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { auth } from 'firebase';
import { Platform, LoadingController, ToastController } from '@ionic/angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore,
    private google: GooglePlus,
    private facebook: Facebook,
    private platform: Platform,
  ) { }


  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.facebook.logout();
      this.google.disconnect();
      this.router.navigate(['login']);      
    }).then(()=>{
      window.location.reload(); 
    })
  }

crearteByPhoneNumber(uid, phonenumber, token){
  this.db.collection('users').doc(uid)
      .set({        
        phonenumber: phonenumber,            
        token: token      
      })

    this.db.collection('roles').doc(uid)
      .set({ role: 'user' })  
}

  createUserData(uid, name, email, phonenumber, address, token) {
    this.db.collection('users').doc(uid)
      .set({
        name: name,
        email: email,
        phonenumber: phonenumber,
        address: address,        
        token: token      
      })

    this.db.collection('roles').doc(uid)
      .set({ role: 'user' })  
  }

  updateToken(uid,token){
    this.db.collection('users').doc(uid)
      .update({ token: token })
  }

  loginWithGoogle() {
    if (this.platform.is('cordova')) {
      return this.google.login({}).then(result => {
        const user_data_google = result;
        return this.afAuth.auth.signInWithCredential(auth.GoogleAuthProvider.credential(null, user_data_google.accessToken));
      })
    } else {
      return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider);
    }
  }

  loginWithFacebook() {
    if(this.platform.is('cordova')){
    return this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
      const credential_facebook = auth.FacebookAuthProvider.credential(response.authResponse.accessToken);

      return this.afAuth.auth.signInWithCredential(credential_facebook);
    })
    }else{
      return this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider);
    }
  }

  getUserAuth() {
    return this.afAuth.authState
  }



}
