import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides, ActionSheetController } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { InstApi } from 'src/providers/inst.api';
import { CompanyApi } from 'src/providers/company.api';
import { SquareApi } from 'src/providers/square.api';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [InstApi, CompanyApi, SquareApi]
})
export class Tab1Page extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public actionSheetController: ActionSheetController,
    private sanitizer: DomSanitizer,
    public instapi: InstApi,
    public companyapi: CompanyApi,
    public squareapi: SquareApi
  ) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;
    this.currentpage = "tab1";
  }
  tanchu = false;
  zhidaole() {

    console.log("牛逼哦");
    this.tanchu = false;
    window.localStorage.setItem('tanchuan', '1');

  }
  onMyLoad() {
    //参数
    this.params;

    this.instapi.indexbanner({ position: "square" }).then((indexbanner) => {
      this.indexbanner = indexbanner;
    });
    this.companyapi.catlist({ status: "A", noneedcompany: "Y" }).then((catlist) => {
      this.catlist = catlist;
      //this.selectcat = catlist[0];

      this.loadTopic();
    });
    var tanchu = window.localStorage.getItem("tanchuan");

    console.log(tanchu);
    if (tanchu == null) {
      this.tanchu = true;
    }
    console.log(this.tanchu);

  }
  indexbanner = [];
  catlist = [];
  selectcat = null;
  look = "";
  list = [];
  list1 = [];
  onMyShow() {
    AppBase.TABName = "tab1";
    AppBase.LASTTAB = this;
    if (this.catlist.length > 0) {
      this.squareapi.topiclist({}).then((list) => {
        for (var i = 0; i < list.length; i++) {
          var post_time_str = this.util.TimeAgo(list[i].post_time_timespan);
          list[i].post_time_str = post_time_str;
        }
        console.log(list);
        this.list = list;
        this.list1 = list;
      });

    }
  }

  loadTopic() {
    let element = document.getElementById("din");
    element.scrollIntoView();

    // this.content.scrollTo(0, 0, 300)
    var cond = null;
    cond = {};
    if (this.selectcat != null) {
      cond.cat_id = this.selectcat.id;
    }
    if (this.look != "") {
      cond.look = this.look;
    }
    console.log(cond.cat_id);
    console.log(cond.look);
    this.list = this.list1.filter((item) => {

      if (cond.cat_id == undefined && cond.look == undefined) {
        console.log("牛逼");
        return item.look != '';

      }
      if (cond.look == undefined) {
        return item.cat_id == cond.cat_id
      }
      if (cond.cat_id == undefined) {
        return item.look == cond.look
      }
      if(cond.cat_id != undefined&& cond.look != undefined)
      {

        return item.look == cond.look&&item.cat_id == cond.cat_id
      }

   
      //  return  item.cat_id==cond.cat_id&&item.look==cond.look

    })
    
  }

  changeCat() {
    var that = this;
    var buttons = [];
    console.log(that.catlist);
    for (var i = 0; i < that.catlist.length; i++) {
      console.log(that.catlist[i]);
      var cat = that.catlist[i];
      var button = that.getButton(that, cat);
      buttons.push(button);
    }
    buttons.push({
      text: '全部行业',
      handler: () => {
        that.selectcat = null;
        that.loadTopic();
      }
    });

    buttons.push({
      text: '取消',
      role: 'cancel',
    });
    this.showActionSheet(this.actionSheetController, "选择行业", buttons);
  }
  getButton(that, cat) {

    var button = {
      text: cat.name,
      handler: (e) => {
        console.log("handler");

        console.log(that.selectcat);
        console.log(e);
        that.selectcat = cat;
        that.loadTopic();
      }
    };
    return button;
  }
  gotoTopic(item) {
    // this.companyapi.checkassess({company_id: item.company_id}).then((ret)=>{
    //   if(ret.code==0){

    //     this.navigate("topic",{id:item.id,isfirst:"Y"});
    //   }else{
    //     this.showConfirm("你还没有进行估值，是否先去估值？",(ret)=>{
    //       if(ret){
    //         this.navigate("company",{id:item.company_id});
    //       }
    //     });
    //   }
    // });
    this.navigate("topic", { id: item.id, isfirst: "Y", companyname: item.company_name });
  }
  showCompanyTopic(item) {
    this.navigate("topiclist", { company_id: item.company_id, companyname: item.company_name });
  }
  donneed(){
    navigator["app"].exitApp();
  }
}
