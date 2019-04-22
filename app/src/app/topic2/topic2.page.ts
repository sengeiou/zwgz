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
      topic.conclude=this.splitRow(topic.conclude);
      topic.content=this.splitRow(topic.content);
      topic.reference=this.splitRow(topic.reference);

      this.title=topic.title;
      this.topic=topic;
      this.squareapi.topicread({topic_id:this.id});
    });
    this.squareapi.abouttopic({topic_id:this.id}).then((abouttopic)=>{
      this.abouttopic=abouttopic;
    });
  }
  home(){
    this.navCtrl.navigateBack('tabs/tab1');
  }
}
