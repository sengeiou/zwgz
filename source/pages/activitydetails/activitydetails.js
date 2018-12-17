// pages/activitydetails/activitydetails.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api";
import { CompanyApi } from "../../apis/company.api";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({ showview:1});
  }

  onMyShow() {
    var that = this;

    
  }

  changeCurrentTab(e) {
    console.log(e);
    this.Base.setMyData({ showview:1 });
  }

  changeTab(e) {
    console.log(e);
    this.Base.setMyData({ showview: 2 });
  }
  
}
var markers = [];
var mapCtx = null;
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.changeCurrentTab = content.changeCurrentTab;
body.changeTab = content.changeTab;

Page(body)