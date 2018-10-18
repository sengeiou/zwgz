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

var wxCharts = require('../../libs/wxcharts-min.js');

class Content extends AppBase {
  constructor() {
    super();
  }
  ring = null;
  onLoad(options) {
    this.Base.Page = this;
    //options.id = 2;
    super.onLoad(options);
    this.Base.setMyData({
      issub: false,
      intest:false,
      q: 0
    });
  }
  onMyShow() {
    var that = this;

    var api = new CompanyApi();
    api.info({
      id: this.Base.options.id
    }, (info) => {
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
              name: piedata[i].name+"亿元",
              data: vda,
              color: color});
          }
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
    });
    api.allmembertest({
      status: "B",
      company_id: this.Base.options.id
    }, (allmembertest) => {
      for (var i = 0; i < allmembertest.length; i++) {

        var guzhi = parseInt(allmembertest[i].val / 100000000.0);
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
      if (data.price > 0 && data.unlock != 'Y') {
        wx.setNavigationBarTitle({
          title: '订阅',
        })
      } else {

        wx.setNavigationBarTitle({
          title: data.name,
        })
      }
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
          that.onMyShow();
        }
        wx.requestPayment(ret);
      });
  }
  start() {
    var testresult = this.Base.getMyData().testresult;
    if(testresult.status==undefined){
      testresult.status=='A';
    }
    this.Base.setMyData({
      intest: true,
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


    var version = this.Base.getMyData().version;
    var api = new CompanyApi();
    console.log(JSON.stringify(questionlist));
    console.log((questionlist));
    api.testupdate({
      company_id: this.Base.options.id,
      version: version,
      content: JSON.stringify(questionlist)
    });

  }
  next() {
    var q = parseInt(this.Base.getMyData().q);
    var questionlist = this.Base.getMyData().questionlist;
    var version = this.Base.getMyData().version;
    if (questionlist[q].myanwser == undefined) {
      this.Base.toast("请选择本题选项");
      return;
    }

    q++;

    if (q >= questionlist.length) {
      var questionlistlength = questionlist.length;
      var g1 = 0.01 * parseInt(questionlist[questionlistlength - 3].myanwser);
      var g2 = 0.01 * parseInt(questionlist[questionlistlength - 2].myanwser);
      var r = 0.01 * parseInt(questionlist[questionlistlength - 1].myanwser);
      var json = {
        company_id: this.Base.options.id,
        version: version,
        g1,
        g2,
        r
      };
      console.log(json);
      var that = this;

      wx.showModal({
        title: '提示',
        content: '是否确认提交估值问卷？',
        success: function(e) {
          if (e.confirm) {
            var api = new CompanyApi();
            api.resultsubmit(json, (ret) => {
              //that.onMyShow();
              that.showsucc(ret.return);
            });
          }
        }
      })

    } else {

      this.Base.setMyData({
        q
      });
    }

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
      this.Base.setMyData({
        guzhi,
        canshow: true
      });
    }, 6000);
  }
  displayshow() {
    this.Base.setMyData({
      issub: false
    });
    this.onMyShow();
  }
}
var content = new Content();
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
Page(body)