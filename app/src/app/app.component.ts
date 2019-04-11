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
  providers:[InstApi,MemberApi]
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/tabs/tab1',
      type:"root",
      icon: 'home'
    },
    {
      title: 'forcopy',
      url: '/forcopy',
      type:"forward",
      icon: 'list'
    }
  ];


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private instApi:InstApi,
    private memberApi:MemberApi,
    public sqlite:SQLite,
    public http:HTTP
  ) {
    AppBase.instapi=instApi;
    AppBase.memberapi=memberApi;
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      DBMgr.GetInstance().Init(this.http,this.sqlite);

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  gotoPage(p){
    if(p.type=="forward"){
      AppBase.CurrentNav.navigateForward(p.url+"?fromtab="+AppBase.TABName);
    }else{
      AppBase.CurrentRoute.navigateByUrl(p.url);
    }
  }
}
