import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import * as $ from 'jquery'
import { RegisterPage } from '../register/register';
import { AngularFireAuth } from '@angular/fire/auth';
import { HomePage } from '../home/home';
import { InfoPage } from '../info/info';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public auth : AngularFireAuth,public load : LoadingController, public alert : AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ngOnInit(){
  
    $(".mcontent").height( $(window).height() );
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }

  login(email,pass){
    if(email.length > 0 && pass.length > 0){
      var load = this.load.create({
        content:"Login to your account",
      });
      load.present();
      this.auth.auth.signInWithEmailAndPassword(email,pass).then( ()=> {
        load.dismiss();
        this.navCtrl.setRoot(HomePage);
        this.navCtrl.goToRoot;
      }).catch(err => {
        load.dismiss()
        var alert = this.alert.create({
          subTitle:"Oops!",
          message:err.message,
          buttons:["ok"]
        });
        alert.present();
      })
    }
  }

  info(){
    this.navCtrl.push(InfoPage);
  }

}
