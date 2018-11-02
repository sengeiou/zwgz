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
    //options.id = 80;
    //options.version = 4;
    super.onLoad(options);
    this.Base.setMyData({ questionlist:[]});
  } onMyShow() {
    var that = this;

    var api = new CompanyApi();
    api.info({
      id: this.Base.options.id,version:this.Base.options.version
    }, (info) => {
      if (info.testresult.status == 'B') {
        console.log("b~~~c");
        var guzhi = parseInt(info.testresult.val / 1);//000
        info.testresult.guzhi = guzhi;
      }

      for (var i = 0; i < info.questionlist.length; i++) {
        console.log(info.questionlist[i].tips);
        info.questionlist[i].name = this.Base.util.HtmlDecode(info.questionlist[i].name);
        info.questionlist[i].q1 = this.Base.util.HtmlDecode(info.questionlist[i].q1);
        info.questionlist[i].q2 = this.Base.util.HtmlDecode(info.questionlist[i].q2);
        info.questionlist[i].q3 = this.Base.util.HtmlDecode(info.questionlist[i].q3);
        info.questionlist[i].q4 = this.Base.util.HtmlDecode(info.questionlist[i].q4);
        info.questionlist[i].q5 = this.Base.util.HtmlDecode(info.questionlist[i].q5);
        info.questionlist[i].q6 = this.Base.util.HtmlDecode(info.questionlist[i].q6);
        info.questionlist[i].q7 = this.Base.util.HtmlDecode(info.questionlist[i].q7);
        info.questionlist[i].q8 = this.Base.util.HtmlDecode(info.questionlist[i].q8);
        info.questionlist[i].tips = this.Base.util.HtmlDecode(info.questionlist[i].tips);
        console.log(info.questionlist[i].tips);
      }
      this.Base.setMyData(info);
    });
    
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
Page(body)