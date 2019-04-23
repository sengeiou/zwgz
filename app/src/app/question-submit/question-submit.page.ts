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
  selector: 'app-question-submit',
  templateUrl: './question-submit.page.html',
  styleUrls: ['./question-submit.page.scss'],
  providers: [CompanyApi, QuestionApi]
})
export class QuestionSubmitPage extends AppBase {

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
  allcompany: [];
  alllabel: [];


  title = "";
  content = "";
  company = null;
  labels = [];
  customAlertOptions: any = {
    header: '选择公司',
    translucent: true
  };

  onMyLoad() {
    //参数
    this.params;
    this.companyapi.list({}).then((allcompany) => {
      this.allcompany = allcompany;
    });
    this.questionapi.labellist({}).then((alllabel) => {
      this.alllabel = alllabel;
    });


  }


  onMyShow() {

  }

  addLabel(labelid) {
    var idx=this.labels.indexOf(labelid);
    if(idx>-1){
      this.labels.splice(idx,1);
    }else{
      if(this.labels.length>=3){
        this.toast("最多只能够选择3个标签");
        return;
      }
      this.labels.push(labelid);
    }
  }

  submit(){
    if(this.company==null){
      this.showAlert("请选择公司");
      return;
    }
    if(this.title.trim()==""){
      this.showAlert("请填写标题");
      return;
    }
    if(this.content.trim()==""){
      this.showAlert("请填写内容");
      return;
    }
    if(this.labels.length==0){
      this.showAlert("请至少选择一个标签");
      return;
    }
    this.showConfirm("请勿提交无厘头信息,违规者以后将不再收录提问",(ret)=>{
      if(ret==true){
        this.questionapi.submit({
          company_id:this.company.id,
          cat_id:this.company.cat_id,
          title:this.title,
          content:this.content,
          labels:this.labels.join(",")
        }).then((ret)=>{
          if(ret.code==0){
            this.toast("提交成功,正在等待管理员审核");
            this.back();
          }else{
            console.log(ret);
            this.toast("提交失败,系统繁忙");
          }
        });
      }
    });
  }



}
