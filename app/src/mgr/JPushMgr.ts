import { Injectable } from '@angular/core';
import { JPush } from '@jiguang-ionic/jpush/ngx';
import { AppComponent } from 'src/app/app.component';

/**
 * Helper类存放和业务有关的公共方法
 * @description
 */
@Injectable()
export class JPushMgr {
  private registrationId: string;
  sequence: number = 0;
  constructor(private jpush: JPush) {
    
  }
  
  initPush(){
    /**接收消息触发 */
      document.addEventListener('jpush.receiveNotification', (event: any) => {
    console.log(event,'Receive notification');
         //alert('Receive notification: ' + JSON.stringify(event));
      }, false);
    /**打开消息触发 */
      document.addEventListener('jpush.openNotification', (event: any) => {
        console.log(event,'open notification');
      }, false);
    /**接收本地消息 */
      document.addEventListener('jpush.receiveLocalNotification', (event: any) => {
        console.log(event,'receive local notification');
      }, false);
  }
 
    tagResultHandler = function(result) {
      var sequence: number = result.sequence;
      var tags: Array<string> = result.tags == null ? [] : result.tags;
      console.log('Success!' + '\nSequence: ' + sequence + '\nTags: ' + tags.toString(),'标签设置回调');
    };
  
    aliasResultHandler = function(result) {
      var sequence: number = result.sequence;
      var alias: string = result.alias;
      console.log('Success!' + '\nSequence: ' + sequence + '\nAlias: ' + alias,'别名设置回调');
    };
  
    errorHandler = function(err) {
      var sequence: number = err.sequence;
    var code = err.code;
    //console.log('Error!' + '\nSequence: ' + sequence + '\nCode: ' + code,'异常设置回调');
    //this.logger.log('Error!' + '\nSequence: ' + sequence + '\nCode: ' + code,'异常设置回调');
    };
  /**
   * 设备的id
   */
    getRegistrationID() {
      this.jpush.getRegistrationID()
        .then(rId => {
          this.registrationId = rId;
        });
    }
  /**
   * 设置标签
   * tags:['Tag1', 'Tag2']
   */
    setTags(tags:Array<string>) {
      this.jpush.setTags({ sequence: this.sequence++, tags: tags})
        .then(this.tagResultHandler)
        .catch(this.errorHandler);
    }
  /**
   * 添加标签
   * tags:['Tag3', 'Tag4']
   */
    addTags(tags:Array<string>) {
      this.jpush.addTags({ sequence: this.sequence++, tags: tags})
        .then(this.tagResultHandler)
        .catch(this.errorHandler);
    }
  /**
   * 检测标签状态
   * * @param tag
   */
    checkTagBindState(tag:string) {
      this.jpush.checkTagBindState({ sequence: this.sequence++, tag: tag})
        .then(result => {
          var sequence = result.sequence;
          var tag = result.tag;
      var isBind = result.isBind;
      console.log('Sequence: ' + sequence + '\nTag: ' + tag + '\nIsBind: ' + isBind,'标签状态')
        }).catch(this.errorHandler);
    }
  /**
   * 
   * @param tag 删除标签
   */
    deleteTags(tag:Array<string>) {
      this.jpush.deleteTags({ sequence: this.sequence++, tags: tag})
        .then(this.tagResultHandler)
        .catch(this.errorHandler);
    }
  /**
   * 
   * 获取所有标签
   */
    getAllTags() {
      this.jpush.getAllTags({ sequence: this.sequence++ })
        .then(this.tagResultHandler)
        .catch(this.errorHandler);
    }
  /**
   * 
   *清空所有标签
   */
    cleanTags() {
      this.jpush.cleanTags({ sequence: this.sequence++ })
        .then(this.tagResultHandler)
        .catch(this.errorHandler);
    }
  /**
   * 
   * @param alias 设置别名
   */
    setAlias(alias:string) {
      this.jpush.setAlias({ sequence:this.sequence?this.sequence++:1, alias: alias })
        .then(this.aliasResultHandler)
        .catch(this.errorHandler);
    }
  /**
   * 
   * 获取所有别名
   */
    getAlias() {
      this.jpush.getAlias({ sequence: this.sequence++ })
        .then(this.aliasResultHandler)
        .catch(this.errorHandler);
    }
  /**
   * 
   * 删除所有别名
   */
    deleteAlias() {
      this.jpush.deleteAlias({ sequence: this.sequence++ })
        .then(this.aliasResultHandler)
        .catch(this.errorHandler);
    }
  /**
   * 添加本地消息
   */
    addLocalNotification() {
      // if (AppComponent.Instance.platformname=='Android') {
      //   this.jpush.addLocalNotification(0, 'Hello JPush', 'JPush', 1, 5000);
      // } else {
      //   this.jpush.addLocalNotificationForIOS(5, 'Hello JPush', 1, 'localNoti1');
      // }
  }
 
}