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
import { AppComponent } from '../app.component';

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
  showall=[];

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
      }else{
        item.likecount= Number(item.likecount)-1;
        item.islike='N';
      }
    });
  }


  fav(){
    this.questionapi.questionfav({question_id:this.params.id}).then((ret)=>{
      if(ret.code==0){
        this.question.favcount= Number(this.question.favcount)+1;
        this.question.isfav='Y';
      }else{
        this.question.favcount= Number(this.question.favcount)-1;
        this.question.isfav='N';
      }
    });
  }

  replycomment(question_id,reply_id,atmember,replycontent,atmember_id=0){
    
    if (this.MemberInfo == null) {
      this.navigate("mobilelogin");
      return;
    }

    var commpl="请回复。。。";
    if(atmember!=null&&atmember.member_id!=this.MemberInfo.id){
      atmember_id=atmember.member_id;
      commpl="回复@"+atmember.nickName+"。。。";
    }

    AppComponent.Instance.showComment((comment)=>{
      if(comment==""){
        return;
      }
      this.questionapi.reply({
        question_id: question_id, replycontent: comment,
        atmember_id: atmember_id, questionreply_id: reply_id
      }).then((ret) => {
        if (ret.code == 0) {
          this.toast("贡献成功");
          this.onMyShow();
        } else {
          this.toast(ret.result);
        }
      });

    },"回复...");
  }

}
