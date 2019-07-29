import { Component, OnInit } from "@angular/core";

import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Platform } from "@ionic/angular";
import * as firebase from "firebase";

import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { CalendarService } from "../services/calendar.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  access_token: any;

  items: Observable<any[]>;
  constructor(
    private googlePlus: GooglePlus,
    db: AngularFirestore,
    platform: Platform,
    private calendarService: CalendarService
  ) {
    this.items = db.collection("students").valueChanges();

    platform.ready().then(source => {
      console.log("platform source " + source);

      this.googlePlus
        .login({
          // 'webClientId': 'XXXXXXX.apps.googleusercontent.com',
          // webClientId: environment.web.client_id,
          // offline: true
        })
        .then(res => {
          // console.log(res);
          // let obj = JSON.parse(res);

          console.log("res:", res);
          this.access_token = res.accessToken;
          console.log(res.email);
        })
        .catch(err => {
          console.log("err:", err);
        });

      // this.googlePlus
      //   .login({
      //     // 'webClientId': 'XXXXXXX.apps.googleusercontent.com',
      //     webClientId: environment.web.client_id,
      //     offline: true
      //   })
      //   .then(
      //     res => {
      //       console.log(res);
      //       this.access_token = res.accessToken;
      //       console.log("access_token:", this.access_token);
      //     },
      //     error => {
      //       console.log(error);
      //     }
      //   );
    });
  }

  logout() {
    this.googlePlus.logout();
  }
  makeRequest() {
    console.log("makeRequest, access_token: ", this.access_token);
    this.calendarService
      .postArticle(
        '{ summary: "Teste123", location: "Teste123", start: { dateTime: "2019-12-25T11:00:00.000-03:00", timeZone: "America/Sao_Paulo" }, end: { dateTime: "2019-12-25T11:25:00.000-03:00", timeZone: "America/Sao_Paulo" } }',
        this.access_token
      )
      .subscribe(res => {
        console.log("res: ", res);
      });
  }
}
