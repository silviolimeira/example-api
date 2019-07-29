import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

export interface CalendarEvent {
  summary: string;
  title: string;
  category: string;
  writer: string;
}

@Injectable({
  providedIn: "root"
})
export class CalendarService {
  url =
    "https://www.googleapis.com/calendar/v3/calendars/primary/events?access_token=";
  constructor(private http: HttpClient) {}

  // createArticle(article: Article): Observable<Article> {
  //     let httpHeaders = new HttpHeaders()
  //         .set('Content-Type', 'application/json');
  //     let options = {
  //         headers: httpHeaders
  //     };
  //     return this.http.post<Article>(this.url, article, options);
  // }

  // article: '{ summary: "Teste123", location: "Teste123", start: { dateTime: "2019-07-25T11:00:00.000-03:00", timeZone: "America/Sao_Paulo" }, end: { dateTime: "2019-07-25T11:25:00.000-03:00", timeZone: "America/Sao_Paulo" } }';

  postArticle(article: any, access_token: any): Observable<HttpResponse<any>> {
    let uri = this.url + access_token;

    let httpHeaders = new HttpHeaders({
      "Content-Type": "application/json"
    });
    return this.http.post<string>(uri, article, {
      headers: httpHeaders,
      observe: "response"
    });
  }
  // getAllArticles(): Observable<Article[]> {
  //     return this.http.get<Article[]>(this.url);
  // }
}
