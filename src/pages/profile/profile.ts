import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import * as $ from 'jquery'

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  selectValue;
  gender;
  nameq
  phoneq
  dateq
  companyq
  moreq
  key

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public ac : ActionSheetController,public db : AngularFireDatabase,
    public auth : AngularFireAuth,public toast : ToastController) {
    
    this.nameq = navParams.get("name");
    this.phoneq = navParams.get("phone");
    this.dateq = navParams.get("date");
    this.companyq = navParams.get("company");
    this.moreq = navParams.get("more");
    this.selectValue = navParams.get("city");
    this.gender = navParams.get("gender");
    this.key = navParams.get("key");

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  back(){
    this.navCtrl.pop();
  }

  presentActionSheet() {
    const actionSheet = this.ac.create({
      title: 'Chose your city',
      cssClass:"dirion",
      buttons: [
        {text:"Baghdad ",handler:()=>{this.selectValue = "Baghdad "}},
        {text:"Dohuk ",handler:()=>{this.selectValue = "Dohuk "}},
        {text:"Erbil ",handler:()=>{this.selectValue = "Erbil "}},
        {text:"Sulaymaniyah ",handler:()=>{this.selectValue = "Sulaymaniyah "}},
        {text:"Nineveh ",handler:()=>{this.selectValue = "Nineveh "}},
        {text:"Kirkuk ",handler:()=>{this.selectValue = "Kirkuk "}},
        {text:"Salahuddin ",handler:()=>{this.selectValue = "Salahuddin "}},
        {text:"Diyala ",handler:()=>{this.selectValue = "Diyala "}},
        {text:"Anbar ",handler:()=>{this.selectValue = "Anbar "}},
        {text:"Babil ",handler:()=>{this.selectValue = "Babil "}},
        {text:"Wasit ",handler:()=>{this.selectValue = "Wasit "}},
        {text:" Najaf ",handler:()=>{this.selectValue = "Najaf "}},
        {text:"Karbala ",handler:()=>{this.selectValue = "Karbala"}},
        {text:"Muthanna ",handler:()=>{this.selectValue = "Muthanna "}},
        {text:"Dhi Qar",handler:()=>{this.selectValue = "Dhi Qar"}},
        {text:"Maysan ",handler:()=>{this.selectValue = "Maysan "}},
        {text:"Qadissiya ",handler:()=>{this.selectValue = "Qadissiya"}},
        {text:"Basra ",handler:()=>{this.selectValue = "Basra "}},
 
      ]
    });
    actionSheet.present();
  }

  genderfun(){
    
    const actionSheet = this.ac.create({
      title: 'Chose your gender',
      cssClass:"dirion",
      buttons: [
        {text:"Male",handler:()=>{this.gender = "Male"}},
        {text:"Fmale",handler:()=>{this.gender = "Fmale"}},


      ]
    });
    actionSheet.present();
  }


  edit(name,phone,gendert,date,city,company,more){

    this.db.list("users").update(this.key,{
      name:name,
      phone:phone,
      gender:gendert,
      date:date,
      city:city,
      company:company,
      more:more,
    
    }).then( ()=> {
      $("input").val("");
      this.navCtrl.pop();
     this.toast.create({
       message:"Your profile has been updated",
       duration:3000
     }).present();
    })

  }

}
