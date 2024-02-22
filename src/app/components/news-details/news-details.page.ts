import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NewsDTO } from 'src/app/models/dto/NewsDTO';
import { NewsService } from 'src/app/services/news.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.page.html',
  styleUrls: ['./news-details.page.scss'],
  standalone: true,
  providers: [NewsService],
  imports: [IonicModule, CommonModule,  HttpClientModule]
})
export class NewsDetailsPage implements OnInit {
  id: any;
  constructor(private newsService: NewsService, private activatedRoute: ActivatedRoute) { }
  new: NewsDTO = {} as NewsDTO;
  

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.newsService.getNewsById(this.id).subscribe(
      (data: NewsDTO) => {
        this.new = data;
      },
      (error: any) => {
        console.error('Error fetching events:', error);
      }
    );
  }

}
