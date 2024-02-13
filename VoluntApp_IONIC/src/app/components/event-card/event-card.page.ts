import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.page.html',
  styleUrls: ['./event-card.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, DatePipe]
})
export class EventCardPage{

  @Input() id: number | null = null;
  @Input() image: string | null = null;
  @Input() title: string | null = null;
  @Input() startDate: Date | null = null;
  @Input() endDate: Date | null = null;
  @Input() location: string | null = null;
  @Input() volunteersList: User[] | null = null;
  @Input() numVolunteers: number | null = null;
  @Input() createdByUser: string | null = null;
  @Input() createdByInstitution: string | null = null;

  constructor() { }

 

}
