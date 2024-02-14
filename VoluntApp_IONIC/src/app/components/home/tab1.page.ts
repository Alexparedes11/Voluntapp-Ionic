import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollCustomEvent, IonicModule } from '@ionic/angular';
import { EventDTO } from 'src/app/models/dto/EventDTO';
import { TabsPageModule } from 'src/app/components/menu/tabs.module';
import { EventCardComponentComponent } from '../event-card-component/event-card-component.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  providers: [EventService],
  imports: [IonicModule, CommonModule, FormsModule, TabsPageModule, EventCardComponentComponent, HttpClientModule],
})
export class Tab1Page implements OnInit {

  constructor(private eventService: EventService, private http: HttpClient) { } 
  events: EventDTO[] = [];
  items = [];

  handleRefresh(data: any) {
    setTimeout(() => {
      // Any calls to load data go here
      data.target.complete();
    }, 2000);
  }

  onIonInfinite(ev: any) {
    this.generate6();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  ngOnInit(): void {
    this.getAllEvents();
  }
  
  private getAllEvents(pageNumber: number = 0) {
    this.eventService.getEventsByState("disponible", pageNumber).subscribe(
      (data) => {
        this.events.push(...data.content);
  
        if (data.last === false) {
          
          this.getAllEvents(pageNumber + 1);
        } else {
          
          this.generate6();
        }
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }
  
  private generate6() {
    if (this.events.length >= 4) { // Verifica si hay al menos 4 eventos
      const count = this.events.length;
      for (let i = 0; i < 5; i++) {
        this.items.push(this.events[i] as never);
      }
    } else {
      console.error('Error: Not enough events to generate 6 items.');
    }
  }

}
