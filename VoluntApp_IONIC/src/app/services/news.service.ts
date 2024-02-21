import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
    providedIn: 'root'
  })
  export class NewsService {
    private baseUrl = environment.server.ip + ':' + environment.server.port;
    constructor(private http: HttpClient) { }
    getNews() {
      return this.http.get(`${this.baseUrl}/noticias`).pipe(
        map((data: any) => {
          return data;
        })
      );
    }

    getNewsById(id: number) {
      return this.http.get(`${this.baseUrl}/noticias/${id}`).pipe(
        map((data: any) => {
          return data;
        })
      );
    }
  }