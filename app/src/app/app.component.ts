import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { InstApi } from 'src/providers/inst.api';
import { MemberApi } from 'src/providers/member.api';
import { AppBase } from './AppBase';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { DBMgr } from 'src/mgr/DBMgr';
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  providers: [InstApi, MemberApi]
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


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private instApi: InstApi,
    private memberApi: MemberApi,
    public sqlite: SQLite,
    public http: HTTP
  ) {
    AppBase.instapi = instApi;
    AppBase.memberapi = memberApi;
    this.initializeApp();
  }

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
    });
  }

  gotoPage(p) {
    if (p.type == "forward") {
      AppBase.CurrentNav.navigateForward(p.url + "?fromtab=" + AppBase.TABName);
    } else {
      AppBase.CurrentRoute.navigateByUrl(p.url);
    }
  }
}
