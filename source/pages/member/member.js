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
        var guzhi = parseInt(allmembertest[i].val / 100000000.0);
        allmembertest[i].guzhi = guzhi;
      }
      this.Base.setMyData({ allmembertest });
      });
    api.paymentrecord({
      
    }, (paymentrecord) => {

      this.Base.setMyData({ paymentrecord });
    });
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
Page(body)