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
  selector: 'app-topiclist',
  templateUrl: 'topiclist.page.html',
  styleUrls: ['topiclist.page.scss'],
  providers: [InstApi, CompanyApi, SquareApi]
})
export class TopiclistPage extends AppBase {

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
    this.currentpage = "topiclist";
  }

  companyname = "";
  company_id = "0";



  onMyLoad() {
    //参数
    this.params;
    this.companyname = this.params.companyname;
    this.company_id = this.params.company_id;
    this.loadTopic();
  }
  indexbanner = [];
  selectcat = null;
  look = "";
  list = [];

  onMyShow() {
    this.loadTopic();
  }

  loadTopic() {
    setTimeout(() => {
      var cond = null;
      cond = { company_id: this.company_id };

      if (this.look != "") {
        cond.look = this.look;
      }
      console.log(cond);
      this.squareapi.topiclist(cond).then((list) => {
        for (var i = 0; i < list.length; i++) {
          var post_time_str = this.util.TimeAgo(list[i].post_time_timespan);
          list[i].post_time_str = post_time_str;
        }
        console.log(list);
        this.list = list;
      });
    }, 500);
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
    console.log("hahaha");
    this.navigate("topic", { id: item.id, isfirst: "Y",companyname:this.params.companyname });
  }
}
