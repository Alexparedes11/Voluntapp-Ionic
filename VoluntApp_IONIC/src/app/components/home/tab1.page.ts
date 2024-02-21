import { Component, NgModule, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollCustomEvent, IonicModule } from '@ionic/angular';
import { EventDTO } from 'src/app/models/dto/EventDTO';
import { TabsPageModule } from 'src/app/components/menu/tabs.module';
import { EventCardComponentComponent } from '../event-card-component/event-card-component.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import {Ng2SearchPipeModule} from 'ng2-search-filter';

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
searchTerm: any;
  constructor(
    private eventService: EventService,
    private userService: UserService
  ) {}

  events: EventDTO[] = [];
  logueado = false;
  currentPage: number = 0;
  pages: Array<number> = [];

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

  //Funcion para volver al login

  volverlogin() {
    window.location.href = '/login';
  }

  filterEventsBySearch(search: string) {
    if (search) {
      this.eventService.getEventsBySearchQuery(search).subscribe(
        (data) => {
          this.events = data.content;
          this.currentPage = data.pageable.pageNumber;
        },
        (error) => {
          console.error('Error fetching events:', error);
        }
      );
    } else {
      this.eventService.getEventsByState("disponible").subscribe(
        (data) => {
          this.events = data.content;
          this.currentPage = data.pageable.pageNumber;
        },
        (error) => {
          console.error('Error fetching events:', error);
        }
      );
    }
  }

  ngOnInit(): void {
    this.eventService.getEventsByState("disponible").subscribe(
      (data) => {
        this.events = data.content;
        console.log(this.events);
        for (let i = 0; i < data.totalPages; i++) {
          this.pages.push(i + 1);
        }
        this.currentPage = data.pageable.pageNumber;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
    this.logueado = this.userService.isLogged();

    if (this.logueado === false) {
      this.volverlogin();
    }
  }
}
