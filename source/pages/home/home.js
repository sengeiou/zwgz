// pages/content/content.js
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
    this.Base.setMyData({ catlist: [], currenttab:0});
  }
  onMyShow() {
    var that=this;

    var instapi = new InstApi();
    instapi.indexbanner({ position:"home" }, (indexbanner)=>{
      this.Base.setMyData({ indexbanner });
    });

    var catlist = this.Base.getMyData().catlist;
    //if (catlist.length==0)
    {
      var api = new CompanyApi();
      api.catlist({}, (catlist) => {
        this.Base.setMyData({ catlist });
      });
    }
  }

  changeCurrentTab(e) {
    console.log(e);
    this.Base.setMyData({ currenttab: e.detail.current });
  }

  changeTab(e) {
    console.log(e);
    this.Base.setMyData({ currenttab: e.currentTarget.id });
  }
  gotoCompany(e){
    var id=e.currentTarget.id;
    var api = new CompanyApi();
    api.info({id:id},(info)=>{
      if (info.iscoming_value=='Y'){
        this.Base.toast("即将为你开放");
        return;
      }
      if(1==2&&info.testresult.status=='B'){
        wx.navigateTo({
          url: '/pages/result/result?id=' + info.id,
        });
      }else{
        wx.navigateTo({
          url: '/pages/company/company?id=' + info.id,
        });
      }
    });
  }
} 
var markers=[];
var mapCtx = null;
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
body.changeCurrentTab = content.changeCurrentTab; 
body.changeTab = content.changeTab;
body.gotoCompany = content.gotoCompany;

Page(body)