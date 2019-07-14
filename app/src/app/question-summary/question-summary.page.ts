import { Component, ViewChild, ElementRef } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { CompanyApi } from 'src/providers/company.api';
import { QuestionApi } from 'src/providers/question.api';
import ECharts from 'echarts/dist/echarts.js';
import { nextTick } from 'q';

@Component({
  selector: 'app-question-summary',
  templateUrl: './question-summary.page.html',
  styleUrls: ['./question-summary.page.scss'],
  providers: [QuestionApi, CompanyApi]
})
export class QuestionSummaryPage extends AppBase {

  @ViewChild('sandian') sandian: ElementRef;

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public questionApi: QuestionApi,
    public elementRef: ElementRef,
    public companyapi: CompanyApi
  ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }
  sandianchart = null;

  list = [];
  title = "";
  company = null;

  g = "A";
  onMyLoad() {
    //参数
    this.params;
    this.companyapi.info({ id: this.params.company_id }).then((company) => {
      this.title = company.name;
      this.company = company;
    });



  }
  allrank = [];
  myrank = null;
  allreplyrank = [];
  myreplyrank = null;
  onMyShow() {
    //this.
    this.refreshlist();
  }
  refreshlist() {

    this.questionApi.list({ status: "A", orderby: "post_time desc", question_id: this.params.company_id }).then((list) => {

      for (var i = 0; i < list.length; i++) {
        var post_time_str = this.util.TimeAgo(list[i].post_time_timespan);
        list[i].post_time_str = post_time_str;
      }
      this.list = list;

      nextTick(() => {


        let element = this.sandian.nativeElement;
        this.sandianchart = ECharts.init(element);

        var json = null;
        json = {};
        json.cat_id = this.company.cat_id;

        this.questionApi.askreply(json).then((data) => {
          console.log("vj", data);
          var other = [];
          var me = [];
          var maxask = 0;
          var maxreply = 0
          for (var i = 0; i < data.length; i++) {
            var ask = parseInt(data[i].askcount);
            var reply = parseInt(data[i].replycount);
            if (this.company != null && data[i].company_id == this.company.id) {
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
          console.log("vj", other);
          this.sandianchart.setOption({
            legend: {
              right: 10,
              data: ["其它公司", this.company == null ? "无选择" : this.company.name]
            },
            xAxis: {
              name: "问题数",
              splitLine: {
                lineStyle: {
                  type: 'dashed'
                }
              },
              nameLocation: "middle",
              nameGap: 30,
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
              name: this.company == null ? "无选择" : this.company.name,
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

      });
    });
    this.questionApi.askrank({ cat_id: this.params.cat_id }).then((ret) => {
      this.allrank = ret.allrank;
      this.myrank = ret.myrank;
    });
    this.questionApi.replyrank({ cat_id: this.params.cat_id }).then((ret) => {
      this.allreplyrank = ret.allrank;
      this.myreplyrank = ret.myrank;
    });


  }

  like(item) {

    this.questionApi.like({ question_id: item.id }).then((ret) => {
      if (ret.code == 0) {
        item.likecount = Number(item.likecount) + 1;
        item.islike = 'Y';
      }
    });
  }

}
