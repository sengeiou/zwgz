import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { CompanyApi } from 'src/providers/company.api';
import { WechatApi } from 'src/providers/wechat.api';
import { Device } from '@ionic-native/device/ngx';
import { InAppPurchase } from '@ionic-native/in-app-purchase/ngx';
import { NgZone } from '@angular/core';
import { AppleApi } from 'src/providers/apple.api';
declare let Wechat: any;

@Component({
  selector: 'app-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
  providers: [MemberApi, CompanyApi,WechatApi,AppleApi]
})

export class PayPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public device: Device,
    public wechatapi: WechatApi,
    public appleApi: AppleApi,
    public zone: NgZone,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public iap: InAppPurchase,
    public companyApi: CompanyApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }
  showpayment = false;
  platformname = "";
  onMyLoad() {
    //参数
    this.params;

    this.platformname = this.device.platform;

    if (this.platformname == "iOS") {
      this.paytype = "APPLE";
    } else {
      this.paytype = "WXAPP";
    }
  }

  wechat = "";
  yuanyin = "";

taocan=null;
xz=null;
jiage=0;
  onMyShow() {
console.log(123123);
this.memberApi.gettaocan({}).then((taocan)=>{

  taocan.map((item)=>{

    item.tishi=item.tishi.replace(/\r\n/g,"<br>")  
    item.tishi=item.tishi.replace(/\n/g,"<br>");


  })
 

this.taocan=taocan;
this.xz=taocan[0].id;
this.jiage=taocan[0].price;
console.log(taocan);

})
  }
  paytype = "";
  jj() {
    this.showpayment = false;
    this.back();
    this.zone.run(() => {
      //alert("刷新成功告诉我");
    });
  }
  pay() {
    //alert(1);
    var that = this;
  

    if (this.paytype == '') {
      this.showAlert("请选择支付方式");
      return;
    }
 var taocan_id=this.xz;
    if (this.paytype == 'WXAPP') {
      this.wechatapi.appprepay({ taocan_id }).then((params) => {
        Wechat.sendPaymentRequest(params, function () {
          that.jj();
        }, function () {

        });
      })

    }

    if (this.paytype == "PPAP") {
      this.appleApi.prepay({ taocan_id }).then((ret) => {
        if (ret.code == 0) {
          this.appleApi.notify({
            orderno: ret.return.orderno
          }).then((ret) => {
            //alert(JSON.stringify(ret));
            if (ret.code == "0") {
              that.showpayment = false;
          
            } else {
              this.showAlert("支付失败，请联系管理员");
            }
          });
        }
      });
    }


    if (this.paytype == "APPLE") {
      this.appleApi.prepay({ taocan_id }).then((ret) => {
        if (ret.code == 0) {
          //alert(ret.return.orderno);
          this.iap.getProducts([ret.return.appleitemid]).then((pd) => {

            //alert(JSON.stringify(pd));
            this.iap.subscribe(pd[0].productId).then((data) => {
              this.appleApi.notify({
                transactionId: data.transactionId,
                receipt: data.receipt,
                signature: data.signature,
                orderno: ret.return.orderno
              }).then((ret) => {
                //alert(JSON.stringify(ret));
                if (ret.code == "0") {
                  that.jj();
                } else {
                  this.showAlert("支付失败，请联系管理员");
                }
              });
            }).catch((err) => {

              this.showAlert(err);
            });
          }).catch((err) => {

            this.showAlert(err);
          });
        }
      });
    }

    // api.prepay({
    //   cat_id,company_id
    // }).then(
    //   (ret) => {
    //     ret.success = function () {
    //       that.showpayment = false;
    //       that.getResult();
    //     }
    //     //wx.requestPayment(ret);
    //     alert("请求支付requestPayment");
    //   });
  }

}
