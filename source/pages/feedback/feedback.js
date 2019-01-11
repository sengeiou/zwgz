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
  
  confirm(e) {
    var data = e.detail.value;
    
    if (data.wechat == '') {
      this.Base.info("请填写手机号或微信号");
      return;
    }
    if (data.yuanyin == '') {
      this.Base.info("请填写意见内容");
      return;
    }

    var that = this;
    var wechat = data.wechat;
    var yuanyin = data.yuanyin;
    var id = this.options.id;
    var api = new CompanyApi();
    var memberinfo=this.Base.getMyData().memberinfo;
    wx.showModal({
      title: '',
      content: '确认提交意见反馈?',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#EE2222',
      confirmText: '确定',
      confirmColor: '#2699EC',
      success: function (res) {
        if (res.confirm) {
          api.feedback({
            status:"A",
            feed_content: yuanyin,
            phone: wechat,
            member_id: memberinfo.id
          }, (feedback) => {
            
          });
          
          wx.reLaunch({
            url: '/pages/mine/mine',
          })
          
          wx.showToast({
            title: '提交成功',
            duration: 2000
          })
          
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