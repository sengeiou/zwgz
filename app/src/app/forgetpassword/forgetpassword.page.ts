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
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.page.html',
  styleUrls: ['./forgetpassword.page.scss'],
  providers: [MemberApi, AliyunApi]
})
export class ForgetpasswordPage extends AppBase {

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
  name = "";
  password = "";
  reminder = 0;
  inverify = false;
  c1 = "";
  c2 = "";
  c3 = "";
  c4 = "";
  infocus = "";
  show = 1;
  timer = null;



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
  submitVerify() {
    var verifycode = this.c1 + this.c2 + this.c3 + this.c4;
    this.aliyunApi.verifycode({
      mobile: this.mobile,
      verifycode,
      type: "reset"
    }).then(ret => {
      if (ret.code == 0) {
        this.memberApi.resetpassword( {
          mobile: this.mobile,
          password: this.password
        }).then(ret => {
          if (ret.code == "0") {
            this.toast("重设成功，请重新登录");
            this.back();
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
    this.memberApi.checkcanreg({ mobile: this.mobile }).then(ret => {
      if (ret.code == "1") {
        this.aliyunApi.sendverifycode( {
          mobile: this.mobile,
          type: "reset"
        }).then(ret => {
          if (ret.code == 0) {
            this.reminder = 60;
            this.show=2;
            this.c1 = "";
            this.c2 = "";
            this.c3 = "";
            this.c4 = "";
            this.inverify = true;
           

            this.toast("验证码已发送，请注意查收");
          } else {
            this.toast("验证码发送失败，请稍后重试");
          }
        });
      } else {
        this.toast("手机号码还没有注册");
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

  tryMyBack(){
    if(this.show==1){
      this.back();
      return;
    }
    if(this.show==2){
      this.nextthree();
    }
  }

}
