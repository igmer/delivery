import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminUserListPageRoutingModule } from './admin-user-list-routing.module';

import { AdminUserListPage } from './admin-user-list.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminUserListPageRoutingModule,
    PipesModule
  ],
  declarations: [AdminUserListPage]
})
export class AdminUserListPageModule {}
