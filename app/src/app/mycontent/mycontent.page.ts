import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { QuestionApi } from 'src/providers/question.api';


@Component({
  selector: 'app-mycontent',
  templateUrl: './mycontent.page.html',
  styleUrls: ['./mycontent.page.scss'],
  providers:[QuestionApi]
})
export class MycontentPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public questionApi: QuestionApi
  ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }

  onMyLoad() {
    //参数
    this.params;
  }
  list = [];

  onMyShow() {
    this.questionApi.replylist({onlyreply:"Y"}).then((list) => {

      for (var i = 0; i < list.length; i++) {
        var reply_time_str = this.util.TimeAgo(list[i].reply_time_timespan);
        list[i].reply_time_str = reply_time_str;
      }

      this.list = list;
    });;
  }
}