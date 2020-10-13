import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientDataModalPageRoutingModule } from './client-data-modal-routing.module';

import { ClientDataModalPage } from './client-data-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientDataModalPageRoutingModule
  ],
  declarations: [ClientDataModalPage]
})
export class ClientDataModalPageModule {}
