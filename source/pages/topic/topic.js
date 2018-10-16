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
    //options.company_id=2;
    super.onLoad(options);
    this.Base.setMyData({ comment:""});
  }
  onMyShow() {
    var that = this;
    var api = new CompanyApi();
    api.info({
      id: this.Base.options.company_id
    },(info)=>{

      this.Base.setMyData(info);
      this.Base.setPageTitle();
      this.loadcomment();
    });
  }

  setPageTitle() {
    wx.setNavigationBarTitle({
      title: "讨论区",
    })
  }

  changeComment(e){
    this.sendComment();
    return;
    this.Base.setMyData({comment:e.detail.value});
  }

  loadcomment() {
    var api = new CompanyApi();
    api.commentlist({ company_id: this.Base.options.company_id }, (commentlist) => {
      for(var i=0;i<commentlist.length;i++){
        var guzhi = parseInt(commentlist[i].guzhi/100000000);
        commentlist[i].guzhi=guzhi;
      }
      this.Base.setMyData({ commentlist });
    })
  }

  sendComment(){
    var comment=this.Base.getMyData().comment.trim();
    if(comment==""){
      this.Base.toast("留言不能空");
      return;
    }
    var that=this;
    wx.showModal({
      title: '提示',
      content: '确认发布评论？',
      success:function(e){
        if(e.confirm){
          var api=new CompanyApi();
          api.comment({ company_id: that.Base.options.company_id,comment:comment},()=>{
            that.Base.setMyData({comment:""});
            that.loadcomment();
          });
        }
      }
    })
  }
  like(e){
    var comment_id=e.currentTarget.id;
    var api = new CompanyApi();
    var that = this;
    api.commentlike({ comment_id }, () => {
      
      that.loadcomment();
    });
  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow; 
body.changeComment = content.changeComment; 
body.loadcomment = content.loadcomment; 
body.sendComment = content.sendComment;
body.like = content.like;
Page(body)