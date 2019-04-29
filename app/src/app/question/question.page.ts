import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { CompanyApi } from 'src/providers/company.api';
import { QuestionApi } from 'src/providers/question.api';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
  providers: [CompanyApi, QuestionApi]
})
export class QuestionPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public companyapi: CompanyApi,
    public questionapi: QuestionApi) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }

  question=null;


  onMyShow(){
    this.questionapi.question({id:this.params.id}).then((question)=>{

      var post_time_str=this.util.TimeAgo(question.post_time_timespan);
      question.post_time_str=post_time_str;
      this.question=question;
    });
  }

  like(item){

    this.questionapi.replylike({questionreply_id:item.id}).then((ret)=>{
      if(ret.code==0){
        item.likecount= Number(item.likecount)+1;
        item.islike='Y';
      }
    });
  }
}
