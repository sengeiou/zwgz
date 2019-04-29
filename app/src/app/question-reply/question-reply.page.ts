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
  selector: 'app-question-reply',
  templateUrl: './question-reply.page.html',
  styleUrls: ['./question-reply.page.scss'],
  providers: [QuestionApi, CompanyApi]
})
export class QuestionReplyPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public questionApi: QuestionApi,
    public companyapi: CompanyApi
  ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }

  question = null;
  replycontent = "";
  questionreply_id = 0;
  questionreply = null;
  atmember_id = 0;
  atmember = null;

  onMyLoad() {

    if (this.params.questionreply_id != undefined) {
      this.questionreply_id = this.params.questionreply_id;
      if (this.questionreply_id > 0) {

        this.questionApi.replyinfo({ id: this.questionreply_id }).then((questionreply) => {
          this.questionreply = questionreply;
        });
      }
    }
    if (this.params.atmember_id != undefined) {
      this.atmember_id = this.params.atmember_id;
      if (this.atmember_id > 0) {

        this.memberApi.info({ member_id: this.atmember_id }).then((atmember) => {
          this.atmember = atmember;
        });
      }
    }
  }

  onMyShow() {
    this.questionApi.question({ id: this.params.question_id }).then((question) => {
      this.question = question;
    });

  }

  reply() {
    this.questionApi.reply({
      question_id: this.params.question_id, replycontent: this.replycontent,
      atmember_id: this.atmember_id, questionreply_id: this.questionreply_id
    }).then((ret) => {
      if (ret.code == 0) {
        this.toast("贡献成功");
        this.back();
      } else {
        this.toast(ret.result);
      }
    });
  }

}
