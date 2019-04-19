import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { CompanyApi } from 'src/providers/company.api';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
  providers: [CompanyApi]
})
export class ResultPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public companyapi: CompanyApi
  ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }

  info = null;

  onMyShow() {
    var that = this;

    var api = this.companyapi;
    api.info({
      id: this.params.id, version: this.params.version
    }).then((info) => {
      if (info.testresult.status == 'B') {
        console.log("b~~~c");
        var guzhi = parseInt((info.testresult.val / 1).toString());//000
        info.testresult.guzhi = guzhi;
      }

      for (var i = 0; i < info.questionlist.length; i++) {
        console.log(info.questionlist[i].tips);
        info.questionlist[i].name = this.util.HtmlDecode(info.questionlist[i].name);
        info.questionlist[i].q1 = this.util.HtmlDecode(info.questionlist[i].q1);
        info.questionlist[i].q2 = this.util.HtmlDecode(info.questionlist[i].q2);
        info.questionlist[i].q3 = this.util.HtmlDecode(info.questionlist[i].q3);
        info.questionlist[i].q4 = this.util.HtmlDecode(info.questionlist[i].q4);
        info.questionlist[i].tips = this.util.HtmlDecode(info.questionlist[i].tips);
        console.log(info.questionlist[i].tips);
      }
      this.info = info;
    });

  }

}
