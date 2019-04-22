// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js"; 
import { CompanyApi } from "../../apis/company.api";
import { MemberApi } from "../../apis/member.api";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.company_id=2;
    super.onLoad(options);
    this.Base.setMyData({ comment: "", inshare:false});
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
    wx.hideShareMenu({
      
    })
  }

  setPageTitle() {
    wx.setNavigationBarTitle({
      title: "讨论区",
    })
  }

  changeComment(e){
    //this.sendComment();
    //return;
    this.Base.setMyData({comment:e.detail.value});
  }

  loadcomment() {
    var api = new CompanyApi();
    api.commentlist({ company_id: this.Base.options.company_id }, (commentlist) => {
      for(var i=0;i<commentlist.length;i++){
        var guzhi = parseInt(commentlist[i].guzhi);
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
          api.comment({ company_id: that.Base.options.company_id,comment:comment},(ret)=>{
            that.Base.setMyData({comment:""});
            that.loadcomment();
            that.Base.toast(ret.return);

            var memberapi=new MemberApi();
            memberapi.info({},(memberinfo)=>{
              that.Base.setMyData({memberinfo});
            });

          });
        }
      }
    })
  }
  up(e){
    var comment_id=e.currentTarget.id;
    this.like(comment_id,"1");
  }
  down(e) {
    var comment_id = e.currentTarget.id;
    this.like(comment_id, "2");
  }
  like(comment_id,status){
    var api = new CompanyApi();
    var that = this;
    api.commentlike({ comment_id, status }, (likeresult) => {
      console.log("likeresult");
      console.log(likeresult);
      that.loadcomment();
    });
  }
  share(){
    var api=new CompanyApi();
    api.poster({ id: this.Base.options.company_id},(res)=>{

      this.Base.setMyData({ inshare: true, myposter:res.return });
    });
  }

  startdownload(){
    var myposter = this.Base.getMyData().myposter;
    var imageUrl = "http://cmsdev.app-link.org/Users/alucard263096/zwgz/upload/company/" + myposter;

    this.download(imageUrl,()=>{
      this.Base.toast("成功保存到相册")
    });

  }
  onShareAppMessage() {
    var id = this.Base.getMyData().id;
    var name = this.Base.getMyData().name;
    var sharetitle = this.Base.getMyData().sharetitle; 
    var shareimg = this.Base.getMyData().shareimg;
    var myposter = this.Base.getMyData().myposter;
    var ret = {
      
      path: "/pages/company/company?id=" + id
    };
    if (sharetitle == "" ){
      ret.title = name;
    }
    else{
      ret.title = sharetitle;
      ret.imageUrl = "https://alioss.app-link.org/alucard263096/zwgz/company/" + shareimg;
    }
    return ret;
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
body.up = content.up; 
body.down = content.down; 
body.share = content.share; 
body.onShareAppMessage = content.onShareAppMessage;
body.startdownload = content.startdownload;
Page(body)