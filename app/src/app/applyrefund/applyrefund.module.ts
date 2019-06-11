import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ApplyrefundPage } from './applyrefund.page';

const routes: Routes = [
  {
    path: '',
    component: ApplyrefundPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ApplyrefundPage]
})
export class ApplyrefundPageModule {}
