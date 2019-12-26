import { Component, ViewChild } from '@angular/core';
import { AppBase } from '../AppBase';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController, ModalController, ToastController, AlertController, NavParams, IonSlides } from '@ionic/angular';
import { AppUtil } from '../app.util';
import { DomSanitizer } from '@angular/platform-browser';
import { MemberApi } from 'src/providers/member.api';
import { Camera,CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import { CameraMgr } from 'src/mgr/CameraMgr';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';

@Component({
  selector: 'app-memberinfo',
  templateUrl: './memberinfo.page.html',
  styleUrls: ['./memberinfo.page.scss'],
  providers: [MemberApi,Camera,FileTransfer]
})
export class MemberinfoPage extends AppBase {

  constructor(public router: Router,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public activeRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public memberApi: MemberApi,
    public camera:Camera,
    public transfer:FileTransfer,
    public actionSheetController: ActionSheetController) {
    super(router, navCtrl, modalCtrl, toastCtrl, alertCtrl, activeRoute);
    this.headerscroptshow = 480;


  }

  name = '';
  oldname="";
  actions = [];
  mobile = '';
  
  touxian = '';
  photo = '';
  sheetVisible = false;

  onMyLoad() {
    //参数
    this.params;
    
  }
 
  onMyShow(){
    this.oldname=this.MemberInfo.nickName;
  }


  tijiaoname() {
    this.memberApi.updatemember({
      name: this.name,
    }).then(ret => {
      console.log(ret);
    });
  }
  tijiaoshouji() {
    this.memberApi.updatemember({
      shouji: this.mobile,
    }).then(ret => {
      console.log(ret);
    });
  }

  nameChange(){
    if(this.MemberInfo.nickName.trim()==""){
      this.MemberInfo.nickName=this.oldname;
    }
    this.memberApi.infoupdate({ nickName: this.MemberInfo.nickName });
  }
  
  introduceChange(){
    this.memberApi.infoupdate({ introduce: this.MemberInfo.introduce });
  }
  
  logout(){
    this.showConfirm("是否确认退出？",(ret)=>{
      if(ret==true){
        window.localStorage.removeItem("UserToken");
        this.back();
      }
    });
  }
  async selectPhoto() {
    const actionSheet = await this.actionSheetController.create({
      header: "选择头像",
      buttons: [
        {
          text: "立即自拍",
          handler: () => {
            let options: CameraOptions = {
              quality: 75,
              targetWidth: 200,
              targetHeight: 200,
              allowEdit: true,
              destinationType: this.camera.DestinationType.FILE_URI,
              sourceType: this.camera.PictureSourceType.CAMERA,
              encodingType: this.camera.EncodingType.JPEG
            };
            this.camera.getPicture(options).then((imagepath) => {
              this.uploadFile(this.transfer, imagepath, "member").then(photo => {
                
                this.memberApi.infoupdate({ avatarUrl: this.uploadpath+"member/"+ String(photo) }, false).then(data => {
                  
                    this.MemberInfo.avatarUrl =this.uploadpath+"member/"+ String(photo);
                  
                });

              });
            }, (err) => {
              // Handle error
            });
          }
        }, {
          text: "从相册选择",
          handler: () => {
            let options: CameraOptions = {
              quality: 75,
              targetWidth: 200,
              targetHeight: 200,
              allowEdit: true,
              destinationType: this.camera.DestinationType.FILE_URI,
              sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
              encodingType: this.camera.EncodingType.JPEG,
              mediaType: this.camera.MediaType.PICTURE
            };

            this.camera.getPicture(options).then((imagepath) => {
              this.uploadFile(this.transfer, imagepath, "member").then(photo => {
                this.memberApi.infoupdate({ avatarUrl: this.uploadpath+"member/"+ String(photo) }, false).then(data => {
                  
                    this.MemberInfo.avatarUrl =this.uploadpath+"member/"+ String(photo);
                  
                });
              });
            }, (err) => {
              // Handle error
            });
          }
        }
      ]
    });
    await actionSheet.present();
  }
}
