import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { CompanyApi } from 'src/providers/company.api';

@Component({
  selector: 'app-refundsuccess',
  templateUrl: './refundsuccess.page.html',
  styleUrls: ['./refundsuccess.page.scss'],
  providers: [MemberApi, CompanyApi]
})
export class RefundsuccessPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public companyApi: CompanyApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }

  onMyLoad() {
    //参数
    this.params;
  }

  onMyShow() {

  }

}
