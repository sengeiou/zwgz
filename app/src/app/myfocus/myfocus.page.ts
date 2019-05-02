import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { QuestionApi } from 'src/providers/question.api';

@Component({
  selector: 'app-myfocus',
  templateUrl: './myfocus.page.html',
  styleUrls: ['./myfocus.page.scss'],
  providers:[QuestionApi]
})
export class MyfocusPage extends AppBase {

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
    this.questionApi.favquestionlist({}).then((list)=>{
      this.list=list;
    });
  }
}