import { Component, ViewChild, ElementRef } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides, IonContent } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { CompanyApi } from 'src/providers/company.api';
import { ContentApi } from 'src/providers/content.api';
import { InstApi } from 'src/providers/inst.api';
import { WechatApi } from 'src/providers/wechat.api';
import { Device } from '@ionic-native/device/ngx';
import ECharts from 'echarts/dist/echarts.js';
import { nextTick } from 'q';
import { AppleApi } from 'src/providers/apple.api';
import { InAppPurchase } from '@ionic-native/in-app-purchase/ngx';
import { isNgTemplate } from '@angular/compiler';

declare let Wechat: any;


@Component({
  selector: 'app-companyshare',
  templateUrl: './companyshare.page.html',
  styleUrls: ['./companyshare.page.scss'],
  providers: [CompanyApi, ContentApi, InstApi, WechatApi,AppleApi,InAppPurchase]
})
export class CompanysharePage extends AppBase {
  //@ViewChild('chart') chart: ElementRef;
  //@ViewChild('chartpie') chartpie: ElementRef;
  //@ViewChild('chart2') chart2: ElementRef;
  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public companyapi: CompanyApi,
    public contentapi: ContentApi,
    public instapi: InstApi,
    public wechatapi: WechatApi,
    public device: Device,
    public elementRef: ElementRef,
    public iap: InAppPurchase,
    public appleApi:AppleApi
  ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;
    //intest==true&&info.testresult.status=='B'&&issub==false
  }

  issub = false;
  intest = true;
  canshow = true;
  q = 0;
  anwsercount = 0;
  showpayment = false;
  lostani = {};
  title = "";
  guzhiprecent = "";
  guzhipeople = 0;
  info = null;
  allmembertest = [];
  indexbanner = [];
  indexbanner2 = [];
  guzhi = 0;
  paytype = "";

  catlist = [];

  buytype = "CAT";

  platformname = "";

  onMyLoad() {
    //参数
    this.params=null;
    this.params={};

    var vcc=( window.location.href.split("?")[1]).split("&");
    for(var i=0;i<vcc.length;i++){
      var k=vcc[i].split("=");
      this.params[k[0]]=k[1];
    }
    //this.initChart();


    this.companyapi.catlist({ status: "A", noneedcompany: "Y" }).then((catlist) => {
      this.catlist = catlist;
    });
    this.platformname = this.device.platform;

    
    this.realonmyshow(undefined);
  }

  initChart() {
    if (this.info == null) {
      return;
    }
    var that = this;

    var stockid = this.info.stockid;
    nextTick(() => {
      this.companyapi.stockrecord({ stockid }).then((data) => {
        //startdate,val
        var dateList = data.map(function (item) {
          return item.rq.substr(0, 4) + "-" + item.rq.substr(4, 2) + "-" + item.rq.substr(6, 2);
        });
        var valueList = data.map(function (item) {
          return Number(item.zsz);
        });
        var today=this.util.FormatDateTime(new Date());
        today=today.substr(0,10);
        if(dateList[dateList.length-1]!=today){
          dateList.push(today);
          valueList.push(null);
        }
        var v2 = data.map(function (item) {
          var date = item.rq.substr(0, 4) + "-" + item.rq.substr(4, 2) + "-" + item.rq.substr(6, 2);
          var st = that.info.testresult.submit_time.substr(0, 10);
          console.log("stdate" + date);
          console.log("st" + st);
          if (st <= date) {
            return Number(that.info.testresult.guzhi);
          } else {
            return null;
          }
        });
        console.log("v2d",data);
        console.log("v2",v2);
        // let element = this.chart.nativeElement;
        let element = this.elementRef.nativeElement.querySelector('#chart');
        let myChart = ECharts.init(element);
        myChart.setOption({

          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['股票市值', '我的估值']
          },
          xAxis: {
            data: dateList
          },
          yAxis: {
            type: 'value',
            axisLine: { onZero: false },
            axisLabel: {
              margin:-10,
              formatter: '{value}亿元'
            }
          },
          series: [{
            data: valueList,
            type: 'line',
            smooth: true,
            name: '股票市值'
          }, {
            data: v2,
            type: 'line',
            smooth: true,
            name: '我的估值'
          }]
        });

        if (that.info.allhistoryresult.length > 1) {

          var v3 = data.map(function (item) {
            var date = item.rq.substr(0, 4) + "-" + item.rq.substr(4, 2) + "-" + item.rq.substr(6, 2);

            var guzhi = -1;

            for (var i = 0; i < that.info.allhistoryresult.length; i++) {
              var st = that.info.allhistoryresult[i].submit_time.substr(0, 10);
              console.log("date" + date);
              console.log("st" + st);
              if (st <= date) {
                guzhi = Number(that.info.allhistoryresult[i].result);
              }
            }

            if (guzhi == -1) {
              return null;
            } else {
              return guzhi;
            }

          });
          element = this.elementRef.nativeElement.querySelector('#chart2');
          //element = this.chart2.nativeElement;
          myChart = ECharts.init(element);
          myChart.setOption({

            tooltip: {
              trigger: 'axis',
            },
            legend: {
              data: ['股票市值', '我的估值']
            },
            xAxis: {
              data: dateList
            },
            yAxis: {
              type: 'value',
              axisLine: { onZero: false },
              axisLabel: {
                margin:-10,
                formatter: '{value}亿元'
              }
            },
            series: [{
              data: valueList,
              type: 'line',
              smooth: true,
              name: '股票市值'
            }, {
              data: v3,
              type: 'line',
              smooth: true,
              name: '我的估值'
            }]
          });
        }

        var info = this.info;
        console.log(info.testresult.piedata);
        info.testresult.piedata = JSON.parse(info.testresult.piedata);
        if (info.testresult.piedata.length > 0) {
          console.log("b~~~c");
          var piedata = info.testresult.piedata;
          console.log(piedata);
          var legends = [];
          var series = [];
          var total = 0;
          for (var i = 0; i < piedata.length; i++) {
            total += piedata[i].count;
          }
          var titledata = "";
          var guzhipeople = 0;
          var heremyname = "";
          for (var i = 0; i < piedata.length; i++) {
            legends.push(piedata[i].name + "亿");

            var color = piedata[i].ishere ? "#4C556E" : "";
            if (piedata[i].ishere) {
              heremyname = piedata[i].name + "亿";
            }
            var vda = parseInt(Number(piedata[i].count * 100 / total).toFixed(0));
            if (piedata[i].ishere) {
              titledata = vda.toFixed(0) + "%";
              guzhipeople = piedata[i].count;
            }
            //name: piedata[i].name + "亿",
            series.push({
              name: piedata[i].name + "亿",
              value: vda,
              color: color
            });
          }
          //亿元
          //element = this.chartpie.nativeElement;
          element = this.elementRef.nativeElement.querySelector('#chartpie');

          myChart = ECharts.init(element);
          myChart.setOption({
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              data: legends,
              selected: heremyname
            },
            series: [
              {
                name: "估值区间",
                type: 'pie',
                radius: '55%',
                data: series,
                label: {
                  normal: {
                    position: 'inner',
                    formatter:"{d}%"
                  }
                },
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          });

        }






      });
    })

  }
   inshare = false;
  // inshare1 = false;
  // share() {
  //   // if(this.is_weixn()){
  //   //   this.inshare = !this.inshare;
  //   // }else
  //   {
  //     var u = navigator.userAgent;
  //     var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  //     var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  //     if(isiOS){
  //       this.showAlert(this.InstInfo.nodownload);
  //     }else{
  //       this.inshare1 = true;
  //     }
  //   }
  // }
  


  onMyShow() {
  }
  realonmyshow(callback) {


    var that = this;
    var api = this.companyapi;
    this.companyapi.info2({
      member_id:this.params.member_id,
      id: this.params.id
    }).then((info) => {

      info.testresult.status='B';
      var title = this.params.title;
      this.title = info.name;
      var contentapi = this.contentapi;
      contentapi.get({ keycode: info.keycode }).then((data) => {
        //this.title = data.name;

        // wx.setNavigationBarTitle({
        //   title: data.name,
        // })

      });


      if (info.testresult.status == 'B') {
        var guzhi = parseInt((info.testresult.val / 1).toString());//
        info.testresult.guzhi = guzhi;

        if (info.testresult.piedata.length > 0) {
          console.log("b~~~c");
          var piedata = info.testresult.piedata;
          console.log(piedata);
          var series = [];
          var total = 0;
          for (var i = 0; i < piedata.length; i++) {
            total += piedata[i].count;
          }
          var titledata = "";
          var guzhipeople = 0;
          for (var i = 0; i < piedata.length; i++) {

            var color = piedata[i].ishere ? "#4C556E" : "";
            var vda = piedata[i].count * 100 / total;
            if (piedata[i].ishere) {
              titledata = vda.toFixed(0) + "%";
              guzhipeople = piedata[i].count;
            }
            series.push({
              name: piedata[i].name + "亿",
              data: vda,
              color: color
            });
          }
          //亿元
          this.guzhiprecent = titledata;
          this.guzhipeople = guzhipeople;

        }
      }
      //itisenter

      for (var i = 0; i < info.questionlist.length; i++) {
        console.log(info.questionlist[i].tips);
        info.questionlist[i].name = this.util.HtmlDecode(info.questionlist[i].name);
        info.questionlist[i].q1 = this.util.HtmlDecode(info.questionlist[i].q1);
        info.questionlist[i].q2 = this.util.HtmlDecode(info.questionlist[i].q2);
        info.questionlist[i].q3 = this.util.HtmlDecode(info.questionlist[i].q3);
        info.questionlist[i].q4 = this.util.HtmlDecode(info.questionlist[i].q4);
        info.questionlist[i].q5 = this.util.HtmlDecode(info.questionlist[i].q5);
        info.questionlist[i].q6 = this.util.HtmlDecode(info.questionlist[i].q6);
        info.questionlist[i].q7 = this.util.HtmlDecode(info.questionlist[i].q7);
        info.questionlist[i].q8 = this.util.HtmlDecode(info.questionlist[i].q8);
        info.questionlist[i].tips = this.util.HtmlDecode(info.questionlist[i].tips);
        console.log(info.questionlist[i].tips);
      }
      this.info = info;
      var questionlist = info.questionlist;
      console.log("bq" + questionlist.length.toString());
      var q = 0;
      for (var i = 0; i < questionlist.length; i++) {
        console.log(i);
        console.log(questionlist[i].myanwser);
        if (questionlist[i].myanwser != undefined) {
          q = i;
        }
      }
      this.q = q;
      this.setPageTitle();


      this.updateanwsercount();
      if (callback != undefined) {
        callback();
      }

      this.initChart();;
    });
    this.changemembertest();
    var instapi = this.instapi;
    instapi.indexbanner({
      position: "company"
    }).then((indexbanner) => {
      this.indexbanner = indexbanner;
    });

    instapi.indexbanner({
      position: "anwser"
    }).then((indexbanner2) => {
      this.indexbanner2 = indexbanner2;
    });
  }
  setPageTitle() {


  }

  changemembertest(){
    
    var api = this.companyapi;
    api.allmembertest({
      status: "B",
      company_id: this.params.id,
      orderby:"rand()",
      limit:"0,5"
    }).then((allmembertest) => {
      for (var i = 0; i < allmembertest.length; i++) {
        var guzhi = parseInt(allmembertest[i].val);
        allmembertest[i].guzhi = guzhi;
      }
      this.allmembertest = allmembertest;
    });
  }

  payguzhi() {

    var price = Number(this.info.price);
    console.log(price);

    this.updateanwsercount();
    var rightcount = parseInt(this.info.rightcount);
    if (price > 0 && this.info.unlock != 'Y') {
      //this.pay();
      this.showpayment = true;
    } else {
      this.getResult();
    }
  }



  pay() {
    var that = this;
    var cat_id = this.info.cat_id;
    var company_id = this.info.id;
    if (this.buytype == "CAT") {
      company_id = 0;
    } else {
      cat_id = 0;
    }

    if (this.paytype == '') {
      this.showAlert("请选择支付方式");
      return;
    }

    if (this.paytype == 'WXAPP') {

      this.wechatapi.appprepay({ cat_id, company_id }).then((params) => {
        Wechat.sendPaymentRequest(params, () => {

          that.showpayment = false;
          that.getResult();
        }, () => {

        });
      })
    }


    if (this.paytype == "APPLE") {
      this.appleApi.prepay({ cat_id, company_id }).then((ret) => {
        if (ret.code == 0) {
          this.iap.subscribe(ret.return.appleitemid).then((data)=>{
            this.appleApi.notify({
              transactionId:data.transactionId,
              receipt:data.receipt,
              signature:data.signature,
              orderno:ret.orderno
            });
          }).catch((err)=>{
            alert(JSON.stringify(err));
            this.showAlert(err);
          });
        }
      });
    }

    // api.prepay({
    //   cat_id,company_id
    // }).then(
    //   (ret) => {
    //     ret.success = function () {
    //       that.showpayment = false;
    //       that.getResult();
    //     }
    //     //wx.requestPayment(ret);
    //     alert("请求支付requestPayment");
    //   });
  }
  start() {
    if (this.MemberInfo == null) {
      this.navigate("mobilelogin");
      return;
    }
    var testresult = this.info.testresult;
    if (testresult.status == undefined) {
      testresult.status = 'A';
    }
    this.updateanwsercount();
    this.intest = true;
    this.issub = false;
    this.info.testresult = testresult;
    this.initChart();
  }
  optselect(idx, opt) {
    var questionlist = this.info.questionlist;

    if (questionlist[idx].a != '') {

      switch (opt) {
        case "A":
          questionlist[idx].q1_s = "Y";
          break;
        case "B":
          questionlist[idx].q2_s = "Y";
          break;
        case "C":
          questionlist[idx].q3_s = "Y";
          break;
        case "D":
          questionlist[idx].q4_s = "Y";
          break;
        case "E":
          questionlist[idx].q5_s = "Y";
          break;
        case "F":
          questionlist[idx].q6_s = "Y";
          break;
        case "G":
          questionlist[idx].q7_s = "Y";
          break;
        case "H":
          questionlist[idx].q8_s = "Y";
          break;
      }
    }
    if (questionlist[idx].a != '') {

      switch (opt) {
        case "A":
          questionlist[idx].q1_s = "Y";
          break;
        case "B":
          questionlist[idx].q2_s = "Y";
          break;
        case "C":
          questionlist[idx].q3_s = "Y";
          break;
        case "D":
          questionlist[idx].q4_s = "Y";
          break;
        case "E":
          questionlist[idx].q5_s = "Y";
          break;
        case "F":
          questionlist[idx].q6_s = "Y";
          break;
        case "G":
          questionlist[idx].q7_s = "Y";
          break;
        case "H":
          questionlist[idx].q8_s = "Y";
          break;
      }


      if (questionlist[idx].myanwser == undefined) {
        questionlist[idx].myanwser = opt;
        questionlist[idx].showtips = true;
      }

    } else {

      questionlist[idx].q1_s = undefined;
      questionlist[idx].q2_s = undefined;
      questionlist[idx].q3_s = undefined;
      questionlist[idx].q4_s = undefined;
      var v = "";
      switch (opt) {
        case "A":
          questionlist[idx].q1_s = "Y";
          v = questionlist[idx].q1;
          break;
        case "B":
          questionlist[idx].q2_s = "Y";
          v = questionlist[idx].q2;
          break;
        case "C":
          questionlist[idx].q3_s = "Y";
          v = questionlist[idx].q3;
          break;
        case "D":
          questionlist[idx].q4_s = "Y";
          v = questionlist[idx].q4;
          break;
        case "E":
          questionlist[idx].q5_s = "Y";
          break;
        case "F":
          questionlist[idx].q6_s = "Y";
          break;
        case "G":
          questionlist[idx].q7_s = "Y";
          break;
        case "H":
          questionlist[idx].q8_s = "Y";
          break;
      }

      questionlist[idx].myanwser = v;
      questionlist[idx].showtips = true;
    }

    this.info.questionlist = questionlist;

    this.updateanwsercount();


    var version = this.info.version;
    var api = this.companyapi;
    console.log(JSON.stringify(questionlist));
    console.log((questionlist));
    console.log(JSON.stringify(questionlist));
    //只对提交的结果进行保存
    // api.testupdate({
    //   company_id: this.options.id,
    //   version: version,
    //   content: JSON.stringify(questionlist)
    // });

  }
  next() {
    var q = parseInt(this.q.toString());
    var questionlist = this.info.questionlist;
    var version = this.info.version;
    if (questionlist[q].myanwser == undefined && q >= questionlist.length - 3) {
      this.toast("请选择本题选项");
      return;
    }

    var that = this;

    q++;

    if (q >= questionlist.length) {

      this.showConfirm('是否确认提交估值问卷？', (ret) => {
        if (ret) {
          that.showsucc(0);
          that.updateanwsercount();
        }
      });

    } else {
      this.q = q;
    }

  }

  getResult() {

    var testresult = this.info.testresult;
    testresult.status = "B";
    this.issub = false;
    this.intest = true;
    this.info.testresult = testresult;

    var questionlist = this.info.questionlist;
    var version = this.info.version;
    var api = this.companyapi;

    var questionlistlength = questionlist.length;
    var g1 = 0.01 * parseInt(questionlist[questionlistlength - 3].myanwser);
    var g2 = 0.01 * parseInt(questionlist[questionlistlength - 2].myanwser);
    var r = 0.01 * parseInt(questionlist[questionlistlength - 1].myanwser);
    var totalcount = this.info.totalcount;
    var rightcount = this.info.rightcount;
    var accu = rightcount * 100.0 / totalcount;

    var json = {
      company_id: this.params.id,
      version: version,
      g1,
      g2,
      r,
      accu
    };
    console.log(json);
    var that = this;


    api.testupdate({
      company_id: that.params.id,
      version: version,
      content: JSON.stringify(questionlist)
    }).then(() => {
      api.resultsubmit(json).then((ret) => {
        that.realonmyshow(undefined);

        var guzhi = 100;
        //animation.opacity(0).step();
        that.guzhi = guzhi;
        that.issub = false;
        that.intest = true;


      });
    });
  }

  prev() {
    var q = parseInt(this.q.toString());

    this.q = q - 1;
  }

  animation2 = false;
  showsucc(guzhi) {
    guzhi = 100;
    var that = this;
    this.issub = true;
    setTimeout(() => {

      // var animation = wx.createAnimation({
      //   duration: 1000,
      // });
      // animation.opacity(0).step();
      //alert("animation2");
      that.animation2 = true;
      that.guzhi = guzhi;
      that.canshow = true;

      that.payguzhi();
    }, 5000);
  }
  displayshow() {
    this.issub = true;
    this.realonmyshow(undefined);
  }


  // share() {
  //   var that = this;
  //   var api = this.companyapi;;
  //   api.poster({ id: this.params.id }).then((res) => {

  //     var url = 'https://cmsdev.app-link.org/Users/alucard263096/zwgz/upload/company/' + res.return;

  //     //that.Base.viewPhoto({ currentTarget: { id: url } });
  //     alert("查看照片");
  //     //this.setMyData({ inshare: true, myposter: res.return });
  //   });
  // }



  
  updateanwsercount() {
    var questionlist = this.info.questionlist;

    var qtlist = this.info.questiontypelist;
    for (var i = 0; i < qtlist.length; i++) {
      qtlist[i].wrongcount = 0;
    }

    var count = 0;
    var totalcount = 0;
    var rightcount = 0;
    for (var i = 0; i < questionlist.length; i++) {
      if (questionlist[i].myanwser != undefined) {
        count++;
      }
      if (questionlist[i].a != "") {
        totalcount++;
        if (questionlist[i].myanwser == questionlist[i].a) {
          rightcount++;
        } else {
          for (var j = 0; j < qtlist.length; j++) {
            if (questionlist[i].qt_id == qtlist[j].id) {
              qtlist[j].wrongcount++;
            }
          }
        }
      }
    }
    var m = 0;
    var whatneedtoknow = "";
    for (var i = 0; i < qtlist.length; i++) {
      if (qtlist[i].wrongcount > m) {
        whatneedtoknow = qtlist[i].name;
        break;
      }
    }
    this.anwsercount = count;
    this.info.rightcount = rightcount;
    this.info.totalcount = totalcount;
    this.whatneedtoknow = whatneedtoknow;
  }
  whatneedtoknow = "";
  redati() {

    this.realonmyshow(() => {

      var testresult = this.info.testresult;
      var questionlist = this.info.newquestionlist;
      testresult.status = 'A';
      this.info.questionlist = questionlist;
      this.intest = true;
      this.issub = false;
      testresult.status='B';
      this.info.testresult = testresult;
      this.q = 0;
      this.updateanwsercount();
    });

    //this.onMyShow();
  }
  @ViewChild(IonContent) content:IonContent;
  backtotop() {
    // this.setMyData({
    //   top: 0
    // });
    // super.backtotop();
    //alert("回到顶部");
    this.content.scrollToTop(0);  
  }
  catchTouchMove(res) {
    return false
  }
  gotoQuestionSubmit(){
    this.navigate("question-submit",{cat_id:this.info.cat_id,company_id:this.info.id})
  }

  showCompanyTopic(id,name){
    this.navigate("topiclist",{company_id:id,companyname:name});
  }
}
