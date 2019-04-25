import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { SquareApi } from 'src/providers/square.api';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.page.html',
  styleUrls: ['./topic.page.scss'],
  providers:[MemberApi,SquareApi]
})
export class TopicPage  extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi:MemberApi,
    public squareapi:SquareApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }
  title="";
  topic=null;
  abouttopic=[];
  id=0;
  isfirst="N";

  onMyLoad(){
    //参数
    this.params;
    this.id=this.params.id;
    this.isfirst=this.params.isfirst;
  }
  onMyShow(){
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


      var post_time_str=this.util.TimeAgo(topic.post_time_timespan);
      topic.post_time_str=post_time_str;
      this.title=topic.title;
      this.topic=topic;
      this.squareapi.topicread({topic_id:this.id});
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
}