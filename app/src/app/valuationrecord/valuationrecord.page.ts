import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { CompanyApi } from 'src/providers/company.api';

@Component({
  selector: 'app-valuationrecord',
  templateUrl: './valuationrecord.page.html',
  styleUrls: ['./valuationrecord.page.scss'],
  providers:[CompanyApi]
})
export class ValuationrecordPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public companyApi:CompanyApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }

  pg=0;
  allmembertest=[];
  testblock=[];

  onMyLoad(){
    //参数
    this.params;
  }
  
  onMyShow() {
    var that = this;
    var memberinfo = this.MemberInfo;
    console.log(memberinfo);
    var api = this.companyApi;
    api.allmembertest({
      member_id: memberinfo.id
    }).then((allmembertest) => {
      for (var i = 0; i < allmembertest.length; i++) {
        var guzhi = parseInt(allmembertest[i].val);
        allmembertest[i].guzhi = guzhi;
      }
      this.allmembertest=allmembertest;
    });
    // api.paymentrecord({

    // }).then((paymentrecord) => {

    //   th
    // });
  }
  gotoCompany(id) {
    var api = this.companyApi;
    this.navigate("company",{id:id});
  }
  
}
