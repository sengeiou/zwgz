// pages/applyrefund/applyrefund.js
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
    //applyrefund
    
    
  }
  // confirm(e){

  //   var api = new CompanyApi();
  //   api.applyrefund({}, (applyrefund) => {
  //     this.Base.setMyData({
  //       applyrefund
  //     });
  //   });
  // }


  confirm(e) {
    var data = e.detail.value;
    if (data.wechat == '') {
      this.Base.info("请填写微信号");
      return;
    }
    if (data.yuanyin == '') {
      this.Base.info("请填写退款原因");
      return;
    }

    var that = this;
    var wechat = data.wechat;
    var yuanyin = data.yuanyin;
    var id = this.options.id;
    var c = new CompanyApi();
    var api = new CompanyApi();



    wx.showModal({
      title: '',
      content: '确认提交退款申请?',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor: '#2699EC',
      success: function(res) {
        if (res.confirm) {

          api.applyrefund({
            refundwechat: wechat,
            refund_reason: yuanyin,
            id: id
          }, (applyrefund) => {
            wx.navigateTo({
              url: '/pages/refundsuccess/refundsuccess',
            })
            wx.showToast({
              title: '提交成功',
              duration: 1000
            });
          });

        }
      }
    });

  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.confirm = content.confirm;
Page(body)