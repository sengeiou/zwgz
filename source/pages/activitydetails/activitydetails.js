// pages/activitydetails/activitydetails.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api";
import { CompanyApi } from "../../apis/company.api"; 
import { ApiUtil } from "../../apis/apiutil.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    
    

    

    this.Base.setMyData({ showview: 1, comment: "", inshare: false, });
    

  }

  onMyShow() {
    var that = this;
    var api = new CompanyApi();
    api.activitiesinfo({ id: this.Base.options.id}, (info) => {

      this.Base.setMyData({ info });

     
      this.Base.setMyData({ start_time: ApiUtil.updatetime(info.start_time), end_time: ApiUtil.updatetime(info.end_time), writeoff_starttime: ApiUtil.updatetime(info.writeoff_starttime), writeoff_endtime: ApiUtil.updatetime(info.writeoff_endtime) });

      
    });

    

    api.info({
      id: this.Base.options.id
    }, (info) => {

      this.Base.setMyData(info);
      this.loadcomment();
    });
    wx.hideShareMenu({

    })

    
  }

  changeCurrentTab(e) {
    console.log(e);
    this.Base.setMyData({ showview:1 });
  }

  changeTab(e) {
    console.log(e);
    this.Base.setMyData({ showview: 2 });
  }



  changeComment(e) {
    //this.sendComment();
    //return;
    this.Base.setMyData({ comment: e.detail.value });
  }

  loadcomment() {
    var api = new CompanyApi();
    api.attscommentlist({ company_id: this.Base.options.id }, (attscommentlist) => {
      for (var i = 0; i < attscommentlist.length; i++) {
        var guzhi = parseInt(attscommentlist[i].guzhi);
        attscommentlist[i].guzhi = guzhi;
      }
      this.Base.setMyData({ attscommentlist });
    })
  }

  sendComment() {
    var that = this;
    var memberinfo = this.Base.getMyData().memberinfo;
    var comment = this.Base.getMyData().comment;
    
    if (comment != "" && comment != undefined) {
      var api = new CompanyApi();
      api.attscomment({ comment: comment, company_id: that.Base.options.id }, (rst) => {
        this.Base.setMyData({
          comment: ""
        });
        that.onMyShow();
      })
    }
    else {
      this.Base.info("至少说点什么吧");
    }



    // wx.showModal({
    //   title: '提示',
    //   content: '确认发布评论？',
    //   success: function (e) {
    //     if (e.confirm) {
    //       var api = new CompanyApi();
    //       api.attscomment({ company_id: that.Base.options.id, member_id: memberinfo.id }, (ret) => {
    //         that.Base.setMyData({ attscomment: "" });
    //         that.loadcomment();
    //         that.Base.toast(ret.return);

    //         var memberapi = new MemberApi();
    //         memberapi.info({}, (memberinfo) => {
    //           that.Base.setMyData({ memberinfo });
    //         });

    //       });
    //     }
    //   }
    // })
  }

  up(e) {
    var comment_id = e.currentTarget.id;
    this.like(comment_id, "1");
  }
  down(e) {
    var comment_id = e.currentTarget.id;
    this.like(comment_id, "2");
  }
  like(comment_id, status) {
    var api = new CompanyApi();
    var that = this;
    api.attscommentlike({ comment_id, status }, (likeresult) => {
      console.log("likeresult");
      console.log(likeresult);
      that.loadcomment();
    });
  }
  share() {
    var api = new CompanyApi();
    api.poster({ id: this.Base.options.company_id }, (res) => {

      this.Base.setMyData({ inshare: true, myposter: res.return });
    });
  }
  startdownload() {
    var myposter = this.Base.getMyData().myposter;
    var imageUrl = "http://cmsdev.app-link.org/Users/alucard263096/zwgz/upload/company/" + myposter;

    this.download(imageUrl, () => {
      this.Base.toast("成功保存到相册")
    });

  }
  onShareAppMessage() {
    var id = this.Base.getMyData().id;
    var name = this.Base.getMyData().name;
    var myposter = this.Base.getMyData().myposter;
    var ret = {
      title: name,
      path: "/pages/company/company?id=" + id
    };
    if (myposter != undefined) {
      ret.imageUrl = "http://cmsdev.app-link.org/Users/alucard263096/zwgz/upload/company/" + myposter;
    }
    return ret;
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
body.changeComment = content.changeComment; 
body.loadcomment = content.loadcomment; 
body.sendComment = content.sendComment;
body.like = content.like;
body.up = content.up; 
body.down = content.down; 
body.share = content.share; 
body.onShareAppMessage = content.onShareAppMessage;
body.startdownload = content.startdownload;
Page(body)