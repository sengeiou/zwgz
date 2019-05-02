import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { QuestionApi } from 'src/providers/question.api';


@Component({
  selector: 'app-myquestion',
  templateUrl: './myquestion.page.html',
  styleUrls: ['./myquestion.page.scss'],
  providers:[QuestionApi]
})
export class MyquestionPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public questionApi:QuestionApi
    ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }

  onMyLoad(){
    //参数
    this.params;
  }
  list=[];

  onMyShow(){
    if(this.MemberInfo!=null){
      this.questionApi.list({member_id:this.MemberInfo.id,orderby:"post_time desc"}).then((list)=>{
        this.list=list;
      });
    }
  }
}