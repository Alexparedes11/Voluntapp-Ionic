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

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  standalone: true,
  providers: [EventService, UserService],
  imports: [
    IonicModule,
    EventCardComponentComponent,
    HttpClientModule,
  ],
})
export class Tab4Page implements OnInit {
searchTerm: any;
userId: number = -1;
tipo: string = "";
  constructor(
    private eventService: EventService,
    private userService: UserService
  ) {}

  events: EventDTO[] = [];
  logueado = false;
  currentPage: number = 0;

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
  this.userId = this.userService.getUserIdFromToken();
  this.tipo = this.userService.getUserTypeFromToken();

  if (this.tipo == "Usuario") {
    this.eventService.getEventsByUser(this.userId).subscribe(
      (data) => {
        this.events = data;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  } else if (this.tipo == "Institucion") {
    this.eventService.getEventsByInstitution(this.userId).subscribe(
      (data) => {
        this.events = data;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }

    this.logueado = this.userService.isLogged();

    if (this.logueado === false) {
      this.volverlogin();
    }
  }
}
