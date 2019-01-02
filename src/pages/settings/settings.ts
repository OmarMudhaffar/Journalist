import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import * as $ from 'jquery'

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  phones

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private nativeStorage: NativeStorage,public toast : ToastController) {
      nativeStorage.getItem("phone").then(item => {
        if(item != undefined){
          this.phones = item;
        }
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }


  ngOninit(){
    $(".father").height( $(window).height() - $(".header").height() )
  }

  back(){
    this.navCtrl.pop();
  }

  save(phone){
   this.nativeStorage.setItem("phone",phone).then( ()=> {
    var toast = this.toast.create({
      message:"Phone has been saved",
      duration:3000
    });
    toast.present();
   this.navCtrl.pop()
   })
  }

}
