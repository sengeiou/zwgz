import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import {  ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams,IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { SquareApi } from 'src/providers/square.api';

@Component({
  selector: 'app-myfav',
  templateUrl: './myfav.page.html',
  styleUrls: ['./myfav.page.scss'],
  providers:[SquareApi]
})
export class MyfavPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public squareapi:SquareApi
    ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl,activeRoute);
    this.headerscroptshow = 480;
      
  }

  onMyLoad(){
    //参数
    this.params;
  }
  list=[];

  onMyShow(){
    this.squareapi.favtopiclist({}).then((list)=>{
      this.list=list;
    });
  }
}
