import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollCustomEvent, IonicModule } from '@ionic/angular';
import { EventDTO } from 'src/app/models/dto/EventDTO';
import { TabsPageModule } from 'src/app/components/menu/tabs.module';
import { EventCardComponentComponent } from '../event-card-component/event-card-component.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  providers: [EventService, UserService],
  imports: [
    IonicModule,
    EventCardComponentComponent,
    HttpClientModule,
  ],
})
export class Tab1Page implements OnInit {
  constructor(
    private eventService: EventService,
    private userService: UserService
  ) {}

  events: EventDTO[] = [];
  logueado = false;

  //Funcion para refrescar la pagina

  handleRefresh(data: any) {
    setTimeout(() => {
      location.reload();
      data.target.complete();
    }, 1500);
  }

  //Funcion para "cargar mas eventos"

  onIonInfinite(ev: any) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 1500);
  }

  //Funcion para obtener todos los eventos

  private getAllEvents(pageNumber: number = 0) {
    this.eventService.getEventsByState('disponible', pageNumber).subscribe(
      (data) => {
        this.events.push(...data.content);
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }

  //Funcion para volver al login

  volverlogin() {
    window.location.href = '/login';
  }

  ngOnInit(): void {
    this.getAllEvents();
    this.logueado = this.userService.isLogged();

    if (this.logueado === false) {
      this.volverlogin();
    }
  }
}
