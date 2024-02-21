import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, IonicModule } from '@ionic/angular';
import { NewsService } from 'src/app/services/news.service';
import { NewsDTO } from 'src/app/models/dto/NewsDTO';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { NewsCardComponent } from '../news-card/news-card.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  providers: [NewsService, UserService],
  imports: [IonicModule, HttpClientModule, NewsCardComponent],
})

export class Tab2Page implements OnInit{
  
  constructor(private newsService: NewsService, private http: HttpClient, private userService: UserService) { }

  news: NewsDTO[] = [];
  logueado = false;

  // Funcion para obtener todas las noticias

  private getAllEvents() {
    this.newsService.getNews().subscribe(
      (data) => {
        this.news = data.content;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }

  // Funcion para volver al login

  volverlogin() {
    window.location.href = '/login';
  }

  // Funcion para refrescar la pagina

  handleRefresh(data: any) {
    setTimeout(() => {
      location.reload();
      data.target.complete();
    }, 1500);
  }

  // Funcion para "cargar mas noticias"

  onIonInfinite(ev: any) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  ngOnInit(): void {
    this.getAllEvents();
    this.logueado = this.userService.isLogged();

    if (this.logueado === false) {
      this.volverlogin();
    }
  }
}
