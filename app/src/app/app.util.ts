import { ApiConfig } from './api.config';
import { AlertController, ToastController } from '@ionic/angular';

export class AppUtil {
    public static isMicroMessager: boolean = false; //是否是在微信内置浏览器打开.
    public static isLessThenAndroid5: boolean = false; //<= android 4.4
    public static isIOS: boolean = false; //是否是在Iphone设备, 不论是微信打开,还是APP.
    public static osVersion = '';

    public static HtmlDecode(str) {
        if (str == null) {
            return "";
        }
        var s = "";
        if (str.length == 0) return "";
        s = str.replace(/&amp;/g, "&");
        s = s.replace(/&lt;/g, "<");
        s = s.replace(/&gt;/g, ">");
        s = s.replace(/&nbsp;/g, " ");
        s = s.replace(/&#39;/g, "\'");
        s = s.replace(/&quot;/g, "\"");

        //s = s.replace(new RegExp("</p>", "gm"), "</p><br />");

        var reg = new RegExp("\"/alucard263096/zwgz/upload/", "g"); //创建正则RegExp对象   
        s = s.replace(reg, "\"http://cmsdev.app-link.org/alucard263096/zwgz/upload/");

        return s;
    }


    public static FormatDateTime(date){
        console.log("FormatDateTime"+date);
        var year = AppUtil.ten2(date.getFullYear());
        var month = AppUtil.ten2(date.getMonth() + 1);
        var datec = AppUtil.ten2(date.getDate());
        var hour = AppUtil.ten2(date.getHours());
        var minute = AppUtil.ten2(date.getMinutes());
        var second = AppUtil.ten2(date.getSeconds());
    
        var v= year + "-" + month + "-" + datec+" "+hour+":"+minute+":"+second;
    
        console.log("FormatDateTime=" + v);
        return v;
      }
    
      public  static ten2(i){
        i=parseInt(i);
        if(i>9){
          return i.toString();
        }else{
          return "0"+i.toString();
        }
      }

    public static IsMobileNo(str) {
        console.log(str);
        if (str == null || str == undefined || str.length != 11) {
            return false;
        }

        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        return myreg.test(str);
    }
    public static FormatPercent(val) {
        val = val * 100.0;
        return val.toFixed(2) + '%';
    }
    public static FormatPrice(val) {
        val = val * 1.0;
        return val.toFixed(2);
    }
    public static FormatNumber(val, digits) {
        val = val * 1.0;
        return val.toFixed(digits);
    }
    public static FormatDate(val) {
        return val.substr(0, 10);
    }
    public static TimeAgo(agoTime) {

        // 计算出当前日期时间到之前的日期时间的毫秒数，以便进行下一步的计算
        var time = (new Date()).getTime() / 1000 - agoTime;

        var num = 0;
        if (time >= 31104000) { // N年前
            num = parseInt((time / 31104000).toString());
            return num + '年前';
        }
        if (time >= 2592000) { // N月前
            num = parseInt((time / 2592000).toString());
            return num + '月前';
        }
        if (time >= 86400) { // N天前
            num = parseInt((time / 86400).toString());
            return num + '天前';
        }
        if (time >= 3600) { // N小时前
            num = parseInt((time / 3600).toString());
            return num + '小时前';
        }
        if (time > 60) { // N分钟前
            num = parseInt((time / 60).toString());
            return num + '分钟前';
        }
        return '1分钟前';
    }

}