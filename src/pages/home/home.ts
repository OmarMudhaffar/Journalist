import { Component } from '@angular/core';
import { NavController, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireAuth } from '@angular/fire/auth';
import { SettingsPage } from '../settings/settings';
import { ProfilePage } from '../profile/profile';
import { AngularFireDatabase } from '@angular/fire/database';
import { UrgentPage } from '../urgent/urgent';
import { CasesPage } from '../cases/cases';
import { DNS } from '@ionic-native/dns';
import { SMS } from '@ionic-native/sms';
import { NativeStorage } from '@ionic-native/native-storage';
import { AndroidPermissions } from '@ionic-native/android-permissions';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  latlng;

  name
  phone
  gendert
  date
  city
  company
  more
  key
  email

  constructor(public navCtrl: NavController,public geolocation : Geolocation,
    public auth : AngularFireAuth,public alert : AlertController,public db : AngularFireDatabase,
    public toast : ToastController,private dns: DNS,public load : LoadingController,private sms: SMS,
    private nativeStorage: NativeStorage,private androidPermissions: AndroidPermissions) {

 
  this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then( per => {
    geolocation.getCurrentPosition().then(pos => {
      this.latlng = pos.coords.latitude + "," + pos.coords.longitude;
    })
  

  },err => {

    androidPermissions.requestPermission(androidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then( ()=> {
      geolocation.getCurrentPosition().then(pos => {
        this.latlng = pos.coords.latitude + "," + pos.coords.longitude;
      })
    })


  })
  
  geolocation.getCurrentPosition().then(pos => {
    this.latlng = pos.coords.latitude + "," + pos.coords.longitude;
  })

  auth.authState.subscribe(user => {
    if(user != undefined){
      this.email = user.email
      this.db.list("users",ref => ref.orderByChild("email").equalTo(user.email)).snapshotChanges().subscribe(data => {
       this.name = data[0].payload.val()['name'];
       this.phone = data[0].payload.val()['phone'];
       this.gendert = data[0].payload.val()['gender'];
       this.date = data[0].payload.val()['date'];
       this.city = data[0].payload.val()['city'];
       this.company = data[0].payload.val()['company'];
       this.more = data[0].payload.val()['more'];
       this.key = data[0].key;

      })
    }
  })
  
  }

  logout(){
   var alert = this.alert.create({
     subTitle:"Logout from your account ?",
     buttons:[{text:"logout",handler: ()=> {
       this.auth.auth.signOut();
     }},"cancle"]
   });
   alert.present();
  }

  settings(){
    this.navCtrl.push(SettingsPage);
  }

  profile(){
    this.navCtrl.push(ProfilePage,{
      name:this.name,
      phone:this.phone,
      gender:this.gendert,
      date:this.date,
      city:this.city,
      company:this.company,
      more:this.more,
      key:this.key
    })
  }

  urgent(){
    this.navCtrl.push(UrgentPage,{
      name:this.name,
      phone:this.phone,
      gender:this.gendert,
      date:this.date,
      city:this.city,
      company:this.company,
      more:this.more,
      email:this.email
    });
  }

  cases(){
    this.navCtrl.push(CasesPage,{
      name:this.name,
      phone:this.phone,
      gender:this.gendert,
      date:this.date,
      city:this.city,
      company:this.company,
      more:this.more,
      email:this.email
    })
  }

  sos(){
    
var load = this.load.create({
  content:"Sending Sos.."
})

    var host = "www.google.com";

    load.present();

    this.dns.resolve(host).then(addr => {

      load.dismiss()

      this.geolocation.getCurrentPosition().then(gps => {
        this.db.list("sos").push({
            title:"i need help",
            lat:gps.coords.latitude,
            lng:gps.coords.longitude,
            email:this.email,
            name:this.name,
            city:this.city,
            phone:this.phone
          }).then( ()=> {
            this.toast.create({
              message:"Your sos has been sent",
              duration:3000
            }).present();
          })
    
    
        })

    },err => {

      load.dismiss();

      this.nativeStorage.getItem("phone").then(phone => {
        
          this.sms.send(phone,"i need your help");
        

      }).catch(err => {
        var alertt = this.alert.create({
          subTitle:"No phone number",
          message:"you have to save your friend phone number from settings page first",
          buttons:["ok"]
        });

        alertt.present();

      })

    })

  }

}
