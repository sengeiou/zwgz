import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ValuationrecordPage } from './valuationrecord.page';

const routes: Routes = [
  {
    path: '',
    component: ValuationrecordPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ValuationrecordPage]
})
export class ValuationrecordPageModule {}
