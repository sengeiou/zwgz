import { Component, ViewChild,ElementRef, NgZone } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { SquareApi } from 'src/providers/square.api';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
declare let Wechat: any;

@Component({
  selector: 'app-topic2',
  templateUrl: './topic2.page.html',
  styleUrls: ['./topic2.page.scss'],
  providers:[MemberApi,SquareApi]
})
export class Topic2Page  extends AppBase {


  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi:MemberApi,
    public squareapi:SquareApi,
    public ngzone:NgZone,
    public  photoViewer: PhotoViewer) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }
  title="";
  topic=null;
  abouttopic=[];
  id=0;
  isfirst="N";
  companyname="";
  onMyLoad(){
    //参数
    this.params;
    this.isfirst=this.params.isfirst;
  }
  onMyShow(){
    this.id=this.params.id;
    this.companyname=this.params.companyname;

    this.squareapi.topic({id:this.id}).then((topic)=>{
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

      var post_time_str=this.util.TimeAgo(topic.post_time_timespan);
      topic.post_time_str=post_time_str;
      this.title=topic.title;
      this.topic=topic;
      this.squareapi.topicread({topic_id:this.id});

      this.ngzone.run(()=>{
        var yy1=null;
        var yy2=null;
        var count=0;
        var vak=setInterval(() => {
          count++;
          yy1=document.querySelector("#t2_yy1");
          if(count>10){
            clearInterval(vak);
            
          }
          if(yy1!=null&&yy1.offsetHeight>0){
            clearInterval(vak);
            console.log("yy1",yy1);
            
            yy2=document.querySelector("#t2_yy2");
            yy2.style.height=yy1.offsetHeight+"px";
            //alert(yy1.offsetHeight+"="+yy2.offsetHeight);
          }
        }, 100);
      });
    });
    this.squareapi.abouttopic({topic_id:this.id}).then((abouttopic)=>{
      for(var i=0;i<abouttopic.length;i++){
      var post_time_str=this.util.TimeAgo(abouttopic[i].post_time_timespan);
      abouttopic[i].post_time_str=post_time_str;
    }
      this.abouttopic=abouttopic;
    });
   
  }
  home(){
    this.navCtrl.navigateBack('tabs/tab1');

  }
  fav(){
    this.squareapi.topicfav({topic_id:this.params.id}).then((ret)=>{
      if(ret.code==0){
        this.topic.favcount= Number(this.topic.favcount)+1;
        this.topic.isfav='Y';
      }else{
        this.topic.favcount= Number(this.topic.favcount)-1;
        this.topic.isfav='N';
      }
    });
  }



  inshare = false;
  share() {
    this.inshare = true;
  }
  sharetoWechat() {
    this.inshare=false;
    Wechat.share({
      message: {
        title: this.title,
        thumb: this.uploadpath + "inst/" + this.InstInfo.logo,
        description: this.InstInfo.sharesign,
        media: {
          type: Wechat.Type.WEBPAGE,
          webpageUrl: "http://zwgz.helpfooter.com/topicshare?id=" + this.id
        }
      },
      scene: Wechat.Scene.SESSION
    }, function () {
      //alert("Success");
    }, function (reason) {
      //alert("Failed: " + reason);
    });
  }
  sharetoWechatFriend() {
    this.inshare=false;
    
    Wechat.share({
      message: {
        title: this.title,
        thumb: this.uploadpath + "inst/" + this.InstInfo.logo,
        description: this.InstInfo.sharesign,
        media: {
          type: Wechat.Type.WEBPAGE,
          webpageUrl: "http://zwgz.helpfooter.com/topicshare.html?id=" + this.id
        }
      },
      scene: Wechat.Scene.TIMELINE
    }, function () {
      //alert("Success");
    }, function (reason) {
      //alert("Failed: " + reason);
    });
  }
  showCompanyTopic(item){
    this.navigate("topiclist",{company_id:item.company_id,companyname:item.company_name});
  }
  dinyue(){
    this.navigate("pay",{},true);
    
      }
}
