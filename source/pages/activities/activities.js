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
import {
  ApiUtil
} from "../../apis/apiutil.js";

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
    var start_time = [];
    var end_time = [];
    var api = new CompanyApi(); 
    api.updatestatus({}, (updatestatus) => {
      this.Base.setMyData({
        updatestatus
      });
    });
    api.activitieslist({}, (activitieslist) => {


      this.Base.setMyData({
        activitieslist
      });


      for (var i = 0; i < activitieslist.length; i++) {
        start_time.push(ApiUtil.updatetime(activitieslist[i].start_time));
        end_time.push(ApiUtil.updatetime(activitieslist[i].end_time));
      }

      this.Base.setMyData({
        start_time,
        end_time
      });
    });

    var instapi = new InstApi();
    instapi.indexbanner({position: "home"}, (indexbanner) => {
      this.Base.setMyData({
        indexbanner
      });
    });
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
Page(body)