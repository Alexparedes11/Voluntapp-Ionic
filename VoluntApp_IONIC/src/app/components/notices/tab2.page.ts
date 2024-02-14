import { Component, OnInit } from '@angular/core';
import { ActionSheetController, InfiniteScrollCustomEvent, IonicModule } from '@ionic/angular';
import { NewsService } from 'src/app/services/news.service';
import { NewsDTO } from 'src/app/models/dto/NewsDTO';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsPageModule } from '../menu/tabs.module';

import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  providers: [NewsService],
  imports: [IonicModule, CommonModule, FormsModule, TabsPageModule, HttpClientModule],
})
export class Tab2Page implements OnInit{
[x: string]: any;

  constructor(private newsService: NewsService, private http: HttpClient) { } 
  news: NewsDTO[] = [];
  items = [];

  handleRefresh(data: any) {
    setTimeout(() => {
      data.target.complete();
    }, 2000);
  }

  onIonInfinite(ev: any) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  ngOnInit(): void {
    this.getAllEvents();
  }
  
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

}
