import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { QuestionApi } from 'src/providers/question.api';
@Component({
  selector: 'app-info-center',
  templateUrl: './info-center.page.html',
  styleUrls: ['./info-center.page.scss'],
  providers:[MemberApi,QuestionApi ]
})
export class InfoCenterPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi:MemberApi,
    public questionApi:QuestionApi
    ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }

  g='C';
  questionlist=[];
  contentlist=[];

  onMyLoad(){
    //参数
    this.params;
  }
  onMyShow(){
    this.loadSystemMsg();
    this.loadQuestion();
    this.loadContent();
  }

  loadQuestion(){
    this.questionApi.mycollect({}).then((list)=>{
      this.questionlist=list;
    });
  }

  openQuestion(id){
    this.questionApi.read({id:id});
    this.navigate("question",{id:id});
  }
  loaded=false;

  loadContent(){
    
    this.questionApi.mycollectreply({}).then((list)=>{
      
      this.contentlist=list;
      this.loaded=true;
    });


  }
  msglist=[];
  loadSystemMsg(){
    this.memberApi.mysystemmsg({}).then((list)=>{
      this.msglist=list;
    });
  }

}
