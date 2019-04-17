import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { InstApi } from 'src/providers/inst.api';
import { CompanyApi } from 'src/providers/company.api';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  providers: [InstApi, CompanyApi]
})
export class Tab3Page extends AppBase {
  @ViewChild("maintab") maintab: IonSlides;

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public instapi: InstApi,
    public companyapi: CompanyApi,
    private sanitizer: DomSanitizer) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;
  }
  indexbanner = [];
  catlist = [];
  currenttab = 0;
  open = 1;

  onMyShow() {
    AppBase.TABName = "tab3";
    AppBase.LASTTAB=this;

    this.instapi.indexbanner({ position: "home" }).then((indexbanner) => {
      this.indexbanner = indexbanner;
    });
    var catlist = this.catlist;
    {
      this.companyapi.catlist({ status: "A", inapp: "Y" }).then((catlist) => {
        this.catlist = catlist;
      });
    }
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
    });
  }
  gotoCompany(id){
    this.navigate("company",{id:id});
  }
}
