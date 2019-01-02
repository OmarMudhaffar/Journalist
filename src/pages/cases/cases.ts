import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import * as $ from 'jquery'

/**
 * Generated class for the CasesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cases',
  templateUrl: 'cases.html',
})
export class CasesPage {

  cityq;
  gender;
  nameq
  phoneq
  dateq
  companyq
  moreq
  email

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public db : AngularFireDatabase,public toast : ToastController,public load : LoadingController) {

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
    console.log('ionViewDidLoad CasesPage');
  }


  cases(pro,de){

    var load = this.load.create({
      content:"Sending case .."
    })
    
    if(pro.length > 0 && de.length > 0){

  load.present();
      this.db.list("cases").push({
        cityq:this.cityq,
        gender:this.gender,
        nameq:this.nameq,
        phoneq:this.phoneq,
        dateq:this.dateq,
        companyq:this.companyq,
        moreq:this.moreq,
        detail:de,
        problem:pro,
        email:this.email
       }).then( ()=> {

         $("input").val("");
        load.dismiss();

       this.toast.create({
         message:"Your case has been sent",
         duration:3000
       }).present();
       this.navCtrl.pop();


       })

    }

    }


}
