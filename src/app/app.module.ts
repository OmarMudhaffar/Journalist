import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AndroidPermissions } from '@ionic-native/android-permissions';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { SettingsPage } from '../pages/settings/settings';
import { NativeStorage } from '@ionic-native/native-storage';
import { ProfilePage } from '../pages/profile/profile';
import { UrgentPage } from '../pages/urgent/urgent';
import { CasesPage } from '../pages/cases/cases';
import { DNS } from '@ionic-native/dns';
import { SMS } from '@ionic-native/sms';
import { InfoPage } from '../pages/info/info';

var config = {
  apiKey: "AIzaSyCE8wnGqnot2bvSngCoHNc6OpKaPDr2XU4",
  authDomain: "journalism-iq.firebaseapp.com",
  databaseURL: "https://journalism-iq.firebaseio.com",
  projectId: "journalism-iq",
  storageBucket: "journalism-iq.appspot.com",
  messagingSenderId: "625102291940"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
 
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(config),
    AngularFireStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProfilePage,
    LoginPage,
    RegisterPage,
    SettingsPage,
    UrgentPage,
    CasesPage,
    InfoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeStorage,
    Geolocation,
    DNS,
    SMS,
    AndroidPermissions,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
