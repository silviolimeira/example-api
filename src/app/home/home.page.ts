import { Component, OnInit } from "@angular/core";

import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Platform } from "@ionic/angular";
import * as firebase from "firebase";

import { GooglePlus } from "@ionic-native/google-plus/ngx";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  items: Observable<any[]>;
  constructor(
    private googlePlus: GooglePlus,
    db: AngularFirestore,
    platform: Platform
  ) {
    this.items = db.collection("students").valueChanges();

    platform.ready().then(source => {
      console.log("platform source " + source);

      this.googlePlus
        .login({})
        .then(res => {
          // console.log(res);
          // let obj = JSON.parse(res);

          console.log("res:", res);
          console.log(res.email);
        })
        .catch(err => {
          console.log("err:", err);
        });
    });
  }
}
