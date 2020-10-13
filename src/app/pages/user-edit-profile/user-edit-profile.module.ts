import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserEditProfilePageRoutingModule } from './user-edit-profile-routing.module';

import { UserEditProfilePage } from './user-edit-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserEditProfilePageRoutingModule
  ],
  declarations: [UserEditProfilePage]
})
export class UserEditProfilePageModule {}
