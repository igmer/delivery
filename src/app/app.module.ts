import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CurrencyPipe, DatePipe } from "@angular/common";

import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule} from "@angular/fire/auth";
import { AngularFireModule } from "@angular/fire";
import { environment } from "../environments/environment.prod";


import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { Facebook } from '@ionic-native/facebook/ngx';

import { OneSignal } from "@ionic-native/onesignal/ngx";

import { Camera } from "@ionic-native/camera/ngx";
import { Crop } from "@ionic-native/crop/ngx";
import { Base64 } from "@ionic-native/base64/ngx";
import { AngularFireStorageModule } from '@angular/fire/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { File } from '@ionic-native/File/ngx';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMoneyCheckAlt, faBalanceScale, faStore, faUsers,  faTruck, faUserShield, faCartArrowDown, faPercent, faCartPlus, faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import { PayPal } from '@ionic-native/paypal/ngx';
import { Badge } from '@ionic-native/badge/ngx';
import { ServiceWorkerModule } from '@angular/service-worker';


library.add(faMoneyCheckAlt, faBalanceScale, faStore, faUsers, faTruck, faUserShield, faCartArrowDown, faPercent, faCartPlus, faMapMarkedAlt)
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
            AngularFireModule.initializeApp(environment.firebaseConfig),
            AngularFireAuthModule,
            AngularFirestoreModule,
            AngularFireStorageModule,
            HttpClientModule, FontAwesomeModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
  providers: [
    DatePipe,
    OneSignal,
    Badge,
    PayPal,
    CurrencyPipe,
    File,
    ImagePicker,
    InAppBrowser,
    Camera,
    Crop,
    Base64,  
    Facebook,
    GooglePlus,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
