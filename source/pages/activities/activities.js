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
 
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
Page(body)