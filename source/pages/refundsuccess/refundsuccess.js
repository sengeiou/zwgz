// pages/refundsuccess/refundsuccess.js
import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  InstApi
} from "../../apis/inst.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.needauth = false;
  }
  onMyShow() {
    var that = this;
  }
  back(e){
    // wx.redirectTo({
    //   url: '/pages/paymentrecord/paymentrecord',
    // })

    var pages = getCurrentPages()
    var num = pages.length
    
      wx.navigateBack({
        delta: 2
      })
    

  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow; 
body.back = content.back;
Page(body)