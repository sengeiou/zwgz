import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { WechatMgr } from 'src/mgr/WechatMgr';
import { Wechat } from '@ionic-native/wechat/ngx';

@Component({
  selector: 'app-mobilelogin',
  templateUrl: './mobilelogin.page.html',
  styleUrls: ['./mobilelogin.page.scss'],
  providers: [MemberApi,Wechat]
})
export class MobileloginPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public wechat: Wechat) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;
  }

  mobile = "";
  password = "";
  wechatInstalled = false;

  trylogin() {
   
    this.memberApi.login({
      mobile: this.mobile,
      password: this.password
    }).then((ret) => {
      if (ret.code == "0") {
        this.store("lastloginmobile", this.mobile);
        this.store("UserToken", ret.return);
        this.toast("登录成功");
        this.back();
      } else {
        this.toast("手机号码或密码不正确");
      }
    });

  }
  onMyLoad() {
    //参数
    this.params;

    var storemobile = this.store("lastloginmobile");
    this.mobile = storemobile;
    // WechatMgrWechatMgr.checkInstalled((isinstall)=>{
    //   this.wechatInstalled=isinstall;
    // });
    var wechatmgr:WechatMgr=new WechatMgr(this.wechat);
    wechatmgr.checkInstalled().then((isinstall)=>{
      this.wechatInstalled=isinstall;
    });
  }
  onMyShow() {

  }

  checkWechatAuth(){
    var wechatmgr:WechatMgr=new WechatMgr(this.wechat);
    wechatmgr.authUserInfo().then((res)=>{
      var code=res["code"];
      this.memberApi.wechatauth({"oauthcode":code}).then((ret)=>{
        if(ret.code==0){
          this.store("UserToken", ret.return);
          this.toast("登录成功");
          this.back();
        }else{
          this.navigate("wxauthlogin",ret.return);
        }
      }); 
    });
  }
}