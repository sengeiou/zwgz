import { Component, ViewChild, ElementRef } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides, ActionSheetController } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { CompanyApi } from 'src/providers/company.api';
import ECharts from 'echarts/dist/echarts.js';
import { QuestionApi } from 'src/providers/question.api';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [CompanyApi, QuestionApi]
})
export class Tab2Page extends AppBase {

  @ViewChild('sandian') sandian: ElementRef;
  @ViewChild('treemap') treemap: ElementRef;

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public actionSheetController: ActionSheetController,
    public companyapi: CompanyApi,
    public questionapi: QuestionApi,
    private sanitizer: DomSanitizer
  ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;
  }

  catlist = [];
  selectcat = null;
  selectcompany = null;
  sandianchart = null;
  treechart = null;

  questionlist = [];
  show=[];

  onMyLoad() {


    let element = this.sandian.nativeElement;
    this.sandianchart = ECharts.init(element);

    let tpelement = this.treemap.nativeElement;
    this.treechart = ECharts.init(tpelement);

    


  }

  onMyShow() {
    AppBase.TABName = "tab2";
    AppBase.LASTTAB = this;

    this.companyapi.catlist({ status: "A" }).then((catlist) => {
      this.catlist = catlist;
      this.selectcat = catlist[0];
      this.selectcompany = catlist[0].companylist[0];
      this.loadchart();
      this.loadquestion();
    });

  }



  changeCat() {
    var that = this;
    var buttons = [];
    console.log(that.catlist);
    for (var i = 0; i < that.catlist.length; i++) {
      console.log(that.catlist[i]);
      var cat = that.catlist[i];
      var button = that.getCatButton(that, cat);
      buttons.push(button);
    }
    // buttons.push({
    //   text: '全行业',
    //   handler: () => {
    //     that.selectcat = null;
    //     that.loadTopic();
    //   }
    // });

    buttons.push({
      text: '取消',
      role: 'cancel',
    });
    this.showActionSheet(this.actionSheetController, "选择行业", buttons);
  }
  getCatButton(that, cat) {

    var button = {
      text: cat.name,
      handler: (e) => {
        console.log("handler");

        console.log(that.selectcat);
        console.log(e);
        that.selectcat = cat;
        that.selectcompany = cat.companylist[0];
        that.loadchart();
        this.loadquestion();
      }
    };
    return button;
  }


  changeCompany() {
    var that = this;
    var buttons = [];
    for (var i = 0; i < that.selectcat.companylist.length; i++) {
      console.log(that.selectcat.companylist[i]);
      var company = that.selectcat.companylist[i];
      var button = that.getCompanyButton(that, company);
      buttons.push(button);
    }
    // buttons.push({
    //   text: '全行业',
    //   handler: () => {
    //     that.selectcat = null;
    //     that.loadTopic();
    //   }
    // });

    buttons.push({
      text: '取消',
      role: 'cancel',
    });
    this.showActionSheet(this.actionSheetController, "选择公司", buttons);
  }
  getCompanyButton(that, company) {

    var button = {
      text: company.name,
      handler: (e) => {
        console.log("handler");

        console.log(that.selectcat);
        console.log(e);
        that.selectcompany = company;
        that.loadchart();
        this.loadquestion();
      }
    };
    return button;
  }
  loadchart() {



    this.questionapi.askreply({ cat_id: this.selectcat.id }).then((data) => {

      var other = [];
      var me = [];
      var maxask = 0;
      var maxreply = 0
      for (var i = 0; i < data.length; i++) {
        var ask = parseInt(data[i].askcount);
        var reply = parseInt(data[i].replycount);
        if (data[i].company_id == this.selectcompany.id) {
          me.push([ask, reply, data[i].company_name]);
        } else {
          other.push([ask, reply, data[i].company_name]);
        }
        if (ask > maxask) {
          maxask = ask;
        }
        if (reply > maxreply) {
          maxreply = reply;
        }
      }
      if (maxask < 10) {
        maxask = maxask + 2;
      } else {
        maxask = parseInt((maxask * 1.2).toString());
      }
      if (maxreply < 10) {
        maxreply = maxreply + 2;
      } else {
        maxreply = parseInt((maxreply * 1.2).toString());
      }

      this.sandianchart.setOption({
        legend: {
          right: 10,
          data: ["其它公司", this.selectcompany.name]
        },
        xAxis: {
          name: "问题数",
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          },
          nameLocation: "middle",
          nameGap:30,
          type: 'value',
          min: 0,
          max: maxask
        },
        yAxis: {
          name: "回答数",
          scale: true,
          type: 'value',
          min: 0,
          max: maxreply
        },
        series: [{
          name: '其它公司',
          data: other,
          type: 'scatter',
          label: {
            emphasis: {
              show: true,
              formatter: function (param) {
                return param.data[2] + " 提问：" + param.data[0] + " 回答：" + param.data[1];
              },
              position: 'top'
            }
          },
          itemStyle: {
            normal: {
              shadowBlur: 10,
              shadowColor: 'rgba(120, 36, 50, 0.5)',
              shadowOffsetY: 5
            }
          }
        }, {
          name: this.selectcompany.name,
          data: me,
          type: 'scatter',
          label: {
            emphasis: {
              show: true,
              formatter: function (param) {
                return param.data[2] + " 提问：" + param.data[0] + " 回答：" + param.data[1];
              },
              position: 'top'
            }
          },
          itemStyle: {
            normal: {
              shadowBlur: 10,
              shadowColor: 'rgba(25, 100, 150, 0.5)',
              shadowOffsetY: 5
            }
          }
        }]
      });
    });


    this.questionapi.labelst({ company_id: this.selectcompany.id }).then((data) => {
      var value = 0;
      var children = [];
      for (var i = 0; i < data.length; i++) {

        value += parseInt(data[i].usecount);
        children.push({
          name: data[i].name + "(" + data[i].usecount + ")",
          value: parseInt(data[i].usecount)
        });
      }
      console.log("treemap");
      console.log(children);

      this.treechart.setOption({
        series: [{
          type: 'treemap',
          data: children,
          roam: false,
          silent: true,
          breadcrumb: { show: false }
        }]
      });


    });

  }

  loadquestion() {
    this.questionapi.list({ company_id: this.selectcompany.id, status: "A", orderby: "r_main.post_time desc" })
    .then((questionlist) => {
      for(var i=0;i<questionlist.length;i++){
        var post_time_str=this.util.TimeAgo(questionlist[i].post_time_timespan);
        questionlist[i].post_time_str=post_time_str;
      }
      this.questionlist = questionlist;
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

  gotoQuestionSummary(){
    this.companyapi.checkassess({company_id: this.selectcompany.id}).then((ret)=>{
      if(ret.code==0){

        this.navigate('question-summary',{company_id:this.selectcompany.id,cat_id:this.selectcat.id})
      }else{
        this.showConfirm("你还没有进行估值，是否先去估值？",(ret)=>{
          if(ret){
            this.navigate("company",{id:this.selectcompany.id});
          }
        });
      }
    });


  }
}
