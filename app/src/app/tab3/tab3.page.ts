import { Component, ViewChild, ElementRef } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { InstApi } from 'src/providers/inst.api';
import { CompanyApi } from 'src/providers/company.api';

import {NgZone} from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  providers: [InstApi, CompanyApi]
})
export class Tab3Page extends AppBase {
  @ViewChild("maintab") maintab: IonSlides;
  @ViewChild("banner") banner: IonSlides;

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public instapi: InstApi,
    public companyapi: CompanyApi,
    private sanitizer: DomSanitizer,
    public elementRef:ElementRef,
    public zone:NgZone,
    ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;
    this.currentpage="tab3";
  }
  indexbanner = [];
  catlist = [];
  currenttab = 0;
  open = 1;

  onMyLoad(){
    this.banner.startAutoplay();
    
    AppBase.TABName = "tab3";
    AppBase.LASTTAB=this;

    this.instapi.indexbanner({ position: "home" }).then((indexbanner) => {
      this.indexbanner = indexbanner;
    });
    
  }

  onMyShow(){
    var catlist = this.catlist;
    this.companyapi.catlist({ status: "A", inapp: "Y" }).then((catlist) => {
      //alert("数据绑定了");
      this.catlist = catlist;
      console.log(catlist);
      this.zone.run(()=>{
        //alert("刷新成功告诉我");
      });

    });
  }
  changeTab(idx) {
    console.log(idx);
    this.maintab.slideTo(idx);
    this.currenttab = idx;
  }
  changeCurrentTab() {
    this.maintab.getActiveIndex().then((idx) => {
      console.log(idx);
      this.currenttab = idx;
      var tab=this.elementRef.nativeElement.querySelector("#v_"+idx);
      tab.scrollIntoView({
        behavior:"smooth",
        block:"start"
      });
    });
  }
  gotoCompany(company){
    if(company.iscoming_value=='Y'){
      this.showAlert("题目正在更新，敬请期待。");
      return;
    }
    this.navigate("company",{id:company.id});
  }
}
