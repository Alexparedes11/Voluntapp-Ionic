import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, DatePipe]
})
export class NewsCardComponent  {

  @Input() id: number | null = null;
  @Input() imagen: string | null = null;
  @Input() titulo: string | null = null;
  @Input() contenido: string | null = null;
  @Input() fecha: Date | null = null;
  @Input() autor: string | null = null;

  constructor(private newsService: NewsService ) { }

  getNewsById(id: number) {
    return this.newsService.getNewsById(id);
  }
  

}
