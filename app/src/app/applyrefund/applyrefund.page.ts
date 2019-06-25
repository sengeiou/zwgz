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
  selector: 'app-applyrefund',
  templateUrl: './applyrefund.page.html',
  styleUrls: ['./applyrefund.page.scss'],
  providers: [MemberApi, CompanyApi]
})
export class ApplyrefundPage extends AppBase {

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

  wechat = "";
  yuanyin = "";

  onMyShow() {

  }


  confirm() {
    if (this.wechat == '') {
      this.showAlert("请填写微信号");
      return;
    }
    if (this.yuanyin == '') {
      this.showAlert("请填写退款原因");
      return;
    }

    var that = this;
    var wechat = this.wechat;
    var yuanyin = this.yuanyin;
    var id = this.params.id;
    var api = this.companyApi;

    this.showConfirm("确认提交退款申请?", (ret) => {
      if (ret) {
        api.applyrefund({
          refundwechat: wechat,
          refund_reason: yuanyin,
          id: id
        }).then((applyrefund) => {
          this.navigate("refundsuccess");
          this.toast("提交成功");
        });
      }
    });




  }
}
