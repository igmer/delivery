import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {AngularFireAuth} from '@angular/fire/auth';
import {LoadingController, Platform, ToastController, MenuController, AlertController} from '@ionic/angular';
import {NotificationsService} from "../services/notifications.service";


@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    new: any;
    uid: any;
    name: any;
    email: any;
    phonenumber: string;
    address = '';
    photo: any;
    token: any;
    password: any;
    confirmPassword: any;


    constructor(private authService: AuthService,
                private router: Router,
                private afAuth: AngularFireAuth,
                private loadingCtrl: LoadingController,
                private notifications: NotificationsService,
                private platform: Platform,
                private toastCtrl: ToastController,
                private menuCtrl: MenuController,
                private alertCtrl: AlertController) {


    }

    ngOnInit() {
        this.menuCtrl.enable(false)
    }


    async createUser() {

        const alert = await this.alertCtrl.create({
            cssClass: 'my-custom-class',
            header: 'Nuevo Usuario',
            backdropDismiss: false,
            inputs: [
                {
                    name: 'email',
                    type: 'email',
                    placeholder: 'Email'
                },
                {
                    name: 'password',
                    type: 'password',
                    placeholder: 'Contraseña'
                },
                {
                    name: 'confirmPassword',
                    type: 'password',
                    placeholder: 'Confirmar Contraseña'
                }
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary'
                }, {
                    text: 'Confirmar',
                    handler: (res) => {
                        this.email = res.email
                        this.password = res.password
                        this.confirmPassword = res.confirmPassword
                        this.RegisterWithEmail();

                    }
                }
            ]
        });

        await alert.present();
    }

    async RegisterWithEmail() {
        if (this.formValidationRegister()) {

            let loader = this.loadingCtrl.create({
                message: "Creando usuario...",
            });
            (await loader).present();

            try {
                await this.afAuth.auth
                    .createUserWithEmailAndPassword(this.email, this.password)


                this.router.navigate(['/complete-user-data']);
                this.menuCtrl.enable(true)
            } catch (e) {
                if (e == 'Error: The email address is badly formatted.') {
                    this.showToast('El formato del email es inválido. Ejemplo válido: usuario@gmail.com');
                    this.empty();
                }
                if (e == 'Error: Password should be at least 6 characters') {
                    this.showToast('La contraseña debe tener al menos 6 dígitos');
                    this.empty();
                }
            }
            (await loader).dismiss();

        }
    }

    async loginWithEmail() {
        if (this.formValidationLogin()) {
            let loader = this.loadingCtrl.create({
                message: "Accediendo...",
            });
            (await loader).present();

            try {
                await this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
                    .then(res => {
                        console.log(res);
                        this.router.navigate(['store-home'])

                        const name = res.user.displayName

                        this.showToast('Bienvenido,' + ' ' + name);
                        this.menuCtrl.enable(true);

                    })

            } catch (e) {
                console.log(e)
            }
            (await loader).dismiss();
        }
    }

    loginGoogle() {

        this.afAuth.auth.setPersistence('local').then(() => {
            return this.authService.loginWithGoogle().then(async res => {
                console.log(res);
                this.new = res.additionalUserInfo.isNewUser.valueOf();
                this.name = res.user.displayName;
                this.uid = res.user.uid

                if (this.new == true) {


                    this.router.navigate(['/complete-user-data']);
                    this.menuCtrl.enable(true)

                } else {

                    this.menuCtrl.enable(true)
                    this.router.navigate(['/store-home']).then(() => {
                        this.showToast('Bienvenido ' + this.name)
                    })

                }

            }).catch(err => {
                alert('Error:' + err)
            })
        })
    }


    loginFacebook() {

        this.afAuth.auth.setPersistence('local').then(() => {
            this.authService.loginWithFacebook().then(async res => {
                console.log(res);
                this.new = res.additionalUserInfo.isNewUser.valueOf();
                this.name = res.user.displayName;
                this.uid = res.user.uid;

                if (this.new == true) {

                    this.router.navigate(['/complete-user-data']);
                    this.menuCtrl.enable(true);

                } else {

                    this.menuCtrl.enable(true)
                    this.router.navigate(['/store-home']).then(() => {
                        this.showToast('Bienvenido ' + this.name);
                    });

                }

            }).catch(err => {
              console.log(err)
              this.showToast('Ha ocurrido un error, intenta de nuevo.' + JSON.stringify(err));
            });

        });

    }


    logout() {
        this.authService.logout();
    }


    formValidationRegister() {
        if (!this.email) {
            this.showToast('Introduzca un email');
            this.empty();
            return false;
        }

        if (this.password !== this.confirmPassword) {
            this.showToast('Las contraseñas no coinciden, deben ser iguales');
            this.empty();
            return false;
        }

        if (!this.password) {
            this.showToast('Introduzca una contraseña');
            this.empty();
            return false;
        }
        return true;

    }

    empty() {
        this.email = ''
        this.password = ''
        this.confirmPassword = ''
    }

    formValidationLogin() {
        if (!this.email) {
            this.showToast('Introduzca un email');
            return false;
        }

        if (!this.password) {
            this.showToast('Introduzca una contraseña');
            return false;
        }
        return true;

    }

    showToast(message: string) {
        this.toastCtrl.create({
            cssClass: 'toast',
            message: message,
            duration: 800
        }).then(toastData => toastData.present());
    }


}

