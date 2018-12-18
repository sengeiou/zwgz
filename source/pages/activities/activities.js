// pages/activities/activities.js
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
    this.Base.setMyData({ open: 1 })
  }
  onMyShow() {
    var that = this;

    var api = new CompanyApi();
    api.activitieslist({}, (activitieslist) => {
      this.Base.setMyData({ activitieslist });
    });

    var instapi = new InstApi();
    instapi.indexbanner({ position: "home" }, (indexbanner) => {
      this.Base.setMyData({ indexbanner });
    });
  }
  bindclosedetails(e) {
    this.Base.setMyData({
      open: 2
    })

  }
  btnopendetails() {
    this.Base.setMyData({
      open: 1
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.btnopendetails = content.btnopendetails;
body.bindclosedetails = content.bindclosedetails;
Page(body)