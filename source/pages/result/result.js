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
    //options.id=2;
    super.onLoad(options);
  } onMyShow() {
    var that = this;

    var api = new CompanyApi();
    api.info({
      id: this.Base.options.id
    }, (info) => {
      if (info.testresult.status == 'B') {
        console.log("b~~~c");
        var guzhi = parseInt(info.testresult.val / 100000000.0);
        info.testresult.guzhi = guzhi;
      }
      this.Base.setMyData(info);
      this.Base.setPageTitle();
    });
    
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
Page(body)