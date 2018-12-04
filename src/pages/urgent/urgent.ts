import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import * as $ from 'jquery'

/**
 * Generated class for the UrgentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-urgent',
  templateUrl: 'urgent.html',
})
export class UrgentPage {

  cityq;
  gender;
  nameq
  phoneq
  dateq
  companyq
  moreq
  email

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public db : AngularFireDatabase,public toast : ToastController) {

    this.nameq = navParams.get("name");
    this.phoneq = navParams.get("phone");
    this.dateq = navParams.get("date");
    this.companyq = navParams.get("company");
    this.moreq = navParams.get("more");
    this.cityq = navParams.get("city");
    this.gender = navParams.get("gender");
    this.email = navParams.get("email");

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UrgentPage');
  }

  save(point,place,problem){
   
    if(point.length > 0 && place.lenght > 0 && problem.length > 0){

      this.db.list("urgent").push({
        cityq:this.cityq,
        gender:this.gender,
        nameq:this.nameq,
        phoneq:this.phoneq,
        dateq:this.dateq,
        companyq:this.companyq,
        moreq:this.moreq,
        point:point,
        place:place,
        problem:problem,
        email:this.email
       }).then( ()=> {
         $("input").val("");
       this.toast.create({
         message:"Your urgent has been sent",
         duration:3000
       }).present();
       })
       this.navCtrl.pop();

    }

  }

}
