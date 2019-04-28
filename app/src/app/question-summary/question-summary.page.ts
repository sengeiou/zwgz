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

@Component({
  selector: 'app-question-summary',
  templateUrl: './question-summary.page.html',
  styleUrls: ['./question-summary.page.scss'],
  providers: [QuestionApi,CompanyApi]
})
export class QuestionSummaryPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public questionApi: QuestionApi,
    public companyapi:CompanyApi
  ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }

  list = [];
  title="";
  company=null;

  g = "A";
  onMyLoad() {
    //参数
    this.params;
    this.companyapi.info({id:this.params.company_id}).then((company)=>{
      this.title=company.name;
      this.company=company;
    });
    
  }
  allrank=[];
  myrank=null;
  allreplyrank=[];
  myreplyrank=null;
  onMyShow() {
    //this.
    this.refreshlist();
  }
  refreshlist(){
    
    this.questionApi.list({ status: "A", orderby: "post_time desc",question_id:this.params.company_id }).then((list) => {

      for(var i=0;i<list.length;i++){
        var post_time_str=this.util.TimeAgo(list[i].post_time_timespan);
        list[i].post_time_str=post_time_str;
      }
      this.list = list;
    });
    this.questionApi.askrank({cat_id:this.params.cat_id}).then((ret)=>{
      this.allrank=ret.allrank;
      this.myrank=ret.myrank;
    });
    this.questionApi.replyrank({cat_id:this.params.cat_id}).then((ret)=>{
      this.allreplyrank=ret.allrank;
      this.myreplyrank=ret.myrank;
    });
  }
}
