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
    this.Base.setMyData({ catlist: [], currenttab: 0, open: 1 });
  }
  
  onMyShow() {
    var that=this;

    var instapi = new InstApi();
    instapi.indexbanner({ position:"home" }, (indexbanner)=>{
      this.Base.setMyData({ indexbanner });
    });
    var api = new CompanyApi();
    api.activitieslist({ orderby: "r_main.seq"}, (activitieslist) => {
      this.Base.setMyData({ activitieslist });
    });
    var catlist = this.Base.getMyData().catlist;
    //if (catlist.length==0)
    {
      var api = new CompanyApi();
      api.catlist({ status: "A", inmini: "Y"}, (catlist) => {
        this.Base.setMyData({ catlist });
      });
    }
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
        this.Base.toast("研究人员正在努力工作，将尽快上线。");
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
  showPDF(){
    var uploadpath=this.Base.getMyData().uploadpath;
    var instinfo=this.Base.getMyData().instinfo;
    var url=uploadpath+"inst/"+instinfo.firstpdf;
    console.log(url);
    this.Base.openpdf(url);
  }

  toactivitydetails(e){
    var id= e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/activitydetails/activitydetails?id='+id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
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
body.showPDF = content.showPDF;
body.btnopendetails = content.btnopendetails;
body.bindclosedetails = content.bindclosedetails; 
body.toactivitydetails = content.toactivitydetails; 
Page(body)