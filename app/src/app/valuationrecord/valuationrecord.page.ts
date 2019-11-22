import { Component, ViewChild, ElementRef } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { CompanyApi } from 'src/providers/company.api';
import { nextTick } from 'q';
import ECharts from 'echarts/dist/echarts.js';

@Component({
  selector: 'app-valuationrecord',
  templateUrl: './valuationrecord.page.html',
  styleUrls: ['./valuationrecord.page.scss'],
  providers: [CompanyApi]
})
export class ValuationrecordPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public companyApi: CompanyApi,
    public elementRef: ElementRef
  ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;

  }

  pg = 0;
  allmembertest = [];
  testblock = [];

  onMyLoad() {
    //参数
    this.params;
  }

  onMyShow() {
    var that = this;
    var memberinfo = this.MemberInfo;
    console.log(memberinfo);
    var api = this.companyApi;
    api.allmembertest2({
      status: "B",
      member_id: memberinfo.id
    }).then((allmembertest) => {
      for (var i = 0; i < allmembertest.length; i++) {
        var guzhi = parseInt(allmembertest[i].val);
        allmembertest[i].guzhi = guzhi;
      }
      this.allmembertest = allmembertest;
    });
    // api.paymentrecord({

    // }).then((paymentrecord) => {

    //   th
    // });
  }
  gotoCompany(id) {
    var api = this.companyApi;
    this.navigate("company", { id: id });
  }

  showChart(item) {
    for (var i = 0; i < this.allmembertest.length; i++) {
      if (item.id == this.allmembertest[i].id) {
        this.allmembertest[i].showChart = true;
      } else {
        this.allmembertest[i].showChart = false;
      }
    }
    var that = this;
    nextTick(() => {
      this.companyApi.stockrecord({ stockid: item.company_stockid }).then((data) => {
        //startdate,val
        
        this.companyApi.info2({ id: item.company_id }).then((info) => {
          console.log("vck", info);
          var dateList = data.map(function (item) {
            return item.rq.substr(0, 4) + "-" + item.rq.substr(4, 2) + "-" + item.rq.substr(6, 2);
          });
          var valueList = data.map(function (item) {
            return Number(item.zsz);
          });
          var laststock=0;
          var v2 = data.map(function (item) {
            var date = item.rq.substr(0, 4) + "-" + item.rq.substr(4, 2) + "-" + item.rq.substr(6, 2);
            var st = info.testresult.submit_time.substr(0, 10);
            console.log("date" + date);
            console.log("st" + st);
            if (st <= date) {
              laststock=item.zsz;
              return Number(info.testresult.val);
            } else {
              //valueList.zsz
              return null;
            }
          });
          console.log(v2);
          // let element = this.chart.nativeElement;


          var v3 = data.map(function (item) {
            var date = item.rq.substr(0, 4) + "-" + item.rq.substr(4, 2) + "-" + item.rq.substr(6, 2);

            var guzhi = -1;

            for (var i = 0; i < info.allhistoryresult.length; i++) {
              var st = info.allhistoryresult[i].submit_time.substr(0, 10);
              console.log("date" + date);
              console.log("st" + st);
              if (st <= date) {
                guzhi = Number(info.allhistoryresult[i].val);
              }
            }

            if (guzhi == -1) {
              return null;
            } else {
              return guzhi;
            }

          });

          let element = this.elementRef.nativeElement.querySelector('#chart_' + item.id);
          let myChart = ECharts.init(element);
          myChart.setOption({

            tooltip: {
              trigger: 'axis',
            },
            legend: {
              data: ['股票市值(亿)', '我的估值(亿)']
            },
            xAxis: {
              data: dateList
            },
            yAxis: {
              type: 'value',
              axisLine: { onZero: false },
              axisLabel: {
                margin:10,
                formatter: '{value}'
              }
            },
            series: [{
              data: valueList,
              type: 'line',
              smooth: true,
              showSymbol: false,
              name: '股票市值(亿)'
            }, {
              data: v3,
              type: 'line',
              smooth: true,
              showSymbol: false,
              name: '我的估值(亿)'
            }]
          });

        });
      });
    });
  }

}
