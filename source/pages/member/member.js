// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { CompanyApi } from "../../apis/company.api";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({pg:0})
  }
  onMyShow() {
    var that = this;
    var memberinfo = this.Base.getMyData().memberinfo;
    console.log(memberinfo);
    var api = new CompanyApi();
    api.allmembertest({
      member_id: memberinfo.id
    }, (allmembertest) => {
      for (var i = 0; i < allmembertest.length; i++) {
        var guzhi = parseInt(allmembertest[i].val );
        allmembertest[i].guzhi = guzhi;
      }
      //数据分页而已啦
      var testblock=[];
      for(var i=0;i<allmembertest.length/5.0;i++){
        var block=[];
        for(var k=0;k<5;k++){
          var v=i*5+k;

          block.push(allmembertest[v]);
        }
        testblock.push(block);
      }


      this.Base.setMyData({ allmembertest, testblock });
      });
    api.paymentrecord({
      
    }, (paymentrecord) => {

      this.Base.setMyData({ paymentrecord });
    });
  }

  gotoCompany(e) {
    var id = e.currentTarget.id;
    var api = new CompanyApi();
    api.info({ id: id }, (info) => {
      if (1 == 2 &&info.testresult.status == 'B') {
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
  gotoPG(e){
    var id = parseInt(e.currentTarget.id);
    this.Base.setMyData({pg:id});
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow; 
body.gotoCompany = content.gotoCompany;
body.gotoPG = content.gotoPG;
Page(body)