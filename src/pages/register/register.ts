import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AngularFireAuth } from '@angular/fire/auth';
import * as $ from 'jquery'
import { AngularFireDatabase } from '@angular/fire/database';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public load : LoadingController, public alert : AlertController,
    public auth : AngularFireAuth,public db : AngularFireDatabase) {
  }


  ngOnInit(){
  
    $(".upper").height( $(window).height() - $(".header").innerHeight() );
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  login(){
    this.navCtrl.pop();
  }

  register(email,pass){
    if(email.length > 0 && pass.length > 0){
      var load = this.load.create({
        content:"Create new user",
      });
      load.present();
      this.auth.auth.createUserWithEmailAndPassword(email,pass).then( ()=> {
        load.dismiss();
        this.navCtrl.setRoot(HomePage);
        
        this.db.list("users").push({
          email:email,
          name:"",
          phone:"",
          gender:"",
          date:"",
          city:"",
          company:"",
          more:""
        }).then( ()=> {
          this.navCtrl.goToRoot;
        })
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

}
