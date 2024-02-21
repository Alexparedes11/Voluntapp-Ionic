import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollCustomEvent, IonicModule } from '@ionic/angular';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventDTO } from 'src/app/models/dto/EventDTO';
import { map } from 'rxjs';
import { MapComponent } from '../map/map.component';
import { HttpClientModule } from '@angular/common/http';
import { UserDTO } from 'src/app/models/dto/UserDTO';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
  standalone: true,
  providers: [EventService, UserService],
  imports: [IonicModule, CommonModule, FormsModule, MapComponent,  HttpClientModule]
})
export class EventDetailsPage implements OnInit {

  id: any;
  logueado = false;

  constructor(private eventService: EventService, private userService: UserService, private router: Router, 
              private activatedRoute: ActivatedRoute) { }


  tipo: string = "";
  userId: number = -1;
  isUserInEvent: boolean = false;
  isInstitucionInEvent: boolean = false;
  isLogged: boolean = false;
  isAdmin: boolean = false;
  isCreator: boolean = false;

  event: EventDTO = {} as EventDTO;

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

  volverlogin() {
    window.location.href = '/login';
  }

  addUserToEvent() {
    this.eventService.addUserToEvent(this.userId, this.id).subscribe(
      (data) => {
        return data;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
    this.isUserInEvent = true;

  }

  addInstitucionToEvent() {
    this.eventService.addInstitutionToEvent(this.userId, this.id).subscribe(
      (data) => {
        return data;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
    this.isInstitucionInEvent = true;

  }

  removeUserFromEvent() {
    this.eventService.removeUserFromEvent(this.userId, this.id).subscribe(
      (data) => {
        return data;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
    this.isUserInEvent = false;

  }

  removeInstitucionFromEvent() {
    this.eventService.removeInstitutionFromEvent(this.userId, this.id).subscribe(
      (data) => {
        return data;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
    this.isInstitucionInEvent = false;

  }

  deleteEvent() {
    this.eventService.updateEventState(this.id, "eliminado").subscribe();
    this.router.navigate(['/myevents']);
  }

  
  
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.isAdmin = this.userService.isAdmin();
    this.userId = this.userService.getUserIdFromToken();
    this.tipo = this.userService.getUserTypeFromToken();

    console.log(this.tipo);

    this.logueado = this.userService.isLogged();

    if (this.logueado === false) {
      this.volverlogin();
    }

    this.eventService.getEventDTOById(this.id).subscribe(
      (data) => {
        this.event = data;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );

    this.isLogged = this.userService.isLogged();

    if (this.isLogged) {

      if (!this.isAdmin && this.tipo == "Usuario") {

        this.eventService.isUserInEvent(this.userId, this.id).subscribe(
          (data) => {
            this.isUserInEvent = data;
          },
          (error) => {
            console.error('Error fetching events:', error);
          }

        );

        this.eventService.isUserCreator(this.userId, this.id).subscribe(
          (boolean) => {
            if (boolean == true) {
              this.isCreator = true;
            }
          },
          (error) => {
            console.error('Error fetching events:', error);
          }
        )

      } else {
        this.eventService.isInstitucionInEvent(this.userId, this.id).subscribe(
          (data) => {
            this.isInstitucionInEvent = data;
          },
          (error) => {
            console.log('Error fetching events: ', error);
          }
        )
      }
    }
  }
  public alertApuntarse = [
    {
      text: 'No',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'Si',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
        this.addUserToEvent();
      },
    },
  ];

  public alertDesapuntarse = [
    {
      text: 'No',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'Si',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
        this.removeUserFromEvent();
      },
    },
  ];

  public alertApoyar = [
    {
      text: 'No',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'Si',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
        this.addInstitucionToEvent();
      },
    },
  ];

  public alertDesapoyar= [
    {
      text: 'No',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'Si',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
        this.removeInstitucionFromEvent();
      },
    },
  ];
}
