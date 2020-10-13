import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminUserEditPageRoutingModule } from './admin-user-edit-routing.module';

import { AdminUserEditPage } from './admin-user-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminUserEditPageRoutingModule
  ],
  declarations: [AdminUserEditPage]
})
export class AdminUserEditPageModule {}
