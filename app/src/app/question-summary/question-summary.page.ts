import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { CompanyApi } from 'src/providers/company.api';
import { QuestionApi } from 'src/providers/question.api';

@Component({
  selector: 'app-question-summary',
  templateUrl: './question-summary.page.html',
  styleUrls: ['./question-summary.page.scss'],
  providers: [QuestionApi]
})
export class QuestionSummaryPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public questionApi: QuestionApi
  ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }

  list = [];

  g = "A";
  onMyLoad() {
    //参数
    this.params;
  }
  onMyShow() {
    //this.
    this.refreshlist();
  }
  refreshlist(){

    this.questionApi.list({ status: "A", orderby: "post_time desc" }).then((list) => {

      for(var i=0;i<list.length;i++){
        var post_time_str=this.util.TimeAgo(list[i].post_time_timespan);
        list[i].post_time_str=post_time_str;
      }
      this.list = list;
    });
  }
}
