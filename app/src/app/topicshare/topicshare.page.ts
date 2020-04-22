import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { SquareApi } from 'src/providers/square.api';

@Component({
  selector: 'app-topicshare',
  templateUrl: './topicshare.page.html',
  styleUrls: ['./topicshare.page.scss'],
  providers: [MemberApi, SquareApi]
})
export class TopicsharePage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public squareapi: SquareApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }
  title = "";
  topic = null;
  abouttopic = [];
  id = 0;
  isfirst = "N";

  onMyLoad() {
    //参数
    this.params=null;
    this.params={};
    var vcc=( window.location.href.split("?")[1]).split("&");
    
    console.log(vcc);
    for(var i=0;i<vcc.length;i++){
      var k=vcc[i].split("=");
      this.params[k[0]]=k[1];
    }
    console.log(this.params);
    this.id = this.params.id;
    //this.isfirst = this.params.isfirst;
  }
  onMyShow() {
    this.squareapi.topic({ id: this.id }).then((topic) => {
      //topic.conclude=this.splitRow(topic.conclude);
      //topic.content=this.splitRow(topic.content);
      //topic.reference=this.splitRow(topic.reference);

      topic.conclude = AppUtil.HtmlDecode(topic.conclude);
      topic.conclude = this.sanitizer.bypassSecurityTrustHtml(topic.conclude);
      topic.content = AppUtil.HtmlDecode(topic.content);
      topic.content = this.sanitizer.bypassSecurityTrustHtml(topic.content);
      topic.reference = AppUtil.HtmlDecode(topic.reference);
      topic.reference = this.sanitizer.bypassSecurityTrustHtml(topic.reference);

      topic.mianfei = AppUtil.HtmlDecode(topic.mianfei);
      topic.mianfei = this.sanitizer.bypassSecurityTrustHtml(topic.mianfei);
      var post_time_str = this.util.TimeAgo(topic.post_time_timespan);
      topic.post_time_str = post_time_str;
      this.title = topic.title;
      this.topic = topic;
      this.squareapi.topicread({ topic_id: this.id });
    });
    this.squareapi.abouttopic({ topic_id: this.id }).then((abouttopic) => {
      for (var i = 0; i < abouttopic.length; i++) {
        var post_time_str = this.util.TimeAgo(abouttopic[i].post_time_timespan);
        abouttopic[i].post_time_str = post_time_str;
      }
      this.abouttopic = abouttopic;
    });
  }
  home() {
    this.navCtrl.navigateBack('tabs/tab1');
  }
  fav() {
    this.squareapi.topicfav({ topic_id: this.params.id }).then((ret) => {
      if (ret.code == 0) {
        this.topic.favcount = Number(this.topic.favcount) + 1;
        this.topic.isfav = 'Y';
      } else {
        this.topic.favcount = Number(this.topic.favcount) - 1;
        this.topic.isfav = 'N';
      }
    });
  }

 
  inshare = false;
  inshare1 = false;
  // share() {
    // if(this.is_weixn()){
    //   this.inshare = !this.inshare;
    // }else
    // {
    //   var u = navigator.userAgent;
    //   var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    //   var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    //   if(isiOS){
    //     this.showAlert(this.InstInfo.nodownload);
    //   }else{
        // this.inshare1 = true;
//       }
//     }
//   }
 
}
