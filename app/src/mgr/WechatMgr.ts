import { Wechat } from '@ionic-native/wechat/ngx';

export class WechatMgr {
    constructor(public wechat: Wechat) {

    }

    checkInstalled() {
        console.log("checkInstalled");

        return this.wechat.isInstalled().then((installed) => {
            return installed;
        });

    }

    authUserInfo() {


        var scope = "snsapi_userinfo",
            state = "_" + (+new Date());
        return this.wechat.auth(scope, state).then((response) => {
            return response;
        }).catch((reason) => {
            alert("授权失败" + reason);
        });
    }
}