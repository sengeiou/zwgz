import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Http, HttpModule } from '@angular/http';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { Device } from '@ionic-native/device/ngx';
import { JPush } from '@jiguang-ionic/jpush/ngx';
import { InAppPurchase } from '@ionic-native/in-app-purchase/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Wechat } from '@ionic-native/wechat/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot({
    mode: 'ios',
    rippleEffect: true,
    swipeBackEnabled:false,
    scrollAssist: false
  }), AppRoutingModule, HttpModule
],
  providers: [
    StatusBar,
    SplashScreen,
    HTTP,
    SQLite,
    Device,
    JPush,
    Keyboard,
    InAppPurchase,
    Wechat,
    PhotoViewer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})

// swipeBackEnabled: false,
export class AppModule { }
