import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NewsDTO } from 'src/app/models/dto/NewsDTO';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.page.html',
  styleUrls: ['./news-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class NewsDetailsPage implements OnInit {
  constructor(private newsService: NewsService) { }
  new: NewsDTO = {} as NewsDTO;
  newService: any;
  

  ngOnInit() {
    this.newService.getNewsById(1).subscribe(
      (data: NewsDTO) => {
        this.new = data;
      },
      (error: any) => {
        console.error('Error fetching events:', error);
      }
    );
  }

}
