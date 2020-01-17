import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { ContentApi } from 'src/providers/content.api';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-content',
  templateUrl: './content.page.html',
  styleUrls: ['./content.page.scss'],
  providers:[ContentApi]
})
export class ContentPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public contentApi:ContentApi,
    public  photoViewer: PhotoViewer) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }
  title="";
  content=null;

  onMyLoad(){
    //参数
    this.params;
   
  }
  onMyShow(){
    this.contentApi.get({keycode:this.params.keycode}).then((data)=>{
      this.title=data.name;
      var content = AppUtil.HtmlDecode(data.content);
      this.content = this.sanitizer.bypassSecurityTrustHtml(content);
    });
  }
}

