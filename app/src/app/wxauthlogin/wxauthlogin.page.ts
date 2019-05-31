import { Component, ViewChild, ElementRef } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { AliyunApi } from 'src/providers/aliyun.api';

@Component({
  selector: 'app-wxauthlogin',
  templateUrl: './wxauthlogin.page.html',
  styleUrls: ['./wxauthlogin.page.scss'],
  providers: [MemberApi, AliyunApi]
})
export class WxauthloginPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public ele: ElementRef,
    public memberApi: MemberApi,
    public aliyunApi: AliyunApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;


  }


  mobile = "";
  photo = "";
  name = "";
  openid = "";
  reminder = 0;
  inverify = false;
  c1 = "";
  c2 = "";
  c3 = "";
  c4 = "";
  infocus = "";
  show = 1;
  timer = null;

  onMyLoad() {
    this.name = this.params.name;
    this.photo = this.params.photo;
    this.openid = this.params.openid;
  }

  setInVerify() {
    this.sendVerifyCode();
    this.timer = setInterval(() => {
      if (this.reminder > 0) {
        this.reminder--;
      }
    }, 1000);
  }
  setC2Focus() {
    this.c2 = "";
    var obj = this.ele.nativeElement.querySelector('#inputc2');
    obj.focus();
  }
  setC3Focus() {
    this.c3 = "";
    var obj = this.ele.nativeElement.querySelector('#inputc3');
    obj.focus();
  }
  setC4Focus() {
    this.c4 = "";
    var obj = this.ele.nativeElement.querySelector('#inputc4');
    obj.focus();
  }
  submitRegister() {
    var verifycode = this.c1 + this.c2 + this.c3 + this.c4;
    this.aliyunApi.verifycode({
      mobile: this.mobile,
      verifycode,
      type: "register"
    }).then(ret => {
      if (ret.code == 0) {
        this.memberApi.wxauthbind({
          mobile: this.mobile,
          name: this.name,
          photo: this.uploadpath+"member/"+ this.photo,
          appopenid: this.openid
        }).then(ret => {
          if (ret.code == "0") {
            this.toast("注册成功");
            this.store("UserToken", ret.return);
            this.backToUrl("/tabs/tab5");
          } else {
            this.toast(ret.result);
          }
        });
      } else {
        this.c1 = "";
        this.c2 = "";
        this.c3 = "";
        this.c4 = "";
        this.toast("验证码校验失败，请重新尝试");
      }
    });
  }

  sendVerifyCode() {

    this.inverify = true;
    this.aliyunApi.sendverifycode({
      mobile: this.mobile,
      type: "register"
    }).then(ret => {
      if (ret.code == 0) {
        this.reminder = 60;
        this.show = 2;

        this.c1 = "";
        this.c2 = "";
        this.c3 = "";
        this.c4 = "";
        //this.$refs["inputc1"].focus();

        //var obj = this.ele.nativeElement.querySelector('#inputc1');
        //obj.focus();

        this.toast("验证码已发送，请注意查收");
      } else {
        this.toast("验证码发送失败，请稍后重试");
      }
    });
  }
  nextone() {
    this.show = 2;
    console.log(this.show);
  }
  nexttwo() {
    this.show = 3;
    console.log(this.show);
  }
  nextthree() {
    this.show = 1;
    console.log(this.show);
  }

  tryMyBack() {
    if (this.show == 1) {
      this.back();
      return;
    }
    if (this.show == 2) {
      this.nextthree();
    }
  }

}
