// pages/paymentrecord/paymentrecord.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { CompanyApi } from "../../apis/company.api";
import {ApiUtil} from "../../apis/apiutil.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    var threeday = parseInt(24*60*60*3);
    var threedayago = timestamp-threeday;
    console.log("三天前时间戳为：" + threedayago);
    this.Base.setMyData({ pg: 0, timestamp, threedayago })
  }
  onMyShow() {
    var that = this;
    var date = [];
    var enddate = [];
    var memberinfo = this.Base.getMyData().memberinfo;
    console.log(memberinfo);
    var api = new CompanyApi();
    api.allmembertest({
      member_id: memberinfo.id
    }, (allmembertest) => {

      
      for (var i = 0; i < allmembertest.length; i++) {
        var guzhi = parseInt(allmembertest[i].val);
        allmembertest[i].guzhi = guzhi;

        // var threeday = submittime+60*60*24*3;
        // console.log("三天时间"+threeday)
      }

      //数据分页而已啦
      var testblock = [];
      for (var i = 0; i < allmembertest.length / 5.0; i++) {
        var block = [];
        for (var k = 0; k < 5; k++) {
          var v = i * 5 + k;

          block.push(allmembertest[v]);
        }
        testblock.push(block);
      }

      this.Base.setMyData({ allmembertest, testblock });

    });

    api.paymentrecord({

    }, (paymentrecord) => {

      this.Base.setMyData({ paymentrecord });

      for (var i = 0; i < paymentrecord.length; i++) {
        date.push(ApiUtil.updatetime(paymentrecord[i].startdate));
        enddate.push(ApiUtil.updatetime(paymentrecord[i].enddate_formatting));
      }

      this.Base.setMyData({
        date,
        enddate
      });
    });
  }
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '支付记录',
    });
  }
  gotoCompany(e) {
    var id = e.currentTarget.id;
    var api = new CompanyApi();
    api.info({ id: id }, (info) => {
      if (1 == 2 && info.testresult.status == 'B') {
        wx.navigateTo({
          url: '/pages/result/result?id=' + info.id,
        });
      } else {
        wx.navigateTo({
          url: '/pages/company/company?id=' + info.id,
        });
      }
    });
  }
  tosuccess(e){
  var id=e.currentTarget.id;
  var status = e.currentTarget.dataset.status;
 // if(status=="S"){
    wx.navigateTo({
      url: '/pages/applyrefund/applyrefund?id='+id,
    })
  //}
  }
  gotoPG(e) {
    var id = parseInt(e.currentTarget.id);
    this.Base.setMyData({ pg: id });
  }
  lachang(e) {
    console.log(e);
    var id = parseInt(e.detail.current);
    this.Base.setMyData({ pg: id });
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.gotoCompany = content.gotoCompany;
body.gotoPG = content.gotoPG;
body.lachang = content.lachang;
body.tosuccess = content.tosuccess;
Page(body)