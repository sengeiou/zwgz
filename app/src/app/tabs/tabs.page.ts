import { Component } from '@angular/core';
import { AppBase } from '../AppBase';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  ionViewDidEnter(){
    if(AppBase.LASTTAB!=null){
      AppBase.LASTTAB.ionViewDidEnter();
    }
  }
}
