import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.page.html',
  styleUrls: ['./news-card.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class NewsCardPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
