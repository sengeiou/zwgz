import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { CompanyApi } from 'src/providers/company.api';
import { WxauthloginPage } from '../wxauthlogin/wxauthlogin.page';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
  providers: [CompanyApi]
})
export class FeedbackPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public companyapi: CompanyApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }

  onMyLoad() {
    //参数
    this.params;
  }
  onMyShow() {

  }
  wechat = "";
  yuanyin = "";


  confirm() {

    if (this.wechat == '') {
      this.showAlert("请填写手机号或微信号");
      return;
    }
    if (this.yuanyin == '') {
      this.showAlert("请填写意见内容");
      return;
    }

    var that = this;
    var wechat = this.wechat;
    var yuanyin = this.yuanyin;
    var api = this.companyapi;
    var memberinfo = this.MemberInfo;

    this.showConfirm("确认提交意见反馈", (res) => {
      if (res) {
        api.feedback({
          status: "A",
          feed_content: yuanyin,
          phone: wechat,
          member_id: memberinfo.id
        }).then((feedback) => {
          this.toast("提交成功");
          this.back();
        });


      }
    })



  }
}
