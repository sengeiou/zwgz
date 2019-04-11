import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WxauthloginPage } from './wxauthlogin.page';

const routes: Routes = [
  {
    path: '',
    component: WxauthloginPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WxauthloginPage]
})
export class WxauthloginPageModule {}
