import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminUserProfilePageRoutingModule } from './admin-user-profile-routing.module';

import { AdminUserProfilePage } from './admin-user-profile.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminUserProfilePageRoutingModule,
    FontAwesomeModule
  ],
  declarations: [AdminUserProfilePage]
})
export class AdminUserProfilePageModule {}
