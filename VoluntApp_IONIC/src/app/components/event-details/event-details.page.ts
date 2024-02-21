import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { EventDTO } from 'src/app/models/dto/EventDTO';
import { map } from 'rxjs';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
  standalone: true,
  providers: [EventService, UserService],
  imports: [IonicModule, CommonModule, FormsModule, MapComponent]
})
export class EventDetailsPage implements OnInit {

  constructor(private eventService: EventService, private userService: UserService, private router: Router) { }

  @Input() eventId: number = -1;
  tipo: string = "";
  userId: number = -1;
  isUserInEvent: boolean = false;
  isInstitucionInEvent: boolean = false;
  isLogged: boolean = false;
  isAdmin: boolean = false;
  isCreator: boolean = false;

  event: EventDTO = {} as EventDTO;

  addUserToEvent() {
    this.eventService.addUserToEvent(this.userId, this.eventId).subscribe(
      (data) => {
        return data;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
    this.isUserInEvent = true;
    alert("Te has unido al evento correctamente");

  }

  addInstitucionToEvent() {
    this.eventService.addInstitutionToEvent(this.userId, this.eventId).subscribe(
      (data) => {
        return data;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
    this.isInstitucionInEvent = true;
    alert("Te has unido al evento correctamente");

  }

  removeUserFromEvent() {
    this.eventService.removeUserFromEvent(this.userId, this.eventId).subscribe(
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
    this.eventService.removeInstitutionFromEvent(this.userId, this.eventId).subscribe(
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
    this.eventService.updateEventState(this.eventId, "eliminado").subscribe();
    this.router.navigate(['/myevents']);
  }
  
  ngOnInit(): void {
    this.isAdmin = this.userService.isAdmin();
    this.userId = this.userService.getUserIdFromToken();
    this.tipo = this.userService.getUserTypeFromToken();

    console.log(this.tipo);

    this.eventService.getEventDTOById(this.eventId).subscribe(
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

        this.eventService.isUserInEvent(this.userId, this.eventId).subscribe(
          (data) => {
            this.isUserInEvent = data;
          },
          (error) => {
            console.error('Error fetching events:', error);
          }

        );

        this.eventService.isUserCreator(this.userId, this.eventId).subscribe(
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
        this.eventService.isInstitucionInEvent(this.userId, this.eventId).subscribe(
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
}
