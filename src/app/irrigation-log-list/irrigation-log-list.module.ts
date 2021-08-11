import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IrrigationLogListPage } from './irrigation-log-list.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [IrrigationLogListPage],
})
export class IrrigationLogListPageModule {}
