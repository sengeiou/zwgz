// pages/content/content.js
import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  InstApi
} from "../../apis/inst.api.js";
import {
  CompanyApi
} from "../../apis/company.api";
import {
  WechatApi
} from "../../apis/wechat.api";
import { ContentApi } from "../../apis/content.api";
var WxParse = require('../../wxParse/wxParse');

var wxCharts = require('../../libs/wxcharts-min.js');

class Content extends AppBase {
  constructor() {
    super();
  }
  ring = null;
  onLoad(options) {
    this.Base.Page = this;
    //options.id = 121;
    super.onLoad(options);
    this.Base.setMyData({
      issub: false,
      intest:false,
      q: 0,
      anwsercount:0,
      showpayment:false,
      lostani:{}
    });
  }
  onMyShow(callback) {
    var that = this;
    
    var api = new CompanyApi();
    api.info2({
      id: this.Base.options.id
    }, (info) => {

      
      var title = this.Base.options.title;
      var contentapi = new ContentApi();
      contentapi.get({ keycode: info.keycode }, function (data) {

        data.content = that.Base.util.HtmlDecode(data.content);
        console.log(6666 + data.content);
        WxParse.wxParse('content', 'html', data.content, that, 10);
        that.setData({ title: data.name });
        // wx.setNavigationBarTitle({
        //   title: data.name,
        // })

      });


      if (info.testresult.status == 'B') {
        var guzhi = parseInt(info.testresult.val / 1);//
        info.testresult.guzhi = guzhi;

        info.testresult.piedata = JSON.parse(info.testresult.piedata);
        if (info.testresult.piedata.length > 0) {
          console.log("b~~~c");
          var piedata=info.testresult.piedata;
          console.log(piedata);
          var series=[];
          var total=0;
          for(var i=0;i<piedata.length;i++){
            total+=piedata[i].count;
          }
          var titledata = "";
          var guzhipeople = 0;
          for (var i = 0; i < piedata.length; i++) {
            
            var color = piedata[i].ishere ? "#4C556E" : "";
            var vda = piedata[i].count * 100 / total;
            if (piedata[i].ishere){
              titledata = vda.toFixed(0)+"%";
              guzhipeople = piedata[i].count;
            }
            series.push({
              name: piedata[i].name +"亿",
              data: vda,
              color: color});
          }
          //亿元
          this.Base.setMyData({ guzhiprecent: titledata, guzhipeople: guzhipeople})
          let ring = {
            canvasId: "ringCanvas", // 与canvas-id一致
            type: "ring",
            series: series,
            width: 400,
            height: 250,
            dataLabel: true,
            legend: true,
            title: { // 显示百分比
              name: titledata,
              color: '#333333',
              fontSize: 14
            }
          };
          new wxCharts(ring);

        }
      }
      //itisenter

      for (var i = 0; i < info.questionlist.length; i++) {
        console.log(info.questionlist[i].tips);
        info.questionlist[i].name = this.Base.util.HtmlDecode(info.questionlist[i].name);
        info.questionlist[i].q1 = this.Base.util.HtmlDecode(info.questionlist[i].q1);
        info.questionlist[i].q2 = this.Base.util.HtmlDecode(info.questionlist[i].q2);
        info.questionlist[i].q3 = this.Base.util.HtmlDecode(info.questionlist[i].q3);
        info.questionlist[i].q4 = this.Base.util.HtmlDecode(info.questionlist[i].q4);
        info.questionlist[i].q5 = this.Base.util.HtmlDecode(info.questionlist[i].q5);
        info.questionlist[i].q6 = this.Base.util.HtmlDecode(info.questionlist[i].q6);
        info.questionlist[i].q7 = this.Base.util.HtmlDecode(info.questionlist[i].q7);
        info.questionlist[i].q8 = this.Base.util.HtmlDecode(info.questionlist[i].q8);
        info.questionlist[i].tips = this.Base.util.HtmlDecode(info.questionlist[i].tips);
        console.log(info.questionlist[i].tips);
      }
      this.Base.setMyData(info);
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
      this.Base.setMyData({
        q: q
      });
      this.Base.setPageTitle();


      this.updateanwsercount();
      if(callback!=undefined){
        callback();
      }
    });
    api.allmembertest({
      status: "B",
      company_id: this.Base.options.id
    }, (allmembertest) => {
      for (var i = 0; i < allmembertest.length; i++) {

        var guzhi = parseInt(allmembertest[i].val );
        allmembertest[i].guzhi = guzhi;
      }
      this.Base.setMyData({
        allmembertest
      });
    });
    var instapi = new InstApi();
    instapi.indexbanner({
      position: "company"
    }, (indexbanner) => {
      this.Base.setMyData({
        indexbanner
      });
    });

    instapi.indexbanner({
      position: "anwser"
    }, (indexbanner2) => {
      this.Base.setMyData({
        indexbanner2
      });
    });
  }
  setPageTitle() {
    var data = this.getMyData();
    if (data.id != undefined) {
      // if (data.price > 0 && data.unlock != 'Y') {
      //   wx.setNavigationBarTitle({
      //     title: '订阅',
      //   })
      // } else {

        wx.setNavigationBarTitle({
          title: data.name,
        })
      //}
    }
  }

  payguzhi(){
    var data=this.Base.getMyData();
    var price=Number(data.price);
    console.log(price);

    this.updateanwsercount();
    var rightcount=parseInt(data.rightcount);
    if (price > 0  && data.unlock!='Y'){
      //this.pay();
      this.Base.setMyData({ showpayment:true});
    }else{
      this.getResult();
    }
  }

  
  
  pay() {
    var that = this;
    var api = new WechatApi();
    api.prepay({
        company_id: this.Base.options.id
      },
      (ret) => {
        ret.success = function() {
          that.Base.setMyData({});
          that.Base.setMyData({showpayment:false});
          that.getResult();
        }
        wx.requestPayment(ret);
      });
  }
  start() {
    var testresult = this.Base.getMyData().testresult;
    if(testresult.status==undefined){
      testresult.status = 'A';
    }
    this.updateanwsercount();
    this.Base.setMyData({
      intest: true,
      issub:false,
      testresult: testresult
    });

  }
  optselect(e) {
    console.log(e.currentTarget.id);
    var str = e.currentTarget.id.split("_");
    var opt = str[1];
    var idx = parseInt(str[0]);
    var questionlist = this.Base.getMyData().questionlist;

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

    this.Base.setMyData({
      questionlist
    });

    this.updateanwsercount();


    var version = this.Base.getMyData().version;
    var api = new CompanyApi();
    console.log(JSON.stringify(questionlist));
    console.log((questionlist));
    console.log(JSON.stringify(questionlist));
    //只对提交的结果进行保存
    // api.testupdate({
    //   company_id: this.Base.options.id,
    //   version: version,
    //   content: JSON.stringify(questionlist)
    // });

  }
  next() {
    var q = parseInt(this.Base.getMyData().q);
    var questionlist = this.Base.getMyData().questionlist;
    var version = this.Base.getMyData().version;
    if (questionlist[q].myanwser == undefined&&q>=questionlist.length-3) {
      this.Base.toast("请选择本题选项");
      return;
    }

    var that=this;

    q++;

    if (q >= questionlist.length) {
      

      wx.showModal({
        title: '提示',
        content: '是否确认提交估值问卷？',
        success: function(e) {
          if (e.confirm) {
            that.showsucc();
            that.updateanwsercount();
          }
        }
      })

    } else {

      this.Base.setMyData({
        q
      });
    }

  }

  getResult() {

    var testresult = this.Base.getMyData().testresult;
    testresult.status = "B";
    this.Base.setMyData({
      issub: false,
      intest: true,
      testresult
    });


    var questionlist = this.Base.getMyData().questionlist;
    var version = this.Base.getMyData().version;
    var api = new CompanyApi();

    var questionlistlength = questionlist.length;
    var g1 = 0.01 * parseInt(questionlist[questionlistlength - 3].myanwser);
    var g2 = 0.01 * parseInt(questionlist[questionlistlength - 2].myanwser);
    var r = 0.01 * parseInt(questionlist[questionlistlength - 1].myanwser);
    var totalcount = this.Base.getMyData().totalcount;
    var rightcount = this.Base.getMyData().rightcount;
    var accu = rightcount * 100.0 / totalcount;

    var json = {
      company_id: this.Base.options.id,
      version: version,
      g1,
      g2,
      r,
      accu
    };
    console.log(json);
    var that = this;


    api.testupdate({
      company_id: that.Base.options.id,
      version: version,
      content: JSON.stringify(questionlist)
    }, () => {
      api.resultsubmit(json, (ret) => {
        that.onMyShow();

        var guzhi = 100;

        var animation = wx.createAnimation({
          duration: 1000,
        });
        animation.opacity(0).step();
        this.Base.setMyData({
          guzhi,
          issub: false,
          intest:true,
          
        }); //lostani: animation.export()


      });
    });
  }

  prev() {
    var q = parseInt(this.Base.getMyData().q);

    this.Base.setMyData({
      q: q - 1
    });
  }
  showsucc(guzhi) {
    guzhi = 100;
    this.Base.setMyData({
      issub: true
    });
    setTimeout(() => {

      var animation = wx.createAnimation({
        duration: 1000,
      });
      animation.opacity(0).step();
     
      this.Base.setMyData({
        guzhi,
        canshow: true,
        //issub: false,
        lostani: animation.export()
      });

      this.payguzhi();
    }, 5000);
  }
  displayshow() {
    this.Base.setMyData({
      issub: false
    });
    this.onMyShow();
  }


  share() {
    var that = this;
    var api = new CompanyApi();
    api.poster({ id: this.Base.options.id }, (res) => {

      var url = 'https://cmsdev.app-link.org/Users/alucard263096/zwgz/upload/company/' + res.return;

      that.Base.viewPhoto({ currentTarget: { id: url } });
      //this.Base.setMyData({ inshare: true, myposter: res.return });
    });
  }
  updateanwsercount(){
    var questionlist = this.Base.getMyData().questionlist;

    var qtlist = this.Base.getMyData().questiontypelist;
    for (var i = 0; i < qtlist.length; i++) {
      qtlist[i].wrongcount = 0;
    }

    var count=0;
    var totalcount = 0;
    var rightcount = 0;
    for(var i=0;i<questionlist.length;i++){
      if (questionlist[i].myanwser!=undefined){
        count++;
      }
      if(questionlist[i].a!=""){
        totalcount++;
        if (questionlist[i].myanwser == questionlist[i].a){
          rightcount++;
        }else{
          for (var j = 0; j < qtlist.length; j++) {
            if (questionlist[i].qt_id==qtlist[j].id){
              qtlist[j].wrongcount ++;
            }
          }
        }
      }
    }
    var m=0;
    var whatneedtoknow="";
    for (var i = 0; i < qtlist.length; i++) {
      if (qtlist[i].wrongcount>m){
        whatneedtoknow = qtlist[i].name;
        break;
      }
    }
    this.Base.setMyData({ anwsercount: count, rightcount, totalcount, whatneedtoknow: whatneedtoknow });
  }
  redati(){

    this.onMyShow(()=>{

      var testresult = this.Base.getMyData().testresult;
      var questionlist = this.Base.getMyData().newquestionlist;
      testresult.status = 'A';
      this.Base.setMyData({
        questionlist: questionlist,
        intest: true,
        issub: false,
        testresult: testresult,
        q: 0
      });
      this.updateanwsercount();
    });

    //this.onMyShow();
  }
  backtotop() {
    this.Base.setMyData({
      top: 0
    });
    super.backtotop();
  }
  catchTouchMove(res) {
    return false
  }
}
var content = new Content();
content.PageName = "company";
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.setPageTitle = content.setPageTitle;
body.pay = content.pay;
body.start = content.start;
body.optselect = content.optselect;
body.prev = content.prev;
body.next = content.next;
body.showsucc = content.showsucc; 
body.displayshow = content.displayshow;
body.share = content.share; 
body.updateanwsercount = content.updateanwsercount; 
body.payguzhi = content.payguzhi; 
body.getResult = content.getResult;
body.redati = content.redati;
body.backtotop = content.backtotop; 
body.catchTouchMove = content.catchTouchMove;
Page(body)