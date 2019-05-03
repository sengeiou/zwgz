import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { CompanyApi } from 'src/providers/company.api';

@Component({
  selector: 'app-paymentrecord',
  templateUrl: './paymentrecord.page.html',
  styleUrls: ['./paymentrecord.page.scss'],
  providers:[MemberApi,CompanyApi]
})
export class PaymentrecordPage  extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi:MemberApi,
    public companyApi:CompanyApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }
  g="B";
  catlist=[];
  comlist=[];
  threedayago=0;
  
  onMyLoad(){
    //参数
    this.params;
  }
  onMyShow(){
    var timestamp = (new Date()).getTime();
    timestamp = timestamp / 1000;
    var threeday = 24*60*60*3;
    var threedayago = timestamp-threeday;
    console.log("三天前时间戳为：" + threedayago);
    this.threedayago=threedayago;

    this.companyApi.paymentrecord({

    }).then((paymentrecord) => {

      this.comlist= paymentrecord;

      
    });
  }
}
