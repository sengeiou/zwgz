import { Component, ElementRef } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { AppBase } from './AppBase';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { DBMgr } from 'src/mgr/DBMgr';
import { HTTP } from '@ionic-native/http/ngx';
import { JPushMgr } from 'src/mgr/JPushMgr';
import { JPush } from '@jiguang-ionic/jpush/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Device } from '@ionic-native/device/ngx';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  providers: [InstApi, MemberApi,JPush]
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/tabs/tab1',
      type: "root",
      icon: 'home'
    },
    {
      title: 'forcopy',
      url: '/forcopy',
      type: "forward",
      icon: 'list'
    }
  ];

  public static CurrentRoute: Router = null;
  constructor(
    public router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private instApi: InstApi,
    private memberApi: MemberApi,
    public sqlite: SQLite,
    public http: HTTP,
    public jpush: JPush,
    public elementRef:ElementRef,
    private keyboard: Keyboard,
    public device:Device,
    public toastCtrl:ToastController
  ) {
    AppBase.instapi = instApi;
    AppBase.memberapi = memberApi;
    this.initializeApp();
    AppComponent.Instance=this;
  }
  backButtonPressedOnceToExit=false;
  currentpage="";
  static Instance:AppComponent=null;

  jpushmgr=null;
tanchu=false;
  initializeApp() {

    
  
    this.platform.ready().then(() => {

      DBMgr.GetInstance().Init(this.http, this.sqlite);

      // let status bar overlay webview
      //this.statusBar.overlaysWebView(true);

      // set status bar to white

      // //有状态栏，白底黑字
      this.statusBar.backgroundColorByHexString('#ffffff');
      this.statusBar.styleDefault();

      // //有状态栏，黑底白字
      // this.statusBar.styleLightContent();

      //没有状态栏，自己要留位置，用于首页的第一个元素是广告，好看，但是后续的页面要动态设置颜色
      // this.statusBar.overlaysWebView(true);
      // this.statusBar.styleLightContent();


      this.splashScreen.hide();


      this.jpush.init();
      this.jpush.setDebugMode(true);

      
      this.screenheight = screen.height;
      this.screenwidth = screen.width;


      var jpushmgr = new JPushMgr(this.jpush);
      jpushmgr.initPush();
      jpushmgr.setAlias("aaaa");
      this.jpushmgr = jpushmgr;

      ;

      var obj=this.elementRef.nativeElement.querySelector("#kcc");
      this.kccheight=obj.offsetHeight;

      if(this.device.platform=='Android'){
        this.kccheight=this.kccheight+50;
      }


      window.addEventListener('keyboardDidHide', (e: any) => {
        //if(this.platformname=='Android'){
        this.keyboardheight = 0;
        //}
      });
      window.addEventListener('keyboardDidShow', (e: any) => {
        //if(this.platformname=='Android'){
        this.keyboardheight = (parseInt(e.keyboardHeight));
        //}
      });


      var _self = this;
      var platform: Platform = this.platform;
      document.addEventListener("backbutton", () => {
        //alert(window.location.href);
        if (this.currentpage == "tab1"
          || this.currentpage == "tab2"
          || this.currentpage == "tab3"
          || this.currentpage == "tab4"
          || this.currentpage == "tab5"
        ) {
          //当前为Tab状态, 判断是否为首页
          // if (app.getActiveNav().getActive().name != 'HomePage') { //能用, 但编辑器提示未定义
          if (_self.backButtonPressedOnceToExit == true) {
            navigator["app"].exitApp();
          }
          _self.backButtonPressedOnceToExit = true;
          _self.presentToast("再按一次就退出程序");
          setTimeout(function () {
            _self.backButtonPressedOnceToExit = false;
          }, 2000);

        }
        else {
          //app.goBack();
          if (AppBase.Current.isModal) {

            AppBase.Current.close();
          } else {
            //alert("后退？");
            AppBase.Current.back();
          }
        }
      });


    });
  }

  gotoPage(p) {
    if (p.type == "forward") {
      AppBase.CurrentNav.navigateForward(p.url + "?fromtab=" + AppBase.TABName);
    } else {
      AppBase.CurrentRoute.navigateByUrl(p.url);
    }
  }
  async presentToast(msg: string) {
    let toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    await toast.present();
  }


  kccheight=50;

  showInput = false;
  keyboardheight = 50;

  screenheight = 100;

  screenwidth = 500;

  commentText = "";


  commph="";
  showComment(callback,commph="请输入...") {
    //this.keyboard.show();
    this.commph=commph;
    this.commentSend = callback;
    this.commentText = "";
    this.showInput = true;
    var obj = this.elementRef.nativeElement.querySelector('#comm');


    console.log(obj);
    obj.value = "";
    obj.focus();
  }
  closeComment() {
    this.keyboard.hide();
    this.showInput = false;
  }
  changeComment(e) {
    this.commentText = e.target.value;
  }
  rcommentSend() {
    var obj = this.elementRef.nativeElement.querySelector('#comm');
    console.log(obj);
    if (this.commentSend != undefined) {
      var val = obj.value;
      if (val.trim() == "") {
        this.presentToast("输入的内容不能为空");
        return;
      }
      this.commentSend(obj.value);
      this.closeComment();
    }
  }
  commentSend(value) {

  }
  zhidaole(){

     console.log("牛逼哦");
     this.tanchu=false;
     window.localStorage.setItem('tanchuan', '1');

  }
  navigate(pagename, param = {}, checkLogin = false) {
    
    this.router.navigate([pagename], { queryParams: param });

}
  showContent(title, keycode) {
    //this.tanchu=true;
    this.navigate("content", { title, keycode });
    //this.showModal("ContentPage", { title, key });
}
  checkCommentUp(e) {
    if (e.key == 'Enter') {
      this.rcommentSend();
    }
  }
}
